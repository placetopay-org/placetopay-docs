import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { useLocalizePath } from '@/hooks/useLocalizePath'
import { useNamespaceRoute, useNavigation } from '@/hooks/useNavigation'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { useLocale } from './LocaleProvider'
function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-gray-900 dark:text-white'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="gray">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname, withSections = false }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation() && withSections
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent && withSections
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top = group.links.findIndex((link) => link.href === pathname) * itemHeight

  if (withSections) {
    top += firstVisibleSectionIndex * itemHeight
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-gray-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-primary-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className, withSections = false }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let localizePath = useLocalizePath()
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation && withSections
  )

  const groupWithLocaleInLinks = {
    ...group,
    links: group.links.map((link) => ({
      ...link,
      href: localizePath(link.href),
    })),
  }

  let isActiveGroup =
    groupWithLocaleInLinks.links.findIndex(
      (link) => link.href === router.pathname
    ) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-gray-900 dark:text-white"
      >
        {groupWithLocaleInLinks.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight
              withSections={withSections}
              group={groupWithLocaleInLinks}
              pathname={router.pathname}
            />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-gray-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker
              group={groupWithLocaleInLinks}
              pathname={router.pathname}
            />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {groupWithLocaleInLinks.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === router.pathname}>
                {link.title}
              </NavLink>
              {withSections && (
                <AnimatePresence mode="popLayout" initial={false}>
                  {link.href === router.pathname && sections.length > 0 && (
                    <motion.ul
                      role="list"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.1 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {sections.map((section) => (
                        <li key={section.id}>
                          <NavLink
                            href={`${link.href}#${section.id}`}
                            tag={section.tag}
                            isAnchorLink
                          >
                            {section.title}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function Navigation({ withSections, ...props }) {
  let navigation = useNavigation(useNamespaceRoute())

  return (
    <nav {...props}>
      <ul role="list">
        {/* <TopLevelNavItem href="/">API</TopLevelNavItem> */}
        {/* <TopLevelNavItem href="#">Documentation</TopLevelNavItem> */}
        {/* <TopLevelNavItem href="#">Support</TopLevelNavItem> */}
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 && 'md:mt-0'}
            withSections={withSections}
          />
        ))}
        {/* <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li> */}
      </ul>
    </nav>
  )
}

const CONTENT_NAVIGATION_TEXTS = {
  en: 'On this page',
  es: 'En esta página',
}

export function ContentNavigation(props) {
  let router = useRouter()
  let [sections, visibleSections] = useSectionStore((s) => [
    s.sections,
    s.visibleSections,
  ])
  let locale = useLocale()

  if (sections.length === 0) return null

  return (
    <aside as="aside" role="navigation" aria-label="Page navigation" className="sticky hidden lg:block top-20 h-full w-44 min-w-[160px]">
      <div className="block overflow-y-auto">
        <div className="">
          <h5 className="whitespace-normal pb-3 font-semibold uppercase text-gray-900 dark:text-gray-100">
            {CONTENT_NAVIGATION_TEXTS[locale.locale]}
          </h5>
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <div key={section.id}>
                <Link
                  href={`${router.pathname}#${section.id}`}
                  className={clsx(
                    'cursor-pointer break-words text-sm leading-none transition',
                    visibleSections?.length && visibleSections[0] === section.id
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  )}
                >
                  {section.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
