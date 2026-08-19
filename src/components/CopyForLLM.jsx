import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useLocale } from '@/components/LocaleProvider'
import { ClipboardIcon } from '@/components/icons/ClipboardIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'

const TEXTS = {
  es: { label: 'Copiar para LLM', copied: '¡Copiado!' },
  en: { label: 'Copy for LLM', copied: 'Copied!' },
}

const ICON_CLASSES =
  'h-4 w-4 flex-none fill-gray-400/20 stroke-gray-500 transition group-hover:fill-primary-500/20 group-hover:stroke-primary-500 dark:stroke-gray-400 dark:group-hover:stroke-primary-400'

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
        try {
          navigator.clipboard
            ?.writeText(content)
            .then(() => setCopied(true))
            .catch((error) => console.error('[CopyForLLM]', error))
        } catch (error) {
          console.error('[CopyForLLM]', error)
        }
      }}
      className={clsx(
        'group flex shrink-0 items-center gap-x-1.5 rounded-md px-2 py-1 text-[0.8125rem] font-medium leading-5 transition',
        copied
          ? 'text-primary-500 dark:text-primary-400'
          : 'text-gray-600 hover:bg-gray-900/[0.04] hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
        className
      )}
    >
      {copied ? (
        <CheckIcon
          className={clsx(
            ICON_CLASSES,
            'fill-primary-500/20 stroke-primary-500 dark:stroke-primary-400'
          )}
        />
      ) : (
        <ClipboardIcon className={ICON_CLASSES} />
      )}
      <span>{copied ? texts.copied : texts.label}</span>
    </button>
  )
}