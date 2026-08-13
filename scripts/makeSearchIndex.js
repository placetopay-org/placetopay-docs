import glob from 'fast-glob'
import * as acorn from 'acorn'
import path from 'path'
import fs from 'fs'
import { extractApiSections } from '../src/mdx/apiSearchSections.mjs'

const pagesDir = path.resolve('./src/pages')
const outputDir = path.resolve('./.cache/search')
const outputFile = path.join(outputDir, 'api-sections.json')

const SUPPORTED_LOCALES = ['es', 'en']

function getPageInfo(file) {
  const firstSegment = path.dirname(file).split(path.sep)[0].replace('/', '')
  const locale = SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : 'es'
  const url = file === 'index.mdx' ? '/' : `/${file.replace(/\.mdx$/, '')}`
  return { url, locale }
}

function evaluateLiteral(node) {
  if (!node) return undefined
  if (node.type === 'Literal') return node.value
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.cooked
  }
  if (node.type === 'ArrayExpression') {
    return node.elements.map(evaluateLiteral)
  }
  return undefined
}

// Extracts the values of `export const apiRefs = [...]` and
// `export const apiAssetPath = '...'` from an MDX file by parsing only the
// export statements with acorn (the rest of the MDX is not valid JS).
function extractApiMetadata(mdx) {
  const apiRefs = []
  let apiAssetPath = null

  const exportRegex = /export\s+const\s+(apiRefs|apiAssetPath)\s*=\s*([^;\n]+)/g
  let match
  while ((match = exportRegex.exec(mdx)) !== null) {
    const [, name, rawValue] = match
    try {
      const expression = acorn.parseExpressionAt(rawValue.trim(), 0, {
        ecmaVersion: 'latest',
      })
      const value = evaluateLiteral(expression)
      if (name === 'apiRefs' && Array.isArray(value)) {
        apiRefs.push(...value)
      } else if (name === 'apiAssetPath' && typeof value === 'string') {
        apiAssetPath = value
      }
    } catch {
      // skip unparsable export values
    }
  }

  return { apiRefs, apiAssetPath }
}

async function main() {
  const files = glob.sync('**/*.mdx', { cwd: pagesDir })
  const result = {}
  let indexedPages = 0

  for (const file of files) {
    const mdx = fs.readFileSync(path.join(pagesDir, file), 'utf8')
    if (!mdx.includes('apiRefs')) continue

    const { apiRefs, apiAssetPath } = extractApiMetadata(mdx)
    if (!apiRefs || apiRefs.length === 0) continue

    const { url, locale } = getPageInfo(file)

    try {
      const sections = await extractApiSections({
        file,
        apiRefs,
        apiAssetPath,
        locale,
        SUPPORTED_LOCALES,
      })

      if (Object.keys(sections).length > 0) {
        result[url] = sections
        indexedPages += 1
      }
    } catch (error) {
      console.warn(`[search-index] Could not extract API sections for ${file}: ${error.message}`)
    }
  }

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputFile, JSON.stringify(result))
  const kb = (fs.statSync(outputFile).size / 1024).toFixed(1)
  console.log(`[search-index] Generated ${outputFile} (${kb} KB, ${indexedPages} pages with API sections)`)
}

await main()
