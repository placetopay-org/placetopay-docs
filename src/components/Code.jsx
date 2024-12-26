import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

import { Tag } from '@/components/Tag'
import { usePreventLayoutShift } from '@/hooks/usePreventLayoutShift'

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

function ClipboardIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeWidth="0"
        d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"
      />
      <path
        fill="none"
        strokeLinejoin="round"
        d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"
      />
    </svg>
  )
}

function CopyButton({ code }) {
  let [copyCount, setCopyCount] = useState(0)
  let copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={clsx(
        'group/button absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
        copied
          ? 'bg-primary-400/10 ring-1 ring-inset ring-primary-400/20'
          : 'bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5'
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-gray-400 transition duration-300',
          copied && '-translate-y-1.5 opacity-0'
        )}
      >
        <ClipboardIcon className="h-5 w-5 fill-gray-500/20 stroke-gray-500 transition-colors group-hover/button:stroke-gray-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-primary-400 transition duration-300',
          !copied && 'translate-y-1.5 opacity-0'
        )}
      >
        Copied!
      </span>
    </button>
  )
}

function CodePanelHeader({ tag, label }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-gray-900 bg-white/2.5 px-4 dark:border-b-white/5 dark:bg-white/1">
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

function CodePanel({ tag, label, code, children }) {
  let child = Children.only(children)

  return (
    <div className="group dark:bg-white/2.5">
      <CodePanelHeader
        tag={child.props.tag ?? tag}
        label={child.props.label ?? label}
      />
      <div className="relative">
        <pre className="max-h-[600px] overflow-x-auto p-4 text-xs text-white">
          {children}
        </pre>
        <CopyButton code={child.props.code ?? code} />
      </div>
    </div>
  )
}

function CodeGroupHeader({ title, children, selectedIndex, onChange }) {
  let hasTabs = Children.count(children) > 1

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

  return (
    <CodeGroupContext.Provider value={true}>
      <Container
        {...containerProps}
        className="not-prose my-6 overflow-hidden rounded-2xl bg-gray-900 shadow-md dark:ring-1 dark:ring-white/10"
      >
        <CodeGroupHeader title={title} {...headerProps}>
          {children}
        </CodeGroupHeader>
        <CodeGroupPanels {...contentProps}>{children}</CodeGroupPanels>
      </Container>
    </CodeGroupContext.Provider>
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
