# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                          # Start development server at localhost:3000
npm run build                        # Production build (static export to /out)
npm run lint                         # ESLint
npm run generate:api                 # Generate API MDX pages from OpenAPI YAML specs
npm run generate:edit-on-github-routes  # Regenerate GitHub edit routes (required before deploy)
npm run scan:sensitive               # Scan pages/assets for sensitive data patterns
```

The build requires extra heap: `NODE_OPTIONS="--max-old-space-size=8192"` is set automatically via the npm script.

## Architecture

This is a **Next.js 14 static export** documentation site for Placetopay's payment integrations. All pages are exported to `/out` and deployed to AWS via SST (`sst.config.ts`). No server-side rendering.

### Internationalization

- **Spanish (default):** pages live directly under `src/pages/` (e.g., `src/pages/checkout/create-session.mdx`)
- **English:** pages must be duplicated under `src/pages/en/` with the same path structure
- Language detection happens in `src/components/LocaleProvider.jsx` by reading the `/en` URL prefix
- Navigation constants in `src/constants/navigations.js` must be updated for both `ES` and `EN` keys in `NAMESPACES_SELECTOR` and the per-namespace navigation arrays

### Content Pages (MDX)

Pages under `src/pages/` use MDX with these conventions:
- File path from `src/pages/` maps directly to URL path
- The first `#` heading becomes the page `<title>`
- `## Second-level headings` auto-generate URL fragments; add `{{ id: 'your-id' }}` after heading text to keep IDs stable across language changes
- Export `description` from the MDX file to set the page meta description
- Export `sectionMode` (`'nav'` or `'content'`) to control sidebar vs inline section navigation

### API Reference Pages

API docs are driven by OpenAPI 3.1 YAML specs in `src/assets/apis/<scope>/es.yaml` and `en.yaml`. The API page components parse these specs at build time via `@apidevtools/swagger-parser`.

To add a new API endpoint:
1. Add the endpoint to both `src/assets/apis/<scope>/es.yaml` and `en.yaml`
2. Create or update an MDX file under `src/pages/<scope>/api-reference/`
3. Use `<ApiReader>` component (exported from `src/components/mdx.jsx`) to render the endpoint

**Avoid cyclic `$ref` references in YAML specs** — they cause a silent crash dump at build time with no clear error message.

The `npm run generate:api` script (`scripts/makeAPIDoc.js`) can scaffold API pages automatically from the YAML specs using stubs in `scripts/stubs/`.

### Navigation

Sidebar navigation is defined in `src/constants/navigations.js`. Each namespace (checkout, gateway, etc.) has its own navigation array with `title`, `href`, and optional `links` (for sub-navigation). Both ES and EN variants must be updated together.

### MDX Component Library

`src/components/mdx.jsx` exports all components available in MDX files without explicit imports:
- `<Note>`, `<Row>`, `<Col>`, `<Properties>`, `<Property>` — layout/documentation primitives
- `<ApiReader>` — renders an OpenAPI endpoint from the parsed YAML spec
- `<CodeGroup>`, `<Code>`, `<Pre>` — syntax-highlighted code blocks (Shiki, theme `css-variables`)
- `<Tabs>`, `<ImageZoom>`, `<CopyContent>`, `<GithubRepo>`, `<MissingTranslationBanner>`
- `<SequenceDiagram>` (from `src/components/react-flow/`) — interactive flow diagrams via ReactFlow

### Path Aliases

`@/` maps to `src/` (configured in `jsconfig.json`).

## Data Sanitization

All examples in `src/pages/` and `src/assets/` are scanned automatically by `scripts/scanSensitive.js` on PRs. The scanner rejects:
- `@placetopay.com` or `@evertecinc.com` email addresses
- `Bearer` tokens with 32+ hex characters
- `"login"` or `"trankey"` fields with any real-looking value

Use fictional names (`John Doe`), `@example.com` emails, standard test card numbers (`4111111111111111`), and `+1-555-0123` style phone numbers in all examples.
