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

import '@/styles/tailwind.css'
import 'reactflow/dist/style.css';
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const LayoutComponent = Component.Layout || Layout

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
        <title>{`${pageProps.title ? pageProps.title + ' - ' : ''}Placetopay Docs`}</title>
        <meta name="description" content={pageProps.description} />
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
