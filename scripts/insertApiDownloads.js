/**
 * One-time codemod: inserts `<ApiDownloads />` near the top of every MDX
 * reference page that renders API endpoints with `<ApiReader />`.
 * Skips pages that already include the component.
 */
const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages')

const main = () => {
  const files = glob
    .sync('**/*.mdx', { cwd: PAGES_DIR })
    .map((file) => path.join(PAGES_DIR, file))
    .filter((file) => {
      const content = fs.readFileSync(file, 'utf8')
      return content.includes('<ApiReader') && !content.includes('<ApiDownloads')
    })

  let updated = 0

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const lines = content.split('\n')

    // Insertion point: right before the first `## ` heading, so the control
    // sits at the end of the page intro. If the page has no `## ` sections,
    // it goes right after the `# ` heading. Fallback: before `<ApiReader`.
    let index = lines.findIndex((line) => line.startsWith('## '))
    if (index === -1) {
      const h1 = lines.findIndex((line) => line.startsWith('# '))
      index = h1 === -1 ? lines.findIndex((line) => line.includes('<ApiReader')) : h1 + 1
    }
    if (index === -1 || index >= lines.length) continue

    lines.splice(index, 0, '<ApiDownloads />', '')
    fs.writeFileSync(file, lines.join('\n'))
    updated++
  }

  console.log(`Inserted <ApiDownloads /> in ${updated} files`)
}

main()
