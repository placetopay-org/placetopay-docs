import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DocumentCode, MonitorMobbile } from 'iconsax-react'
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
  ],
}

const OptionSelector = ({ item, active, selected, iconClass = "" }) => (
  <>
    <span className="pointer-events-none flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-2" >
      <MonitorMobbile size="32" className={twMerge(iconClass, "dark:text-white", selected && "text-gray-400 dark:text-gray-400")} />
    </span>
    <div className="flex-1 pt-2 py-1 flex h-full justify-center flex-col">
      <span className={twMerge("block truncate text-base font-medium leading-3 dark:text-white", selected && "text-gray-400 dark:text-gray-400")}>
        {item.title}
      </span>
      <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
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
          <Listbox.Button className="flex max-h-16 w-full cursor-pointer items-center gap-3 rounded-lg bg-transparent p-2 text-left transition-colors hover:bg-gray-100 hover:dark:bg-gray-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 dark:text-white">
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
                  className="flex w-full gap-3 relative cursor-pointer select-none p-2 hover:bg-primary-300/10"
                  value={linkItem}
                >
                  {({ selected, active }) => <OptionSelector item={linkItem} active={active} iconClass="text-gray-900" selected={selected} />}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
