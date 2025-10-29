#!/usr/bin/env node
// Minimal sensitive scan
// Finds pattern matches in allowed paths/extensions; ignores exact exceptions.

const fs = require('fs');
const path = require('path');

// Paths (relative to repo root)
const paths = [
  'src/pages',
  'src/assets'
];

// Extensions to scan (lowercase)
const extensions = [
  '.js','.ts','.tsx','.md','.mdx','.json','.yaml','.yml'
];

// Patterns to reject (regex). Add domains, tokens, emails.
const patterns = [
  /[A-Za-z0-9._%+-]+@placetopay\.com/gi,
  /[A-Za-z0-9._%+-]+@evertecinc\.com/gi,
  /Bearer\s+[0-9a-fA-F]{32,}/g,
  /"login"\s*:\s*"[^"]+"/gi, // Matches any "login": "value"
  /"trankey"\s*:\s*"[^"]+"/gi // Matches any "trankey": "value"
];

// Exact exceptions (case-insensitive compare). Add full matches you want to allow.
const exceptions = [
  'servicioposventa@placetopay.com',
  'Bearer test123abc123abc123abc123abc123abc123abc123abc123abc123abc',
  '"login": "123example456token789abc012def345"',
  '"login": "aabbccdd1234567890aabbccdd123456"',
  '"tranKey": "ABC123example456trankey+789abc012def3456ABC="'
].map(s => s.toLowerCase());

function shouldScan(file) {
  return extensions.includes(path.extname(file).toLowerCase());
}

function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    let stat; try { stat = fs.statSync(full); } catch { continue; }
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git' || entry === '.next' || entry === 'out') continue;
      walk(full, out);
    } else if (shouldScan(full)) {
      out.push(full);
    }
  }
}

function normalizeException(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}
const normalizedExceptions = exceptions.map(normalizeException);

function scanFile(file, findings) {
  let txt; try { txt = fs.readFileSync(file,'utf8'); } catch { return; }
  const lines = txt.split(/\r?\n/);
  lines.forEach((line, idx) => {
    patterns.forEach(rx => {
      rx.lastIndex = 0;
      let m;
      while ((m = rx.exec(line)) !== null) {
        const match = m[0];
        if (!normalizedExceptions.includes(normalizeException(match))) {
          findings.push({match, file, line: idx+1});
        }
      }
    });
  });
}

const files = [];
paths.forEach(p => walk(path.join(process.cwd(), p), files));

const findings = [];
files.forEach(f => scanFile(f, findings));

if (findings.length) {
  console.error('Sensitive scan FAILED');
  findings.forEach(f => console.error(`${f.match} @ ${f.file}:${f.line}`));
  console.error(`Total findings: ${findings.length}`);
  console.error('Read more in: https://github.com/placetopay-org/placetopay-docs?tab=readme-ov-file#always-take-into-account');
  process.exit(1);
} else {
  console.log('Sensitive scan PASSED');
}
