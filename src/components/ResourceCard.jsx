import { useMouseMove } from '@/hooks/useMouseMove'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { BGPatternSmall } from '@/components/BGPatternSmall'
import Link from 'next/link'

function ResourceIcon({ icon: Icon }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/5 ring-1 ring-gray-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-gray-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-primary-300/10 dark:group-hover:ring-primary-400">
      <Icon className="h-6 w-6 fill-none stroke-gray-700 transition-colors duration-300 group-hover:stroke-gray-900 dark:stroke-gray-400 dark:group-hover:stroke-primary-400" />
    </div>
  )
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <BGPatternSmall className="group absolute inset-x-0 w-full fill-black/[0.04] stroke-black/[0.05] dark:fill-white/[0.04] dark:stroke-white/[0.05]" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-100 to-teal-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-sky-950 dark:to-teal-950"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <BGPatternSmall className="absolute inset-x-0 w-full fill-black/50 stroke-black/70 dark:fill-white/[0.04] dark:stroke-white/10" />
      </motion.div>
    </div>
  )
}

export const ResourceCard = ({
  href = null,
  icon,
  name,
  description,
  pattern = { y: 22, squares: [[0, 1]] },
}) => {
  const { mouseX, mouseY, onMouseMove } = useMouseMove()

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-gray-50 transition-shadow hover:shadow-md hover:shadow-gray-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern {...pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/7.5 group-hover:ring-gray-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-16">
        <ResourceIcon icon={icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-gray-900 dark:text-white">
          {href ? (
            <Link href={href}>
              <span className="absolute inset-0 rounded-2xl" />
              {name}
            </Link>
          ) : (
            <div>
              <span className="rounded-2xl" />
              {name}
            </div>
          )}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}
