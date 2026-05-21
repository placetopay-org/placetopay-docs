import { ItemList } from '@/components/ItemsList'
import { useLocale } from './LocaleProvider'
import { Scroll, UserOctagon } from 'iconsax-react'

const guides = [
  {
    name: { es: 'Cuenta de Placetopay', en: 'Placetopay account' },
    icon: () => <UserOctagon variant="TwoTone"/>,
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
    icon: () => <Scroll variant="TwoTone"/>,
    description: {
      es: 'Se recomienda tener conocimientos de desarrollo web y programación, ya que esta documentación se enfoca en la integración de la API de AutoPay con tu aplicación.',
      en: 'Web development and programming knowledge is recommended, as this documentation focuses on integrating the AutoPay API into your application.',
    },
  },
]

export function AutoPayRequirements() {
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
