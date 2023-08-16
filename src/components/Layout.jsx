import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Footer } from '@/components/Footer'
import { Header, HeaderHome } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'

export function Layout({ isHome, children, sections = [] }) {
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
            <Navigation className="hidden lg:mt-8 lg:block" />
          </div>
        </motion.header>
        <div className="relative mx-auto px-4 pt-14 sm:px-6 lg:px-8">
          <main className="py-16">
            <Prose as="article">{children}</Prose>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}

export function HomeLayout({ children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <motion.header
        layoutScroll={false}
        className="contents w-full lg:pointer-events-none lg:fixed lg:z-40 lg:flex"
      >
        <div className="contents w-full lg:flex backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-gray-900/[var(--bg-opacity-dark)] lg:pointer-events-auto lg:border-b lg:border-gray-900/10 lg:px-6 lg:pb-4 lg:pt-4 lg:dark:border-white/10">
          <div className="hidden lg:flex">
            <Link href="/" aria-label="Home">
              <Logo className="h-6" />
            </Link>
          </div>

          <HeaderHome className="w-full h-14 lg:h-auto" />
        </div>
      </motion.header>
      <div className="relative mx-auto px-4 pt-4 lg:pt-14 sm:px-6 lg:px-8">
        <main className="pb-16">
          <Prose as="article">{children}</Prose>
        </main>
      </div>
    </SectionProvider>
  )
}
