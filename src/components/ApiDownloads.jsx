import { useRouter } from 'next/router'
import { useLocale } from '@/components/LocaleProvider'
import { DocumentIcon } from '@/components/icons/DocumentIcon'
import { FolderIcon } from '@/components/icons/FolderIcon'

const COPY = {
  es: {
    label: 'Descargas de la definición de esta API',
    yaml: {
      text: 'OpenAPI (YAML)',
      title: 'Descarga la definición OpenAPI de esta API en formato YAML',
    },
    postman: {
      text: 'Colección de Postman',
      title: 'Descarga la colección de Postman con todos los productos',
    },
  },
  en: {
    label: 'Downloads for this API definition',
    yaml: {
      text: 'OpenAPI (YAML)',
      title: 'Download the OpenAPI definition of this API in YAML format',
    },
    postman: {
      text: 'Postman collection',
      title: 'Download the Postman collection with all products',
    },
  },
}

function DownloadAction({ href, title, icon: Icon, children }) {
  return (
    <a
      href={href}
      download
      title={title}
      className="group flex items-center gap-x-1.5 rounded-md px-2 py-1 text-[0.8125rem] font-medium leading-5 text-gray-600 no-underline transition hover:bg-gray-900/[0.04] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
    >
      <Icon className="h-4 w-4 flex-none fill-gray-400/20 stroke-gray-500 transition group-hover:fill-primary-500/20 group-hover:stroke-primary-500 dark:stroke-gray-400 dark:group-hover:stroke-primary-400" />
      {children}
    </a>
  )
}

/**
 * Hidden below `sm`, where the actions wrap onto a second line and a divider
 * would be left dangling at the end of the first one.
 */
function Separator() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 hidden h-3.5 w-px flex-none bg-gray-900/10 dark:bg-white/10 sm:block"
    />
  )
}

/**
 * Page action bar with the downloads available for an API reference page: the
 * bundled OpenAPI definition of the product and the importable Postman
 * collection with all products. The files are generated at build time by
 * `scripts/makeApiDownloads.js` into `public/downloads`.
 *
 * It renders its own `<hr>` so the bar always sits right on top of the rule
 * that separates the page header from the content. That `<hr>` is a direct
 * child of `article.prose`, so it picks up the same full-bleed styling as a
 * `---` written in MDX — which means MDX pages must NOT keep a `---` next to
 * `<ApiDownloads />` or two rules would be drawn.
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

  const copy = isEn() ? COPY.en : COPY.es
  const basePath = `/downloads/apis/${resolvedScope}/${locale}`

  return (
    <>
      <div className="not-prose mt-6">
        <div
          role="group"
          aria-label={copy.label}
          className="-mx-2 flex flex-wrap items-center gap-y-1"
        >
          <DownloadAction
            href={`${basePath}.yaml`}
            title={copy.yaml.title}
            icon={DocumentIcon}
          >
            {copy.yaml.text}
          </DownloadAction>
          <Separator />
          <DownloadAction
            href={`/downloads/collections/placetopay-apis.${locale}.postman_collection.json`}
            title={copy.postman.title}
            icon={FolderIcon}
          >
            {copy.postman.text}
          </DownloadAction>
        </div>
      </div>
      <hr className="!mt-6" />
    </>
  )
}
