#!/usr/bin/env node
/**
 * Verificador de ligações internas: percorre o website a partir de "/",
 * confirma o estado HTTP de cada ligação interna e a existência das âncoras
 * (#id) referenciadas. Requer servidor em execução (BASE_URL, por omissão
 * http://localhost:3100).
 */
const BASE = process.env.BASE_URL ?? 'http://localhost:3100'
// URL canónico do website (canonical, Open Graph): não é tratado como ligação externa.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.acailangola.com'

const seen = new Map() // path -> { status, ids }
const queue = ['/']
const anchors = [] // { from, path, hash }
const external = new Set()

function extract(html, attr) {
  return [...html.matchAll(new RegExp(`${attr}="([^"]*)"`, 'g'))].map((m) => m[1].replace(/&amp;/g, '&'))
}

while (queue.length) {
  const path = queue.shift()
  if (seen.has(path)) continue
  const res = await fetch(BASE + path, { redirect: 'follow' })
  const html = res.headers.get('content-type')?.includes('text/html') ? await res.text() : ''
  seen.set(path, { status: res.status, ids: new Set(extract(html, 'id')) })
  for (const href of extract(html, 'href')) {
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith(BASE) && !href.startsWith(SITE)) external.add(href)
      continue
    }
    if (!href.startsWith('/') && !href.startsWith('#')) continue
    const url = new URL(href, BASE + path)
    if (url.pathname.startsWith('/_next/')) continue
    const target = url.pathname
    if (url.hash) anchors.push({ from: path, path: target, hash: decodeURIComponent(url.hash.slice(1)) })
    if (!seen.has(target) && !queue.includes(target)) queue.push(target)
  }
}

const broken = [...seen].filter(([, v]) => v.status >= 400 && v.status !== 404).concat(
  [...seen].filter(([p, v]) => v.status === 404 && p !== '/404'),
)
const missingAnchors = anchors.filter((a) => {
  const page = seen.get(a.path)
  return page && page.status < 400 && !page.ids.has(a.hash)
})

console.log(`Páginas verificadas: ${seen.size}`)
console.log(`Âncoras verificadas: ${anchors.length}`)
console.log(`Ligações externas encontradas (não verificadas): ${external.size}`)
for (const e of external) console.log(`  ↗ ${e}`)
if (broken.length) for (const [p, v] of broken) console.log(`  ✗ ${p} → HTTP ${v.status}`)
if (missingAnchors.length) for (const a of missingAnchors) console.log(`  ✗ ${a.from} → ${a.path}#${a.hash} (âncora inexistente)`)
const ok = broken.length === 0 && missingAnchors.length === 0
console.log(ok ? '\nTodas as ligações internas estão válidas.' : '\nForam encontradas ligações inválidas.')
process.exit(ok ? 0 : 1)
