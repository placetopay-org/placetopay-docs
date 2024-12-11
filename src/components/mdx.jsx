import Link from 'next/link'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Heading } from '@/components/Heading'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'
export { ApiReader } from '@/components/ApiReader'
export { CopyContent } from '@/components/CopyContent'
export { MissingTranslationBanner } from '@/components/MissingTranslationBanner'
export { GithubRepo } from '@/components/GithubRepo'
import { ImageZoom } from '@/components/ImageZoom'
import { Note } from '@/components/Note'
export { ImageZoom, Note }

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

export const img = function Img({ zoom = true, ...props }) {
  return zoom === false ? (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ) : (
    <ImageZoom
      {...props}
      className={twMerge(
        'my-0 h-auto w-full cursor-pointer rounded-md shadow transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110',
        props.className
      )}
    />
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
  multiProperties = [],
  selected = 0,
  onSelected = () => {},
  className = '',
}) {
  const isMulti = multiProperties.length > 0

  const getType = () => {
    if (isMulti) {
      return (
        <select
          className="bg-inherit"
          value={selected}
          onChange={(e) => onSelected(e.target.value)}
        >
          {multiProperties.map((prop, index) => (
            <option
              key={`${name.replace(' ', '-')}-${index}`}
              value={index}
            >
              {prop.title ?? prop.type}
            </option>
          ))}
        </select>
      )
    }

    return Array.isArray(type) ? type.join('|') : type;
  }

  return (
    <li className={clsx('m-0 px-0 py-4 first:pt-0 last:pb-0', className)}>
      <dl className="m-0 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex gap-x-3 items-center">
          <dt className="sr-only">Name</dt>
          <dd>          
            <code>{name}</code>
          </dd>
          <dt className="sr-only">Type</dt>
          <dd className="font-mono text-xs text-gray-400 dark:text-gray-500">
            {getType()}
          </dd>
        </div>
        <dt className="sr-only">is {isRequired ? 'Required' : 'optional'}</dt>
        <dd
          className={clsx(
            'text-2xs font-medium text-teal-500 dark:text-teal-300'
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
        <table className="mt-0 w-full border-collapse text-left">
          {children}
        </table>
        <div className="sticky bottom-0 -mt-px h-px bg-slate-200 dark:bg-slate-400/20"></div>
      </div>
    </div>
  )
}

export const th = function Th({ children }) {
  return (
    <th className="sticky top-0 z-10 w-auto min-w-[200px] max-w-xs bg-white p-0 text-sm font-semibold leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <div className="border-b border-slate-200 py-2 pl-2 dark:border-slate-400/20">
        {children}
      </div>
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
