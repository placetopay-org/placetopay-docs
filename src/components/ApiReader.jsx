import { useState } from 'react'
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
  const title = property.title ?? property.items?.title ?? null
  const withChilds = !!properties
  const ParentComponent = withChilds
    ? Disclosure
    : ({ children }) => children({ open: true })

  return (
    <ParentComponent>
      {({ open }) => (
        <Property
          name={name.replace('?', '')}
          type={
            title
              ? property.type === 'array'
                ? `array[${title}]`
                : title
              : property.type
          }
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
  )
}

export const ApiResponses = ({ responses = {} }) => {
  const [selected, setSelected] = useState(Object.entries(responses)?.[0]?.[0])
  const response = responses[selected]

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3>Respuesta</h3>

        <select
          className="bg-inherit"
          onChange={(evt) => setSelected(evt.target.value)}
        >
          {Object.entries(responses).map(([code]) => (
            <option key={`response-${code}`} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
      <ApiProperties
        properties={Object.entries(
          response?.content?.['application/json']?.schema?.properties || {}
        )}
        requireds={
          response?.content?.['application/json']?.schema?.required || []
        }
      />
    </>
  )
}

export const ApiRequest = ({ request = {} }) => {
  return (
    <>
      <h3>Solicitud</h3>
      <ApiProperties
        properties={Object.entries(
          request?.content?.['application/json']?.schema?.properties || {}
        )}
        requireds={
          request?.content?.['application/json']?.schema?.required || []
        }
      />
    </>
  )
}

export function ApiReader({ path, method = '', api = {}, type = 'request' }) {
  const data = api?.[path]?.[method]

  if (!data) {
    throw new Error(
      `Method ${method} not found in API definition for path ${path}`
    )
  }

  if (type === 'request') {
    return <ApiRequest request={data.requestBody} />
  }

  if (type === 'response') {
    return <ApiResponses responses={data.responses} />
  }

  throw new Error(`Type ${type} not supported`)
}
