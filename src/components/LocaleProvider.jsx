import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'

export const LANGUAGES_CODES = {
  EN: 'en',
  ES: 'es',
}

const LANGUAGES_WITH_PREFIX = {
  en: true,
}

const CODES = Object.values(LANGUAGES_CODES)
export const LANGUAGE_DEFAULT = LANGUAGES_CODES.ES

const LocaleContext = createContext()

export const useLocale = () => {
  const { locale, changeLocale, isEn, hasPrefix } = useContext(LocaleContext)
  return { locale, changeLocale , isEn, hasPrefix}
}

const LocaleProvider = ({ children }) => {
  const router = useRouter()
  const [hasPrefix, setHasPrefix] = useState(LANGUAGES_WITH_PREFIX[router.pathname.split('/')[1]] ?? false);
  const [locale, setLocale] = useState(
    CODES.find((code) => code === router.pathname.split('/')[1]) ??
      LANGUAGE_DEFAULT
  )

  const changeLocale = (locale) => {
    setLocale(locale)
    setHasPrefix(LANGUAGES_WITH_PREFIX[locale] ?? false)

    const possibleLanguage = router.pathname.split('/')[1]
    if (possibleLanguage !== locale && LANGUAGE_DEFAULT !== locale) {
      router.push(`/${locale}${router.asPath}`)
    }

    if (
      locale === LANGUAGE_DEFAULT &&
      CODES.includes(possibleLanguage) &&
      possibleLanguage !== LANGUAGE_DEFAULT
    ) {
      const newPathname = router.asPath.split('/').slice(2).join('/')
      router.push(`/${newPathname}`)
    }
  }

  const isEn = () => {
    return locale === 'en'
  }

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, isEn, hasPrefix }}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleProvider
