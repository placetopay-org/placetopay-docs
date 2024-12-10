import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Properties, Property } from './mdx'
import { useLocale } from './LocaleProvider'
import { usePreventLayoutShift } from '@/hooks/usePreventLayoutShift'

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
    es: {
      params: 'Parámetros',
      query: 'Parámetros de consulta',
      header: 'Cabecera',
    },
    en: {
      params: 'Params',
      query: 'Query params',
      header: 'Headers',
    },
  },
  propertyInformation: {
    es: {
      enum: 'Valores permitidos',
      default: 'Valor por defecto',
      example: 'Ejemplo',
      format: 'Formato',
      pattern: 'Patrón',
      maxLength: 'Longitud máxima',
      minLength: 'Longitud mínima',
      nullable: 'Nullable',
      yes: 'Sí',
      no: 'No',
    },
    en: {
      enum: 'Allowed values',
      default: 'Default value',
      example: 'Example',
      format: 'Format',
      pattern: 'Pattern',
      maxLength: 'Max length',
      minLength: 'Min length',
      nullable: 'Nullable',
      yes: 'Yes',
      no: 'No',
    },
  },
}

const ApiPropertyInformation = ({ title, items }) => {
  const { locale } = useLocale()
  const makeCode = (item) => {
    if (title === 'nullable')
      return item
        ? TITLES.propertyInformation[locale].yes
        : TITLES.propertyInformation[locale].no
    if (typeof item === 'boolean' || typeof item === 'object')
      return JSON.stringify(item)
    return item
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-2xs font-medium text-gray-500 dark:text-gray-400">
        {TITLES.propertyInformation[locale][title]}:
      </span>
      {items.map((value, index) => (
        <code
          key={value + '-' + title + '-' + index}
          className="my-0 py-0 font-mono text-2xs text-gray-400 dark:text-gray-500 break-all"
        >
          {makeCode(value)}
        </code>
      ))}
    </div>
  )
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
  const { positionRef, preventLayoutShift } = usePreventLayoutShift()
  const properties = property.properties ?? property.items?.properties ?? null
  const requireds = property.required ?? property.items?.required ?? []
  const title = property.title ?? property.items?.title ?? null
  const withChilds = !!properties
  const ParentComponent = withChilds
    ? Disclosure
    : ({ children }) => children({ open: true })

  const propertyInformation = () => {
    const information = []

    if (property.enum) {
      information.push({
        title: 'enum',
        items: property.enum,
      })
    }

    if (property.default !== undefined) {
      information.push({
        title: 'default',
        items: property.default,
      })
    }

    if (property.example) {
      information.push({
        title: 'example',
        items: property.example,
      })
    }

    if (property.format) {
      information.push({
        title: 'format',
        items: property.format,
      })
    }

    if (property.pattern) {
      information.push({
        title: 'pattern',
        items: property.pattern,
      })
    }

    if (property.maxLength) {
      information.push({
        title: 'maxLength',
        items: property.maxLength,
      })
    }

    if (property.minLength) {
      information.push({
        title: 'minLength',
        items: property.minLength,
      })
    }

    if (property.nullable !== undefined) {
      information.push({
        title: 'nullable',
        items: property.nullable,
      })
    }

    return information
  }

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
              <div className="condensed break-words">
                <ReactMarkdown>{property.description}</ReactMarkdown>
              </div>
            )}

            <div className="">
              {propertyInformation().map((info, index) => (
                <ApiPropertyInformation
                  key={index}
                  title={info.title}
                  items={Array.isArray(info.items) ? info.items : [info.items]}
                />
              ))}
            </div>

            {withChilds && (
              <>
                <Disclosure.Button
                  ref={positionRef}
                  onClick={() => preventLayoutShift(() => void 0)}
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

                <Disclosure.Panel
                  static
                  className={clsx(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div
                    className={clsx(
                      'overflow-hidden',
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
  const { locale } = useLocale()

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
            <option className="text-gray-950" key={`response-${code}`} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {response.description && (
        <ReactMarkdown>{response.description}</ReactMarkdown>
      )}

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

export const ApiMultiResponses = ({ responses = {} }) => {
  const { locale } = useLocale()

  const [selected, setSelected] = useState(Object.entries(responses)?.[0]?.[0])
  const response = responses[selected]

  const schema = response?.content?.['application/json']?.schema
  const [bodySelected, setBodySelected] = useState(0)
  let body = schema

  const multiBodies = schema?.oneOf ?? schema?.anyOf ?? []
  if (multiBodies.length > 0) {
    body = multiBodies[bodySelected]
  }

  return (
      <>
        <div className="flex items-baseline justify-between">
          <h3>{TITLES.response[locale]}</h3>

          <select
              className="bg-inherit"
              onChange={(evt) => setBodySelected(evt.target.value)}
          >
            {multiBodies.map((element, key) => (
                <option key={`response-item-${key}`} value={key}>
                  {element.title}
                </option>
            ))}
          </select>

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

        {response.description && (
            <ReactMarkdown>{response.description}</ReactMarkdown>
        )}

        <ApiProperties
            properties={Object.entries(body.properties || {})}
            requireds={body?.required || []}
        />
      </>
  )
}

export const ApiParams = ({ params = [], type = 'params' }) => {
  const { locale } = useLocale()
  return (
    <>
      <h3>{TITLES.params[locale][type]}</h3>

      <Properties classNames="my-4">
        {params.map((param) => (
          <ParentProperty
            key={param.name}
            name={param.name}
            property={{
              type: param.schema.type,
              description: param.description,
              title: param.name,
              example: param.schema?.example,
            }}
            isRequired={param.required}
          />
        ))}
      </Properties>
    </>
  )
}

export const ApiRequest = ({ request = {} }) => {
  const { locale } = useLocale()

  const requestBody =
    request?.content?.['application/json'] ??
    request?.content?.['multipart/form-data']
  if (!requestBody?.schema?.properties) {
    return null
  }

  return (
    <>
      <h3>{TITLES.request[locale]}</h3>
      <ApiProperties
        properties={Object.entries(requestBody?.schema?.properties || {})}
        requireds={requestBody?.schema?.required || []}
      />
    </>
  )
}

export const ApiMultiRequest = ({ request = {} }) => {
  const { locale } = useLocale()

  const requestBody =
      request?.content?.['application/json'] ??
      request?.content?.['multipart/form-data']

  const requestBodies = requestBody?.schema.oneOf ?? requestBody?.schema.anyOf;
  const [selected, setSelected] = useState(Object.entries(requestBodies)?.[0]?.[0])

  if (requestBodies) {
    const requestDef = requestBodies[selected]

    return (
        <>
          <div className="flex items-baseline justify-between">
            <h3>{TITLES.request[locale]}</h3>

            <select
                className="bg-inherit"
                onChange={(evt) => setSelected(evt.target.value)}
            >
              {requestBodies.map((element, key) => (
                  <option key={`request-${key}`} value={key}>{element.title}</option>
              ))}
            </select>
          </div>

          {requestDef.description && (
              <ReactMarkdown>{requestDef.description}</ReactMarkdown>
          )}

          <ApiProperties
              properties={Object.entries(requestDef?.properties || {})}
              requireds={requestDef.required || []}
          />
        </>
    )
  }

  return  !requestBody?.schema?.properties ? null : <ApiRequest request={request} />
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

  if (type === 'multiRequest') {
    return <ApiMultiRequest request={data.requestBody} />
  }

  if (type === 'response') {
    return <ApiResponses responses={data.responses} />
  }

  if (type === 'multiResponse') {
    return <ApiMultiResponses responses={data.responses} />
  }

  if (type === 'params') {
    return <ApiParams params={data.parameters.filter((param) => param.in === 'path')} />
  }

  if (type === 'query') {
    return <ApiParams type="query" params={data.parameters.filter((param) => param.in === 'query')} />
  }

  if (type === 'header') {
    return <ApiParams type="header" params={data.parameters.filter((param) => param.in === 'header')} />
  }

  throw new Error(`Type ${type} not supported`)
}
