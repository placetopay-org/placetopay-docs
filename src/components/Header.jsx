import { forwardRef, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSearch, Search } from '@/components/Search'
import { LanguageSwitch } from './LanguageSwitch'
import { useTabRouter } from './TabProvider'
import { TAB_NAVIGATION } from '@/constants/navigations'
import { remToPx } from '@/lib/remToPx'

function TopLevelNavItem({ href, children, isActive, setOffsets }) {
  const elementRef = useRef();

  useEffect(() => {
    if (isActive) {
      setOffsets({
        width: elementRef.current.offsetWidth,
        left: elementRef.current.offsetLeft,
      })
    }
  }, [isActive, setOffsets]);

  return (
    <li ref={elementRef}>
      <Link
        href={href}
        className={clsx(
          "text-sm leading-5 text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
          isActive && "text-teal-500 dark:text-teal-400"
        )}
      >
        {children}
      </Link>
    </li>
  )
}

const ActiveTabMarker = ({ offsets }) => {
  const wRem = remToPx(1);
  const lRem = remToPx(0.5);
  return (
    <motion.div
      layout
      className="absolute h-px top-10 bg-primary-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: `calc(${offsets.width}px + ${wRem}px)`, left: offsets.left - lRem}}
    />
  )
}

const TabNavigation = () => {
  const [offsets, setOffsets] = useState();
  const {tab, active} = useTabRouter();
  if (tab === undefined) return null;


  const navs = TAB_NAVIGATION[tab.basePath][tab.locale];

  return (
    <nav className="hidden relative md:block">
      {offsets && <ActiveTabMarker offsets={offsets} />}
      <ul role="list" className="flex items-center gap-8">
        {navs.map((item) => (
          <TopLevelNavItem
            key={item.href}
            href={item.href}
            isActive={active === item.identifier}
            setOffsets={setOffsets}
          >
            {item.title}
          </TopLevelNavItem>
        ))}
      </ul>
    </nav>
  )
}

export const HeaderHome = ({ className }) => {
  return (
    <div
      className={clsx(
        className,
        'flex items-center justify-between gap-12 px-4 sm:px-6 lg:px-8'
      )}
    >
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitch />
        <div className="hidden md:block md:h-5 md:w-px md:bg-gray-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ModeToggle />
        </div>
        {/* <div className="hidden min-[416px]:contents">
          <Button href="#">Sign in</Button>
        </div> */}
      </div>
    </div>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-gray-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-gray-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-gray-900/7.5 dark:bg-white/7.5'
        )}
      />
      <TabNavigation />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Search />
        <LanguageSwitch />
        <div className="hidden md:block md:h-5 md:w-px md:bg-gray-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ModeToggle />
        </div>
        {/* <div className="hidden min-[416px]:contents">
          <Button href="#">Sign in</Button>
        </div> */}
      </div>
    </motion.div>
  )
})
