import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { BGPatternSmall } from '@/components/BGPatternSmall'
import { Heading } from '@/components/Heading'
import { BrushTwoToneIcon } from '@/components/iconsax/BrushTwoToneIcon'
import { MonitorMobileTwoToneIcon } from '@/components/iconsax/MonitorMobileTwoToneIcon'
import { MoneyReceiveTwoToneIcon } from '@/components/iconsax/MoneyReceiveTwoToneIcon'
import { WalletTwoToneIcon } from '@/components/iconsax/WalletTwoToneIcon'
import { SecuritySafeTwoToneIcon } from '@/components/iconsax/SecuritySafeTwoToneIcon'
import { LampChargeTwoToneIcon } from '@/components/iconsax/LampChargeTwoToneIcon'

const resources = [
  {
    href: '/contacts',
    name: 'Diseño personalizado',
    description:
      'Personaliza la apariencia de Checkout con logotipos y colores de tu empresa. Crea una experiencia de pago única y coherente con tu marca.',
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
    name: 'Múltiples idiomas y monedas',
    description:
      'Acepta pagos en diferentes idiomas y monedas para atraer a clientes de todo el mundo. Amplía tu alcance y aumenta tus oportunidades de venta.',
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
    name: 'Optimizado para cualquier dispositivo',
    description:
      'Nuestro checkout está diseñado para adaptarse y funcionar sin problemas en dispositivos móviles y de escritorio. Brinda una experiencia de pago optimizada, independientemente del dispositivo que utilice tu cliente.',
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
    name: 'Wallet PlacetoPay',
    description:
      'Con Checkout, tus clientes pueden aprovechar nuestra billetera digital, permitiéndoles guardar y gestionar sus medios de pago de forma segura. Esto agiliza el proceso de pago y brinda una mayor comodidad al realizar transacciones futuras.',
    icon: WalletTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/groups',
    name: 'Seguridad de la información',
    description:
      'Nos tomamos en serio la protección de los datos sensibles. PlacetoPay Checkout cumple con los estándares de seguridad de la industria, incluidos los lineamientos PCI, para garantizar la seguridad en la captura y procesamiento de la información de tarjetas.',
    icon: SecuritySafeTwoToneIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/groups',
    name: 'Pagos avanzados',
    description:
      'Nuestra plataforma ofrece una amplia gama de opciones de pago, incluyendo pagos con impuestos, pagos mixtos, suscripciones, cobros recurrentes y promociones. Ten el control total sobre tus transacciones y ofrece opciones flexibles a tus clientes.',
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
        <BGPatternSmall className="group absolute inset-x-0 w-full fill-black/[0.04] stroke-black/[0.05] dark:fill-white/[0.04] dark:stroke-white/[0.05]"/>
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-100 to-teal-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-sky-950 dark:to-teal-950"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <BGPatternSmall className="absolute inset-x-0 w-full fill-black/50 stroke-black/70 dark:fill-white/[0.04] dark:stroke-white/10"/>
      </motion.div>
    </div>
  )
}

function Resource({ resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

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
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="benefits">
        Beneficios de Checkout
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8  dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>
    </div>
  )
}
