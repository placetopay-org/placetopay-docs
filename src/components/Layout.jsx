import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'

// import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
// import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { Footer } from '@/components/Footer'
import { Header, HeaderHome } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation, ContentNavigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider, useSectionStore } from '@/components/SectionProvider'

function Content({ sectionMode, children }) {
  let hasSections = useSectionStore((state) => state.visibleSections.length > 0)
  let showSections = sectionMode === 'content' && hasSections
  return (
    <div className={clsx("flex py-16 justify-start", showSections && 'gap-4')}>
      <main>
        <Prose as="article">{children}</Prose>
      </main>
      {showSections && <ContentNavigation />}
    </div>
  )
}

export function Layout({ isHome, children, sections = [], sectionMode = 'content' }) {
  return (
    <SectionProvider sections={sections}>
      <div className="lg:ml-72 xl:ml-80">
        <motion.header className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-gray-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-8" />
              </Link>
            </div>
            <Header />
            <Navigation withSections={sectionMode === 'nav'} className="hidden lg:mt-8 lg:block" />
          </div>
        </motion.header>
        <div className="relative mx-auto px-4 pt-14 sm:px-6 lg:px-8">
          <Content sectionMode={sectionMode}>{children}</Content>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}

export function HomeLayout({ children, sections = [] }) {
  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <SectionProvider sections={sections}>
      <motion.header
        layoutScroll={false}
        className="contents w-full lg:pointer-events-none lg:fixed lg:z-40 lg:flex"
      >
        <motion.div
          className="contents w-full lg:pointer-events-auto lg:flex lg:border-b lg:border-gray-900/10 lg:px-6 lg:pb-4 lg:pt-4 lg:dark:border-white/10 backdrop-blur-sm dark:backdrop-blur bg-white/1 dark:bg-gray-900/1"
          style={{
            '--bg-opacity-light': bgOpacityLight,
            '--bg-opacity-dark': bgOpacityDark,
          }}
        >
          <div className="hidden lg:flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-6" />
            </Link>
          </div>

          <HeaderHome className="h-14 w-full lg:h-auto" />
        </motion.div>
      </motion.header>
      <div className="relative mx-auto px-4 pt-4 sm:px-6 lg:px-8 lg:pt-14">
        <main className="pb-16">
          <Prose as="article">{children}</Prose>
        </main>
        <Footer />
      </div>
    </SectionProvider>
  )
}
