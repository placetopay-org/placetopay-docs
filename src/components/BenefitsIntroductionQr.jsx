import { useLocale } from './LocaleProvider'
import { ResourceCard } from './ResourceCard'
import { ShieldTick, Hierarchy, MoneyTick } from 'iconsax-react'

const resources = [
 
  {
    name: { es: 'Facilidad de Autogestión', en: 'Ease of self-management' },
    description: {
      es: 'Los clientes pueden generar, compartir y administrar sus códigos QR de manera sencilla, sin necesidad de asistencia técnica especializada.',
      en: 'Customers can easily generate, share and manage their QR codes without the need for specialized technical support.',
    },
    icon: () => <MoneyTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Optimización del Proceso de Pago', en: 'Payment Process Optimization' },
    description: {
      es: 'Permite a los usuarios finales acceder rápidamente a la plataforma de pago mediante el escaneo del QR o el enlace compartido, agilizando las transacciones.',
      en: 'Allows end-users to quickly access the payment platform by scanning the QR or shared link, streamlining transactions',
    },
    icon: () => <Hierarchy variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    name: { es: 'Visualización y Gestión de Transacciones', en: 'Visualization and Transaction Management' },
    description: {
      es: 'A través del panel administrativo, es posible revisar los pagos recibidos y acceder a información detallada sobre las transacciones realizadas.',
      en: 'Through the administrative panel, it is possible to review payments received and access detailed information on transactions made.',
    },
    icon: () => <ShieldTick variant="TwoTone"/>,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

export function BenefitsIntroductionQr() {
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
