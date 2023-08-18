import { useLocale } from '@/components/LocaleProvider'

export const useLocalizePath = () => {
  const { locale } = useLocale()
  return (path) => {
    return locale === 'es' ? path : `/${locale}${path}`
  }
}
