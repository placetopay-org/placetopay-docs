import { ItemList } from '@/components/ItemsList'
import { UserOctagonTwoToneIcon } from '@/components/iconsax/UserOctagonTwoToneIcon'
import { ProgrammingScrollTwoToneIcon } from '@/components/iconsax/ProgrammingScrollTwoToneIcon'
import { useLocale } from './LocaleProvider'

const guides = [
  {
    name: { es: 'Cuenta de Placetopay', en: 'Placetopay account' },
    icon: UserOctagonTwoToneIcon,
    description: {
      es: 'Debes tener una cuenta activa en PlacetoPay para acceder a tu sitio y tus credenciales API.',
      en: 'You must have an active account in PlacetoPay to access your site and your API credentials.',
    },
  },
  {
    name: {
      es: 'Conocimientos básicos en programación',
      en: 'Basic programming knowledge',
    },
    icon: ProgrammingScrollTwoToneIcon,
    description: {
      es: 'Es recomendable tener conocimientos  sobre desarrollo web y programación ya que la documentación se enfoca en la integración de la pasarela de pagos en tu sitio web o aplicación.',
      en: 'It is recommended to have knowledge about web development and programming since the documentation focuses on the integration of the payment gateway on your website or application.',
    },
  },
]

export function Requirements() {
  const { locale } = useLocale()
  return (
    <div className="my-8 xl:max-w-none">
      <div className="not-prose grid grid-cols-1 gap-8 border-gray-900/5 dark:border-white/5 sm:grid-cols-2">
        {guides
          .map((guide) => ({
            ...guide,
            name: guide.name[locale],
            description: guide.description[locale],
          }))
          .map((guide) => (
            <ItemList key={guide.name} {...guide} />
          ))}
      </div>
    </div>
  )
}
