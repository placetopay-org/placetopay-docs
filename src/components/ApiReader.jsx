import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Properties, Property } from './mdx'

const ChildProperties = ({ properties = [] }) => {
  if (properties.length === 0) return null

  return <ApiProperties properties={properties} isChild />
}

const ParentProperty = ({ name, property, isChild = false }) => {
  const properties = property.properties ?? property.items?.properties ?? null
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
          isRequired={!name.includes('?')}
          className={clsx(isChild && 'px-4')}
        >
          <>
            {property.description && (
              <p className={clsx(withChilds && 'mb-0')}>
                {property.description}
              </p>
            )}

            {withChilds && (
              <>
                <Disclosure.Button
                  className={
                    'flex cursor-pointer items-center gap-1 p-2 text-2xs font-medium text-gray-500 dark:text-gray-300'
                  }
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

const ApiProperties = ({ properties = [], isChild = false }) => {
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

  return <ApiProperties properties={properties} />
}
