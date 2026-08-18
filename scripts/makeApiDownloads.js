/**
 * Generates the downloadable API artifacts published with the static site:
 *
 *  - Bundled OpenAPI definitions per scope and locale, so they can be
 *    imported in API testing tools or code generators. External $refs
 *    (e.g. ../base/es.yaml#/...) are resolved with SwaggerParser.bundle(),
 *    which keeps internal $refs local and avoids circular structures.
 *  - Importable Postman collections (v2.1), one per locale, with the
 *    operations grouped by product (scope), the testing server URL
 *    preconfigured and the request body examples taken from the YAML specs.
 *
 * Output:
 *  public/downloads/apis/<scope>/<locale>.yaml
 *  public/downloads/apis/<scope>/<locale>.json
 *  public/downloads/collections/placetopay-apis.<locale>.postman_collection.json
 *
 * The `base` scope is excluded on purpose: it has no `paths`, it is a shared
 * components library, not a publishable API.
 */
const SwaggerParser = require('@apidevtools/swagger-parser')
const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const APIS_DIR = path.join(process.cwd(), 'src', 'assets', 'apis')
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'downloads')
const LOCALES = ['es', 'en']

const logger = console

const getScopes = (dir = APIS_DIR, prefix = '') =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const scope = prefix ? `${prefix}/${entry.name}` : entry.name
      // The `base` scope is a shared components library without paths,
      // not a publishable API.
      if (scope === 'base') return []
      const hasSpecs = LOCALES.every((locale) =>
        fs.existsSync(path.join(dir, entry.name, `${locale}.yaml`))
      )
      return hasSpecs
        ? [scope]
        : getScopes(path.join(dir, entry.name), scope)
    })

const getTestServerUrl = (api) => {
  const servers = Array.isArray(api.servers) ? api.servers : []
  const testingServer =
    servers.find((server) =>
      /test|sandbox|dev|uat|qa/i.test(`${server.url ?? ''} ${server.description ?? ''}`)
    ) ?? servers[0]
  return testingServer?.url ?? ''
}

const normalizeUrl = (url) => url.replace(/\/+$/, '')

const firstExampleOf = (mediaType) => {
  if (!mediaType) return undefined
  const examples = Object.values(mediaType.examples ?? {})
  const withValue = examples.find((example) => example && example.value !== undefined)
  return withValue?.value ?? mediaType.example
}

// SwaggerParser.bundle() internalizes external $refs but keeps internal ones,
// so `requestBody: { $ref: '#/components/requestBodies/...' }` must be
// resolved against the bundled components before reading its content.
const resolveRequestBody = (requestBody, api) => {
  const ref = requestBody?.$ref
  if (typeof ref !== 'string') return requestBody
  const name = ref.replace(/^#\/components\/requestBodies\//, '')
  return api.components?.requestBodies?.[name] ?? requestBody
}

const operationToPostmanItem = (pathName, method, operation, api) => {
  const rawBody = firstExampleOf(
    resolveRequestBody(operation.requestBody, api)?.content?.['application/json']
  )

  const item = {
    name: operation.summary || operation.operationId || `${method.toUpperCase()} ${pathName}`,
    request: {
      method: method.toUpperCase(),
      header: [{ key: 'Content-Type', value: 'application/json' }],
      url: {
        raw: `{{base_url}}${pathName}`,
        host: ['{{base_url}}'],
        path: pathName.split('/').filter(Boolean),
      },
      description: operation.description,
    },
  }

  if (rawBody !== undefined && !['get', 'delete', 'head', 'options'].includes(method)) {
    item.request.body = {
      mode: 'raw',
      raw: JSON.stringify(rawBody, null, 2),
      options: { raw: { language: 'json' } },
    }
  }

  return item
}

const buildPostmanCollection = (apisByScope, locale) => {
  const items = []

  for (const { scope, api, testServerUrl } of apisByScope) {
    const operations = []
    for (const [pathName, pathItem] of Object.entries(api.paths ?? {})) {
      for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
        if (pathItem && pathItem[method]) {
          operations.push(
            operationToPostmanItem(pathName, method, pathItem[method], api)
          )
        }
      }
    }

    if (operations.length === 0) continue

    if (!testServerUrl) {
      logger.warn(
        `[api-downloads] "${scope}" (${api.info?.title ?? scope}) does not declare servers; ` +
          'its base_url variable will be empty in the Postman collection.'
      )
    }

    items.push({
      name: api.info?.title ?? scope,
      item: operations,
      // Each product has its own testing environment, so the base_url
      // variable is defined per folder and inherited by its operations.
      variable: [
        { key: 'base_url', value: normalizeUrl(testServerUrl ?? '') },
      ],
    })
  }

  return {
    info: {
      // Deterministic ID derived from the collection name so two builds of
      // the same commit produce identical artifacts.
      _postman_id: crypto
        .createHash('sha256')
        .update(`placetopay-apis.${locale}.postman_collection`)
        .digest('hex')
        .slice(0, 32),
      name: `Placetopay APIs (${locale === 'es' ? 'Español' : 'English'})`,
      description:
        locale === 'es'
          ? 'Colección generada automáticamente desde las definiciones OpenAPI publicadas en Placetopay Docs. La variable base_url ya está configurada con la dirección del entorno de pruebas de cada producto.'
          : 'Collection automatically generated from the OpenAPI definitions published in Placetopay Docs. The base_url variable is already set with the testing environment address of each product.',
      schema:
        'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: items,
  }
}

const main = async () => {
  const scopes = getScopes()
  logger.log(`Generating downloadable API definitions for: ${scopes.join(', ')}`)

  fs.rmSync(path.join(OUTPUT_DIR, 'apis'), { recursive: true, force: true })
  fs.rmSync(path.join(OUTPUT_DIR, 'collections'), { recursive: true, force: true })

  const apisByLocale = { es: [], en: [] }

  for (const scope of scopes) {
    for (const locale of LOCALES) {
      const sourcePath = path.join(APIS_DIR, scope, `${locale}.yaml`)
      const bundled = await SwaggerParser.bundle(sourcePath)

      const outDir = path.join(OUTPUT_DIR, 'apis', scope)
      fs.mkdirSync(outDir, { recursive: true })

      fs.writeFileSync(
        path.join(outDir, `${locale}.yaml`),
        yaml.dump(bundled, { noRefs: true, lineWidth: -1 })
      )
      fs.writeFileSync(
        path.join(outDir, `${locale}.json`),
        JSON.stringify(bundled, null, 2)
      )

      apisByLocale[locale].push({
        scope,
        api: bundled,
        testServerUrl: getTestServerUrl(bundled),
      })
    }
  }

  for (const locale of LOCALES) {
    const collection = buildPostmanCollection(apisByLocale[locale], locale)
    const collectionsDir = path.join(OUTPUT_DIR, 'collections')
    fs.mkdirSync(collectionsDir, { recursive: true })
    fs.writeFileSync(
      path.join(collectionsDir, `placetopay-apis.${locale}.postman_collection.json`),
      JSON.stringify(collection, null, 2)
    )
  }

  logger.log(
    `Done. ${scopes.length * LOCALES.length} definitions and ${LOCALES.length} collections written to ${path.relative(process.cwd(), OUTPUT_DIR)}`
  )
}

main().catch((error) => {
  logger.error('Failed to generate API downloads:', error)
  process.exit(1)
})
