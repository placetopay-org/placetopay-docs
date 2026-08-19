import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

import { Tag } from '@/components/Tag'
import { usePreventLayoutShift } from '@/hooks/usePreventLayoutShift'
import { useLocale } from '@/components/LocaleProvider'
import { CopyJSON } from '@/components/CopyJSON'
import { CopyForLLM } from '@/components/CopyForLLM'
import {
  getCodeRole,
  getPairMap,
  useCodePairingStore,
} from '@/components/codePairing'
import { ApiRefsContext } from '@/components/ApiRefsContext'
import { getScopeEndpoint } from '@/components/endpointScope'
import {
  buildFieldDocs,
  pickResponseSchema,
} from '@/components/schemaFields'
import { API_TITLES } from '@/constants/apiReader'

const languageNames = {
  js: 'JavaScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  go: 'Go',
}

function shouldBeTabs(children) {
  return isGroup(children) && Children.count(children) < 3
}

function isGroup(children) {
  return Children.count(children) > 1
}

function getPanelTitle({ title, language }) {
  return title ?? languageNames[language] ?? 'Code'
}

function CodePanelHeader({ tag, label }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-gray-900 bg-white/2.5 px-4 dark:border-white/5 dark:bg-white/1">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-gray-500" />
      )}
      {label && (
        <span className="font-mono text-xs text-gray-400">{label}</span>
      )}
    </div>
  )
}

const LLM_LOOSE_TEXTS = {
  es: 'Ejemplo de la documentación de Placetopay:',
  en: 'Example from the Placetopay documentation:',
}

const REQUEST_RESPONSE_TITLES = {
  es: { request: 'Solicitud', response: 'Respuesta' },
  en: { request: 'Request', response: 'Response' },
}

const FIELD_TEXTS = {
  es: { fields: 'Campos', required: 'requerido', optional: 'opcional' },
  en: { fields: 'Fields', required: 'required', optional: 'optional' },
}

const getEndpointInfo = (refs, tag, label) => {
  if (!refs || !tag || !label) return null
  const operation = refs[label]?.[String(tag).toLowerCase()]
  if (!operation) return null
  const { summary, description } = operation
  if (!summary && !description) return null
  return {
    method: String(tag).toUpperCase(),
    path: label,
    summary,
    description,
  }
}

function CodeCopyActions({ code, language, pairedResponse, endpoint, role, requestFields, responseFields, variantTitle, displayTag, displayLabel }) {
  let { locale } = useLocale()

  const lead = LLM_LOOSE_TEXTS[locale] ?? LLM_LOOSE_TEXTS.es
  const titles = REQUEST_RESPONSE_TITLES[locale] ?? REQUEST_RESPONSE_TITLES.es
  const fieldLabels = FIELD_TEXTS[locale] ?? FIELD_TEXTS.es

  const wrap = (blockLanguage, blockCode) =>
    `\`\`\`${blockLanguage || ''}\n${blockCode}\n\`\`\``

  const blockLabel = role === 'response' ? titles.response : titles.request

  const jsonContent = pairedResponse ? `${code}\n\n${pairedResponse.code}` : code

  const headerMethod = displayTag ? String(displayTag).toUpperCase() : endpoint?.method
  const headerPath = displayLabel || endpoint?.path

  const header =
    headerMethod && headerPath
      ? [
          `# ${headerMethod} ${headerPath}`,
          endpoint?.summary,
          endpoint?.description,
        ]
          .filter(Boolean)
          .join('\n')
      : null

  const body = role
    ? `## ${blockLabel}\n${wrap(language, code)}`
    : wrap(language, code)

  const responseBlock = pairedResponse
    ? `\n\n## ${titles.response}\n${wrap(pairedResponse.language, pairedResponse.code)}`
    : ''

  const requestTitle = `${titles.request} - ${fieldLabels.fields}${
    variantTitle ? ` (${variantTitle})` : ''
  }`
  const fieldsBlock = [
    requestFields ? `\n\n## ${requestTitle}\n${requestFields}` : '',
    responseFields
      ? `\n\n## ${titles.response} - ${fieldLabels.fields}\n${responseFields}`
      : '',
  ].join('')

  const llmContent = `${lead}\n\n${header ? `${header}\n\n` : ''}${body}${responseBlock}${fieldsBlock}\n`

  return (
    <>
      <CopyJSON content={jsonContent} />
      <CopyForLLM content={llmContent} />
    </>
  )
}

