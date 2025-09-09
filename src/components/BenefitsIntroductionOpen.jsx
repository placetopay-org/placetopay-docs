import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'
import { ShieldTick, MoneyTick, Hierarchy } from 'iconsax-react'

const resources = [

  {
    name: { es: 'Facilidad de uso para clientes finales', en: 'Ease of use for end customers' },
    description: {
      es: 'La interfaz estándar y la redirección automática simplifican el proceso de pago, haciendo que los usuarios puedan completar las transacciones sin complicaciones.',
      en: 'The standard interface and automatic redirection simplify the payment process, allowing users to complete transactions effortlessly.',
    },
    icon: () => <MoneyTick variant="TwoTone"/>,
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
    icon: () => <Hierarchy variant="TwoTone"/>,
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
    icon: () => <ShieldTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function BenefitsIntroductionOpen() {
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
