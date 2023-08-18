
import { ItemList } from '@/components/ItemsList'
import { useLocalizePath } from '@/hooks/useLocalizePath'

const guides = [
  {
    href: '/checkout',
    action: 'Ver más',
    name: 'Inicio',
    description: 'Conoce Checkout, las ventajas que te ofrece y los métodos de integración a un alto nivel.',
  },
  {
    href: '/checkout/authentication',
    action: 'Ver más',
    name: 'Integración',
    description: 'Conoce las capacidades de Checkout, los conceptos y flujos que debes tener en cuenta para una integración exitosa.',
  },
  {
    href: '/checkout/api-reference/session',
    action: 'Ver más',
    name: 'API',
    description: 'Conoce en detalle los métodos HTTP disponibles, los parámetros y posibles respuestas de cada servicio.',
  },
]

export function DocsList() {
  const localizePath = useLocalizePath();

  return (
    <div className="my-8 xl:max-w-none">
      <div className="not-prose grid grid-cols-1 gap-8 border-gray-900/5 dark:border-white/5 sm:grid-cols-3">
        {guides.map((guide) => ({...guide, href: localizePath(guide.href)})).map((guide) => (
          <ItemList key={guide.name} {...guide}></ItemList>
        ))}
      </div>
    </div>
  )
}
