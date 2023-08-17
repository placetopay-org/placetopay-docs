import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LanguageSquare } from 'iconsax-react'

const LANGUAGES_CODES = {
  EN: 'en',
  ES: 'es',
}

const LANGUAGES_EN = [
  {
    name: 'English',
    code: LANGUAGES_CODES.EN,
  },
  {
    name: 'Spanish',
    code: LANGUAGES_CODES.ES,
  },
]

const LANGUAGES_ES = [
  {
    name: 'Inglés',
    code: LANGUAGES_CODES.EN,
  },
  {
    name: 'Español',
    code: LANGUAGES_CODES.ES,
  },
]

const LANGUAGES = {
  [LANGUAGES_CODES.EN]: LANGUAGES_EN,
  [LANGUAGES_CODES.ES]: LANGUAGES_ES,
}

const LANGUAGE_DEFAULT = LANGUAGES_CODES.ES

const CODES = Object.values(LANGUAGES_CODES)

export const LanguageSwitch = () => {
  const router = useRouter()

  const [language, setLanguage] = useState(
    CODES.find((code) => code === router.pathname.split('/')[1]) ??
      LANGUAGE_DEFAULT
  )

  useEffect(() => {
    const possibleLanguage = router.pathname.split('/')[1]
    if (possibleLanguage !== language && LANGUAGE_DEFAULT !== language) {
      router.push(`/${language}${router.pathname}`)
    }

    if (
      language === LANGUAGE_DEFAULT &&
      CODES.includes(possibleLanguage) &&
      possibleLanguage !== LANGUAGE_DEFAULT
    ) {
      const newPathname = router.pathname.split('/').slice(2).join('/')
      router.push(`/${newPathname}`)
    }
  }, [language, router])

  return (
    <label className="flex relative items-center w-min dark:text-white/80 dark:hover:text-white">
      <span className="sr-only">Select language</span>
      <svg
				width="1.25em"
				height="1.25em"
        className="absolute top-1/2 -translate-y-1/2 h-full pointer-events-none"
				viewBox="0 0 88.6 77.3"
				focusable="false"
				aria-hidden="true"
				role="img"
			>
				<path
					fill="currentColor"
					d="M61 24.6h7.9l18.7 51.6h-7.7l-5.4-15.5H54.3l-5.6 15.5h-7.2L61 24.6zM72.6 55l-8-22.8L56.3 55h16.3z"
				/>
				<path
					fill="currentColor"
					d="M53.6 60.6c-10-4-16-9-22-14 0 0 1.3 1.3 0 0-6 5-20 13-20 13l-4-6c8-5 10-6 19-13-2.1-1.9-12-13-13-19h8c4 9 10 14 10 14 10-8 10-19 10-19h8s-1 13-12 24c5 5 10 9 19 13l-3 7zm-52-44h56v-8h-23v-7h-9v7h-24v8z"
				/>
			</svg>
      <select
        className="bg-transparent cursor-pointer border-none outline-none pl-6 overflow-hidden text-ellipsis flex-grow appearance-none text-transparent w-6 lg:pl-7 lg:w-auto lg:text-inherit"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {LANGUAGES[language].map(({ name, code }) => (
          <option key={`language-switch-${name}-${code}`} value={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}
