import Link from 'next/link'
import clsx from 'clsx'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary:
    'rounded-full bg-gray-900 py-1 px-3 text-white hover:bg-gray-700 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-1 dark:ring-inset dark:ring-primary-400/20 dark:hover:bg-primary-400/10 dark:hover:text-primary-300 dark:hover:ring-primary-300',
  secondary:
    'rounded-full bg-gray-100 py-1 px-3 text-gray-900 hover:bg-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:ring-1 dark:ring-inset dark:ring-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-300',
  filled:
    'rounded-full bg-gray-900 py-1 px-3 text-white hover:bg-gray-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400',
  outline:
    'rounded-full py-1 px-3 text-gray-700 ring-1 ring-inset ring-gray-900/10 hover:bg-gray-900/2.5 hover:text-gray-900 dark:text-gray-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500',
}

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}) {
  let Component = props.href ? Link : 'button'

  className = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
    variantStyles[variant],
    className
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  )

  return (
    <Component className={className} {...props}>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  )
}
