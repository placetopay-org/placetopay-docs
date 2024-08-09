import { motion, useMotionTemplate } from 'framer-motion'
import { BGPatternSmall } from "./BGPatternSmall"

export function BackgroundResourcePattern({ mouseX, mouseY, ...gridProps }) {
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