function CodePanel({ tag, label, displayTag, displayLabel, language, code, children }) {
  let child = Children.only(children)
  let rawCode = child.props.code ?? code

  return (
    <div className="group dark:bg-white/2.5">
      <CodePanelHeader
        tag={displayTag ?? child.props.tag ?? tag}
        label={displayLabel ?? child.props.label ?? label}
      />
      <pre className="max-h-[600px] overflow-x-auto p-4 text-xs text-white">
        {children}
      </pre>
    </div>
  )
}

function CodeGroupHeader({ title, children, selectedIndex, onChange }) {
  let hasTabs = Children.count(children) > 1
  const { locale } = useLocale()

  const renderChilds = () => {
    if (shouldBeTabs(children)) {
      return (
        <Tab.List className="-mb-px flex gap-4 text-xs font-medium">
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none',
                childIndex === selectedIndex
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              )}
            >
              {getPanelTitle(child.props)}
            </Tab>
          ))}
        </Tab.List>
      )
    }

    return (
      <div className="mt-2">
        <select
          className="bg-inherit text-white/80 dark:text-white/60"
          aria-label={locale === 'es' ? 'Seleccionar ejemplo de código' : 'Select code example'}
          onChange={(evt) => onChange(evt.target.value)}
        >
          {Children.map(children, (child, childIndex) => (
            <option className="text-gray-950" key={`response-${childIndex}`} value={childIndex}>
              {getPanelTitle(child.props)}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (!title && !hasTabs) {
    return null
  }

  return (
    <div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-gray-700 bg-gray-800 px-4 dark:border-gray-800 dark:bg-transparent">
      {title && (
        <h3 className="mr-auto pt-3 text-xs font-semibold text-white">
          {title}
        </h3>
      )}
      {hasTabs && renderChilds()}
    </div>
  )
}

function CodeGroupPanels({ children, selectedIndex, ...props }) {
  let hasTabs = shouldBeTabs(children)

  if (hasTabs) {
    return (
      <Tab.Panels>
        {Children.map(children, (child) => (
          <Tab.Panel>
            <CodePanel {...props}>{child}</CodePanel>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    )
  }

  let content = Children.toArray(children)[selectedIndex]

  return <CodePanel {...props}>{content}</CodePanel>
}

const usePreferredLanguageStore = create((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language
        ),
        language,
      ],
    })),
}))

function useTabGroupProps(availableLanguages) {
  let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore()
  let [selectedIndex, setSelectedIndex] = useState(0)
  let activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
  )[0]
  let languageIndex = availableLanguages.indexOf(activeLanguage)
  let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex)
  }

  let { positionRef, preventLayoutShift } = usePreventLayoutShift()

  return {
    as: 'div',
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex])
      )
    },
  }
}

const CodeGroupContext = createContext(false)

