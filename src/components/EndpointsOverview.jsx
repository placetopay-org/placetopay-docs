import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'

export function EndpointsOverview() {
  const router = useRouter()
  const [sections, visibleSections] = useSectionStore((s) => [
    s.sections,
    s.visibleSections,
  ])

  const endpoints = sections.filter((section) => section.tag && section.label)

  if (endpoints.length === 0) return null

  return (
    <nav aria-label="Endpoints" className="not-prose">
      <ul className="m-0 flex list-none flex-col divide-y divide-slate-200/70 p-0 dark:divide-slate-400/20">
        {endpoints.map((section) => {
          const active =
            visibleSections?.length && visibleSections[0] === section.id
          return (
            <li key={section.id} className="m-0 p-0">
              <Link
                href={`${router.pathname}#${section.id}`}
                className={clsx(
                  'group flex items-center gap-4 py-3 first:pt-0 last:pb-0',
                  active
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-900 dark:text-white'
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-sm font-semibold leading-5">
                    {section.title}
                  </span>
                  <span className="flex min-w-0 items-baseline gap-2">
                    <Tag variant="small">{section.tag}</Tag>
                    <span className="truncate font-mono text-xs text-gray-500 dark:text-gray-400">
                      {section.label}
                    </span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="h-4 w-4 flex-none text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
