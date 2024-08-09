import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DocumentCode, MonitorMobbile, Activity, SecurityCard, Link, Calendar } from 'iconsax-react'
import { LANGUAGES_CODES, useLocale } from './LocaleProvider'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const LINKS = {
  [LANGUAGES_CODES.ES]: [
    {
      title: 'Web Checkout',
      description: 'Página de pagos prediseñada.',
      href: '/checkout',
      icon: MonitorMobbile,
    },
    {
      title: 'Gateway',
      description: 'Recibe pagos por API',
      href: '/gateway',
      icon: DocumentCode,
    },
    {
      title: '3DS Server',
      description: 'Pagos más seguros',
      href: '/three-d-s-server',
      icon: Activity,
    },
    {
      title: 'ACS',
      description: 'Pagos más seguros',
      href: '/acs',
      icon: Activity,
    },
    {
      title: 'Token Requestor',
      description: 'Servicio de tokenización publica',
      href: '/token-requestor',
      icon: SecurityCard,
    },
    {
      title: 'Link de Pago',
      description: 'Crea y gestiona links de pago',
      href: '/payment-links',
      icon: Link,
    },
    {
      title: 'Micrositios',
      description: 'Creación y gestión de micrositios',
      href: '/microsites',
      icon: Calendar,
    },
  ],
  [LANGUAGES_CODES.EN]: [
    {
      title: 'Web Checkout',
      description: 'Pre-designed payment page.',
      href: '/en/checkout',
      icon: MonitorMobbile,
    },
    {
      title: 'Gateway',
      description: 'Receive payments via API.',
      href: '/en/gateway',
      icon: DocumentCode,
    },
    {
      title: '3DS Server',
      description: 'Safer payments.',
      href: '/en/three-d-s-server',
      icon: Activity,
    },
    {
      title: 'ACS',
      description: 'Safer payments.',
      href: '/en/acs',
      icon: Activity,
    },
    {
      title: 'Token Requestor',
      description: 'Public tokenization service',
      href: '/en/token-requestor',
      icon: SecurityCard,
    },
    {
      title: 'Payment Link',
      description: 'Create and manage payment links',
      href: '/en/payment-links',
      icon: Link,
    },
    {
      title: 'Microsites',
      description: 'Create and manage microsites',
      href: '/en/microsites',
      icon: Calendar,
    },
  ],
}

const OptionSelector = ({ item, active, selected, iconClass = '' }) => (
  <>
    <span className="pointer-events-none flex items-center rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
      <item.icon
        size="32"
        className={twMerge(
          iconClass,
          'dark:text-white',
          selected && 'text-gray-400 dark:text-gray-400'
        )}
      />
    </span>
    <div className="flex h-full flex-1 flex-col justify-center py-1">
      <span
        className={twMerge(
          'block truncate text-base font-medium dark:text-white leading-5',
          selected && 'text-gray-400 dark:text-gray-400'
        )}
      >
        {item.title}
      </span>
      <p className="line-clamp-1 text-xs leading-4 text-gray-400">
        {item.description}
      </p>
    </div>
  </>
)

export const NamespaceSelector = () => {
  const router = useRouter()
  const { locale } = useLocale()

  const [selected, setSelected] = useState()

  const onChange = (selected) => {
    router.push(selected.href)
  }

  useEffect(() => {
    const links = LINKS[locale]
    const path = router.asPath
    const selected = links.find((link) => path.startsWith(link.href))
    setSelected(selected)
  }, [router.asPath, locale])

  if (!selected) {
    return null
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className="relative mt-2 lg:mb-8 lg:mt-8">
          <Listbox.Button className="flex max-h-16 w-full cursor-pointer items-center gap-3 rounded-lg bg-transparent p-2 pl-0 text-left transition-colors hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 dark:text-white hover:dark:bg-gray-800">
            <OptionSelector item={selected} iconClass="text-gray-400" />
            <span className="pointer-events-none flex items-center">
              <ChevronDownIcon
                className={clsx(
                  open ? 'rotate-180' : 'rotate-0',
                  'h-5 w-5 transform transition-transform'
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
              {LINKS[locale].map((linkItem) => (
                <Listbox.Option
                  key={linkItem.href}
                  className="relative flex w-full cursor-pointer select-none gap-3 p-2 hover:bg-primary-300/10"
                  value={linkItem}
                >
                  {({ selected, active }) => (
                    <OptionSelector
                      item={linkItem}
                      active={active}
                      iconClass="text-gray-900"
                      selected={selected}
                    />
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
