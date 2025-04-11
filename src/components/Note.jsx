import { twJoin } from "tailwind-merge"

const NoteType = {
  default: {
    icon: InfoIcon,
    container:
      'border-primary-500/20 bg-primary-50/50 text-primary-900 dark:border-primary-500/30 dark:bg-primary-500/5 dark:text-primary-200 dark:[--tw-prose-links-hover:theme(colors.primary.300)] dark:[--tw-prose-links:theme(colors.white)]',
    iconClasses:
      'fill-primary-500 stroke-white dark:fill-primary-200/20 dark:stroke-primary-200',
  },
  warning: {
    icon: WarningIcon,
    container:
      'border-orange-500/20 bg-orange-50/50 text-orange-900/80 dark:border-orange-500/30 dark:bg-orange-500/5 dark:text-orange-200 dark:[--tw-prose-links-hover:theme(colors.orange.300)] dark:[--tw-prose-links:theme(colors.white)]',
    iconClasses: 'fill-white stroke-white text-orange-500/60',
  },
  error: {
    icon: ErrorIcon,
    container:
      'border-red-500/20 bg-red-50/50 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-200 dark:[--tw-prose-links-hover:theme(colors.red.300)] dark:[--tw-prose-links:theme(colors.white)]',
    iconClasses: 'fill-red-500 stroke-white dark:fill-red-200/20 dark:stroke-red-200',
  },
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

function ErrorIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.99 2a9.99 9.99 0 1 0 0 19.98A9.99 9.99 0 0 0 11.99 2ZM13 15a1 1 0 0 1-2 0v-2a1 1 0 0 1 2 0v2Zm0-4a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v3Z"
      />
    </svg>
  )
}


export function Note({ children, type = 'default' }) {
  const { icon: Icon, container, iconClasses } = NoteType[type]
  return (
    <div
      className={twJoin(
        'my-6 flex gap-2.5 rounded-2xl border p-4 leading-6',
        container
      )}
    >
      <Icon className={twJoin('mt-1 h-4 w-4 flex-none', iconClasses)} />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
