// Renderiza as ilustrações e os mockups conceptuais para PNG (Chromium headless).
const path = require('path')
const fs = require('fs')
const { chromium } = require(process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright')
const S = require('./scenes')

const OUT = path.join(__dirname, '..', 'assets')
fs.mkdirSync(OUT, { recursive: true })
const uri = (svg) => 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')

const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;color:#0A1520}
.chrome{height:44px;background:#E9ECEF;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid #D5DBE1}
.dot{width:12px;height:12px;border-radius:50%;background:#C9CFD5}
.url{margin-left:24px;flex:0 0 520px;height:26px;border-radius:6px;background:#fff;font-size:12px;color:#5B6670;display:flex;align-items:center;padding:0 12px;letter-spacing:.01em}
.logo{border:1.5px dashed currentColor;border-radius:4px;padding:6px 10px;font-weight:800;letter-spacing:.08em;font-size:15px;display:flex;flex-direction:column;line-height:1}
.logo small{font-weight:500;font-size:8px;letter-spacing:.18em;opacity:.7;margin-top:3px}
nav{display:flex;align-items:center;justify-content:space-between;padding:0 56px;height:76px}
nav ul{display:flex;gap:30px;list-style:none;font-size:14px;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 20px;font-size:14px;font-weight:600;border-radius:2px}
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
`

function page(body, css, url) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}${css}</style></head><body>
  <div class="chrome"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url">${url}</span></div>${body}</body></html>`
}

// ---------- Mockup 1: ACAIL Angola ----------
const angola = page(
  `<header class="hero">
    <nav><div class="logo" style="color:#fff">ACAIL<small>ANGOLA · LOGÓTIPO</small></div>
      <ul><li>Empresa</li><li>Áreas de negócio</li><li>Produtos e serviços</li><li>Projetos</li><li>Notícias</li></ul>
      <span class="btn" style="background:#fff;color:#0A1520">Contactos</span></nav>
    <div class="hc">
      <div class="eyebrow" style="color:#9FC3EA">Grupo industrial · Angola</div>
      <h1>Indústria, construção e saúde. Seis áreas de negócio, um mesmo compromisso.</h1>
      <p>Desde 2005, a ACAIL Angola produz e fornece soluções para a construção, a indústria, as infraestruturas e a saúde.</p>
      <div style="display:flex;gap:12px;margin-top:36px"><span class="btn" style="background:#1F5FA8;color:#fff">Conhecer as áreas de negócio →</span><span class="btn" style="border:1px solid rgba(255,255,255,.4);color:#fff">Ver projetos</span></div>
    </div>
    <div class="stats">
      <div><b>2005</b><span>Ano de constituição</span></div>
      <div><b>6</b><span>Áreas de atividade</span></div>
      <div><b>Viana · Mazozo · Catumbela</b><span>Presença industrial</span></div>
      <div><b>Qualidade</b><span>Segurança e Ambiente</span></div>
    </div>
  </header>
  <section class="areas">
    <div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:28px"><div><div class="eyebrow" style="color:#1F5FA8">Áreas de negócio</div><h2>Uma oferta diversificada para setores exigentes</h2></div><span style="font-size:14px;font-weight:600;color:#1F5FA8">Todas as áreas →</span></div>
    <div class="grid">
      ${['Produtos siderúrgicos', 'Gases industriais, medicinais e alimentares', 'Saúde', 'Pré-fabricação em betão', 'Inertes', 'Serviços industriais']
        .map((t, i) => `<div class="card"><span class="n">0${i + 1}</span><h3>${t}</h3><span class="ar">→</span></div>`)
        .join('')}
    </div>
  </section>`,
  `.hero{position:relative;height:660px;background:url(${uri(S.plant(2880, 1320, { fadeLeft: 0.95, horizon: 0.84 }))}) center/cover;color:#fff}
  .hc{padding:56px 56px 0;max-width:780px}
  h1{font-size:46px;line-height:1.06;letter-spacing:-.03em;font-weight:700;margin:18px 0 22px}
  .hc p{font-size:18px;line-height:1.55;color:rgba(255,255,255,.78);max-width:580px}
  .stats{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1fr 1.6fr 1.2fr;border-top:1px solid rgba(255,255,255,.18);background:rgba(6,13,20,.55);backdrop-filter:blur(6px)}
  .stats div{padding:22px 56px;border-right:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;gap:4px}
  .stats b{font-size:22px;font-weight:700;letter-spacing:-.01em}.stats span{font-size:12px;color:rgba(255,255,255,.6)}
  .areas{padding:56px}
  h2{font-size:30px;letter-spacing:-.02em;margin-top:10px;font-weight:700}
  .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
  .card{background:#F3F5F7;border:1px solid #E1E5E9;padding:20px;height:150px;display:flex;flex-direction:column;justify-content:space-between;position:relative}
  .card h3{font-size:15px;line-height:1.3;font-weight:600}.n{font-size:12px;color:#1F5FA8;font-weight:600}.ar{position:absolute;right:18px;top:18px;color:#8C99A6}`,
  'acailangola.com'
)

// ---------- Mockup 2: ACAIL Gás Solucions ----------
const gas = page(
  `<div class="wrap">
    <nav><div class="logo" style="color:#fff">ACAIL GÁS<small>SOLUCIONS · LOGÓTIPO</small></div>
      <ul><li>A Empresa</li><li>Gases</li><li>Soluções e aplicações</li><li>Redes e serviços</li><li>Qualidade e segurança</li></ul>
      <span class="btn" style="background:#E0662B;color:#fff">Pedir informação técnica</span></nav>
    <div class="hero">
      <div class="txt">
        <div class="eyebrow" style="color:#F09A6E">Gases e soluções técnicas · Angola</div>
        <h1>Gases industriais, medicinais e alimentares. Fornecimento com rigor técnico.</h1>
        <p>Produtos, aplicações e serviços de redes de gases para a indústria, a saúde e o setor alimentar — com acompanhamento comercial e técnico direto.</p>
        <div style="display:flex;gap:12px;margin-top:34px"><span class="btn" style="background:#E0662B;color:#fff">Encontrar a solução certa →</span><span class="btn" style="border:1px solid rgba(255,255,255,.35);color:#fff">Falar com a equipa técnica</span></div>
      </div>
      <div class="img"></div>
    </div>
    <div class="cats">
      ${[
        ['Gases industriais', 'Metalomecânica, construção, processos industriais'],
        ['Gases medicinais', 'Unidades de saúde e redes hospitalares'],
        ['Gases alimentares', 'Indústria alimentar e de bebidas'],
        ['Redes e serviços técnicos', 'Projeto, instalação e assistência a redes de gases'],
      ]
        .map(([t, d], i) => `<div class="cat"><span class="ix">0${i + 1}</span><h3>${t}</h3><p>${d}</p><span class="go">Explorar →</span></div>`)
        .join('')}
    </div>
    <div class="sector"><span>Procurar por setor:</span>${['Indústria', 'Construção', 'Saúde', 'Alimentar e bebidas', 'Petróleo e energia', 'Laboratórios'].map((t) => `<b>${t}</b>`).join('')}</div>
  </div>`,
  `body{background:#08111A}.wrap{color:#fff}
  nav{border-bottom:1px solid rgba(255,255,255,.1)}
  .hero{display:grid;grid-template-columns:1fr 1fr;height:560px}
  .txt{padding:64px 56px}
  h1{font-size:42px;line-height:1.08;letter-spacing:-.03em;font-weight:700;margin:18px 0 22px}
  .txt p{font-size:17px;line-height:1.55;color:rgba(255,255,255,.72);max-width:540px}
  .img{background:url(${uri(S.cylinders(1600, 1000))}) center/cover}
  .cats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.1)}
  .cat{padding:30px 32px 30px 56px;border-right:1px solid rgba(255,255,255,.1);min-height:200px;position:relative}
  .cat h3{font-size:19px;font-weight:600;margin:14px 0 8px;letter-spacing:-.01em}.cat p{font-size:14px;line-height:1.5;color:rgba(255,255,255,.6)}
  .ix{font-size:12px;color:#E0662B;font-weight:600}.go{position:absolute;bottom:26px;font-size:13px;font-weight:600;color:#F09A6E}
  .sector{display:flex;gap:10px;align-items:center;padding:24px 56px;background:#0E1A25;font-size:13px;color:rgba(255,255,255,.6)}
  .sector b{font-weight:500;color:#fff;border:1px solid rgba(255,255,255,.2);padding:8px 14px;border-radius:100px}`,
  'acailgas-angola.com · domínio a definir'
)

// ---------- Mockup 3: ACAIL Pré-Fabricados ----------
const prods = [
  ['poste', 'Postes', 'Poste de betão'],
  ['bloco', 'Blocos', 'Bloco de betão'],
  ['tubo', 'Tubos', 'Tubo de betão'],
  ['lancil', 'Lancis', 'Lancil de betão'],
]
const pref = page(
  `<nav style="border-bottom:1px solid #E1E5E9"><div class="logo" style="color:#3D3830">ACAIL<small>PRÉ-FABRICADOS · LOGÓTIPO</small></div>
    <ul><li>Empresa</li><li>Capacidade produtiva</li><li><b style="color:#0A1520">Catálogo</b></li><li>Fichas técnicas</li><li>Projetos</li></ul>
    <span class="btn" style="background:#0A1520;color:#fff">Pedir orçamento</span></nav>
  <div class="top">
    <div><div class="eyebrow" style="color:#8A6D3B">Catálogo de produtos</div><h1>Pré-fabricados de betão para construção e infraestruturas</h1>
    <p>Produção na unidade de Mazozo. Consulte categorias, características e documentação técnica — e peça uma proposta.</p></div>
    <div class="search"><span>Pesquisar produto, referência ou aplicação</span><b>⌕</b></div>
  </div>
  <div class="body">
    <aside>
      <h4>Categoria</h4>${prods.map(([, c], i) => `<label class="${i === 2 ? 'on' : ''}"><i></i>${c}</label>`).join('')}
      <h4>Aplicação</h4>${['Redes elétricas', 'Saneamento e drenagem', 'Edificação', 'Vias e arruamentos'].map((c) => `<label><i></i>${c}</label>`).join('')}
      <h4>Documentação</h4><label><i></i>Com ficha técnica</label>
    </aside>
    <div class="grid">
      ${prods
        .map(
          ([k, c, n]) => `<div class="pc"><div class="im" style="background-image:url(${uri(S.product(k))})"></div>
        <div class="pb"><span class="tag">${c}</span><h3>${n}</h3>
        <dl><dt>Dimensões</dt><dd></dd><dt>Classe / resistência</dt><dd></dd><dt>Aplicação</dt><dd></dd></dl>
        <div class="acts"><span>↓ Ficha técnica</span><b>Pedir orçamento</b></div></div></div>`
        )
        .join('')}
    </div>
  </div>`,
  `body{background:#fff}
  .top{display:grid;grid-template-columns:1.3fr 1fr;gap:56px;align-items:end;padding:44px 56px 32px;background:#F4F3F0;border-bottom:1px solid #E4E1DB}
  h1{font-size:40px;line-height:1.08;letter-spacing:-.03em;font-weight:700;margin:14px 0 14px;max-width:720px}
  .top p{font-size:16px;line-height:1.55;color:#5B6670;max-width:600px}
  .search{height:52px;background:#fff;border:1px solid #D5D1C9;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-size:14px;color:#8C8579}
  .body{display:grid;grid-template-columns:220px 1fr;gap:32px;padding:32px 56px}
  aside h4{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8C8579;margin:4px 0 12px}
  aside label{display:flex;align-items:center;gap:10px;font-size:14px;margin-bottom:11px}
  aside h4:not(:first-child){margin-top:22px}
  aside i{width:16px;height:16px;border:1.5px solid #B8B1A5;border-radius:2px;display:inline-block}
  aside .on i{background:#0A1520;border-color:#0A1520}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .pc{border:1px solid #E4E1DB}
  .im{height:170px;background-size:cover;background-position:center}
  .pb{padding:16px}.tag{font-size:11px;color:#8A6D3B;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
  .pb h3{font-size:17px;font-weight:600;margin:6px 0 12px}
  dl{display:grid;grid-template-columns:auto 1fr;gap:8px 10px;font-size:12px;color:#5B6670;align-items:center}
  dd{height:8px;background:#ECEAE5;border-radius:2px}
  .acts{display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:12px;color:#5B6670}
  .acts b{background:#0A1520;color:#fff;padding:8px 10px;font-weight:600;white-space:nowrap}.acts span{white-space:nowrap}`,
  'acail-prefabricados.com · domínio a definir'
)

// ---------- Mobile (Gás) ----------
const mobile = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
  body{background:transparent}
  .ph{width:390px;height:800px;border-radius:52px;background:#05090D;padding:14px;box-shadow:0 0 0 2px #2A3540}
  .sc{width:100%;height:100%;border-radius:40px;overflow:hidden;background:#08111A;color:#fff;position:relative}
  .sb{height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 28px;font-size:13px;font-weight:600}
  .nv{display:flex;justify-content:space-between;align-items:center;padding:8px 20px 14px}
  .im{height:250px;background:url(${uri(S.cylinders(1200, 900))}) center/cover}
  .tx{padding:22px 20px}
  h1{font-size:28px;line-height:1.1;letter-spacing:-.025em;font-weight:700;margin:12px 0}
  p{font-size:14px;line-height:1.5;color:rgba(255,255,255,.7)}
  .cta{position:absolute;left:16px;right:16px;bottom:22px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .cta span{height:48px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
  </style></head><body><div class="ph"><div class="sc">
  <div class="sb"><span>9:41</span><span>●●● ▮</span></div>
  <div class="nv"><div class="logo" style="color:#fff;font-size:12px">ACAIL GÁS<small>LOGÓTIPO</small></div><span style="font-size:22px">≡</span></div>
  <div class="im"></div>
  <div class="tx"><div class="eyebrow" style="color:#F09A6E;font-size:10px">Gases e soluções técnicas</div>
  <h1>Gases industriais, medicinais e alimentares.</h1><p>Encontre a solução adequada à sua aplicação e fale diretamente com a equipa técnica.</p></div>
  <div class="cta"><span style="background:#E0662B">Pedir informação</span><span style="border:1px solid rgba(255,255,255,.3)">WhatsApp</span></div>
  </div></div></body></html>`

;(async () => {
  const browser = await chromium.launch()
  const shot = async (name, html, w, h, opts = {}) => {
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: opts.dpr || 2 })
    await p.setContent(html, { waitUntil: 'load' })
    await p.waitForTimeout(150)
    await p.screenshot({ path: path.join(OUT, name), omitBackground: !!opts.transparent })
    await p.close()
    console.log('✓', name)
  }
  const svgPage = (svg) => `<!doctype html><html><body style="margin:0">${svg}</body></html>`
  await shot('cover.png', svgPage(S.plant(2400, 1350, { fadeLeft: 0.95 })), 2400, 1350, { dpr: 1 })
  await shot('plant-raw.png', svgPage(S.plant(2400, 1350, { fadeLeft: 0, seed: 11 })), 2400, 1350, { dpr: 1 })
  await shot('steel.png', svgPage(S.steel(1600, 1000)), 1600, 1000, { dpr: 1 })
  await shot('cylinders.png', svgPage(S.cylinders(1600, 1000)), 1600, 1000, { dpr: 1 })
  await shot('pipes.png', svgPage(S.pipes(1600, 1000)), 1600, 1000, { dpr: 1 })
  await shot('pipes-dark.png', svgPage(S.pipes(1600, 1000, { bg1: '#1A1916', bg2: '#0A0907' })), 1600, 1000, { dpr: 1 })
  await shot('mock-angola.png', angola, 1440, 1000)
  await shot('mock-gas.png', gas, 1440, 980)
  await shot('mock-pref.png', pref, 1440, 860)
  await shot('mobile-gas.png', mobile, 390, 800, { transparent: true, dpr: 3 })
  await browser.close()
})()
