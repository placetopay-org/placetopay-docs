import Head from 'next/head'
import Script from 'next/script'
import { Router } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import { ImageZoomProvider } from '@/components/ImageZoom'
import LocaleProvider from '@/components/LocaleProvider'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'reactflow/dist/style.css';
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  const LayoutComponent = Component.Layout || Layout

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
      <ImageZoomProvider>
        <MDXProvider components={mdxComponents}>
          <LocaleProvider>
            <LayoutComponent {...pageProps}>
              <Component {...pageProps} />
            </LayoutComponent>
          </LocaleProvider>
        </MDXProvider>
      </ImageZoomProvider>
      </>
  )
}
