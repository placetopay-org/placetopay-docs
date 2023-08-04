import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'

export function Layout({ isHome, children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div className={clsx(!isHome && 'lg:ml-72 xl:ml-80')}>
        <motion.header
          layoutScroll={!isHome}
          className={clsx('contents lg:pointer-events-none lg:fixed lg:z-40 lg:flex', !isHome && 'lg:inset-0')}
        >
          <div className={clsx(
            'contents lg:pointer-events-auto lg:block lg:w-72 lg:px-6 lg:pt-4 xl:w-80 lg:border-gray-900/10 lg:dark:border-white/10',
            isHome ? 'lg:border-b lg:pb-4' : 'lg:overflow-y-auto lg:pb-8 lg:border-r'
          )}>
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className={isHome ? "h-6" : "h-8"} />
              </Link>
            </div>
            <Header isHome={isHome} />
            {!isHome && <Navigation className="hidden lg:mt-8 lg:block" />}
          </div>
        </motion.header>
        <div className="relative mx-auto px-4 pt-14 sm:px-6 lg:px-8">
          <main className={isHome ? "pb-16" : "py-16"}>
            <Prose as="article">{children}</Prose>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
