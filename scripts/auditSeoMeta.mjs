#!/usr/bin/env node
// Audits src/pages/**/*.mdx for missing SEO metadata:
//   - Title source (either top-level `# heading` or `export const title`)
//   - `export const description` (used for <meta name="description">)
// Usage:
//   node scripts/auditSeoMeta.mjs            # human-readable report
//   node scripts/auditSeoMeta.mjs --json      # machine-readable report
//   node scripts/auditSeoMeta.mjs --strict    # exit 1 if anything is missing

import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { getPageInfo } from '../src/mdx/pageInfo.mjs'

const pagesDir = path.resolve('./src/pages')
const args = process.argv.slice(2)
const asJson = args.includes('--json')
const strict = args.includes('--strict')
const MIN_DESCRIPTION_LENGTH = 10

// Strips fenced code blocks (``` ... ```) so a `#` used inside a code sample
// (shell comment, markdown example, etc.) is never mistaken for a heading.
function stripFencedCodeBlocks(mdx) {
  return mdx.replace(/```[\s\S]*?```/g, '')
}

function hasH1(mdx) {
  const withoutCode = stripFencedCodeBlocks(mdx)
  const hasAtxH1 = /^#\s+\S/m.test(withoutCode)
  const hasSetextH1 = /^(?!\s)\S.*\n=+\s*$/m.test(withoutCode)
  return hasAtxH1 || hasSetextH1
}

function hasTitleExport(mdx) {
  return /export\s+const\s+title\b/.test(mdx)
}

function getDescription(mdx) {
  const m = mdx.match(/export\s+const\s+description\s*=\s*(["'`])([\s\S]*?)\1/)
  return m ? m[2].trim() : null
}

function hasDescription(mdx) {
  const description = getDescription(mdx)
  return description !== null && description.length >= MIN_DESCRIPTION_LENGTH
}

function main() {
  const files = glob.sync('**/*.mdx', { cwd: pagesDir })

  const missingTitle = []
  const missingDescription = []
  const missingBoth = []
  const byLocale = { es: { total: 0, missingTitle: 0, missingDescription: 0 }, en: { total: 0, missingTitle: 0, missingDescription: 0 } }

  for (const file of files) {
    const mdx = fs.readFileSync(path.join(pagesDir, file), 'utf8')
    const { url, locale } = getPageInfo(file)

    const noTitle = !(hasH1(mdx) || hasTitleExport(mdx))
    const noDescription = !hasDescription(mdx)

    byLocale[locale].total += 1
    if (noTitle) byLocale[locale].missingTitle += 1
    if (noDescription) byLocale[locale].missingDescription += 1

    if (noTitle) missingTitle.push({ file, url, locale })
    if (noDescription) missingDescription.push({ file, url, locale })
    if (noTitle && noDescription) missingBoth.push({ file, url, locale })
  }

  const summary = {
    totalPages: files.length,
    missingTitleCount: missingTitle.length,
    missingDescriptionCount: missingDescription.length,
    missingBothCount: missingBoth.length,
    byLocale,
  }

  if (asJson) {
    console.log(JSON.stringify({ summary, missingTitle, missingDescription }, null, 2))
  } else {
    console.log('SEO metadata audit — src/pages/**/*.mdx\n')
    console.log(`Total pages scanned: ${summary.totalPages}`)
    console.log(`Missing title:       ${summary.missingTitleCount}`)
    console.log(`Missing description (or < ${MIN_DESCRIPTION_LENGTH} chars): ${summary.missingDescriptionCount}`)
    console.log(`Missing both:        ${summary.missingBothCount}\n`)

    for (const locale of ['es', 'en']) {
      const s = byLocale[locale]
      console.log(`[${locale}] ${s.total} pages — missing title: ${s.missingTitle}, missing description: ${s.missingDescription}`)
    }

    console.log('\n--- Pages missing title source (H1 or export const title) ---')
    missingTitle
      .sort((a, b) => a.file.localeCompare(b.file))
      .forEach(({ file, url }) => console.log(`  ${file}  (${url})`))

    console.log(`\n--- Pages missing description (or < ${MIN_DESCRIPTION_LENGTH} chars) ---`)
    missingDescription
      .sort((a, b) => a.file.localeCompare(b.file))
      .forEach(({ file, url }) => console.log(`  ${file}  (${url})`))

    console.log('\nRun with --json for a machine-readable report.')
  }

  if (strict && (missingTitle.length || missingDescription.length)) {
    process.exit(1)
  }
}

main()
