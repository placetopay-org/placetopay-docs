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

export function BenefitsIntroductionClosed() {
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
