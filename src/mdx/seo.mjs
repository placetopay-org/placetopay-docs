// Shared SEO/URL helpers, used both by the client app (src/pages/_app.jsx)
// and by build-time scripts (scripts/makeSitemap.mjs). Keeping this logic in
// one place ensures the canonical URLs, hreflang alternates and sitemap
// entries never disagree with each other.

export const DEFAULT_LOCALE = 'es'

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

if (!configuredSiteUrl && process.env.NODE_ENV === 'production') {
  throw new Error('NEXT_PUBLIC_SITE_URL es obligatoria para canonical/hreflang/sitemap en producción')
}

export const SITE_URL = (configuredSiteUrl || 'http://localhost:3000').replace(/\/+$/, '')

/**
 * Ensures a pathname ends with a trailing slash, except for the root path.
 * Preserves `?query` and trailing `#hash` if present.
 */
export function withTrailingSlash(pathname) {
  if (!pathname || pathname === '/') return '/'

  let path = pathname
  let hash = ''
  let query = ''

  const hashIndex = path.indexOf('#')
  if (hashIndex !== -1) {
    hash = path.slice(hashIndex)
    path = path.slice(0, hashIndex)
  }

  const queryIndex = path.indexOf('?')
  if (queryIndex !== -1) {
    query = path.slice(queryIndex)
    path = path.slice(0, queryIndex)
  }

  const normalizedPath = path.endsWith('/') ? path : `${path}/`
  return `${normalizedPath}${query}${hash}`
}

/**
 * Splits a pathname into its locale and the locale-stripped path, e.g.
 * `/en/checkout/create-session` -> { locale: 'en', path: '/checkout/create-session' }
 * `/checkout/create-session` -> { locale: 'es', path: '/checkout/create-session' }
 */
export function splitLocaleFromPath(pathname) {
  const segments = (pathname || '/').split('/').filter(Boolean)
  if (segments[0] === 'en') {
    const rest = segments.slice(1).join('/')
    return { locale: 'en', path: rest ? `/${rest}` : '/' }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || '/' }
}

/**
 * Given any pathname (ES or EN), returns the equivalent ES and EN paths.
 */
export function getLocaleAlternates(pathname) {
  const { path } = splitLocaleFromPath(pathname)
  const esPath = path
  const enPath = path === '/' ? '/en' : `/en${path}`
  return { es: esPath, en: enPath }
}

/**
 * Builds the absolute, canonical URL (with trailing slash applied) for a
 * given pathname.
 */
export function absoluteUrl(pathname) {
  return `${SITE_URL}${withTrailingSlash(pathname)}`
}
