import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Note, Properties, Property } from './mdx'
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
  body: {
    es: 'Cuerpo',
    en: 'Body',
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
  deprecated: {
    es: "Versión Obsoleta",
    en: "Deprecated Version"
  }
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

const ChildProperties = ({ properties = [], requireds = [], conditionals = [] }) => {
  if (properties.length === 0) return null

  return <ApiProperties properties={properties} requireds={requireds} conditionals={conditionals} isChild />
}

const ParentProperty = ({
  name,
  property,
  isRequired = false,
  isConditional = false,
  isChild = false,
}) => {
  const { positionRef, preventLayoutShift } = usePreventLayoutShift()
  const [selected, setSelected] = useState(0)

  const multiProperties = property.oneOf ?? property.anyOf ?? [];
  if (multiProperties.length > 0) {
    property = multiProperties[selected]
  }

  const properties = property.properties ?? property.items?.properties ?? null
  const requireds = property.required ?? property.items?.required ?? []
  const conditionals = property["x-conditional"] ?? property.items?.["x-conditional"] ?? []
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
          isConditional={isConditional}
          multiProperties={multiProperties}
          selected={selected}
          onSelected={setSelected}
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
                  {open && (
                    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-white/5">
                      <ChildProperties
                        properties={Object.entries(properties)}
                        requireds={requireds}
                        conditionals={conditionals}
                      />
                    </div>
                  )}
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
  conditionals = [],
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
          isConditional={conditionals.includes(name)}
          isChild={isChild}
        />
      ))}
    </Properties>
  )
}

export const ApiResponses = ({ responses = {} }) => {
  const { locale } = useLocale()

  const [selected, setSelected] = useState(Object.entries(responses)?.[0]?.[0])
  const [bodySelected, setBodySelected] = useState(0)

  const response = responses[selected]
  let body = response?.content?.['application/json']?.schema

  const multiBodies = body?.oneOf ?? body?.anyOf ?? []
  const isMulti = multiBodies.length > 0
  if (isMulti) {
    body = multiBodies[bodySelected]
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3>{TITLES.response[locale]}</h3>

        <div className="flex flex-col gap-3">
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
      </div>

      {response.description && (
        <ReactMarkdown>{response.description}</ReactMarkdown>
      )}

      {isMulti && (
        <div className="flex justify-end">
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
        </div>
      )}

      {response.deprecated && (
        <Note type='warning'>{TITLES.deprecated[locale]}</Note>
      )}

      <ApiProperties
        properties={Object.entries(
          body?.properties || {}
        )}
        requireds={
          body?.required || []
        }
        conditionals={
          body?.['x-conditional'] || []
        }
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
            isConditional={param.conditional}
          />
        ))}
      </Properties>
    </>
  )
}

export const ApiRequest = ({ request = {}, params = [] }) => {
  const { locale } = useLocale()
  const [selected, setSelected] = useState(0)

  const headers = params ? params.filter((p) => p.in === 'header') : []

  const requestBody =
    request?.content?.['application/json'] ??
    request?.content?.['multipart/form-data']
  let body = requestBody?.schema

  const multiBodies = requestBody?.schema.oneOf ?? requestBody?.schema.anyOf ?? [];
  const isMulti = multiBodies.length > 0;

  if (isMulti) {
    body = multiBodies[selected]
  }

  if (!body?.properties && headers.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3>{TITLES.request[locale]}</h3>

        {isMulti && (
          <select
            className="bg-inherit"
            onChange={(evt) => setSelected(evt.target.value)}
          >
            {multiBodies.map((element, key) => (
                <option key={`request-${key}`} value={key}>{element.title}</option>
            ))}
          </select>
        )}
      </div>

       {headers.length > 0 && (
            <div className="mb-6">
              <ApiParams params={headers} type="header" />
            </div>
        )}

        {body && (
            <>
              {headers.length > 0 && (
                 <h3>{TITLES.body[locale]}</h3>
              )}

              {body.deprecated && (
                <Note type='warning'>{TITLES.deprecated[locale]}</Note>
              )}

              {body.description && (
                <ReactMarkdown>{body.description}</ReactMarkdown>
              )}

              <ApiProperties
                properties={Object.entries(body?.properties || {})}
                requireds={body?.required || []}
                conditionals={body?.['x-conditional'] || []}
              />
            </>
          )}
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
    return <ApiRequest request={data.requestBody} params={data.parameters} />
  }

  if (type === 'response') {
    return <ApiResponses responses={data.responses} />
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
