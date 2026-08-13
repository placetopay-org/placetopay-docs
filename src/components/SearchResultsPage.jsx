import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { useLocalizePath } from '@/hooks/useLocalizePath'
import { useLocale } from '@/components/LocaleProvider'

const PAGE_SIZE = 20
const MAX_RESULTS = 500

const COPY = {
  es: {
    title: 'Resultados de búsqueda',
    placeholder: 'Buscar...',
    searching: 'Buscando...',
    empty: 'No se encontraron resultados para',
    resultsFor: 'resultados para',
    prev: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',
  },
  en: {
    title: 'Search results',
    placeholder: 'Search...',
    searching: 'Searching...',
    empty: 'No results found for',
    resultsFor: 'results for',
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
  },
}

function useSearchResults(query) {
  const [results, setResults] = useState(null)
  const { locale } = useLocale()

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    let cancelled = false
    setResults(null)

    import('@/mdx/search.mjs').then(({ search }) => {
      if (cancelled) return
      const seenPages = new Set()
      const items = search(query, { limit: MAX_RESULTS })
        .filter((item) => item.locale === locale)
        .filter((item) => {
          const page = item.url.split('#')[0]
          if (seenPages.has(page)) return false
          seenPages.add(page)
          return true
        })
      setResults(items)
    })

    return () => {
      cancelled = true
    }
  }, [query])

  return results
}

function ResultItem({ result }) {
  const localizePath = useLocalizePath()
  const hierarchy = [result.pageTitle].filter(Boolean)

  return (
    <li className="border-b border-gray-100 py-4 last:border-0 dark:border-gray-800">
      <Link
        href={localizePath(result.url)}
        className="text-base font-medium text-primary-500 no-underline hover:underline"
      >
        {result.title.trim()}
      </Link>
      {hierarchy.length > 0 && (
        <div className="mt-1 text-2xs text-gray-500">
          {hierarchy.join(' / ')}
        </div>
      )}
      <div className="mt-1 font-mono text-2xs text-gray-400 dark:text-gray-500">
        {result.url}
      </div>
    </li>
  )
}

export function SearchResultsPage() {
  const router = useRouter()
  const { locale } = useLocale()
  const [inputValue, setInputValue] = useState('')
  const copy = COPY[locale] ?? COPY.es

  const query = typeof router.query.q === 'string' ? router.query.q.trim() : ''
  const page = Math.max(1, parseInt(router.query.page, 10) || 1)

  useEffect(() => {
    setInputValue(query)
  }, [query])

  const results = useSearchResults(query)

  const pageCount = useMemo(
    () => (results ? Math.max(1, Math.ceil(results.length / PAGE_SIZE)) : 1),
    [results]
  )
  const currentPage = Math.min(page, pageCount)
  const pageResults = useMemo(
    () =>
      results
        ? results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        : [],
    [results, currentPage]
  )

  const goTo = (newQuery, newPage = 1) => {
    const queryParam = newQuery ? `?q=${encodeURIComponent(newQuery)}` : ''
    const pageParam = newPage > 1 ? `${newQuery ? '&' : '?'}page=${newPage}` : ''
    router.push(`${router.pathname}${queryParam}${pageParam}`)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    goTo(inputValue.trim(), 1)
  }

  return (
    <>
      <Head>
        <title>{`${copy.title} - Placetopay Docs`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>{copy.title}</h1>

      <form onSubmit={onSubmit} className="not-prose mb-8">
        <input
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={copy.placeholder}
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-900 outline-none focus:border-primary-500 dark:border-gray-700 dark:text-white"
        />
      </form>

      {query && (
        <p className="text-sm text-gray-500">
          {results === null
            ? copy.searching
            : `${results.length} ${copy.resultsFor} “${query}”`}
        </p>
      )}

      {results !== null && results.length === 0 && query && (
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {copy.empty} <strong>“{query}”</strong>.
        </p>
      )}

      {pageResults.length > 0 && (
        <ul className="not-prose m-0 list-none p-0">
          {pageResults.map((result) => (
            <ResultItem key={result.url} result={result} />
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav className="not-prose mt-8 flex items-center justify-between text-sm">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => goTo(query, currentPage - 1)}
            className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-40 dark:border-gray-700"
          >
            {copy.prev}
          </button>
          <span className="text-gray-500">
            {copy.page} {currentPage} {copy.of} {pageCount}
          </span>
          <button
            type="button"
            disabled={currentPage >= pageCount}
            onClick={() => goTo(query, currentPage + 1)}
            className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-40 dark:border-gray-700"
          >
            {copy.next}
          </button>
        </nav>
      )}
    </>
  )
}
