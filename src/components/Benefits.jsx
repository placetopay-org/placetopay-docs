import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { BGPatternSmall } from '@/components/BGPatternSmall'
import { BrushTwoToneIcon } from '@/components/iconsax/BrushTwoToneIcon'
import { MonitorMobileTwoToneIcon } from '@/components/iconsax/MonitorMobileTwoToneIcon'
import { MoneyReceiveTwoToneIcon } from '@/components/iconsax/MoneyReceiveTwoToneIcon'
import { WalletTwoToneIcon } from '@/components/iconsax/WalletTwoToneIcon'
import { SecuritySafeTwoToneIcon } from '@/components/iconsax/SecuritySafeTwoToneIcon'
import { LampChargeTwoToneIcon } from '@/components/iconsax/LampChargeTwoToneIcon'
import { useLocale } from './LocaleProvider'
import { useMouseMove } from '@/hooks/useMouseMove'

const resources = [
  {
    href: '/contacts',
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
    href: '/conversations',
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
    href: '/messages',
    name: {
      es: 'Optimizado para cualquier dispositivo',
      en: 'Optimized for any device',
    },
    description: {
      es: 'Nuestro checkout está diseñado para adaptarse y funcionar sin problemas en dispositivos móviles y de escritorio. Brinda una experiencia de pago optimizada, independientemente del dispositivo que utilice tu cliente.',
      en: 'Our checkout is designed to adapt and work seamlessly on mobile and desktop devices. Provide an optimized payment experience, regardless of the device your customer uses.',
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
    href: '/groups',
    name: { es: 'Wallet PlacetoPay', en: 'PlacetoPay Wallet' },
    description: {
      es: 'Con Checkout, tus clientes pueden aprovechar nuestra billetera digital, permitiéndoles guardar y gestionar sus medios de pago de forma segura. Esto agiliza el proceso de pago y brinda una mayor comodidad al realizar transacciones futuras.',
      en: 'With Checkout, your customers can take advantage of our digital wallet, allowing them to securely store and manage their payment methods. This streamlines the payment process and provides greater convenience when making future transactions.',
    },
    icon: WalletTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/groups',
    name: { es: 'Seguridad de la información', en: 'Information security' },
    description: {
      es: 'Nos tomamos en serio la protección de los datos sensibles. PlacetoPay Checkout cumple con los estándares de seguridad de la industria, incluidos los lineamientos PCI, para garantizar la seguridad en la captura y procesamiento de la información de tarjetas.',
      en: 'We take the protection of sensitive data seriously. PlacetoPay Checkout complies with industry security standards, including PCI guidelines, to ensure security in the capture and processing of card information.',
    },
    icon: SecuritySafeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/groups',
    name: { es: 'Pagos avanzados', en: 'Advanced payments' },
    description: {
      es: 'Nuestra plataforma ofrece una amplia gama de opciones de pago, incluyendo pagos con impuestos, pagos mixtos, suscripciones, cobros recurrentes y promociones. Ten el control total sobre tus transacciones y ofrece opciones flexibles a tus clientes.',
      en: 'Our platform offers a wide range of payment options, including tax payments, mixed payments, subscriptions, recurring charges, and promotions. Have full control over your transactions and offer flexible options to your customers.',
    },
    icon: LampChargeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
]

function ResourceIcon({ icon: Icon }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/5 ring-1 ring-gray-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-gray-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-primary-300/10 dark:group-hover:ring-primary-400">
      <Icon className="h-6 w-6 fill-none stroke-gray-700 transition-colors duration-300 group-hover:stroke-gray-900 dark:stroke-gray-400 dark:group-hover:stroke-primary-400" />
    </div>
  )
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <BGPatternSmall className="group absolute inset-x-0 w-full fill-black/[0.04] stroke-black/[0.05] dark:fill-white/[0.04] dark:stroke-white/[0.05]" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-100 to-teal-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-sky-950 dark:to-teal-950"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <BGPatternSmall className="absolute inset-x-0 w-full fill-black/50 stroke-black/70 dark:fill-white/[0.04] dark:stroke-white/10" />
      </motion.div>
    </div>
  )
}

function Resource({ resource }) {
  const { mouseX, mouseY, onMouseMove } = useMouseMove()

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-gray-50 transition-shadow hover:shadow-md hover:shadow-gray-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/7.5 group-hover:ring-gray-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-16">
        <ResourceIcon icon={resource.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-gray-900 dark:text-white">
          <div className="">
            <span className="rounded-2xl" />
            {resource.name}
          </div>
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {resource.description}
        </p>
      </div>
    </div>
  )
}

export function Benefits() {
  const { locale } = useLocale()
  return (
    <div className="xl:max-w-none">
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <Resource
            key={resource.href}
            resource={{
              ...resource,
              name: resource.name[locale],
              description: resource.description[locale],
            }}
          />
        ))}
      </div>
    </div>
  )
}
