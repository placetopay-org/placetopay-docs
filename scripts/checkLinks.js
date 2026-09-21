#!/usr/bin/env node

// Verifies internal links in MDX pages and navigation constants.
// Fails (exit 1) if a link points to a page that doesn't exist,
// if an EN page links to an ES-only route (missing /en prefix),
// or if a generated code example contains a corrupted URL (backslashes).

const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const glob = require('fast-glob');

const pagesDir = path.resolve('./src/pages');
const publicDir = path.resolve('./public');

// Routes that intentionally render a page for any path (dynamic or by design)
const allowedPrefixes = [];

// --- Build the set of known routes from the MDX files ----------------------
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

// Files under /public are served at the site root, so they're valid targets.
const publicFiles = new Set(glob.sync('**/*', { cwd: publicDir, onlyFiles: true }));

const isPublicAsset = (pathname) => publicFiles.has(pathname.replace(/^\//, ''));

const isAllowed = (pathname) =>
  allowedPrefixes.some((prefix) => pathname.startsWith(prefix));

// --- Link extraction from MDX pages ----------------------------------------
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
  // markdown links: [text](/path) or [text](/path#hash)
  // jsx hrefs: href="/path", href={'/path'}, href={`/path`}
  while ((m = linkRe.exec(content))) {
    const raw = m[1] || m[3];
    if (!raw || raw.startsWith('//')) continue;

    const pathname = normalize(raw);

    if (isPublicAsset(pathname)) continue;
    if (isAllowed(pathname)) continue;

    // duplicated locale prefix: /en/en/... or /es/en/...
    if (/^\/(en|es)\/(en|es)\//.test(pathname)) {
      errors.push(`${f}: duplicated locale prefix in "${raw}"`);
      continue;
    }

    // EN page linking to a route without the /en prefix
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

// --- Navigation constants ---------------------------------------------------
// navigations.js is an ES module that imports `iconsax-react` and a React
// component, so it cannot be loaded directly from plain Node. Parsing it with
// line regexes would break silently on a Prettier reformat (a `],` that no
// longer lines up, hrefs re-quoted, etc.), disabling validation without
// anyone noticing. Instead, we load the real module with those two imports
// stubbed out and walk the exported objects.
const navFile = path.resolve('./src/constants/navigations.js');

const loadNavigationHrefs = async () => {
  const source = fs.readFileSync(navFile, 'utf8');

  const localeImport = source.match(
    /import\s*\{\s*LANGUAGES_CODES\s*\}\s*from\s*['"][^'"]+['"]/
  );
  if (!localeImport) {
    throw new Error('Could not find the LANGUAGES_CODES import in navigations.js');
  }

  const iconImport = source.match(
    /import\s*\{([^{}]*)\}\s*from\s*['"]iconsax-react['"]/
  );
  if (!iconImport) {
    throw new Error('Could not find the iconsax-react import in navigations.js');
  }

  const iconStubs = iconImport[1]
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => `const ${name} = { stub: true };`)
    .join('\n');

  const stubbed = source
    .replace(
      /import\s*\{\s*LANGUAGES_CODES\s*\}\s*from\s*['"][^'"]+['"]/,
      "const LANGUAGES_CODES = { EN: 'en', ES: 'es' };"
    )
    .replace(iconImport[0], iconStubs);

  // The temp file is written as .mjs so Node treats it as an ES module.
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nav-check-'));
  const tmpFile = path.join(tmpDir, 'navigations.mjs');
  fs.writeFileSync(tmpFile, stubbed);

  let nav;
  try {
    nav = await import(pathToFileURL(tmpFile).href);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  const hrefs = [];
  const record = (node, locale, sourceName) => {
    if (Array.isArray(node)) {
      node.forEach((item, index) =>
        record(item, locale, `${sourceName}[${index}]`)
      );
      return;
    }
    if (!node || typeof node !== 'object') return;
    if (typeof node.href === 'string') {
      hrefs.push({
        pathname: normalize(node.href),
        locale,
        source: `${sourceName}.href`,
      });
    }
    for (const key of Object.keys(node)) {
      if (key !== 'href') record(node[key], locale, `${sourceName}.${key}`);
    }
  };

  for (const locale of ['es', 'en']) {
    const selector = nav.NAMESPACES_SELECTOR?.[locale];
    if (Array.isArray(selector)) {
      selector.forEach((item, index) =>
        record(item, locale, `NAMESPACES_SELECTOR[${locale}][${index}]`)
      );
    }
  }

  for (const ns of Object.keys(nav.TAB_NAVIGATION || {})) {
    for (const locale of ['es', 'en']) {
      const list = nav.TAB_NAVIGATION[ns]?.[locale];
      if (Array.isArray(list)) {
        list.forEach((item, index) =>
          record(item, locale, `TAB_NAVIGATION.${ns}[${locale}][${index}]`)
        );
      }
    }
  }

  return hrefs;
};

// --- Corrupted URLs in code examples ----------------------------------------
const corruptedRe = /https?:[\\/]+[A-Za-z0-9.-]+[\\/]+[^\s`"']*\\/g;
files.forEach((f) => {
  const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  let m;
  while ((m = corruptedRe.exec(content))) {
    errors.push(`${f}: corrupted URL in example "${m[0]}"`);
  }
});

(async () => {
  try {
    const navHrefs = await loadNavigationHrefs();

    navHrefs.forEach(({ pathname, locale, source }) => {
      if (isPublicAsset(pathname) || isAllowed(pathname)) return;

      if (locale === 'en' && !pathname.startsWith('/en')) {
        errors.push(`${source}: href "${pathname}" must start with /en`);
        return;
      }
      if (locale === 'es' && pathname.startsWith('/en')) {
        errors.push(`${source}: href "${pathname}" must not start with /en`);
        return;
      }
      if (!isKnownRoute(pathname)) {
        errors.push(`${source}: href "${pathname}" points to a page that does not exist`);
      }
    });

    warnings.forEach((w) => console.warn(`[warn] ${w}`));

    if (errors.length > 0) {
      console.error(`\n${errors.length} broken-link error(s) found:\n`);
      errors.forEach((e) => console.error(`  ✗ ${e}`));
      process.exit(1);
    }

    console.log(`✓ No broken internal links (${files.length} pages scanned).`);
  } catch (err) {
    console.error(`checkLinks.js failed: ${err.message}`);
    process.exit(1);
  }
})();
