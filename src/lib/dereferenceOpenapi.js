import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import fs from 'fs'

const getLocale = (fileUrl) => {
  const possibleLocale = new URL(fileUrl).pathname.split('/src/pages/')[1].split('/')[0];
  return ['en'].includes(possibleLocale) ? possibleLocale : 'es';
}

const getRouteWithLocale = (fileUrl, assetPath = null) => {
  const locale = getLocale(fileUrl);
  const folder = assetPath ?? new URL(fileUrl).pathname.split(`/src/pages/${locale === 'es' ? '' : locale + '/'}`)[1].split('/')[0];
  return path.join(folder, `${locale}.yaml`)
}

const resolveRefSegments = (ref) =>
  ref
    .replace(/^#\//, '')
    .split('/')
    .map((segment) =>
      segment
        .split('%20')
        .join(' ')
        .replace(/~(1|0)/g, (match) => (match === '~1' ? '/' : '~'))
    )

const resolveInlineRef = (value, api, seen = new Set()) => {
  if (!value || typeof value !== 'object') return value

  if (typeof value.$ref === 'string') {
    const ref = value.$ref
    if (ref.startsWith('#/components/')) return value
    const target = resolveRefSegments(ref).reduce(
      (acc, segment) => acc?.[segment],
      api
    )
    if (target && !seen.has(ref)) {
      return resolveInlineRef(target, api, new Set([...seen, ref]))
    }
    return value
  }

  const result = Array.isArray(value) ? [] : {}

  for (const [key, item] of Object.entries(value)) {
    if (Array.isArray(item)) {
      result[key] = item.map((entry) => resolveInlineRef(entry, api, seen))
    } else if (item && typeof item === 'object') {
      result[key] = resolveInlineRef(item, api, seen)
    } else {
      result[key] = item
    }
  }

  return result
}

const collectReferencedComponents = (
  node,
  components,
  visited = new Set()
) => {
  if (!node || typeof node !== 'object') return

  if (typeof node.$ref === 'string') {
    const parts = node.$ref.replace(/^#\//, '').split('/')
    const section = parts[1]
    const name = parts[2]
    const target = components?.[section]?.[name]

    if (target && !visited.has(node.$ref)) {
      visited.add(node.$ref)
      collectReferencedComponents(target, components, visited)
    }
    return
  }

  for (const [key, value] of Object.entries(node)) {
    if (Array.isArray(value)) {
      value.forEach((item) => collectReferencedComponents(item, components, visited))
    } else if (value && typeof value === 'object') {
      collectReferencedComponents(value, components, visited)
    }
  }
}

const filterReferencedComponents = (paths, components) => {
  const visited = new Set()
  collectReferencedComponents(paths, components, visited)

  const filtered = {}

  for (const ref of visited) {
    const parts = ref.replace(/^#\//, '').split('/')
    const section = parts[1]
    const name = parts[2]
    if (!filtered[section]) filtered[section] = {}
    filtered[section][name] = components[section][name]
  }

  return filtered
}

export const dereferenceOpenapi = async (currentFileUrl, $refs, $assetPath = null) => {
  const fileName = getRouteWithLocale(currentFileUrl, $assetPath);
  const filePath = path.join(process.cwd(), 'src', 'assets', 'apis', fileName)

  if (!fs.existsSync(filePath)) {
    throw new Error(`File with OpenAPI structure ${filePath} does not exist`)
  }

  const api = await SwaggerParser.bundle(filePath);
  const apiRefsWithOpenapi = $refs.reduce((acc, apiRef) => {
    return { ...acc, [apiRef]: api.paths[apiRef] }
  }, {})
  const apiRefsWithResolvedRefs = Object.fromEntries(
    Object.entries(apiRefsWithOpenapi).map(([apiRef, operation]) => [
      apiRef,
      resolveInlineRef(operation, api),
    ])
  )
  const components = filterReferencedComponents(
    apiRefsWithResolvedRefs,
    api.components
  )
  const resolvedComponents = Object.fromEntries(
    Object.entries(components).map(([section, items]) => [
      section,
      Object.fromEntries(
        Object.entries(items).map(([name, value]) => [
          name,
          resolveInlineRef(value, api),
        ])
      ),
    ])
  )

  return {
    ...apiRefsWithResolvedRefs,
    components: resolvedComponents,
  };
}