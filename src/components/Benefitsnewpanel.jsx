
import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'
import { DocumentText, Activity, ReceiptSearch, BackSquare, UserSearch, SecuritySafe} from 'iconsax-react'

const resources = [
  {
    name: {
      es: 'Visualización y seguimiento de transacciones en tiempo real',
      en: 'Real-time transaction monitoring and tracking',
    },
    description: {
      es: 'Consulta el estado de cada transacción con filtros por fecha, monto, medio de pago, referencia, entre otros.',
      en: 'View the status of each transaction with filters by date, amount, payment method, reference, and more.',
    },
    icon: () => <Activity variant="TwoTone"/>,
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
      es: 'Historial y trazabilidad de acciones',
      en: 'Action log and traceability',
    },
    description: {
      es: 'Registra los eventos realizados en el sistema para fines de auditoría y control.',
      en: 'Track key events for audit and control purposes.',
    },
    icon: () => <ReceiptSearch variant="TwoTone"/>,
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
      es: 'Gestión de reversiones y reembolsos',
      en: 'Refund and reversal management',
    },
    description: {
      es: 'Brinda la posibilidad de ejecutar reembolsos totales o parciales directamente desde el panel de manera segura y trazable.',
      en: 'Perform full or partial refunds directly from the panel in a secure way.',
    },
    icon: () => <BackSquare variant="TwoTone"/>,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: { es: 'Agilidad en la atención al cliente', en: 'Faster customer service' },
    description: {
      es: 'Brinda información precisa para resolver solicitudes rápidamente.',
      en: 'Provides precise information to resolve user inquiries efficiently.',
    },
    icon: () => <UserSearch variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Mejora de la seguridad y cumplimiento', en: 'Enhanced security and compliance' },
    description: {
      es: 'Permite acceso seguro y controlado a operaciones sensibles.',
      en: 'Ensures controlled and secure access to sensitive operations.',
    },
    icon: () => <SecuritySafe variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Mayor control y visibilidad operativa', en: 'Greater operational control and visibility' },
    description: {
      es: 'Centraliza la gestión de pagos en una única herramienta.',
      en: 'Centralizes all payment management in a single platform.',
    },
    icon: () => <DocumentText variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function Benefitsnewpanel() {
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
