#!/usr/bin/env node
// Verifies internal links in MDX pages and navigation constants.
// Fails (exit 1) if any link points to a page that doesn't exist,
// if an EN page links to an ES-only route (missing /en prefix),
// or if a generated code example contains a corrupted URL (backslashes).

const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

const pagesDir = path.resolve('./src/pages');
const publicDir = path.resolve('./public');

// Routes that intentionally render a page for any path (dynamic or by design)
const allowedPrefixes = [];

// --- Build route sets -----------------------------------------------------
const files = glob.sync('**/*.mdx', { cwd: pagesDir });

const routesEs = new Set();
const routesEn = new Set();

files.forEach((f) => {
  // 'index.mdx' -> '/', 'foo.mdx' -> '/foo', 'foo/index.mdx' -> '/foo'
  let url = f.replace(/\.mdx$/, '');
  if (url === 'index' || url.endsWith('/index')) {
    url = url === 'index' ? '' : url.slice(0, -'/index'.length);
  }
  url = ('/' + url).replace(/\/+/g, '/').replace(/\/$/, '') || '/';

  if (f.startsWith('en/')) {
    routesEn.add(url);
  } else {
    routesEs.add(url);
  }
});

const isKnownRoute = (pathname) =>
  routesEs.has(pathname) || routesEn.has(pathname) || pathname === '/';

// Files in /public are served at the root, so they're valid href targets.
const publicFiles = new Set(glob.sync('**/*', { cwd: publicDir, onlyFiles: true }));

const isPublicAsset = (pathname) => publicFiles.has(pathname.replace(/^\//, ''));

const isAllowed = (pathname) =>
  allowedPrefixes.some((prefix) => pathname.startsWith(prefix));

// --- Link extraction -------------------------------------------------------
// markdown links: [text](/path) or [text](/path#hash)
// jsx hrefs: href="/path", href={'/path'}, href={`/path`}
const linkRe =
  /\]\(\s*(\/[^\s)#)]+)(#[^)]*)?\s*\)|href=["'{`]\s*(\/[^\s)#"'}`]+)/g;

const normalize = (href) => {
  let p = href.split('#')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
};

const errors = [];
const warnings = [];

files.forEach((f) => {
  const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  const isEn = f.startsWith('en/');
  let m;
  while ((m = linkRe.exec(content))) {
    const raw = m[1] || m[3];
    if (!raw || raw.startsWith('//')) continue;

    const pathname = normalize(raw);

    // assets under /public
    if (isPublicAsset(pathname)) continue;
    if (isAllowed(pathname)) continue;

    // duplicated locale prefix: /en/en/... or /es/en/...
    if (/^\/(en|es)\/(en|es)\//.test(pathname)) {
      errors.push(`${f}: duplicated locale prefix in "${raw}"`);
      continue;
    }

    // EN page linking to a route without /en prefix
    if (isEn && !pathname.startsWith('/en') && routesEn.has(`/en${pathname}`)) {
      errors.push(
        `${f}: "${raw}" exists in EN as "/en${pathname}" but the link lacks the locale prefix`
      );
      continue;
    }

    if (isEn && !pathname.startsWith('/en') && !isKnownRoute(pathname)) {
      errors.push(`${f}: link "${raw}" points to a page that does not exist`);
      continue;
    }

    if (!isEn && !isKnownRoute(pathname)) {
      errors.push(`${f}: link "${raw}" points to a page that does not exist`);
      continue;
    }

    // ES link that only exists in EN (informational)
    if (!isEn && routesEn.has(`/en${pathname}`) && !routesEs.has(pathname)) {
      warnings.push(`${f}: "${raw}" only exists in English`);
    }
  }
});

// --- Navigation constants --------------------------------------------------
const navFile = path.resolve('./src/constants/navigations.js');
const navLines = fs.readFileSync(navFile, 'utf8').split('\n');

// A language block opens with `[LANGUAGES_CODES.XX]: [` and closes with the
// first line that is exactly `],` at the same indentation level.
const hrefRe = /href:\s*'(\/[^']*)'/;

let block = null; // 'ES' | 'EN' | null
let blockIndent = 0;

navLines.forEach((line, i) => {
  const open = line.match(/^(\s*)\[LANGUAGES_CODES\.(ES|EN)\]:\s*\[/);
  if (open) {
    block = open[2];
    blockIndent = open[1].length;
    return;
  }
  if (!block) return;

  const indent = (line.match(/^(\s*)/) || [, ''])[1].length;
  if (line.trim() === '],' && indent === blockIndent) {
    block = null;
    return;
  }

  const h = line.match(hrefRe);
  if (!h) return;

  const pathname = normalize(h[1]);
  const loc = `navigations.js:${i + 1} [${block}]`;

  if (isPublicAsset(pathname) || isAllowed(pathname)) return;

  if (block === 'EN' && !pathname.startsWith('/en')) {
    errors.push(`${loc}: href "${pathname}" must start with /en`);
    return;
  }
  if (block === 'ES' && pathname.startsWith('/en')) {
    errors.push(`${loc}: href "${pathname}" must not start with /en`);
    return;
  }
  if (!isKnownRoute(pathname)) {
    errors.push(`${loc}: href "${pathname}" points to a page that does not exist`);
  }
});

// --- Corrupted URLs in code examples ---------------------------------------
const corruptedRe = /https?:[\\/]+[A-Za-z0-9.-]+[\\/]+[^\s`"']*\\/g;
files.forEach((f) => {
  const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  let m;
  while ((m = corruptedRe.exec(content))) {
    errors.push(`${f}: corrupted URL in example "${m[0]}"`);
  }
});

// --- Report ----------------------------------------------------------------
warnings.forEach((w) => console.warn(`[warn] ${w}`));

if (errors.length > 0) {
  console.error(`\n${errors.length} broken-link error(s) found:\n`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}

console.log(`✓ No broken internal links (${files.length} pages scanned).`);
