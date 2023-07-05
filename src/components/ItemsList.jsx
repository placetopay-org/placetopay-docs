
import { Button } from '@/components/Button'
import Image from 'next/image'

export function ItemList({name, description, href, action, logo}){
  return (
    <div className="flex flex-row-reverse gap-6">
      <div className="flex-auto">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <p className="mt-4">
          {action && (
            <Button href={href} variant="text" arrow="right">
              {action}
            </Button>
          )}
        </p>
      </div>
      {logo && (
        <Image
          src={logo}
          alt=""
          className="h-12 w-12"
          unoptimized
        />
      )}
    </div>
  )
}

export function ItemListAlt({name, description, href, action, logo}){
  return (
    <div className="flex flex-row-reverse gap-6 ring-1 ring-inset ring-gray-900/10 rounded-xl">
      <div className="flex-auto p-4">
        <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <p className="mt-2">
          {action && (
            <Button href={href} variant="text" arrow="right">
              {action}
            </Button>
          )}
        </p>
      </div>
      {logo && (
        <Image
          src={logo}
          alt=""
          className="h-12 w-12"
          unoptimized
        />
      )}
    </div>
  )
}

export function ItemsList({items}) {
    return (
        <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-gray-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {items.map((item) => (
          <ItemList key={item.name} {...item}></ItemList>
        ))}
      </div>
    )
}