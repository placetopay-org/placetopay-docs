import { useRouter } from 'next/router'
import { Designtools } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

import { useLocale } from '@/components/LocaleProvider'

/**
 * Rutas cuya documentación sigue en construcción.
 *
 * Se comparan sin el prefijo de idioma, así que `/onboarding` cubre también
 * `/en/onboarding`. Una entrada cubre la ruta y todo lo que cuelga de ella.
 *
 * Para retirar el aviso de una sección basta con quitarla de esta lista.
 */
export const UNDER_CONSTRUCTION_ROUTES = ['/onboarding']

const UNDER_CONSTRUCTION_TEXTS = {
  es: {
    title: 'Documentación en construcción',
    description:
      'Esta sección todavía se está escribiendo. Su contenido puede cambiar mientras se completa, así que confírmalo con tu contacto en Placetopay antes de tomarlo como referencia para una integración.',
  },
  en: {
    title: 'Documentation in progress',
    description:
      'This section is still being written. Its content may change while it is completed, so confirm it with your Placetopay contact before relying on it for an integration.',
  },
}

export function isUnderConstruction(pathname = '') {
  const path = pathname.replace(/^\/en(?=\/|$)/, '') || '/'

  return UNDER_CONSTRUCTION_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`)
  )
}

/**
 * Aviso de sección en construcción.
 *
 * Se inyecta desde `Layout` y decide por sí mismo si aparecer, según la ruta.
 * En un MDX suelto se puede forzar con `<UnderConstructionBanner force />`.
 */
export function UnderConstructionBanner({ force = false, className = '' }) {
  const { locale } = useLocale()
  const { pathname } = useRouter()

  if (!force && !isUnderConstruction(pathname)) return null

  const { title, description } =
    UNDER_CONSTRUCTION_TEXTS[locale] ?? UNDER_CONSTRUCTION_TEXTS.es

  return (
    <aside
      role="note"
      className={twMerge(
        'not-prose mb-10 flex items-start gap-3 rounded-2xl border border-dashed border-amber-500/40 bg-amber-50/60 p-4 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/[0.06] dark:text-amber-100',
        className
      )}
    >
      <Designtools
        size="20"
        variant="Bulk"
        color="currentColor"
        className="mt-0.5 flex-none text-amber-500 dark:text-amber-400"
        aria-hidden="true"
      />
      <div className="text-sm leading-6">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-amber-900/75 dark:text-amber-100/70">
          {description}
        </p>
      </div>
    </aside>
  )
}
