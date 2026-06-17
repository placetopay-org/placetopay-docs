import Link from 'next/link'
import { useLocale } from '@/components/LocaleProvider'
import { TAB_NAVIGATION } from '@/constants/navigations'

function getPaymentMethodsSection(locale) {
  const nav = TAB_NAVIGATION.payments[locale]?.[0]?.links ?? []
  const section = nav.find((s) => s.title === 'Payment methods' || s.title === 'Medios de pago')
  if (!section) return []
  // Filter out the Introduction entry itself — only return category groups
  return (section.links ?? []).filter((item) => item.links)
}

export function PaymentMethodsList() {
  const { locale } = useLocale()
  const categories = getPaymentMethodsSection(locale)

  return (
    <div>
      {categories.map((category) => (
        <div key={category.title}>
          <h2>{category.title}</h2>
          <ul>
            {category.links.map((method) => (
              <li key={method.href}>
                <Link href={method.href}>{method.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
