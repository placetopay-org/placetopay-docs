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
      es: 'Seguimiento y control de transacciones',
      en: 'Optimized for any device',
    },
    description: {
      es: 'Resumen del estado de los pagos en el historial del link creado. Funcionalidad de filtros para búsquedas específicas en el histórico. Registro de pagos relacionados con detalles básicos y posibilidad de consultar más información desde el panel administrativo.',
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
    name: { es: 'Flexibilidad en los métodos de compartición', en: 'PlacetoPay Wallet' },
    description: {
      es: 'Los links de pago se pueden compartir de diversas formas, como URL, correo electrónico, código QR o WhatsApp, adaptándose a las necesidades de cada usuario o comercio.',
      en: 'With Checkout, your customers can take advantage of our digital wallet, allowing them to securely store and manage their payment methods. This streamlines the payment process and provides greater convenience when making future transactions.',
    },
    icon: WalletTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Eficiencia en el flujo de pagos', en: 'Information security' },
    description: {
      es: 'El sistema permite configurar tiempos de expiración personalizados y límites de pagos aprobados, optimizando el control y seguridad de las transacciones.',
      en: 'We take the protection of sensitive data seriously. PlacetoPay Checkout complies with industry security standards, including PCI guidelines, to ensure security in the capture and processing of card information.',
    },
    icon: SecuritySafeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Gestión centralizada', en: 'Advanced payments' },
    description: {
      es: 'Incluye herramientas como el historial de links, la posibilidad de reenvío, y la consulta de pagos relacionados, lo que facilita el monitoreo y la administración desde un solo panel.',
      en: 'Our platform offers a wide range of payment options, including tax payments, mixed payments, subscriptions, recurring charges, and promotions. Have full control over your transactions and offer flexible options to your customers.',
    },
    icon: LampChargeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function Benefitspaymentlink() {
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
