import { useRef, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'

import { Properties, Property } from './mdx'

const ChildProperties = ({ properties = [], requireds = [] }) => {
  if (properties.length === 0) return null

  return <ApiProperties properties={properties} requireds={requireds} isChild />
}

const ParentProperty = ({
  name,
  property,
  isRequired = false,
  isChild = false,
}) => {
  const properties = property.properties ?? property.items?.properties ?? null
  const requireds = property.required ?? property.items?.required ?? []
  const withChilds = !!properties
  const ParentComponent = withChilds
    ? Disclosure
    : ({ children }) => children({ open: true })

  return (
    <ParentComponent>
      {({ open }) => (
        <Property
          name={name.replace('?', '')}
          type={property.title ?? property.type}
          isRequired={isRequired}
          className={clsx(isChild && 'px-4')}
        >
          <>
            {property.description && (
              <div className="condensed">
                <ReactMarkdown>{property.description}</ReactMarkdown>
              </div>
            )}

            {withChilds && (
              <>
                <Disclosure.Button
                  className={clsx(
                    '-mx-2 -my-1 flex cursor-pointer items-center gap-1 px-2 py-1 text-2xs font-medium text-gray-500 transition hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300',
                    { 'mt-2': property.description }
                  )}
                >
                  <PlusIcon
                    className={clsx('inline-block h-3 w-3 transition', {
                      'rotate-45 transform': open,
                    })}
                  />
                  {open ? 'Ocultar' : 'Ver'} atributos
                </Disclosure.Button>
                <Transition
                  unmount={false}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static>
                    <div
                      className={clsx(
                        open &&
                          'rounded-lg border border-zinc-200 dark:border-white/5'
                      )}
                    >
                      <ChildProperties
                        properties={Object.entries(properties)}
                        requireds={requireds}
                      />
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </>
        </Property>
      )}
    </ParentComponent>
  )
}

const ApiProperties = ({
  properties = [],
  requireds = [],
  isChild = false,
}) => {
  if (properties.length === 0) return null

  return (
    <>
      {!isChild && <h3>Atributos</h3>}

      <Properties classNames="my-4">
        {properties.map(([name, property]) => (
          <ParentProperty
            key={name}
            name={name}
            property={property}
            isRequired={requireds.includes(name)}
            isChild={isChild}
          />
        ))}
      </Properties>
    </>
  )
}

export function ApiReader({ path, method = '', api = {} }) {
  const data = api?.[path]?.[method]

  if (!data) {
    throw new Error(
      `Method ${method} not found in API definition for path ${path}`
    )
  }

  const properties = Object.entries(
    data.requestBody?.content?.['application/json']?.schema?.properties || {}
  )

  const requireds =
    data.requestBody?.content?.['application/json']?.schema?.required || []

  return <ApiProperties properties={properties} requireds={requireds} />
}
