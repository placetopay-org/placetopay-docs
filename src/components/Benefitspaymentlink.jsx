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
      en: 'Tracking and control of transactions',
    },
    description: {
      es: 'Resumen del estado de los pagos en el historial del link creado. Funcionalidad de filtros para búsquedas específicas en el histórico. Registro de pagos relacionados con detalles básicos y posibilidad de consultar más información desde el panel administrativo.',
      en: 'Summary of payment status in the history of the link created. Filter functionality for specific searches in the history. Record of related payments with basic details and possibility to consult more information from the administrative panel.',
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
    name: { es: 'Flexibilidad al momento de compartir a los usuarios', en: 'Flexibility when sharing to users' },
    description: {
      es: 'Los links de pago se pueden compartir de diversas formas, como URL, correo electrónico, código QR o WhatsApp, adaptándose a las necesidades de cada usuario o comercio.',
      en: 'Payment links can be shared in a variety of ways, such as URL, email, QR code or WhatsApp, adapting to the needs of each user or merchant.',
    },
    icon: WalletTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Eficiencia en el flujo de pagos', en: 'Efficiency in the payment flow' },
    description: {
      es: 'El sistema permite configurar tiempos de expiración personalizados y límites de pagos aprobados, optimizando el control y seguridad de las transacciones.',
      en: 'The system allows the configuration of customized expiration times and approved payment limits, optimizing the control and security of transactions.',
    },
    icon: SecuritySafeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Gestión centralizada', en: 'Centralized management' },
    description: {
      es: 'Incluye herramientas como el historial de links, la posibilidad de reenvío, y la consulta de pagos relacionados, lo que facilita el monitoreo y la administración desde un solo panel.',
      en: 'It includes tools such as link history, forwarding capabilities, and related payment queries, making it easy to monitor and manage from a single dashboard.',
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
