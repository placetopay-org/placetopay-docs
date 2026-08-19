const SCHEMA_KEYS = [
  'enum',
  'default',
  'example',
  'format',
  'pattern',
  'maxLength',
  'minLength',
  'nullable',
]

const resolveSchema = (schema, components, seen = new Set()) => {
  if (!schema || typeof schema !== 'object') return schema
  if (typeof schema.$ref === 'string' && schema.$ref.startsWith('#/components/')) {
    if (seen.has(schema.$ref)) return schema
    const target = schema.$ref
      .replace(/~1/g, '/')
      .replace(/~0/g, '~')
      .split('/')
      .slice(2)
      .reduce((acc, segment) => acc?.[segment], components)
    if (target) return resolveSchema(target, components, new Set([...seen, schema.$ref]))
    return schema
  }
  return schema
}

const describeType = (schema) => {
  if (!schema) return ''
  const title = schema.title ?? schema.items?.title
  if (title) return schema.type === 'array' ? `array[${title}]` : title
  if (Array.isArray(schema.type)) return schema.type.join(' | ')
  if (schema.type === 'array') return 'array'
  return schema.type ?? ''
}

export const pickResponseSchema = (responses) => {
  for (const code of ['200', ...Object.keys(responses ?? {})]) {
    const contents = responses?.[code]?.content ?? {}
    const schema =
      contents['application/json']?.schema ??
      Object.values(contents)[0]?.schema
    if (schema) return schema
  }
  return null
}

/**
 * Builds a compact, top-level field reference from an OpenAPI schema,
 * resolving `#/components/` references. Matches a `oneOf`/`anyOf` variant by
 * `variantTitle` when provided, otherwise uses the first variant.
 */
export const buildFieldDocs = ({
  schema,
  components,
  requiredLabel = 'required',
  optionalLabel = 'optional',
  propertyLabels = {},
  variantTitle = null,
}) => {
  let target = resolveSchema(schema, components)
  if (!target || typeof target !== 'object') return ''

  const variants = target.oneOf ?? target.anyOf ?? []
  if (variants.length > 0) {
    const matched = variantTitle
      ? variants.find((variant) => variant?.title === variantTitle)
      : null
    target = matched ?? variants[0]
  }

  const properties = target.properties ?? target.items?.properties ?? null
  if (!properties || typeof properties !== 'object') return ''
  const requireds = target.required ?? target.items?.required ?? []

  const lines = []
  for (const [name, rawProperty] of Object.entries(properties)) {
    const property = resolveSchema(rawProperty, components)
    const itemSchema = resolveSchema(property?.items, components)
    const type = describeType(property) || describeType(itemSchema)
    const isRequired = (requireds ?? []).includes(name)

    const parts = [
      `- \`${name}\` (**${type || 'object'}**, ${
        isRequired ? requiredLabel : optionalLabel
      })`,
    ]

    const description = property?.description ?? rawProperty?.description
    if (description) parts.push(description)

    const meta = []
    for (const key of SCHEMA_KEYS) {
      const value = property?.[key]
      if (value === undefined) continue
      if (key === 'nullable') {
        const yes = propertyLabels.yes ?? 'yes'
        const no = propertyLabels.no ?? 'no'
        meta.push(`${propertyLabels.nullable ?? key}: ${value ? yes : no}`)
        continue
      }
      meta.push(
        `${propertyLabels[key] ?? key}: ${
          typeof value === 'object' ? JSON.stringify(value) : value
        }`
      )
    }
    if (meta.length > 0) parts.push(...meta)

    lines.push(parts.filter(Boolean).join(' — ').trim())
  }

  return lines.join('\n')
}