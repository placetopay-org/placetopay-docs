import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useLocale } from '@/components/LocaleProvider'
import { CopyCodeIcon } from '@/components/icons/CopyCodeIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'

const TEXTS = {
  es: { label: 'Copiar para LLM', copied: '¡Copiado!' },
  en: { label: 'Copy for LLM', copied: 'Copied!' },
}

export const CopyForLLM = ({ content, className }) => {
  const { locale } = useLocale()
  const [copied, setCopied] = useState(false)
  const texts = TEXTS[locale] ?? TEXTS.es

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  if (!content) return null

  return (
    <button
      type="button"
      title={texts.label}
      onClick={() => {
        navigator.clipboard
          .writeText(content)
          .then(() => setCopied(true))
          .catch(() => {})
      }}
      className={clsx(
        'flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-2xs font-medium transition-colors',
        copied
          ? 'border-primary-400/30 bg-primary-400/10 text-primary-400'
          : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white',
        className
      )}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 stroke-current" />
      ) : (
        <CopyCodeIcon className="h-3.5 w-3.5" />
      )}
      <span>{copied ? texts.copied : texts.label}</span>
    </button>
  )
}