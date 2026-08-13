import { createLoader } from 'simple-functional-loader'
import glob from 'fast-glob'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import * as url from 'url'
import * as path from 'path'
import * as fs from 'fs'
import { visit, SKIP } from 'unist-util-visit'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import { toString } from 'mdast-util-to-string'
import { filter } from 'unist-util-filter'

const __filename = url.fileURLToPath(import.meta.url)
const processor = remark().use(remarkMdx).use(extractSections)
const slugify = slugifyWithCounter()

const SUPPORTED_LOCALES = ['es', 'en']
const API_SECTIONS_FILE = path.resolve('./.cache/search/api-sections.json')

function isObjectExpression(node) {
  return (
    node.type === 'mdxTextExpression' &&
    node.data?.estree?.body?.[0]?.expression?.type === 'ObjectExpression'
  )
}

function excludeObjectExpressions(tree) {
  return filter(tree, (node) => !isObjectExpression(node))
}

function getSlugify(tree, content) {
  const child = tree.children?.find((node) => node.type === 'mdxTextExpression')
  if (child && isObjectExpression(child)) {
    try {
      const idToHash = child.data?.estree?.body?.[0]?.expression?.properties?.find(
        (prop) => prop.key.name === 'id'
      )?.value?.value;
      if (idToHash) {
        return slugify(idToHash)
      }
    } catch (e) {
      console.log('[ERROR:getSlugify:JSON::parse]', e, child.value)
    }
  }

  return slugify(content)
}

function extractSections() {
  return (tree, { sections }) => {
    slugify.reset()

    visit(tree, (node) => {
      if (node.type === 'heading' || node.type === 'paragraph') {
        let content = toString(excludeObjectExpressions(node))
        if (node.type === 'heading' && node.depth <= 3) {
          let hash = node.depth === 1 ? null : getSlugify(node, content)
          let label
          if (node.depth === 2) {
            try {
              label = node.children
                ?.find((child) => isObjectExpression(child))
                ?.data?.estree?.body?.[0]?.expression?.properties?.find(
                  (prop) => prop.key.name === 'label'
                )?.value?.value
            } catch {
              label = undefined
            }
          }
          sections.push([content, hash, [], label])
        } else {
          sections.at(-1)?.[2].push(content)
        }
        return SKIP
      }
    })
  }
}

function loadApiSections() {
  try {
    return JSON.parse(fs.readFileSync(API_SECTIONS_FILE, 'utf8'))
  } catch {
    console.warn(
      `[search] API sections artifact not found at ${API_SECTIONS_FILE}. ` +
        'Run `node scripts/makeSearchIndex.js` to include API reference content in the search index.'
    )
    return {}
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let pagesDir = path.resolve('./src/pages')
            this.addContextDependency(pagesDir)

            let apiSections = loadApiSections()

            let files = glob.sync('**/*.mdx', { cwd: pagesDir })
            let data = files.map((file) => {
              let url = file.replace(/\.mdx$/, '')
              url =
                url === 'index' ? '/' : `/${url.replace(/\/index$/, '')}`
              let mdx = fs.readFileSync(path.join(pagesDir, file), 'utf8')
              let firstSegment = path
                .dirname(file)
                .split(path.sep)[0]
                .replace('/', '')
              let locale = SUPPORTED_LOCALES.includes(firstSegment)
                ? firstSegment
                : 'es'

              let sections = []

              if (cache.get(file)?.[0] === mdx) {
                sections = cache.get(file)[1]
              } else {
                let vfile = { value: mdx, sections }
                processor.runSync(processor.parse(vfile), vfile)
                cache.set(file, [mdx, sections])
              }

              // Attach the API reference sections (generated at prebuild) to
              // the level-2 section that documents the operation (matched by
              // the heading `label` annotation), so searching a field,
              // operation path or response code leads to the operation anchor.
              let pageApiSections = apiSections[url]
              if (pageApiSections) {
                let fallback = sections.find(([, hash]) => hash !== null)
                for (let apiSection of Object.values(pageApiSections)) {
                  let target =
                    sections.find(
                      ([, hash, , label]) =>
                        hash !== null &&
                        label &&
                        apiSection.path.startsWith(label)
                    ) ?? fallback
                  if (target) {
                    target[2].push(apiSection.content)
                  } else {
                    sections.push([apiSection.title, null, [apiSection.content]])
                  }
                }
              }

              return { url, sections, locale }
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              function createIndex() {
                return new FlexSearch.Document({
                  tokenize: 'full',
                  document: {
                    id: 'url',
                    index: 'content',
                    store: ['title', 'pageTitle', 'locale'],
                  },
                  context: {
                    resolution: 9,
                    depth: 2,
                    bidirectional: true
                  }
                })
              }

              let indexes = { es: createIndex(), en: createIndex() }

              let data = ${JSON.stringify(data)}

              for (let { url, sections, locale } of data) {
                let index = indexes[locale] ?? indexes.es
                for (let [title, hash, content] of sections) {
                  index.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    locale,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                  })
                }
              }

              export function search(query, { locale, ...options } = {}) {
                let index = indexes[locale] ?? indexes.es
                let result = index.search(query, {
                  ...options,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }
                return result[0].result.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.pageTitle,
                  locale: item.doc.locale,
                }))
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
