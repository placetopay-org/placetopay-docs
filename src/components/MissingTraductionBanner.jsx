import { Check } from 'iconsax-react'

const MISSING_TRADUCTION_BANNER_TEXTS = {
  en: {
    title: 'A NOTICE',
    description:
      'Since this page is not yet available in English, you will see it in Spanish.',
  },
}

export const MissingTraductionBanner = ({ locale = 'en' }) => {
  return (
    <article className="not-prose -mt-6 mb-6 w-full rounded border-l-2 border-gray-400 bg-white/[0.2] shadow-lg shadow-gray-700/60 backdrop-blur-sm dark:bg-gray-900/[0.2] dark:text-white/90 dark:backdrop-blur dark:hover:text-white">
      <div className="mx-auto max-w-7xl p-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <div className="ml- flex flex-col gap-1 break-words">
              <h3 className="flex items-center gap-3 font-semibold">
                <span className="flex rounded-lg">
                  <Check size="24" variant="TwoTone" />
                </span>
                {MISSING_TRADUCTION_BANNER_TEXTS[locale].title}
              </h3>
              <p className="text-md leading-5 lg:leading-7">
                {MISSING_TRADUCTION_BANNER_TEXTS[locale].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
