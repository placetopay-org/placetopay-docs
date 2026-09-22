import { useLocale } from '@/components/LocaleProvider'

export const useLocalizePath = () => {
  const { locale } = useLocale()
  return (path) => {
    if (locale === 'es') {
      return path
    }

    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return path
    }

    return `/${locale}${path}`
  }
}
