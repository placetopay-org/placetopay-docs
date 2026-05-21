import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'
import { ChartSquare, CpuSetting, Setting5, SecuritySafe, DirectboxReceive, NotificationStatus } from 'iconsax-react'

const resources = [
  {
    name: {
      es: 'Conversión y retención',
      en: 'Conversion and retention',
    },
    description: {
      es: 'Reduce fricción en pagos repetitivos (servicios, seguros, suscripciones, etc).',
      en: 'Reduce friction in repetitive payments (services, insurance, subscriptions, etc).',
    },
    icon: () => <ChartSquare variant="TwoTone"/>,
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
      es: 'Automatización operativa',
      en: 'Operational automation',
    },
    description: {
      es: 'Elimina procesos manuales y recordatorios; los cobros se ejecutan en las fechas definidas.',
      en: 'Eliminate manual processes and reminders; charges are executed on defined dates.',
    },
    icon: () => <CpuSetting variant="TwoTone"/>,
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
      es: 'Control y transparencia',
      en: 'Control and transparency',
    },
    description: {
      es: 'El comercio puede revisar, ajustar o cancelar sus autopagos.',
      en: 'The merchant can review, adjust, or cancel their autopayments.',
    },
    icon: () => <Setting5 variant="TwoTone"/>,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: { es: 'Seguridad y cumplimiento', en: 'Security and compliance' },
    description: {
      es: 'Uso de medios tokenizados y lineamientos PCI, con opciones de autenticación (p. ej., 3DS 3RI si aplica).',
      en: 'Use of tokenized methods and PCI guidelines, with authentication options (e.g., 3DS 3RI if applicable).',
    },
    icon: () => <SecuritySafe variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Integrabilidad', en: 'Integrability' },
    description: {
      es: 'Además de la integración directa de checkout, el ecosistema expone endpoints para creación, actualización, desactivación y consulta de autopagos.',
      en: 'In addition to direct checkout integration, the ecosystem exposes endpoints for creating, updating, deactivating, and querying autopayments.',
    },
    icon: () => <DirectboxReceive variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Webhooks', en: 'Webhooks' },
    description: {
      es: 'Se soportan webhooks para la notificación de eventos relevantes.',
      en: 'Webhooks are supported for notification of relevant events.',
    },
    icon: () => <NotificationStatus variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function AutopayBenefits() {
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