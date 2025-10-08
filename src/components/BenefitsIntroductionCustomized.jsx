import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'
import { ShieldTick, Hierarchy, MoneyTick } from 'iconsax-react'

const resources = [
 
  {
    name: { es: 'Consulta de Facturas', en: 'Invoice Inquiry' },
    description: {
      es: 'Permite buscar facturas por referencia, documento o referencia alterna, facilitando la gestión de pagos y su seguimiento.',
      en: 'Allows you to search invoices by reference, document or alternate reference, facilitating payment management and tracking.',
    },
    icon: () => <MoneyTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Bloqueo y Liberación de Facturas', en: 'Invoice Blocking and Release' },
    description: {
      es: 'Brinda la opción de bloquear facturas temporalmente para evitar pagos duplicados y liberarlas cuando sea necesario.',
      en: 'Provides the option to temporarily block invoices to avoid duplicate payments and release them when necessary.',
    },
    icon: () => <Hierarchy variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Asentamiento de Facturas', en: 'Invoice Entry' },
    description: {
      es: 'Registra los pagos realizados en la plataforma, asegurando la correcta actualización del estado de cada factura.',
      en: 'Records the payments made in the platform, ensuring the correct update of the status of each invoice.',
    },
    icon: () => <ShieldTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Optimización del Proceso de Pago', en: 'Payment Process Optimization' },
    description: {
      es: 'Facilita la consulta y validación de facturas, reduciendo tiempos de espera y mejorando la experiencia del usuario.',
      en: 'Facilitates invoice consultation and validation, reducing waiting times and improving the user experience.',
    },
    icon: () => <MoneyTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Mayor Seguridad y Control', en: 'Increased Security and Control' },
    description: {
      es: 'Gracias al bloqueo y liberación de facturas, se evitan pagos erróneos y se garantiza una correcta administración financiera.',
      en: 'Thanks to the blocking and release of invoices, erroneous payments are avoided and proper financial management is ensured.',
    },
    icon: () => <ShieldTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Automatización y Reducción de Errores', en: 'Centralized management' },
    description: {
      es: 'El uso de cargues masivos y formatos estandarizados minimiza la probabilidad de inconsistencias en los datos ingresados manualmente.',
      en: 'It includes tools such as link history, forwarding capabilities, and related payment queries, making it easy to monitor and manage from a single dashboard.',
    },
    icon: () => <ShieldTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function BenefitsIntroductionCustomized() {
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
