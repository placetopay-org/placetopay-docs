import { ItemList } from '@/components/ItemsList'
import { useLocalizePath } from '@/hooks/useLocalizePath'
import { useLocale } from './LocaleProvider'

const guides = [
  {
    href: '/checkout',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'Inicio',
      en: 'Home',
    },
    description: {
      es: 'Conoce Checkout, las ventajas que te ofrece y los métodos de integración a un alto nivel.',
      en: 'Get to know Checkout, the advantages it offers you and the integration methods at a high level.',
    },
  },
  {
    href: '/checkout/authentication',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'Integración',
      en: 'Integration',
    },
    description: {
      es: 'Conoce las capacidades de Checkout, los conceptos y flujos que debes tener en cuenta para una integración exitosa.',
      en: "Learn about Checkout's capabilities, the concepts and flows that you must take into account for a successful integration.",
    },
  },
  {
    href: '/checkout/api-reference/session',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'API',
      en: 'API',
    },
    description: {
      es: 'Conoce en detalle los métodos HTTP disponibles, los parámetros y posibles respuestas de cada servicio.',
      en: 'Know in detail the available HTTP methods, the parameters and possible responses of each service.',
    },
  },
]

export function DocsList() {
  const { locale } = useLocale()
  const localizePath = useLocalizePath()

  return (
    <div className="my-8 xl:max-w-none">
      <div className="not-prose grid grid-cols-1 gap-8 border-gray-900/5 dark:border-white/5 sm:grid-cols-3">
        {guides
          .map((guide) => ({
            ...guide,
            href: localizePath(guide.href),
            name: guide.name[locale],
            description: guide.description[locale],
            action: guide.action[locale],
          }))
          .map((guide) => (
            <ItemList key={guide.name} {...guide}></ItemList>
          ))}
      </div>
    </div>
  )
}
