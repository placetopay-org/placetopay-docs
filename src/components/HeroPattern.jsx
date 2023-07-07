import { GridPattern } from '@/components/GridPattern'
import { BGPattern } from '@/components/BGPattern'

export function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-green-400 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-sky-300/30 dark:to-emerald-300/30 dark:opacity-100">
          <BGPattern className="absolute inset-x-0 inset-y-[-10%] w-full fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5]"></BGPattern>
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </svg>
      </div>
    </div>
  )
}
