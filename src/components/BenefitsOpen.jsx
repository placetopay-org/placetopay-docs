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
    name: { es: 'Facilidad de uso para clientes finales', en: 'Ease of use for end customers' },
    description: {
      es: 'La interfaz estándar y la redirección automática simplifican el proceso de pago, haciendo que los usuarios puedan completar las transacciones sin complicaciones.',
      en: 'The standard interface and automatic redirection simplify the payment process, allowing users to complete transactions effortlessly.',
    },
    icon: TransactionTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Flexibilidad en la personalización', en: 'Flexibility in customization' },
    description: {
      es: 'Los campos configurables permiten adaptarse a diferentes tipos de servicios o productos, asegurando que cada transacción incluya la información necesaria.',
      en: 'Configurable fields allow adaptation to different types of services or products, ensuring that each transaction includes the necessary information.',
    },
    icon: FlexibilityTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Gestión centralizada', en: 'Centralized management' },
    description: {
      es: 'La consola administrativa ofrece un punto único de control para configurar, actualizar y monitorear el micrositio, lo que mejora la eficiencia operativa.',
      en: 'The administrative console provides a single point of control to configure, update, and monitor the microsite, enhancing operational efficiency.',
    },
    icon: ErrorTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function BenefitsOpen() {
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
