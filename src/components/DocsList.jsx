
import { ItemListAlt } from '@/components/ItemsList'

const guides = [
  {
    href: '/',
    action: 'Ver más',
    name: 'Inicio',
    description: 'Conoce todas las ventajas que tendría tu comercio al conectar nuestros servicios.',
  },
  {
    href: '/authentication',
    action: 'Ver más',
    name: 'Integración',
    description: 'Conectar y sincronizar de manera efectiva los sistemas o aplicaciones existentes de tu comercio con PlacetoPay',
  },
  {
    href: '/api-session',
    action: 'Ver más',
    name: 'API',
    description: 'Proporciona un conjunto de reglas y protocolos que permiten la comunicación y la interacción entre diferentes sistemas informáticos.',
  },
]

export function DocsList() {
  return (
    <div className="my-8 xl:max-w-none">
      <div className="not-prose grid grid-cols-1 gap-8 border-gray-900/5 dark:border-white/5 sm:grid-cols-3">
        {guides.map((guide) => (
          <ItemListAlt key={guide.name} {...guide}></ItemListAlt>
        ))}
      </div>
    </div>
  )
}
