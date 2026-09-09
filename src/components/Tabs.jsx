import { Children, Fragment, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tab as HeadlessTab } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

const TabGroup = ({ children }) => {
  const { asPath } = useRouter()
  const anchorFromPath = asPath.split('#')[1]
  const childrenArray = Children.toArray(children)
  const defaultIndex = childrenArray.findIndex((child) => child.props.default)
  const hasSluglify = childrenArray.every(
    (child) => typeof child.props.slug === 'string'
  )

  const rendered = useRef(false)
  const [selectedIndex, setSelectedIndex] = useState(
    defaultIndex === -1 ? 0 : defaultIndex
  )

  useEffect(() => {
    if (rendered.current) {
      return
    }

    if (anchorFromPath) {
      const index = childrenArray.findIndex(
        (child) => child.props.slug === anchorFromPath
      )

      if (index !== -1) {
        setSelectedIndex(index)
      }
    }

    rendered.current = true
  }, [selectedIndex, anchorFromPath, childrenArray])

  return (
    <HeadlessTab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabHeader withSlug={hasSluglify}>{children}</TabHeader>

      <TabPanel>{children}</TabPanel>
    </HeadlessTab.Group>
  )
}

const TabHeader = ({ children, withSlug }) => {
  const renderChilds = () => {
    const childArray = Children.toArray(children)

    if (childArray.length === 0) {
      return null
    }

    const ChildComponent = withSlug ? 'a' : 'div'
    const getProps = (props) => {
      if (withSlug) {
        return {
          href: `#${props.slug}`,
        }
      }

      return {}
    }

    return Children.map(children, (child, childIndex) => (
      <HeadlessTab key={childIndex} as={Fragment}>
        {({ selected }) => (
          <ChildComponent
            {...getProps(child.props)}
            className={twMerge(
              'cursor-pointer whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 focus-visible:outline-none dark:text-gray-400 dark:hover:text-white',
              selected && 'border-b border-teal-500 dark:border-teal-400 text-teal-500 dark:text-teal-400'
            )}
          >
            {child.props.title}
          </ChildComponent>
        )}
      </HeadlessTab>
    ))
  }
  return (
    <div className="mb-px border-b border-slate-200 dark:border-slate-200/5">
      <HeadlessTab.List as="nav" className="-mb-px flex space-x-8">
        {renderChilds()}
      </HeadlessTab.List>
    </div>
  )
}

const TabPanel = ({ children }) => {
  return (
    <HeadlessTab.Panels>
      {Children.map(children, (child, childIndex) => (
        <HeadlessTab.Panel unmount={false} key={childIndex}>
          {child}
        </HeadlessTab.Panel>
      ))}
    </HeadlessTab.Panels>
  )
}

const Tab = ({ children }) => {
  return <>{children}</>
}

export const Tabs = Object.assign(TabGroup, {
  Item: Tab,
})
