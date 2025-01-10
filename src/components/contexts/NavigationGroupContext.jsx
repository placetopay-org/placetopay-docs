import { useLocalizePath } from '@/hooks/useLocalizePath'
import { useRouter } from 'next/router'
import { createContext, useEffect, useMemo, useState } from 'react'

export const NavigationGroupContext = createContext()

export const isLinkActive = (link, pathname) => {
  return pathname.startsWith(link.href?.split(0, -1).join('/'))
}

export const shouldShowLinks = (link, pathname) => {
  return (
    pathname === link.href ||
    !!link.links?.some((subLink) => pathname === subLink.href)
  )
}

const addLocalizedLink = (link, localizePath) => ({
  ...link,
  href: localizePath(link.href),
})

const adaptLinks = (link, pathname, localizePath) => {
  link = addLocalizedLink(
    {
      ...link,
      active: shouldShowLinks(link, pathname),
      hasChildren: false,
      links: link.links ?? [],
    },
    localizePath
  )

  if (link.links.length) {
    link.hasChildren = true
    link.links = link.links.map((subLink) =>
      addLocalizedLink(subLink, localizePath)
    )
  }

  return link
}

const foundActiveGroup = (links, pathname) => {
  return links.findIndex((link) => shouldShowLinks(link, pathname))
}

const foundActiveLink = (links, pathname, withChilds = true) => {
  if (withChilds) {
    links = links.flatMap((link) => [link, ...link.links])
  }

  return links.findIndex((link) => pathname === link.href)
}

export const NavigationGroupProvider = ({ group, children }) => {
  const router = useRouter()
  const localizePath = useLocalizePath()

  const [links, setLinks] = useState(
    group.links.map((link) => adaptLinks(link, router.pathname, localizePath))
  )

  const [activeGroupIndex, changeActiveGroupIndex] = useState(
    foundActiveGroup(links, router.pathname)
  )
  const [activeLinkIndex, changeActiveLinkIndex] = useState(
    foundActiveLink(links, router.pathname)
  )

  const isActiveGroup = useMemo(
    () => activeGroupIndex !== -1,
    [activeGroupIndex]
  )

  const toggleGroup = (index) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) => ({
        ...link,
        active: i === index - 1 ? !link.active : false,
      }))
    )

    const newActiveLinkIndex = links[index - 1].active
      ? foundActiveGroup(links, router.pathname)
      : foundActiveLink(links, router.pathname)

    changeActiveLinkIndex(newActiveLinkIndex);
  }

  useEffect(() => {
    const handleRouteChange = () => {
      const localActiveGroupIndex = foundActiveGroup(links, router.pathname)
      if (localActiveGroupIndex !== activeGroupIndex) {
        const newLinks = links.map((link, i) => ({
          ...link,
          active: i === localActiveGroupIndex,
        }))

        setLinks(newLinks)
      }

      changeActiveGroupIndex(localActiveGroupIndex)

      if (localActiveGroupIndex === -1) {
        changeActiveLinkIndex(-1)
        return
      }

      changeActiveLinkIndex(
        foundActiveLink(
          links,
          router.pathname,
          links[localActiveGroupIndex].hasChildren
        )
      )
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, router.pathname, activeGroupIndex, links])

  return (
    <NavigationGroupContext.Provider
      value={{
        title: group.title,
        links,
        activeGroupIndex,
        activeLinkIndex,
        isActiveGroup,
        activeGroupHasChildren: links[activeGroupIndex]?.hasChildren,
        toggleGroup,
      }}
    >
      {children}
    </NavigationGroupContext.Provider>
  )
}
