import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Note, Properties, Property } from './mdx'
import { useLocale } from './LocaleProvider'
import { usePreventLayoutShift } from '@/hooks/usePreventLayoutShift'
import { API_TITLES as TITLES } from '@/constants/apiReader'

const resolveRefTarget = (ref, components) => {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('#/components/')) {
    return null
  }

  return ref
    .replace(/~(1|0)/g, (match) => (match === '~1' ? '/' : '~'))
    .replace('%20', ' ')
    .split('/')
    .slice(2)
    .reduce((acc, segment) => acc?.[segment], components)
}

const dereferenceSchema = (schema, components, seen = new Set()) => {
  if (!schema || typeof schema !== 'object') return schema

  if (schema.$ref) {
    const target = resolveRefTarget(schema.$ref, components)
    if (target && !seen.has(schema.$ref)) {
      return dereferenceSchema(target, components, new Set([...seen, schema.$ref]))
    }
    return schema
  }

  const result = Array.isArray(schema) ? [] : {}

  for (const [key, value] of Object.entries(schema)) {
    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        dereferenceSchema(item, components, seen)
      )
    } else if (value && typeof value === 'object') {
      result[key] = dereferenceSchema(value, components, seen)
    } else {
      result[key] = value
    }
  }

  return result
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
          className="my-0 py-0 font-mono text-2xs text-gray-500 dark:text-gray-400 break-all"
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
  const { locale } = useLocale()
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

    if (property.example !== undefined) {
      information.push({
        title: 'example',
        items: property.example,
      })
    }

    if (property.format !== undefined) {
      information.push({
        title: 'format',
        items: property.format,
      })
    }

    if (property.pattern !== undefined) {
      information.push({
        title: 'pattern',
        items: property.pattern,
      })
    }

    if (property.maxLength !== undefined) {
      information.push({
        title: 'maxLength',
        items: property.maxLength,
      })
    }

    if (property.minLength !== undefined) {
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
                  {open
                    ? (TITLES.attributes[locale] ?? TITLES.attributes.es).hide
                    : (TITLES.attributes[locale] ?? TITLES.attributes.es).show}
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

const BINARY_FORMATS = ['application/pdf', 'application/zip', 'image/png', 'image/jpeg', 'image/svg+xml', 'application/octet-stream']

const PREFERRED_FORMATS = ['application/json', 'multipart/form-data']

const isBinaryContent = (format, schema) =>
  schema?.format === 'binary' || BINARY_FORMATS.includes(format)

const isRenderableSchema = (schema) =>
  !!schema && (!!schema.properties || !!schema.oneOf || !!schema.anyOf)

/**
 * Returns the list of available content formats for an operation content map,
 * ordered with JSON-like formats first.
 */
const getContentFormats = (content = {}) => {
  const formats = Object.keys(content ?? {})
  const ordered = [...formats].sort((a, b) => {
    const aIndex = PREFERRED_FORMATS.indexOf(a)
    const bIndex = PREFERRED_FORMATS.indexOf(b)
    return (aIndex === -1 ? PREFERRED_FORMATS.length : aIndex) -
      (bIndex === -1 ? PREFERRED_FORMATS.length : bIndex)
  })
  return { formats: ordered }
}

const getExampleValue = (mediaContent = {}) => {
  if (mediaContent.example !== undefined) return mediaContent.example
  const examples = mediaContent.examples ?? {}
  const first = Object.values(examples)[0]
  return first?.value ?? first
}

const warnUnrenderableFormats = (content, context) => {
  if (typeof window !== 'undefined') return
  for (const [contentType, mediaContent] of Object.entries(content ?? {})) {
    const schema = mediaContent?.schema
    if (isBinaryContent(contentType, schema)) continue
    if (isRenderableSchema(schema)) continue
    if (getExampleValue(mediaContent) !== undefined) continue
    console.warn(
      `[ApiReader] ${context}: format "${contentType}" has no renderable content (schema without properties or examples).`
    )
  }
}

export const ApiResponses = ({ responses = {}, path = '', method = '' }) => {
  const { locale } = useLocale()

  const [selected, setSelected] = useState(Object.keys(responses ?? {})[0])
  const [bodySelected, setBodySelected] = useState(0)
  const [formatSelected, setFormatSelected] = useState(null)

  if (Object.keys(responses ?? {}).length === 0) {
    throw new Error(
      `Missing "responses" in API definition for ${method.toUpperCase()} ${path} (type: response)`
    )
  }

  const response = responses?.[selected]
  if (!response) {
    throw new Error(
      `Response "${selected}" not found in API definition for ${method.toUpperCase()} ${path} (type: response)`
    )
  }

  const content = response.content ?? {}
  warnUnrenderableFormats(content, `${method.toUpperCase()} ${path} [response ${selected}]`)
  const { formats } = getContentFormats(content)
  const format = formatSelected && formats.includes(formatSelected)
    ? formatSelected
    : formats[0]
  const mediaContent = format ? content[format] : undefined
  let body = mediaContent?.schema

  const multiBodies = body?.oneOf ?? body?.anyOf ?? []
  const isMulti = multiBodies.length > 0
  if (isMulti) {
    body = multiBodies[bodySelected]
  }

  const showProperties = isRenderableSchema(body)
  const showRawExample = !showProperties && !isBinaryContent(format, body)
  const exampleValue = showRawExample ? getExampleValue(mediaContent) : undefined

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3>{TITLES.response[locale]}</h3>

        <div className="flex flex-col gap-3">
          <select
            className="bg-inherit"
            aria-label={TITLES.selectResponseCode[locale]}
            onChange={(evt) => setSelected(evt.target.value)}
          >
            {Object.entries(responses).map(([code]) => (
              <option key={`response-${code}`} value={code}>
                {code}
              </option>
            ))}
          </select>

          {formats.length > 1 && (
            <select
              className="bg-inherit font-mono text-xs"
              value={format}
              onChange={(evt) => {
                setFormatSelected(evt.target.value)
                setBodySelected(0)
              }}
            >
              {formats.map((contentType) => (
                <option key={`format-${contentType}`} value={contentType}>
                  {contentType}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {response.description && (
        <ReactMarkdown>{response.description}</ReactMarkdown>
      )}

      {isMulti && (
        <div className="flex justify-end">
          <select
            className="bg-inherit"
            aria-label={TITLES.selectResponseVariant[locale]}
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

      {isBinaryContent(format, body) && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {TITLES.binaryResponse[locale]} <code>{format}</code>
        </p>
      )}

      {showRawExample && exampleValue !== undefined && (
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100 dark:ring-1 dark:ring-white/10">
          <code>{typeof exampleValue === 'string' ? exampleValue : JSON.stringify(exampleValue, null, 2)}</code>
        </pre>
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
              ...(param.schema ?? {}),
              description: param.description ?? param.schema?.description,
              title: param.name,
            }}
            isRequired={param.required}
            isConditional={param.conditional}
          />
        ))}
      </Properties>
    </>
  )
}

export const ApiRequest = ({ request = {}, path = '', method = '' }) => {
  const { locale } = useLocale()
  const [selected, setSelected] = useState(0);
  const [formatSelected, setFormatSelected] = useState(null)

  const content = request?.content ?? {}
  warnUnrenderableFormats(content, `${method.toUpperCase()} ${path} [request]`)
  const { formats } = getContentFormats(content)
  const format = formatSelected && formats.includes(formatSelected)
    ? formatSelected
    : formats[0]
  const requestBody = format ? content[format] : undefined
  let body = requestBody?.schema

  const multiBodies = body?.oneOf ?? body?.anyOf ?? [];
  const isMulti = multiBodies.length > 0;

  if (isMulti) {
    body = multiBodies[selected]
  }

  if (!body?.properties) {
    return null
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h3>{TITLES.request[locale]}</h3>

        <div className="flex flex-col gap-3">
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

          {formats.length > 1 && (
            <select
              className="bg-inherit font-mono text-xs"
              value={format}
              onChange={(evt) => {
                setFormatSelected(evt.target.value)
                setSelected(0)
              }}
            >
              {formats.map((contentType) => (
                <option key={`format-${contentType}`} value={contentType}>
                  {contentType}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

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
  )
}

export function ApiReader({ path, method = '', api = {}, type = 'request' }) {
  const components = api.components
  let data = api?.[path]
  if (type !== 'params') data = data?.[method.toLowerCase()]

  if (!data) {
    throw new Error(
      `Method ${method} not found in API definition for path ${path}`
    )
  }

  data = dereferenceSchema(data, components)

  if (type === 'request') {
    return <ApiRequest request={data.requestBody} path={path} method={method} />
  }

  if (type === 'response') {
    return <ApiResponses responses={data.responses} path={path} method={method} />
  }

  if (type === 'params') {
    return <ApiParams params={(data.parameters ?? []).filter((param) => param.in === 'path')} />
  }

  if (type === 'query') {
    return <ApiParams type="query" params={(data.parameters ?? []).filter((param) => param.in === 'query')} />
  }

  if (type === 'header') {
    return <ApiParams type="header" params={(data.parameters ?? []).filter((param) => param.in === 'header')} />
  }

  throw new Error(`Type ${type} not supported`)
}
