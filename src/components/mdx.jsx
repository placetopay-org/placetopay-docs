import Link from 'next/link'
import clsx from 'clsx'

import { Heading } from '@/components/Heading'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
export { ApiReader } from '@/components/ApiReader'
export { CopyContent } from '@/components/CopyContent'
export { MissingTranslationBanner } from '@/components/MissingTranslationBanner'
export { GithubRepo } from '@/components/GithubRepo'
export { ImageZoom } from '@/components/ImageZoom';


export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

function WarningIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m19.51 5.85-5.94-3.43c-.97-.56-2.17-.56-3.15 0L4.49 5.85a3.15 3.15 0 0 0-1.57 2.73v6.84c0 1.12.6 2.16 1.57 2.73l5.94 3.43c.97.56 2.17.56 3.15 0l5.94-3.43a3.15 3.15 0 0 0 1.57-2.73V8.58a3.192 3.192 0 0 0-1.58-2.73Zm-8.26 1.9c0-.41.34-.75.75-.75s.75.34.75.75V13c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.75Zm1.67 8.88c-.05.12-.12.23-.21.33a.99.99 0 0 1-1.09.21c-.13-.05-.23-.12-.33-.21-.09-.1-.16-.21-.22-.33a.986.986 0 0 1-.07-.38c0-.26.1-.52.29-.71.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.09.1.16.2.21.33.05.12.08.25.08.38s-.03.26-.08.38Z"
      />
    </svg>
  )
}

export function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-primary-500/20 bg-primary-50/50 p-4 leading-6 text-primary-900 dark:border-primary-500/30 dark:bg-primary-500/5 dark:text-primary-200 dark:[--tw-prose-links-hover:theme(colors.primary.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-primary-500 stroke-white dark:fill-primary-200/20 dark:stroke-primary-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Warning({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-orange-500/20 bg-orange-50/50 p-4 leading-6 text-orange-900/80 dark:border-orange-500/30 dark:bg-orange-500/5 dark:text-orange-200 dark:[--tw-prose-links:theme(colors.white)] dark:[--tw-prose-links-hover:theme(colors.orange.300)]">
      <WarningIcon className="mt-1 h-5 w-5 flex-none fill-white stroke-white text-orange-500/60" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24'
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children, classNames = '' }) {
  return (
    <div className={clsx(classNames ?? 'my-6')}>
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-gray-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  type,
  children,
  isRequired = true,
  className = '',
}) {
  return (
    <li className={clsx('m-0 px-0 py-4 first:pt-0 last:pb-0', className)}>
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className="sr-only">Type</dt>
        <dd className="font-mono text-xs text-gray-400 dark:text-gray-500">
          {Array.isArray(type) ? type.join('|') : type}
        </dd>
        <dt className="sr-only">is {isRequired ? 'Required' : 'optional'}</dt>
        <dd
          className={clsx(
            'text-2xs font-medium text-gray-500 dark:text-gray-400'
          )}
        >
          {isRequired ? 'REQUIRED' : ''}
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export const table = function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <div className="lg:supports-scrollbars:pr-2 scrollbar-transparent max-h-[700px] min-w-full flex-none overflow-auto px-4 scrollbar !scrollbar-track-slate-100 !scrollbar-thumb-slate-300 scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-w-1.5 scrollbar-h-1.5 dark:!scrollbar-track-slate-500/[0.16] dark:!scrollbar-thumb-slate-500/50 sm:px-6 md:px-0 lg:max-h-[600px]">
        <table className="mt-0 w-full border-collapse text-left">{children}</table>
        <div className="sticky bottom-0 -mt-px h-px bg-slate-200 dark:bg-slate-400/20"></div>
      </div>
    </div>
  )
}

export const th = function Th({ children }) {
  return (
    <th className="min-w-[200px] w-auto max-w-xs sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
      <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">{children}</div>
    </th>
  )
}

export const td = function Td({ children }) {
  return (
    <td className="py-2 pl-2 text-xs leading-6">
      <div className="break-words">{children}</div>
    </td>
  )
}
