import clsx from 'clsx'

const variantStyles = {
  medium: 'rounded-lg px-1.5 ring-1 ring-inset',
}

const colorStyles = {
  primary: {
    small: 'text-primary-500 dark:text-primary-400',
    medium:
      'ring-primary-300 dark:ring-primary-400/30 bg-primary-400/10 text-primary-500 dark:text-primary-400',
  },
  sky: {
    small: 'text-sky-500',
    medium:
      'ring-sky-300 bg-sky-400/10 text-sky-500 dark:ring-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400',
  },
  amber: {
    small: 'text-amber-500',
    medium:
      'ring-amber-300 bg-amber-400/10 text-amber-500 dark:ring-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400',
  },
  rose: {
    small: 'text-red-500 dark:text-rose-500',
    medium:
      'ring-rose-200 bg-rose-50 text-red-500 dark:ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-400',
  },
  gray: {
    small: 'text-gray-400 dark:text-gray-500',
    medium:
      'ring-gray-200 bg-gray-50 text-gray-500 dark:ring-gray-500/20 dark:bg-gray-400/10 dark:text-gray-400',
  },
}

const valueColorMap = {
  get: 'primary',
  post: 'sky',
  put: 'amber',
  delete: 'rose',
}

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children.toLowerCase()] ?? 'primary',
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem] font-semibold leading-6',
        variantStyles[variant],
        colorStyles[color][variant]
      )}
    >
      {children}
    </span>
  )
}
