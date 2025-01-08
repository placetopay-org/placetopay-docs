import { DocumentTextTwoToneIcon } from '@/components/iconsax/DocumentTextTwoToneIcon'
import { PeronalizationTwoToneIcon } from '@/components/iconsax/PeronalizationTwoToneIcon'
import { ImportTwoToneIcon } from '@/components/iconsax/ImportTwoToneIcon'
import { TransactionTwoToneIcon } from '@/components/iconsax/TransactionTwoToneIcon'
import { FlexibilityTwoToneIcon } from '@/components/iconsax/FlexibilityTwoToneIcon'
import { ErrorTwoToneIcon } from '@/components/iconsax/ErrorTwoToneIcon'
import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'

const resources = [
  {
    name: {
      es: 'Gestión de órdenes de pago individuales',
      en: 'Custom design',
    },
    description: {
      es: 'Permite crear, consultar, y eliminar órdenes de pago desde una consola administrativa, especificando detalles como referencias únicas, nombres de clientes, y valores a pagar.',
      en: 'Personalize the appearance of Checkout with your company logos and colors. Create a unique and consistent payment experience with your brand.',
    },
    icon: DocumentTextTwoToneIcon,
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
      es: 'Cargue masivo de órdenes de pago',
      en: 'Multiple languages and currencies',
    },
    description: {
      es: 'Ofrece la posibilidad de cargar hasta 5,000 órdenes de pago simultáneamente mediante archivos CSV, facilitando la gestión de grandes volúmenes de transacciones.',
      en: 'Accept payments in different languages and currencies to attract customers from all over the world. Expand your reach and increase your sales opportunities.',
    },
    icon: ImportTwoToneIcon,
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
      es: 'Personalización de parámetros de pago',
      en: 'Tracking and control of transactions',
    },
    description: {
      es: 'Proporciona opciones para configurar recargos (valor fijo, diario o diario apartir de la fecha de generación, fechas de vencimiento, y descripciones detalladas de servicios o productos asociados a las órdenes.',
      en: 'Summary of payment status in the history of the link created. Filter functionality for specific searches in the history. Record of related payments with basic details and possibility to consult more information from the administrative panel.',
    },
    icon: PeronalizationTwoToneIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: { es: 'Eficiencia en la gestión de transacciones', en: 'Flexibility when sharing to users' },
    description: {
      es: 'La herramienta agiliza el proceso de integración y administración de órdenes de pago, reduciendo tiempos operativos.',
      en: 'Payment links can be shared in a variety of ways, such as URL, email, QR code or WhatsApp, adapting to the needs of each user or merchant.',
    },
    icon: TransactionTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Flexibilidad y control', en: 'Efficiency in the payment flow' },
    description: {
      es: 'La capacidad de configurar múltiples parámetros y opciones de pago permite a los comercios adaptarse a diversas necesidades y optimizar su flujo de caja.',
      en: 'The system allows the configuration of customized expiration times and approved payment limits, optimizing the control and security of transactions.',
    },
    icon: FlexibilityTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Reducción de errores', en: 'Centralized management' },
    description: {
      es: 'El uso de cargues masivos y formatos estandarizados minimiza la probabilidad de inconsistencias en los datos ingresados manualmente.',
      en: 'It includes tools such as link history, forwarding capabilities, and related payment queries, making it easy to monitor and manage from a single dashboard.',
    },
    icon: ErrorTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function Benefitsclosed() {
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
