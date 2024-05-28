import clsx from 'clsx'

export function Prose({ as: Component = 'div', className, ...props }) {
  return (
    <Component
      className={clsx('prose dark:prose-invert', className)}
      {...props}
    />
  )
}
