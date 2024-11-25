import { useMouseMove } from '@/hooks/useMouseMove'
import { BackgroundResourcePattern } from './BackgroundResourcePattern'
import { ArrowRight } from 'iconsax-react'

function Icon({ icon: Icon }) {
  return (
    <div className="flex items-center justify-center overflow-hidden pt-6 px-2 md:pt-3">
      <Icon className="welcome-icons w-72 h-52 md:h-36 md:w-44 transition-colors duration-300" />
    </div>
  )
}

export const HomeCard = ({ title, description, href, icon, action }) => {
  const { mouseX, mouseY, onMouseMove } = useMouseMove()
  return (
    <a
      href={href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-gray-50 transition-shadow hover:shadow-md hover:shadow-gray-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5 "
    >
      <BackgroundResourcePattern mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/7.5 group-hover:ring-gray-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="flex flex-col relative rounded-2xl">
        <Icon icon={icon} />
        <div className="flex flex-1 flex-col justify-between min-h-fit -mt-4 px-3 pb-3">
          <div>
            <h3 className="mt-4 text-center text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-center text-[12px] leading-4 text-gray-400">
              {description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-primary-400">
              {action}
            </span>

            <ArrowRight className="h-4 w-4 text-primary-400" />
          </div>
        </div>
      </div>
    </a>
  )
}