export function CodeGroup({ children, title, ...props }) {
  let languages = Children.map(children, (child) => getPanelTitle(child.props))
  let tabGroupProps = useTabGroupProps(languages)
  let hasGroup = isGroup(children)
  let hasTabs = shouldBeTabs(children)
  let Container = hasTabs ? Tab.Group : 'div'
  let containerProps = hasTabs ? tabGroupProps : { ref: tabGroupProps.ref }
  let headerProps = hasGroup ? { selectedIndex: tabGroupProps.selectedIndex, onChange: tabGroupProps.onChange } : {}
  let contentProps = hasTabs ? props : { selectedIndex: tabGroupProps.selectedIndex, ...props }

  const sectionEndpoint = getScopeEndpoint()
  const displayTag = sectionEndpoint?.tag != null ? sectionEndpoint.tag : props.tag
  const displayLabel = sectionEndpoint?.label != null ? sectionEndpoint.label : props.label
  contentProps = { ...contentProps, displayTag, displayLabel }

  let panels = Children.toArray(children)
  let active = panels[tabGroupProps.selectedIndex] ?? panels[0]
  let activeCode = active?.props?.code ?? props.code
  let activeLanguage = active?.props?.language ?? props.language

  let hasEndpoint = Boolean(props.tag && props.label)
  let showActions = Boolean(
    activeCode && (hasEndpoint || activeCode.trim().split('\n').length >= 2)
  )

  const codeRole = getCodeRole(title)
  const { locale } = useLocale()
  const refs = useContext(ApiRefsContext)
  const operation = hasEndpoint
    ? refs?.[props.label]?.[String(props.tag).toLowerCase()]
    : null
  const endpoint = hasEndpoint
    ? getEndpointInfo(refs, props.tag, props.label)
    : null

  const fieldLabels = FIELD_TEXTS[locale] ?? FIELD_TEXTS.es
  const propertyLabels =
    API_TITLES.propertyInformation[locale] ?? API_TITLES.propertyInformation.es
  const requestSchema =
    operation?.requestBody?.content?.['application/json']?.schema ??
    Object.values(operation?.requestBody?.content ?? {})[0]?.schema ??
    null
  const responseSchema = pickResponseSchema(operation?.responses)
  const variantTitle = active?.props?.title

  const { requestFields, responseFields } = useMemo(() => {
    if (!codeRole) return { requestFields: '', responseFields: '' }

    const build = (schema, withVariant) =>
      buildFieldDocs({
        schema,
        components: refs?.components,
        requiredLabel: fieldLabels.required,
        optionalLabel: fieldLabels.optional,
        propertyLabels,
        variantTitle: withVariant ? variantTitle : null,
      })

    return {
      requestFields:
        codeRole === 'request' && requestSchema
          ? build(requestSchema, true)
          : '',
      responseFields:
        responseSchema != null ? build(responseSchema, true) : '',
    }
  }, [
    codeRole,
    requestSchema,
    responseSchema,
    refs,
    variantTitle,
    fieldLabels,
    propertyLabels,
  ])

  const idRef = useRef(null)
  const { register, unregister, updateEntry, entries } = useCodePairingStore()

  useEffect(() => {
    if (!codeRole) return
    const id = register({ role: codeRole, code: activeCode, language: activeLanguage })
    idRef.current = id
    return () => unregister(id)
  }, [codeRole, register, unregister])

  useEffect(() => {
    if (!codeRole || idRef.current == null) return
    updateEntry(idRef.current, { code: activeCode, language: activeLanguage })
  }, [codeRole, activeCode, activeLanguage, updateEntry])

  const pairMap = getPairMap(entries)
  let pairedResponse = null
  if (codeRole === 'request' && idRef.current != null) {
    const responseId = pairMap.get(idRef.current)
    pairedResponse = entries.find((entry) => entry.id === responseId) ?? null
  }

  const isPairedResponse =
    codeRole === 'response' &&
    idRef.current != null &&
    Array.from(pairMap.values()).includes(idRef.current)

  if (isPairedResponse) {
    showActions = false
  }

  return (
    <div className="not-prose my-6">
      {showActions && (
        <div className="mb-2 flex items-center justify-end gap-2">
          <CodeCopyActions
            code={activeCode}
            language={activeLanguage}
            pairedResponse={pairedResponse}
            endpoint={endpoint}
            role={codeRole}
            requestFields={requestFields}
            responseFields={responseFields}
            variantTitle={active?.props?.title}
            displayTag={displayTag}
            displayLabel={displayLabel}
          />
        </div>
      )}
      <CodeGroupContext.Provider value={true}>
        <Container
          {...containerProps}
          className="overflow-hidden rounded-2xl bg-gray-900 shadow-md dark:ring-1 dark:ring-white/10"
        >
          <CodeGroupHeader title={title} {...headerProps}>
            {children}
          </CodeGroupHeader>
          <CodeGroupPanels {...contentProps}>{children}</CodeGroupPanels>
        </Container>
      </CodeGroupContext.Provider>
    </div>
  )
}

export function Code({ children, ...props }) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />
  }

  return <code {...props}>{children}</code>
}

export function Pre({ children, ...props }) {
  let isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return children
  }

  return <CodeGroup {...props}>{children}</CodeGroup>
}
