import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Properties, Property } from './mdx'
import ReactMarkdown from 'react-markdown'

const ChildProperties = ({ properties = [], requireds = [] }) => {
  if (properties.length === 0) return null

  return <ApiProperties properties={properties} requireds={requireds} isChild />
}

const ParentProperty = ({ name, property, isRequired = false, isChild = false }) => {
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
                      'flex cursor-pointer items-center gap-1 py-1 px-2 -mx-2 -my-1 text-2xs font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300 transition',
                      {'mt-2' : property.description}
                  )}
                >
                  <PlusIcon
                    className={clsx('inline-block h-3 w-3 transition', {
                      'rotate-45 transform': open,
                    })}
                  />
                  {open ? 'Ocultar' : 'Ver'} atributos
                </Disclosure.Button>
                <Disclosure.Panel>
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
              </>
            )}
          </>
        </Property>
      )}
    </ParentComponent>
  )
}

const ApiProperties = ({ properties = [], requireds = [], isChild = false }) => {
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

  const requireds = data.requestBody?.content?.['application/json']?.schema?.required || []

  return <ApiProperties properties={properties} requireds={requireds} />
}
