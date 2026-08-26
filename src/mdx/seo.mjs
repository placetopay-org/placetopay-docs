// Shared SEO/URL helpers, used both by the client app (src/pages/_app.jsx)
// and by build-time scripts (scripts/makeSitemap.mjs). Keeping this logic in
// one place ensures the canonical URLs, hreflang alternates and sitemap
// entries never disagree with each other.

export const DEFAULT_LOCALE = 'es'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.placetopay.dev'
).replace(/\/+$/, '')

/**
 * Ensures a pathname ends with a trailing slash, except for the root path.
 * Preserves a trailing `#hash` if present.
 */
export function withTrailingSlash(pathname) {
  if (!pathname || pathname === '/') return '/'
  const [path, hash] = pathname.split('#')
  const normalized = path.endsWith('/') ? path : `${path}/`
  return hash ? `${normalized}#${hash}` : normalized
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
