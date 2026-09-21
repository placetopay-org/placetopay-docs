import path from 'path'

export const SUPPORTED_LOCALES = ['es', 'en']

/**
 * Derives the public URL and locale for a page under `src/pages`, given its
 * path relative to that directory (e.g. `core/reference/site/index.mdx` or
 * `en/checkout/create-session.mdx`). Shared between the search index
 * generator and the search loader so both sides build URLs the same way.
 */
export function getPageInfo(file) {
  const firstSegment = path.dirname(file).split(path.sep)[0].replace('/', '')
  const locale = SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : 'es'
  const route = file.replace(/\.mdx$/, '')
  const url = route === 'index' ? '/' : `/${route.replace(/\/index$/, '')}`
  return { url, locale }
}
