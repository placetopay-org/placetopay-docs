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
      es: 'Acceso y configuración del micrositio:',
      en: 'Custom design',
    },
    description: {
      es: 'Permite ingresar a la consola administrativa con credenciales para gestionar el micrositio, acceder a su detalle, y compartir la URL personalizada con los clientes.',
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
      es: 'Campos configurables para transacciones',
      en: 'Multiple languages and currencies',
    },
    description: {
      es: 'Incluye campos estándar como referencia única de la transacción, descripción del pago, monto, y datos del comprador (nombre, apellido, documento y correo electrónico), facilitando el proceso de pago.',
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
      es: 'Redirección automática al portal de pago',
      en: 'Tracking and control of transactions',
    },
    description: {
      es: 'Tras completar los datos en el micrositio, los usuarios son redirigidos automáticamente al portal de pago para ingresar los detalles del medio de pago y finalizar la transacción.',
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
