import { ItemList } from '@/components/ItemsList'
import { useLocalizePath } from '@/hooks/useLocalizePath'
import { useLocale } from './LocaleProvider'

const guides = [
  {
    href: '/autopay',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'Inicio',
      en: 'Home',
    },
    description: {
      es: 'Conoce AutoPay, sus beneficios y obtén una visión general de su integración.',
      en: 'Discover AutoPay, its benefits, and a high-level overview of the integration.',
    },
  },
  {
    href: '/autopay/authentication',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'Integración',
      en: 'Integration',
    },
    description: {
      es: 'Conoce las capacidades, conceptos y flujos clave de AutoPay para lograr una integración exitosa.',
      en: 'Learn about AutoPay capabilities, concepts, and key workflows for a successful integration.',
    },
  },
  {
    href: '/autopay/api/',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'API',
      en: 'API',
    },
    description: {
      es: 'Consulta en detalle los métodos HTTP disponibles, los parámetros y las posibles respuestas de cada servicio.',
      en: 'Explore available HTTP methods, parameters, and possible responses for each service in detail.',
    },
  },
  {
    href: '/autopay/contracts/',
    action: { es: 'Ver más', en: 'Learn more' },
    name: {
      es: 'Contratos',
      en: 'Contracts',
    },
    description: {
      es: 'Implementa los endpoints necesarios en tu servidor para gestionar balances, confirmaciones de pago y notificaciones.',
      en: 'Implement the required endpoints on your server to handle balances, payment confirmations, and notifications.',
    },
  },
]

export function AutoPayDocsList() {
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
