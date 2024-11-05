import { BrushTwoToneIcon } from '@/components/iconsax/BrushTwoToneIcon'
import { MonitorMobileTwoToneIcon } from '@/components/iconsax/MonitorMobileTwoToneIcon'
import { MoneyReceiveTwoToneIcon } from '@/components/iconsax/MoneyReceiveTwoToneIcon'
import { WalletTwoToneIcon } from '@/components/iconsax/WalletTwoToneIcon'
import { SecuritySafeTwoToneIcon } from '@/components/iconsax/SecuritySafeTwoToneIcon'
import { LampChargeTwoToneIcon } from '@/components/iconsax/LampChargeTwoToneIcon'
import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'

const resources = [
  {
    name: {
      es: 'Diseño personalizado',
      en: 'Custom design',
    },
    description: {
      es: 'Personaliza la apariencia de Checkout con logotipos y colores de tu empresa. Crea una experiencia de pago única y coherente con tu marca.',
      en: 'Personalize the appearance of Checkout with your company logos and colors. Create a unique and consistent payment experience with your brand.',
    },
    icon: BrushTwoToneIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    name: {
      es: 'Múltiples idiomas y monedas',
      en: 'Multiple languages and currencies',
    },
    description: {
      es: 'Acepta pagos en diferentes idiomas y monedas para atraer a clientes de todo el mundo. Amplía tu alcance y aumenta tus oportunidades de venta.',
      en: 'Accept payments in different languages and currencies to attract customers from all over the world. Expand your reach and increase your sales opportunities.',
    },
    icon: MoneyReceiveTwoToneIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    name: {
      es: 'Optimizado para cualquier dispositivo',
      en: 'Optimized for any device',
    },
    description: {
      es: 'Nuestro checkout está diseñado para adaptarse y funcionar sin problemas en dispositivos móviles y de escritorio. Brinda una experiencia de pago optimizada, independientemente del dispositivo que utilice tu cliente.',
      en: 'Our checkout is designed to adapt and work seamlessly on mobile and desktop devices. Provide an optimized payment experience, regardless of the device your customer uses.',
    },
    icon: MonitorMobileTwoToneIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: { es: 'Wallet PlacetoPay', en: 'PlacetoPay Wallet' },
    description: {
      es: 'Con Checkout, tus clientes pueden aprovechar nuestra billetera digital, permitiéndoles guardar y gestionar sus medios de pago de forma segura. Esto agiliza el proceso de pago y brinda una mayor comodidad al realizar transacciones futuras.',
      en: 'With Checkout, your customers can take advantage of our digital wallet, allowing them to securely store and manage their payment methods. This streamlines the payment process and provides greater convenience when making future transactions.',
    },
    icon: WalletTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Seguridad de la información', en: 'Information security' },
    description: {
      es: 'Nos tomamos en serio la protección de los datos sensibles. PlacetoPay Checkout cumple con los estándares de seguridad de la industria, incluidos los lineamientos PCI, para garantizar la seguridad en la captura y procesamiento de la información de tarjetas.',
      en: 'We take the protection of sensitive data seriously. PlacetoPay Checkout complies with industry security standards, including PCI guidelines, to ensure security in the capture and processing of card information.',
    },
    icon: SecuritySafeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Pagos avanzados', en: 'Advanced payments' },
    description: {
      es: 'Nuestra plataforma ofrece una amplia gama de opciones de pago, incluyendo pagos con impuestos, pagos mixtos, suscripciones, cobros recurrentes y promociones. Ten el control total sobre tus transacciones y ofrece opciones flexibles a tus clientes.',
      en: 'Our platform offers a wide range of payment options, including tax payments, mixed payments, subscriptions, recurring charges, and promotions. Have full control over your transactions and offer flexible options to your customers.',
    },
    icon: LampChargeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function Benefits() {
  const { locale } = useLocale()
  return (
    <div className="xl:max-w-none">
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            pattern={resource.pattern}
            icon={resource.icon}
            name={resource.name[locale]}
            description={resource.description[locale]}
          />
        ))}
      </div>
    </div>
  )
}
