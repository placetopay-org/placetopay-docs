import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'
import { SUPPORTED_LOCALES } from './pageInfo.mjs'

// `API_TITLES` lives in a CommonJS file consumed by the web bundle; import it
// here through `createRequire` so the section labels stay in sync with what
// `ApiReader` renders on the site.
const { API_TITLES } = createRequire(import.meta.url)(
  '../constants/apiReader.js'
)

const APIS_DIR = path.join(process.cwd(), 'src', 'assets', 'apis')

const SCHEMA_KEYS = [
  'enum',
  'default',
  'example',
  'examples',
  'format',
  'pattern',
  'maxLength',
  'minLength',
]

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

const unique = (items) => [...new Set(items.filter(Boolean))]

const describeType = (schema) => {
  if (!schema) return ''
  const title = schema.title ?? schema.items?.title
  if (title) return schema.type === 'array' ? `array[${title}]` : title
  if (Array.isArray(schema.type)) return schema.type.join(' | ')
  if (schema.type === 'array') return 'array'
  return schema.type ?? ''
}

const schemaDetails = (schema) => {
  const details = []
  for (const key of SCHEMA_KEYS) {
    const value = schema?.[key]
    if (value === undefined) continue
    if (key === 'examples' && typeof value === 'object' && !Array.isArray(value)) {
      details.push(...Object.values(value).map((example) => example?.value ?? example))
      continue
    }
    details.push(...(Array.isArray(value) ? value : [value]))
  }
  return details
    .map((value) =>
      typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : String(value)
    )
    .filter((value) => value.length > 0)
}

const collectSchemaText = (schema, requireds = [], conditionals = [], acc = []) => {
  if (!schema) return acc

  // oneOf/anyOf variants: index every variant so all field names are searchable
  const variants = schema.oneOf ?? schema.anyOf ?? []
  if (variants.length > 0) {
    for (const variant of variants) {
      if (variant?.title) acc.push(variant.title)
      collectSchemaText(variant, [], [], acc)
    }
  }

  const properties = schema.properties ?? schema.items?.properties ?? null
  if (!properties) return acc

  const nestedRequireds = schema.required ?? schema.items?.required ?? []
  const nestedConditionals =
    schema['x-conditional'] ?? schema.items?.['x-conditional'] ?? []

  for (const [name, property] of Object.entries(properties)) {
    const text = [name, describeType(property), property.description]
    if (requireds.includes(name)) text.push('required')
    if (conditionals.includes(name)) text.push('conditional')
    text.push(...schemaDetails(property))
    acc.push(text.filter(Boolean).join(' '))
    collectSchemaText(property, nestedRequireds, nestedConditionals, acc)
  }

  return acc
}

const collectRequestText = (requestBody, lines = []) => {
  const content = requestBody?.content
  if (!content) return lines

  const schemas = Object.values(content)
    .map((media) => media?.schema)
    .filter(Boolean)

  for (const schema of schemas) {
    if (schema.description) lines.push(schema.description)
    collectSchemaText(schema, schema.required ?? [], schema['x-conditional'] ?? [], lines)
  }

  return unique(lines)
}

const collectResponsesText = (responses, lines = []) => {
  for (const [code, response] of Object.entries(responses ?? {})) {
    lines.push(code, response?.description)
    for (const media of Object.values(response?.content ?? {})) {
      const schema = media?.schema
      if (schema?.description) lines.push(schema.description)
      collectSchemaText(schema, [], [], lines)
    }
  }
  return unique(lines)
}

const collectParametersText = (parameters = [], where, lines = []) => {
  for (const param of (parameters ?? []).filter((param) => param?.in === where)) {
    const text = [
      param.name,
      param.schema?.type,
      param.description,
      param.required ? 'required' : null,
    ]
    text.push(...schemaDetails(param.schema ?? {}))
    lines.push(text.filter(Boolean).join(' '))
  }
  return unique(lines)
}

/**
 * Resolves the OpenAPI spec path for a page.
 * - If `apiAssetPath` is exported by the page it is used as the folder under
 *   `src/assets/apis` (e.g. `/sdks/pinpad` -> `src/assets/apis/sdks/pinpad/es.yaml`).
 * - Otherwise the folder is derived from the page's top-level directory
 *   (e.g. `checkout/api/reference/session.mdx` -> `checkout/es.yaml`).
 */
const resolveSpecPath = ({ file, apiAssetPath, locale }) => {
  let folder = apiAssetPath
  if (!folder) {
    const firstSegment = path.dirname(file).split(path.sep)[0].replace('/', '')
    folder = SUPPORTED_LOCALES.includes(firstSegment) ? file.split(path.sep)[1] : firstSegment
  }
  return path.join(APIS_DIR, folder ?? '', `${locale}.yaml`)
}

export async function extractApiSections({
  file,
  apiRefs = [],
  apiAssetPath = null,
  locale,
}) {
  const specPath = resolveSpecPath({ file, apiAssetPath, locale })
  if (!fs.existsSync(specPath)) {
    return {}
  }

  const api = await SwaggerParser.dereference(specPath)

  const titleFor = (kind, qualifier) =>
    kind === 'params'
      ? API_TITLES.params[locale][qualifier]
      : API_TITLES[kind][locale]

  const sections = {}

  for (const ref of apiRefs) {
    const pathItem = api.paths?.[ref]
    if (!pathItem) continue

    const explicitMethods = METHODS.filter((method) => pathItem[method])

    for (const method of explicitMethods) {
      const data = pathItem[method]
      const operationLabel = `${method.toUpperCase()} ${ref}`

      const buildSection = (title, lines) => {
        const content = unique(lines.filter(Boolean))
        if (content.length === 0) return
        const key = `${method} ${ref} ${title}`
        sections[key] = {
          path: ref,
          method,
          title: `${operationLabel} ${title}`,
          content: [operationLabel, data.summary, data.description, ...content]
            .filter(Boolean)
            .join('\n'),
        }
      }

      const parameters = [
        ...(pathItem.parameters ?? []),
        ...(data.parameters ?? []),
      ]

      buildSection(titleFor('request'), collectRequestText(data.requestBody))
      buildSection(titleFor('response'), collectResponsesText(data.responses))
      for (const where of ['params', 'query', 'header']) {
        buildSection(
          titleFor('params', where),
          collectParametersText(parameters, where === 'params' ? 'path' : where)
        )
      }
    }
  }

  return sections
}
