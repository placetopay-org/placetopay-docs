import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

const getLangFromPath = (pathname = '') => {
  return pathname.split('/')[1] === 'en' ? 'en' : 'es'
}

export default function Document({ lang = 'es' }) {
  return (
    <Html lang={lang}>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </Head>
      <body className="bg-white antialiased dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx)
  return { ...initialProps, lang: getLangFromPath(ctx.pathname) }
}
