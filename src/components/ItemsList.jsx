
import { Button } from '@/components/Button'
import Image from 'next/image'

export function ItemsList({items}) {
    return (
        <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-gray-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
              <p className="mt-4">
                <Button href={item.href} variant="text" arrow="right">
                  {item.action}
                </Button>
              </p>
            </div>
            <Image
              src={item.logo}
              alt=""
              className="h-12 w-12"
              unoptimized
            />
          </div>
        ))}
      </div>
    )
}