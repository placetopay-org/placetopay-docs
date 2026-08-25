#!/usr/bin/env node
// Generates public/sitemap.xml and public/robots.txt from src/pages/**/*.mdx.
// Each <url> entry includes xhtml:link alternates for es/en/x-default so
// search engines treat the ES/EN versions as equivalents, not duplicates.

import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { getPageInfo } from '../src/mdx/pageInfo.mjs'
import { SITE_URL, absoluteUrl, getLocaleAlternates } from '../src/mdx/seo.mjs'

const pagesDir = path.resolve('./src/pages')
const publicDir = path.resolve('./public')

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildSitemapXml(entries) {
  const urls = entries
    .map(
      ({ loc, es, en }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(es)}"/>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

function main() {
  const files = glob.sync('**/*.mdx', { cwd: pagesDir })

  const entries = files.map((file) => {
    const { url } = getPageInfo(file)
    const { es, en } = getLocaleAlternates(url)
    return {
      loc: absoluteUrl(url),
      es: absoluteUrl(es),
      en: absoluteUrl(en),
    }
  })

  fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(entries))
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), buildRobotsTxt())

  console.log(`sitemap.xml generated with ${entries.length} URLs -> public/sitemap.xml (base: ${SITE_URL})`)
  console.log('robots.txt generated -> public/robots.txt')
}

main()
