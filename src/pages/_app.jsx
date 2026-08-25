import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import { ImageZoomProvider } from '@/components/ImageZoom'
import LocaleProvider from '@/components/LocaleProvider'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ApiRefsContext } from '@/components/ApiRefsContext'
import { setScopeEndpoint } from '@/components/endpointScope'
import {
  absoluteUrl,
  getLocaleAlternates,
  splitLocaleFromPath,
} from '@/mdx/seo.mjs'

import '@/styles/tailwind.css'
import 'reactflow/dist/style.css';
import 'focus-visible'

const OG_LOCALE_MAP = { es: 'es_CO', en: 'en_US' }

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  setScopeEndpoint(null, null, null)
  const router = useRouter()
  const LayoutComponent = Component.Layout || Layout

  const { locale } = splitLocaleFromPath(router.pathname)
  const { es: esPath, en: enPath } = getLocaleAlternates(router.pathname)
  const canonicalUrl = absoluteUrl(router.pathname)
  const esUrl = absoluteUrl(esPath)
  const enUrl = absoluteUrl(enPath)
  const pageTitle = `${pageProps.title ? pageProps.title + ' - ' : ''}Placetopay Docs`

  useEffect(() => {
    const updateDocumentLang = () => {
      const path = router.asPath.split('/')[1]
      document.documentElement.lang = path === 'en' ? 'en' : 'es'
    }

    updateDocumentLang()
    Router.events.on('routeChangeComplete', updateDocumentLang)
    Router.events.on('hashChangeComplete', updateDocumentLang)

    return () => {
      Router.events.off('routeChangeComplete', updateDocumentLang)
      Router.events.off('hashChangeComplete', updateDocumentLang)
    }
  }, [router.asPath])

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script strategy="lazyOnload" id="initAnalytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageProps.description} />

        {/* Canonical + hreflang: ES/EN are declared as equivalents, not
            duplicate content. See src/mdx/seo.mjs for the URL derivation
            rules (ES/EN kept 1:1, trailing slash matches trailingSlash: true
            in next.config.mjs). */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={esUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={esUrl} />

        {/* Open Graph / Twitter: link previews on Slack, LinkedIn, email, etc. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Placetopay Docs" />
        <meta property="og:title" content={pageTitle} />
        {pageProps.description && (
          <meta property="og:description" content={pageProps.description} />
        )}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={OG_LOCALE_MAP[locale]} />
        <meta
          property="og:locale:alternate"
          content={locale === 'en' ? OG_LOCALE_MAP.es : OG_LOCALE_MAP.en}
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        {pageProps.description && (
          <meta name="twitter:description" content={pageProps.description} />
        )}
      </Head>
      <LocaleProvider>
        <ImageZoomProvider>
          <MDXProvider components={mdxComponents}>
            <ApiRefsContext.Provider value={pageProps.refs}>
              <LayoutComponent {...pageProps}>
                <Component {...pageProps} />
              </LayoutComponent>
            </ApiRefsContext.Provider>
          </MDXProvider>
        </ImageZoomProvider>
      </LocaleProvider>
      </>
  )
}
