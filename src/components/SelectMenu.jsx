import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DocumentCode, MonitorMobbile } from 'iconsax-react';
import { LANGUAGES_CODES, useLocale } from './LocaleProvider';
import clsx from 'clsx';

const LINKS = {
  [LANGUAGES_CODES.ES]: [
    { title: 'Checkout', href: '/checkout', icon: MonitorMobbile },
    { title: 'Gateway', href: '/gateway', icon: DocumentCode },
  ],
  [LANGUAGES_CODES.EN]: [
    { title: 'Checkout', href: '/en/checkout', icon: MonitorMobbile },
    { title: 'Gateway', href: '/en/gateway', icon: DocumentCode },
  ],
};

export const NamespaceSelector = () => {
  const router = useRouter();
  const { locale } = useLocale();

  const [selected, setSelected] = useState()

  const onChange = (selected) => {
    router.push(selected.href);
  };

  useEffect(() => {
    const links = LINKS[locale];
    const path = router.asPath;
    const selected = links.find((link) => path.startsWith(link.href));
    setSelected(selected);
  }, [router.asPath, locale])

  if (!selected) {
    return null;
  }

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className="relative mt-2 lg:mt-8 lg:mb-8">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 dark:bg-gray-900 py-2 pl-12 text-left dark:text-white shadow-sm ring-1 ring-inset ring-black/20 dark:ring-white/20 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center pr-2">
              <MonitorMobbile
                size="24"
                className="dark:text-white"
              />
            </span>
            <span className="block truncate text-base font-medium">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <ChevronDownIcon
                className={clsx(open ? 'transform rotate-180' : 'transform rotate-0', 'h-5 w-5')}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {LINKS[locale].map((linkItem) => (
                <Listbox.Option
                  key={linkItem.href}
                  className="relative cursor-pointer select-none py-2 pl-12 pr-9 hover:bg-primary-300/20 text-"
                  value={linkItem}
                >
                  {({ selected }) => (
                    <>
                      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center pr-2">
                        <linkItem.icon
                          size="24"
                          className={clsx(selected ? 'text-gray-900 dark:text-white' : 'text-gray-400')}
                        />
                      </span>
                      <span className={clsx(selected ? 'dark:text-white' : 'text-gray-400', 'font-medium block truncate')}>
                        {linkItem.title}
                      </span>
                    </>
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
