import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useLocale } from '@/components/LocaleProvider'
import { BoltIcon } from '@/components/icons/BoltIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'

const TEXTS = {
  es: { label: 'Copiar para LLM', copied: '¡Copiado!' },
  en: { label: 'Copy for LLM', copied: 'Copied!' },
}

export const CopyForLLM = ({ content, variant, className }) => {
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
        'flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-2xs font-medium transition-colors',
        copied
          ? 'border-primary-400/30 bg-primary-400/10 text-primary-400'
          : variant === 'dark'
            ? 'border-white/15 bg-gray-900/40 text-gray-300 hover:border-white/30 hover:text-white'
            : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200',
        className
      )}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 stroke-current" />
      ) : (
        <BoltIcon className="h-3.5 w-3.5 stroke-current" />
      )}
      <span>{copied ? texts.copied : texts.label}</span>
    </button>
  )
}