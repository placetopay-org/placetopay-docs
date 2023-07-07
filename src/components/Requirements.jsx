import { ItemList } from '@/components/ItemsList'
import { UserOctagonTwoToneIcon } from '@/components/iconsax/UserOctagonTwoToneIcon'
import { ProgrammingScrollTwoToneIcon } from '@/components/iconsax/ProgrammingScrollTwoToneIcon'

const guides = [
  {
    href: '/authentication',
    name: 'Cuenta de Placetopay',
    icon: UserOctagonTwoToneIcon,
    description: 'Debes tener una cuenta activa en PlacetoPay para acceder a tu sitio y tus credenciales API.',
  },
  {
    href: '/pagination',
    name: 'Conocimientos básicos en programación',
    icon: ProgrammingScrollTwoToneIcon,
    description: 'Es recomendable tener conocimientos  sobre desarrollo web y programación ya que la documentación se enfoca en la integración de la pasarela de pagos en tu sitio web o aplicación.',
  },
]

export function Requirements() {
  return (
    <div className="my-8 xl:max-w-none">
      <div className="not-prose grid grid-cols-1 gap-8 border-gray-900/5 dark:border-white/5 sm:grid-cols-2">
        {guides.map((guide) => (
          <ItemList key={guide.name} {...guide}></ItemList>
        ))}
      </div>
    </div>
  )
}
