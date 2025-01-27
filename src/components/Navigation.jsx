import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { useNavigation } from '@/hooks/useNavigation'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { useLocale } from './LocaleProvider'
import { NamespaceSelector } from './SelectMenu'
import { useTabRouter } from './TabProvider'
import { getNavigationByTab } from '@/utils/getNavigationByTab'
import { NavigationGroupProvider } from './contexts'
import { useNavigationGroupContext } from '@/hooks/useNavigationGroupContext'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children, isActive }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className={twMerge(
          'flex w-full gap-2 py-1 text-base font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
          isActive && 'text-primary-500 dark:text-primary-400'
        )}
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  tag,
  active,
  as = null,
  isAnchorLink = false,
  onClick,
  children,
}) {
  const LinkComponent = as || Link

  const props = {
    className: clsx(
      'flex justify-between gap-2 py-1 pr-3 text-sm transition',
      isAnchorLink ? 'pl-7' : 'pl-4',
      active
        ? 'text-gray-900 dark:text-white'
        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
    ),
    'aria-current': active ? 'page' : undefined,
  }

  if (href) {
    props.href = href
  }

  if (onClick) {
    props.onClick = onClick
  }

  return (
    <LinkComponent {...props}>
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="gray">
          {tag}
        </Tag>
      )}
    </LinkComponent>
  )
}

function VisibleSectionHighlight() {
  let { activeLinkIndex } = useNavigationGroupContext()
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
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top = activeLinkIndex * itemHeight + firstVisibleSectionIndex * itemHeight

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

function ActivePageHighlight() {
  let { activeLinkIndex } = useNavigationGroupContext();
  let height = remToPx(2)
  let top = activeLinkIndex * height

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

function ActiveHighlight({ withSections = false }) {
  let { activeGroupHasChildren } = useNavigationGroupContext();
  if (withSections && !activeGroupHasChildren) {
    return <VisibleSectionHighlight />
  }

  return <ActivePageHighlight />
}

function ActivePageMarker() {
  const { activeLinkIndex } = useNavigationGroupContext()
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let top = offset + activeLinkIndex * itemHeight

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

function NavigationGroupItem({ index, link, withSections, sections, pathname }) {
  const { toggleGroup } = useNavigationGroupContext()

  const getPropsTitle = (link, pathname) => {
    const props = {
      as: 'button',
      active: pathname === link.href,
    }

    if (link.hasChildren && !link.href) {
      props.active = pathname.startsWith(link.href)
      props.onClick = () => {
        toggleGroup(index)
      }
    }

    if (link.href) {
      props.href = link.href
      delete props.as
    }

    return props
  }

  return (
    <motion.li key={link.href} layout="position" className="relative">
      <NavLink {...getPropsTitle(link, pathname)}>{link.title}</NavLink>

      {link.hasChildren && link.active && (
        <AnimatePresence mode="popLayout" initial={false}>
          <ul role="list" className="border-l border-transparent">
            {link.links.map((subLink) => (
              <motion.li key={subLink.href} layout="position">
                <NavLink
                  href={subLink.href}
                  active={subLink.href === pathname}
                  isAnchorLink
                >
                  {subLink.title}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      )}

      {!link.hasChildren && withSections && (
        <AnimatePresence mode="popLayout" initial={false}>
          {link.href === pathname && sections.length > 0 && (
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
  )
}

function NavigationGroup({ className, withSections = false }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let { title, links, isActiveGroup } = useNavigationGroupContext()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation && withSections
  )

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && <ActiveHighlight withSections={withSections} />}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-gray-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && <ActivePageMarker />}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {links.map((link, index) => (
            <NavigationGroupItem
              key={link.href ?? link.title.replaceAll(' ', '/')}
              index={index}
              link={link}
              withSections={withSections}
              pathname={router.pathname}
              sections={sections}
            />
          ))}
        </ul>
      </div>
    </li>
  )
}

function SubSectionNavigation() {
  const { tab, active } = useTabRouter()
  if (tab === undefined) return null

  const navs = getNavigationByTab(tab.basePath, tab.locale)

  return (
    <>
      {navs.map((item) => (
        <TopLevelNavItem
          key={item.href}
          href={item.href}
          isActive={active === item.identifier}
        >
          <item.icon size="24" />
          {item.title}
        </TopLevelNavItem>
      ))}
    </>
  )
}

export function Navigation({ withSections, ...props }) {
  let navigation = useNavigation()

  return (
    <nav {...props}>
      <NamespaceSelector />
      <ul role="list" className="mt-6 md:mt-0">
        <SubSectionNavigation />
        {navigation.map((group, groupIndex) => (
          <NavigationGroupProvider group={group} key={group.title}>
            <NavigationGroup
              group={group}
              className={groupIndex === 0 && 'md:mt-0'}
              withSections={withSections}
            />
          </NavigationGroupProvider>
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
    <aside
      as="aside"
      role="navigation"
      aria-label="Page navigation"
      className="sticky top-20 hidden h-full w-52 min-w-[160px] flex-none pb-2 pl-8 lg:block xl:w-60"
    >
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
