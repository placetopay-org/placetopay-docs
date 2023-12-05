import { useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Properties, Property } from './mdx'
import { useLocale } from './LocaleProvider'

const TITLES = {
  request: {
    es: 'Solicitud',
    en: 'Request',
  },
  response: {
    es: 'Respuesta',
    en: 'Response',
  },
  params: {
    es: 'Parámetros',
    en: 'Params',
  },
}

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
                
                <Disclosure.Panel static className={clsx(
                  "grid transition-[grid-template-rows] ease-out duration-300",
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}>
                  <div
                    className={clsx(
                      "overflow-hidden",
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
  const {locale} = useLocale()

  const [selected, setSelected] = useState(Object.entries(responses)?.[0]?.[0])
  const response = responses[selected]

  return (
    <>
      <div className="flex items-baseline justify-between">
      <h3>{TITLES.response[locale]}</h3>

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

export const ApiParams = ({ params = [] }) => {
  const {locale} = useLocale()
  return (
    <>
      <h3>{TITLES.params[locale]}</h3>
      
      <Properties classNames="my-4">
        {params.map((param) => (
          <ParentProperty
            key={param.name}
            name={param.name}
            property={{
              type: param.schema.type,
              description: param.description,
              title: param.name,
            }}
            isRequired={param.required}
          />
        ))}
      </Properties>
    </>
  )
}

export const ApiRequest = ({ request = {} }) => {
  const {locale} = useLocale()
  return (
    <>
      <h3>{TITLES.request[locale]}</h3>
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
  let data = api?.[path]
  if (type !== 'params') data = data?.[method.toLowerCase()]

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

  if(type === 'params') {
    return <ApiParams params={data.parameters} />
  }

  throw new Error(`Type ${type} not supported`)
}
