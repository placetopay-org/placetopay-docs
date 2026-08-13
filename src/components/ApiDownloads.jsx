import { useRouter } from 'next/router'
import { useLocale } from '@/components/LocaleProvider'

/**
 * Download links for the bundled OpenAPI definition of a product and the
 * importable Postman collection with all products. The files are generated
 * at build time by `scripts/makeApiDownloads.js` into `public/downloads`.
 *
 * Usage in MDX reference pages: `<ApiDownloads />` (the scope is inferred
 * from the current URL) or `<ApiDownloads scope="checkout" />`.
 */
export function ApiDownloads({ scope }) {
  const { locale, isEn } = useLocale()
  const router = useRouter()

  const segments = router.pathname.split('/').filter(Boolean)
  const resolvedScope =
    scope ?? (segments[0] === 'en' ? segments[1] : segments[0])

  if (!resolvedScope) return null

  const basePath = `/downloads/apis/${resolvedScope}/${locale}`

  return (
    <div className="not-prose mb-6 rounded-2xl border border-gray-900/10 p-4 dark:border-white/10">
      <p className="m-0 text-sm font-semibold text-gray-900 dark:text-white">
        {isEn() ? 'Download this API definition' : 'Descarga la definición de esta API'}
      </p>
      <p className="mb-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
        {isEn()
          ? 'Import it into your favorite API testing tool or code generator.'
          : 'Impórtala en tu herramienta de pruebas de APIs o generador de código favorito.'}
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`${basePath}.yaml`}
          download
          className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 ring-1 ring-inset ring-primary-500/20 transition hover:bg-primary-500/20 dark:text-primary-400"
        >
          OpenAPI (YAML)
        </a>
        <a
          href={`${basePath}.json`}
          download
          className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 ring-1 ring-inset ring-primary-500/20 transition hover:bg-primary-500/20 dark:text-primary-400"
        >
          OpenAPI (JSON)
        </a>
        <a
          href={`/downloads/collections/placetopay-apis.${locale}.postman_collection.json`}
          download
          className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 ring-1 ring-inset ring-primary-500/20 transition hover:bg-primary-500/20 dark:text-primary-400"
        >
          {isEn() ? 'Postman collection (all products)' : 'Colección de Postman (todos los productos)'}
        </a>
      </div>
    </div>
  )
}
