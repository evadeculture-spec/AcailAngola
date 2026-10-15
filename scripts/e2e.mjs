#!/usr/bin/env node
/**
 * Testes funcionais E2E com Chromium (playwright-core).
 *
 * Uso: npm run build && npm run test:e2e
 * Variáveis: BASE_URL (servidor já em execução; caso contrário é iniciado
 * `next start` na porta 3210), CHROMIUM_PATH (executável do Chromium).
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright-core'

const PORT = 3210
let BASE = process.env.BASE_URL
let server

const CHROMIUM_CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean)
const executablePath = CHROMIUM_CANDIDATES.find((p) => existsSync(p))

async function startServer() {
  server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', env: process.env })
  BASE = `http://localhost:${PORT}`
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('O servidor não arrancou. Execute `npm run build` primeiro.')
}

const results = []
async function test(name, fn) {
  const t0 = Date.now()
  try {
    await fn()
    results.push({ name, ok: true, ms: Date.now() - t0 })
    console.log(`  ✓ ${name}`)
  } catch (e) {
    results.push({ name, ok: false, ms: Date.now() - t0, error: String(e?.message ?? e) })
    console.log(`  ✗ ${name}\n      ${String(e?.message ?? e).split('\n').join('\n      ')}`)
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function routesFromSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  return [...new Set([...urls, '/politica-de-privacidade', '/politica-de-cookies'])]
}

async function auditPage(browser, path, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle' })
  const info = await page.evaluate(() => {
    const imgs = [...document.images]
    return {
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      lang: document.documentElement.lang,
      imgNoAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
      brokenImg: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      svgNoLabel: [...document.querySelectorAll('svg[role="img"]')].filter((s) => !s.getAttribute('aria-label')).length,
      emptyLinks: [...document.querySelectorAll('a')].filter(
        (a) => !a.textContent?.trim() && !a.getAttribute('aria-label') && !a.querySelector('[aria-label], img[alt]') && a.getAttribute('aria-hidden') !== 'true',
      ).length,
      unlabeledButtons: [...document.querySelectorAll('button')].filter((b) => !b.textContent?.trim() && !b.getAttribute('aria-label')).length,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].every((s) => {
        try {
          JSON.parse(s.textContent ?? '')
          return true
        } catch {
          return false
        }
      }),
    }
  })
  await ctx.close()
  return { status: res?.status() ?? 0, errors, ...info }
}

async function main() {
  if (!executablePath) throw new Error('Chromium não encontrado. Defina CHROMIUM_PATH.')
  if (!BASE) await startServer()
  const browser = await chromium.launch({ executablePath })
  const routes = await routesFromSitemap()
  console.log(`\nBase: ${BASE} · ${routes.length} rotas\n`)

  console.log('Auditoria de páginas (360/1440 px em todas as rotas; 390/768/1024/1920 px nas principais)')
  const main = ['/', '/empresa', '/areas-de-negocio', '/areas-de-negocio/produtos-siderurgicos', '/produtos', '/produtos/varao-de-construcao', '/projetos', '/noticias', '/contactos']
  const matrix = [
    ...routes.flatMap((r) => [360, 1440].map((w) => [r, w])),
    ...main.flatMap((r) => [390, 768, 1024, 1920].map((w) => [r, w])),
  ]
  const failures = []
  for (const [route, width] of matrix) {
    const a = await auditPage(browser, route, width)
    const problems = []
    if (a.status !== 200) problems.push(`HTTP ${a.status}`)
    if (a.overflow > 0) problems.push(`scroll horizontal de ${a.overflow}px`)
    if (a.h1 !== 1) problems.push(`${a.h1} elementos h1`)
    if (!a.title || a.title.length > 70) problems.push(`título inválido (${a.title.length} car.)`)
    if (a.description.length < 50 || a.description.length > 200) problems.push(`meta description com ${a.description.length} car.`)
    if (!a.canonical) problems.push('sem canonical')
    if (a.lang !== 'pt-AO') problems.push(`lang=${a.lang}`)
    if (a.imgNoAlt) problems.push(`${a.imgNoAlt} imagens sem alt`)
    if (a.brokenImg) problems.push(`${a.brokenImg} imagens quebradas`)
    if (a.svgNoLabel) problems.push(`${a.svgNoLabel} SVG sem rótulo`)
    if (a.emptyLinks) problems.push(`${a.emptyLinks} ligações sem nome acessível`)
    if (a.unlabeledButtons) problems.push(`${a.unlabeledButtons} botões sem nome acessível`)
    if (!a.jsonLd) problems.push('JSON-LD inválido')
    if (a.errors.length) problems.push(`erros na consola: ${a.errors.join(' | ')}`)
    if (problems.length) failures.push(`${route} @${width}px: ${problems.join('; ')}`)
  }
  await test(`${matrix.length} combinações página × largura sem problemas`, () =>
    assert(failures.length === 0, failures.join('\n')),
  )

  console.log('\nPercursos funcionais')
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  await test('primeiro Tab foca a ligação "Saltar para o conteúdo"', async () => {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    await page.keyboard.press('Tab')
    const text = await page.evaluate(() => document.activeElement?.textContent)
    assert(text?.includes('Saltar para o conteúdo'), `foco em: ${text}`)
  })

  await test('submenu "Áreas de Negócio" abre por clique, fecha com Escape e devolve o foco', async () => {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    const btn = page.getByRole('button', { name: 'Áreas de Negócio' })
    await btn.click()
    assert((await btn.getAttribute('aria-expanded')) === 'true', 'aria-expanded não ficou true')
    const link = page.locator('header').getByRole('link', { name: /Pré-Fabricação em Betão/ }).first()
    assert(await link.isVisible(), 'ligação do submenu invisível')
    await page.keyboard.press('Escape')
    assert((await btn.getAttribute('aria-expanded')) === 'false', 'não fechou com Escape')
    assert(await btn.evaluate((el) => el === document.activeElement), 'foco não regressou ao botão')
  })

  await test('submenu navega para a página da área', async () => {
    await page.mouse.move(700, 600)
    await page.goto(BASE + '/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Áreas de Negócio' }).click()
    await page.locator('header').getByRole('link', { name: /^Inertes/ }).first().click()
    await page.waitForURL('**/areas-de-negocio/inertes')
    assert((await page.locator('h1').textContent()) === 'Inertes', 'h1 inesperado')
  })

  await test('indicador de página ativa (aria-current) no menu', async () => {
    await page.goto(BASE + '/projetos', { waitUntil: 'networkidle' })
    const current = await page.locator('header nav a[aria-current="page"]').first().textContent()
    assert(current?.trim() === 'Projetos', `aria-current em: ${current}`)
  })

  await test('catálogo: pesquisa sem acentos, filtro por área e URL partilhável', async () => {
    await page.goto(BASE + '/produtos', { waitUntil: 'networkidle' })
    await page.getByLabel('Pesquisar produtos e serviços').fill('varao')
    await page.waitForFunction(() => document.querySelector('[aria-live="polite"]')?.textContent?.includes('resultado'))
    const names = await page.locator('main article h3').allTextContents()
    assert(names.includes('Varão de construção'), `resultados: ${names.join(', ')}`)
    await page.getByLabel('Pesquisar produtos e serviços').fill('')
    await page.getByRole('button', { name: /^Inertes/ }).click()
    await page.waitForFunction(() => location.search.includes('setor=inertes'))
    const count = await page.locator('main article h3').count()
    assert(count === 3, `esperados 3 inertes, obtidos ${count}`)
    await page.goto(BASE + '/produtos?setor=gases', { waitUntil: 'networkidle' })
    const pressed = await page.getByRole('button', { name: /^Gases/ }).getAttribute('aria-pressed')
    assert(pressed === 'true', 'filtro do URL não aplicado')
  })

  await test('catálogo: estado vazio com opção de limpar filtros', async () => {
    await page.goto(BASE + '/produtos', { waitUntil: 'networkidle' })
    await page.getByLabel('Pesquisar produtos e serviços').fill('zzzzinexistente')
    await page.getByText('Não encontrámos produtos para esta pesquisa.').waitFor()
    await page.getByRole('button', { name: 'Limpar filtros' }).click()
    await page.waitForFunction(() => document.querySelectorAll('main article').length > 30, null, { timeout: 5000 })
  })

  await test('produto → "Solicitar informação" pré-preenche área e assunto no formulário', async () => {
    await page.goto(BASE + '/produtos/blocos-de-betao', { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Solicitar informação' }).first().click()
    await page.waitForURL('**/contactos?**')
    await page.waitForFunction(() => (document.querySelector('#cf-area')?.value ?? '') === 'prefabricados')
    const subject = await page.locator('#cf-subject').inputValue()
    assert(subject.includes('Blocos de betão'), `assunto: ${subject}`)
  })

  await test('formulário: validação no cliente com resumo de erros e foco no primeiro campo', async () => {
    await page.goto(BASE + '/contactos', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /Enviar mensagem/ }).click()
    await page.getByText('Indique o seu nome.').waitFor()
    const focused = await page.evaluate(() => document.activeElement?.id)
    assert(focused === 'cf-name', `foco em ${focused}`)
  })

  await test('formulário: sem serviço de e-mail configurado não simula sucesso e indica o e-mail do departamento', async () => {
    await page.goto(BASE + '/contactos', { waitUntil: 'networkidle' })
    await page.fill('#cf-name', 'Teste E2E')
    await page.fill('#cf-email', 'teste@example.com')
    await page.selectOption('#cf-area', 'saude')
    await page.fill('#cf-subject', 'Teste automático')
    await page.fill('#cf-message', 'Mensagem de teste automático do percurso E2E.')
    await page.check('#cf-consent')
    await page.waitForTimeout(3200)
    await page.getByRole('button', { name: /Enviar mensagem/ }).click()
    const alert = page.getByRole('alert').filter({ hasText: /ainda não está ativo|Mensagem enviada|erro/ })
    await alert.first().waitFor()
    const text = await alert.first().textContent()
    if (process.env.RESEND_API_KEY) return
    assert(text?.includes('ainda não está ativo'), `mensagem: ${text}`)
    assert(text?.includes('medicinal@acailangola.com'), 'e-mail do departamento ausente')
  })

  await test('mapa só é carregado após clique (sem pedidos à Google antes)', async () => {
    const googleRequests = []
    page.on('request', (r) => r.url().includes('google.com') && googleRequests.push(r.url()))
    await page.goto(BASE + '/contactos', { waitUntil: 'networkidle' })
    assert(googleRequests.length === 0, 'pedidos à Google antes do consentimento')
    await page.getByRole('button', { name: /Carregar mapa de Luanda/ }).click()
    assert((await page.locator('iframe[title^="Mapa"]').count()) === 1, 'iframe não criado')
  })

  await ctx.close()

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const mpage = await mobile.newPage()
  await test('menu mobile abre, bloqueia o scroll, expande áreas, fecha com Escape', async () => {
    await mpage.goto(BASE + '/', { waitUntil: 'networkidle' })
    const btn = mpage.getByRole('button', { name: 'Abrir menu' })
    await btn.click()
    const nav = mpage.getByRole('navigation', { name: 'Navegação principal (móvel)' })
    assert(await nav.isVisible(), 'painel não visível')
    assert((await mpage.evaluate(() => document.body.style.overflow)) === 'hidden', 'scroll não bloqueado')
    await nav.getByRole('button', { name: 'Áreas de Negócio' }).click()
    assert(await nav.getByRole('link', { name: 'Saúde' }).isVisible(), 'submenu mobile não expandiu')
    await mpage.keyboard.press('Escape')
    assert(!(await nav.isVisible()), 'painel não fechou')
    assert((await mpage.evaluate(() => document.body.style.overflow)) === '', 'scroll não reposto')
  })
  await test('menu mobile fecha ao navegar', async () => {
    await mpage.goto(BASE + '/', { waitUntil: 'networkidle' })
    await mpage.getByRole('button', { name: 'Abrir menu' }).click()
    await mpage.getByRole('navigation', { name: 'Navegação principal (móvel)' }).getByRole('link', { name: 'Contactos' }).click()
    await mpage.waitForURL('**/contactos')
    assert(!(await mpage.getByRole('navigation', { name: 'Navegação principal (móvel)' }).isVisible()), 'painel continua aberto')
  })
  await mobile.close()

  console.log('\nHTTP, SEO e segurança')
  await test('página inexistente devolve 404 com página apresentável', async () => {
    const r = await fetch(`${BASE}/pagina-inexistente`)
    assert(r.status === 404, `status ${r.status}`)
    assert((await r.text()).includes('não foi encontrada'), 'conteúdo 404 ausente')
  })
  await test('redirecionamentos permanentes das páginas .php antigas', async () => {
    const map = { '/quem-somos.php': '/empresa', '/contactos.php': '/contactos', '/portfolio.php': '/projetos', '/servicos.php': '/areas-de-negocio/servicos', '/noticias.php': '/noticias', '/index.php': '/' }
    for (const [from, to] of Object.entries(map)) {
      const r = await fetch(BASE + from, { redirect: 'manual' })
      assert(r.status === 308, `${from}: ${r.status}`)
      assert(new URL(r.headers.get('location'), BASE).pathname === to, `${from} → ${r.headers.get('location')}`)
    }
  })
  await test('cabeçalhos de segurança presentes', async () => {
    const r = await fetch(BASE + '/')
    for (const h of ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy', 'strict-transport-security']) {
      assert(r.headers.get(h), `falta ${h}`)
    }
    assert(!r.headers.get('x-powered-by'), 'x-powered-by exposto')
  })
  await test('robots.txt, sitemap.xml e imagem Open Graph', async () => {
    const robots = await (await fetch(BASE + '/robots.txt')).text()
    assert(robots.includes('Sitemap:'), 'robots sem sitemap')
    assert(routes.length >= 50, `sitemap com ${routes.length} URLs`)
    const og = await fetch(BASE + '/opengraph-image')
    assert(og.ok && og.headers.get('content-type')?.includes('image/png'), 'OG image indisponível')
  })
  await test('API de contacto rejeita métodos e conteúdos inválidos', async () => {
    assert((await fetch(BASE + '/api/contact')).status === 405, 'GET não devolveu 405')
    const r = await fetch(BASE + '/api/contact', { method: 'POST', body: 'x', headers: { 'content-type': 'text/plain' } })
    assert(r.status === 415, `text/plain: ${r.status}`)
  })

  await browser.close()
  server?.kill()

  const passed = results.filter((r) => r.ok).length
  mkdirSync('test-results', { recursive: true })
  writeFileSync('test-results/e2e.json', JSON.stringify({ base: BASE, date: new Date().toISOString(), results }, null, 2))
  console.log(`\n${passed}/${results.length} testes E2E passaram.`)
  process.exit(passed === results.length ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  server?.kill()
  process.exit(1)
})
