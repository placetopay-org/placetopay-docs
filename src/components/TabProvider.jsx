import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LANGUAGES_CODES } from './LocaleProvider'
import { getNavigationByTab } from '@/utils/getNavigationByTab'

const TabContext = createContext()

export const useTabRouter = () => {
  const state = useContext(TabContext)
  return state
}

const getBasePathAndLocale = (url) => {
  let locale = LANGUAGES_CODES.ES
  let basePath = url.split('/')[1]
  if (basePath && Object.values(LANGUAGES_CODES).includes(basePath)) {
    locale = basePath
    basePath = url.split('/')[2]
  }

  return { locale, basePath }
}

const isActiveRoute = (href, asPath) => {
  const pathSections = href.split('/').filter(Boolean)
  return !pathSections.some((section) => !asPath.includes(section))
}

const TabProvider = ({ children }) => {
  const router = useRouter()
  const [tab, setTab] = useState()
  const [activeTab, setActiveTab] = useState()

  useEffect(() => {
    if (tab) {
      const tabNavigation = getNavigationByTab(tab.basePath, tab.locale);
      const posibleTabs = tabNavigation
        .filter((item) => isActiveRoute(item.identifier, router.asPath))
        .sort((a, b) => b.href.length - a.href.length)

      if (posibleTabs.length > 0) {
        setActiveTab(posibleTabs[0].identifier)
      }
    }
  }, [tab, router.asPath])

  useEffect(() => {
    const { locale, basePath } = getBasePathAndLocale(router.asPath)
    setTab({ locale, basePath })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleRouteChange = (...rest) => {
      const [url] = rest
      const { locale, basePath } = getBasePathAndLocale(url)
      if (basePath === '') {
        setTab(undefined);
        return;
      } 
      setTab({ locale, basePath })
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  return (
    <TabContext.Provider value={{ tab, active: activeTab }}>
      {children}
    </TabContext.Provider>
  )
}

export default TabProvider
