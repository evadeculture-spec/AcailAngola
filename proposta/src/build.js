// Gera a apresentação editável (PptxGenJS) — SMARTY SQUAD × ACAIL ANGOLA
const path = require('path')
const pptxgen = require('pptxgenjs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const sharp = require('sharp')
const L = require('react-icons/lu')
const { applyTheme } = require(
  '/root/.claude/skills/synced/6e48c676-3ca1-419b-9492-5051d8189a86_57a953ec-cacf-4ded-b80d-2f4f025f0a63/pptx/scripts/apply_theme.js'
)

const ROOT = path.join(__dirname, '..')
const A = (f) => path.join(ROOT, 'assets', f)
const OUT = path.join(ROOT, 'dist', 'SmartySquad_ACAIL_Proposta_Ecossistema_Digital.pptx')

// ---------- Tema ----------
const HEX = {
  ink: '0A1520',
  ink2: '12202E',
  white: 'FFFFFF',
  light: 'F3F5F7',
  ang: '1F5FA8',
  gas: 'E0662B',
  pre: '8A6D3B',
  conc: 'A39A8C',
  sky: '9FC3EA',
  muted: '5B6670',
  line: 'DCE1E6',
  lineDk: '263545',
  mutedDk: 'A9B4BF',
}
const THEME = {
  name: 'Smarty Squad × ACAIL',
  headFontFace: 'Inter',
  bodyFontFace: 'Inter',
  colors: {
    dk1: HEX.ink,
    lt1: HEX.white,
    dk2: HEX.ink2,
    lt2: HEX.light,
    accent1: HEX.ang,
    accent2: HEX.gas,
    accent3: HEX.pre,
    accent4: HEX.conc,
    accent5: HEX.sky,
    accent6: HEX.muted,
    hlink: HEX.ang,
    folHlink: HEX.muted,
  },
}

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE'
pres.author = 'Smarty Squad'
pres.company = 'Smarty Squad'
pres.title = 'ACAIL Angola — Uma nova dimensão digital'
pres.subject = 'Proposta estratégica para o desenvolvimento de três websites institucionais'
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
const C = pres.SchemeColor
const K = {
  ink: C.text1,
  ink2: C.text2,
  white: C.background1,
  light: C.background2,
  ang: C.accent1,
  gas: C.accent2,
  pre: C.accent3,
  conc: C.accent4,
  sky: C.accent5,
  muted: C.accent6,
  line: HEX.line,
  lineDk: HEX.lineDk,
  mutedDk: HEX.mutedDk,
}

const W = 13.333
const M = 0.6
const CW = W - 2 * M

// ---------- Layouts ----------
const footer = (dark) => [
  {
    text: {
      text: 'SMARTY SQUAD × ACAIL  ·  Proposta estratégica  ·  Documento para discussão',
      options: { x: M, y: 6.98, w: 8, h: 0.25, fontSize: 8, color: dark ? K.mutedDk : K.muted, charSpacing: 1, margin: 0 },
    },
  },
]
const titlePh = (dark) => ({
  placeholder: {
    options: {
      name: 'title',
      type: 'title',
      x: M,
      y: 0.8,
      w: 11.6,
      h: 1.05,
      fontSize: 28,
      bold: true,
      color: dark ? K.white : K.ink,
      valign: 'top',
      align: 'left',
      margin: 0,
      charSpacing: -0.5,
    },
    text: 'Título',
  },
})
pres.defineSlideMaster({
  title: 'Conteúdo claro',
  background: { color: K.white },
  objects: [...footer(false), titlePh(false)],
  slideNumber: { x: 12.23, y: 6.96, w: 0.5, h: 0.28, fontSize: 8, color: K.muted, align: 'right', margin: 0 },
})
pres.defineSlideMaster({
  title: 'Conteúdo escuro',
  background: { color: K.ink },
  objects: [...footer(true), titlePh(true)],
  slideNumber: { x: 12.23, y: 6.96, w: 0.5, h: 0.28, fontSize: 8, color: K.mutedDk, align: 'right', margin: 0 },
})
pres.defineSlideMaster({ title: 'Capa', background: { color: K.ink }, objects: [] })

// ---------- Ícones ----------
async function icon(name, hex, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(L[name], { color: '#' + hex, size: String(size), strokeWidth: 1.6 }))
  const buf = await sharp(Buffer.from(svg)).png().toBuffer()
  return 'image/png;base64,' + buf.toString('base64')
}

// ---------- Utilitários ----------
function eyebrow(s, text, color) {
  s.addText(text.toUpperCase(), { x: M, y: 0.48, w: 9, h: 0.25, fontSize: 9.5, bold: true, color, charSpacing: 3, margin: 0, isTextBox: true, objectName: 'Sobretítulo' })
}
function newSlide(master, section) {
  return pres.addSlide({ masterName: master, sectionTitle: section })
}
function txt(s, text, o) {
  s.addText(text, { margin: 0, isTextBox: true, valign: 'top', fontSize: 14, color: K.ink, ...o })
}
function rect(s, o) {
  s.addShape(pres.shapes.RECTANGLE, { line: { type: 'none' }, ...o })
}
function hline(s, x, y, w, color, width = 0.75) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width } })
}
function vline(s, x, y, h, color, width = 0.75) {
  s.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color, width } })
}
function caption(s, text, o) {
  txt(s, text, { fontSize: 9, color: K.muted, italic: true, ...o })
}

async function main() {
  const I = {}
  const need = [
    ['compass', 'LuCompass', HEX.sky],
    ['pen', 'LuPenTool', HEX.sky],
    ['code', 'LuCode', HEX.sky],
    ['refresh', 'LuRefreshCw', HEX.sky],
    ['check', 'LuCheck', HEX.ang],
    ['checkW', 'LuCheck', HEX.white],
    ['mail', 'LuMail', HEX.white],
    ['file', 'LuFileText', HEX.white],
    ['msg', 'LuMessageCircle', HEX.white],
    ['bldg', 'LuBuilding2', HEX.white],
    ['dl', 'LuDownload', HEX.white],
    ['box', 'LuPackage', HEX.white],
    ['inbox', 'LuInbox', HEX.ink],
    ['gauge', 'LuGauge', HEX.ang],
    ['shield', 'LuShieldCheck', HEX.ang],
    ['search', 'LuSearch', HEX.ang],
    ['phone', 'LuSmartphone', HEX.ang],
    ['access', 'LuAccessibility', HEX.ang],
    ['wrench', 'LuWrench', HEX.ang],
    ['layers', 'LuLayers', HEX.ang],
    ['branch', 'LuGitBranch', HEX.ang],
    ['monitor', 'LuMonitor', HEX.ink],
    ['server', 'LuServer', HEX.ink],
    ['db', 'LuDatabase', HEX.ink],
    ['globe', 'LuGlobe', HEX.ink],
    ['chart', 'LuChartBar', HEX.ink],
    ['mailInk', 'LuMail', HEX.ink],
    ['users', 'LuUsers', HEX.ang],
    ['factory', 'LuFactory', HEX.gas],
    ['hardhat', 'LuHardHat', HEX.pre],
    ['bldgAng', 'LuBuilding2', HEX.ang],
    ['clip', 'LuClipboardCheck', HEX.white],
    ['fp', 'LuFingerprint', HEX.white],
    ['target', 'LuTarget', HEX.white],
    ['trend', 'LuTrendingUp', HEX.white],
  ]
  for (const [k, n, c] of need) I[k] = await icon(n, c)

  // =====================================================================
  // 01 — CAPA
  // =====================================================================
  pres.addSection({ title: 'Abertura' })
  let s = newSlide('Capa', 'Abertura')
  s.addImage({ path: A('cover.jpg'), x: 0, y: 0, w: W, h: 7.5, altText: 'Ilustração conceptual de um complexo industrial ao entardecer' })
  txt(s, 'SMARTY SQUAD  ×  ACAIL', { x: M, y: 0.6, w: 6, h: 0.3, fontSize: 11, bold: true, color: K.white, charSpacing: 4 })
  txt(s, 'Proposta comercial · Outubro de 2026', { x: 7.2, y: 0.6, w: 5.53, h: 0.3, fontSize: 10, color: K.mutedDk, align: 'right' })
  s.addText(
    [
      { text: 'ACAIL ANGOLA', options: { breakLine: true, fontSize: 20, bold: true, color: K.sky, charSpacing: 6 } },
      { text: 'Uma nova dimensão digital', options: { fontSize: 54, bold: true, color: K.white, charSpacing: -1.5 } },
    ],
    { x: M, y: 2.05, w: 8.4, h: 2.3, margin: 0, isTextBox: true, valign: 'top', paraSpaceAfter: 6, objectName: 'Título da capa' }
  )
  txt(s, 'Proposta estratégica para o desenvolvimento de três websites institucionais', {
    x: M, y: 4.45, w: 6.4, h: 0.7, fontSize: 18, color: 'D5DEE7',
  })
  // três operações
  const ops = [
    ['ACAIL Angola', K.sky],
    ['ACAIL Gás Solucions', 'F09A6E'],
    ['ACAIL Pré-Fabricados', 'CBB89A'],
  ]
  hline(s, M, 6.15, 7.2, '3A4A5A')
  ops.forEach(([t, c], i) => {
    rect(s, { x: M + i * 2.4, y: 6.36, w: 0.09, h: 0.09, fill: { color: c } })
    txt(s, t, { x: M + 0.2 + i * 2.4, y: 6.29, w: 2.2, h: 0.25, fontSize: 11, bold: true, color: K.white })
  })
  caption(s, 'Ilustração conceptual — não representa instalações da ACAIL', { x: 8.6, y: 6.95, w: 4.13, h: 0.25, align: 'right', color: '7F8C99' })
  s.addNotes(
    'Abertura. Agradecer a disponibilidade da administração. Enquadrar: esta é uma proposta para discussão, preparada especificamente para o Grupo ACAIL em Angola, que abrange três websites — ACAIL Angola, ACAIL Gás Solucions e ACAIL Pré-Fabricados. Objetivo da reunião: alinhar a visão, validar prioridades e acordar os próximos passos. Duração sugerida: 30 a 40 minutos, mais perguntas.'
  )

  // =====================================================================
  // 02 — VISÃO EXECUTIVA
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Abertura')
  eyebrow(s, 'Visão executiva', K.ang)
  s.addText('Uma presença digital à altura da dimensão industrial da ACAIL', { placeholder: 'title' })
  txt(s, 'Propomos conceber e desenvolver três websites complementares, cada um desenhado para o seu público e para os seus objetivos comerciais — e todos ligados por uma mesma identidade de grupo.', {
    x: M, y: 2.1, w: 4.75, h: 2.2, fontSize: 16, color: K.ink, lineSpacingMultiple: 1.2,
  })
  txt(s, 'O resultado: uma comunicação institucional mais clara, informação técnica mais acessível e caminhos mais curtos entre o interesse de um cliente e o contacto com a equipa certa.', {
    x: M, y: 4.5, w: 4.6, h: 1.3, fontSize: 12.5, color: K.muted, lineSpacingMultiple: 1.25,
  })
  const pillars2 = [
    ['01', 'Identidade', 'Uma imagem digital coerente com a experiência, a escala e a reputação do Grupo ACAIL.', K.ang],
    ['02', 'Especialização', 'Websites próprios para gases e pré-fabricados, com conteúdos e percursos à medida de quem compra.', K.gas],
    ['03', 'Crescimento', 'Uma base técnica e editorial preparada para novos conteúdos, catálogos e funcionalidades.', K.pre],
  ]
  pillars2.forEach(([n, t, d, c], i) => {
    const x = 5.75 + i * 2.33
    rect(s, { x, y: 2.15, w: 2.2, h: 3.6, fill: { color: K.light } })
    txt(s, n, { x: x + 0.25, y: 2.4, w: 1, h: 0.3, fontSize: 11, bold: true, color: c })
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 3.0, w: 0.6, h: 0.6, fill: { color: c }, line: { type: 'none' } })
    s.addImage({ data: I[['fp', 'target', 'trend'][i]], x: x + 0.39, y: 3.14, w: 0.32, h: 0.32 })
    txt(s, t, { x: x + 0.25, y: 3.85, w: 1.9, h: 0.4, fontSize: 18, bold: true })
    txt(s, d, { x: x + 0.25, y: 4.3, w: 1.85, h: 1.35, fontSize: 11.5, color: K.muted, lineSpacingMultiple: 1.2 })
  })
  rect(s, { x: M, y: 6.0, w: CW, h: 0.7, fill: { color: K.ink } })
  txt(s, 'Três áreas de negócio. Três identidades digitais. Uma visão de excelência.', {
    x: M + 0.3, y: 6.0, w: CW - 0.6, h: 0.7, fontSize: 16, bold: true, color: K.white, valign: 'middle',
  })
  s.addNotes(
    'Mensagem central: a presença digital deve refletir a dimensão real do grupo. Não estamos a propor apenas um redesenho. Propomos um pequeno ecossistema: um website institucional e dois websites especializados. Os três conceitos — identidade, especialização e crescimento — vão orientar toda a apresentação. Ler a frase final como síntese da proposta.'
  )

  // =====================================================================
  // 03 — QUEM É A SMARTY SQUAD
  // =====================================================================
  pres.addSection({ title: 'Contexto' })
  s = newSlide('Conteúdo escuro', 'Contexto')
  eyebrow(s, 'Smarty Squad', K.sky)
  s.addText('Tecnologia, estratégia e criatividade ao serviço dos negócios', { placeholder: 'title' })
  txt(s, [
    { text: 'O trabalho não começa no código.', options: { breakLine: true, color: K.white } },
    { text: 'Começa na compreensão do negócio.', options: { color: K.sky } },
  ], { x: M, y: 2.15, w: 7.5, h: 0.95, fontSize: 22, bold: true, charSpacing: -0.3 })
  const p3 = [
    ['compass', 'Estratégia digital', 'Objetivos, públicos e prioridades definidos antes de qualquer decisão técnica.'],
    ['pen', 'Design e experiência', 'Interfaces claras e institucionais, desenhadas para transmitir confiança.'],
    ['code', 'Desenvolvimento e tecnologia', 'Websites rápidos, seguros e bem estruturados, com tecnologia atual e IA usada com supervisão humana.'],
    ['refresh', 'Acompanhamento e evolução', 'Manutenção, melhorias e novas funcionalidades à medida que o negócio cresce.'],
  ]
  p3.forEach(([ic, t, d], i) => {
    const x = M + i * 3.07
    hline(s, x, 3.55, 2.85, K.lineDk)
    txt(s, '0' + (i + 1), { x, y: 3.75, w: 0.6, h: 0.3, fontSize: 11, bold: true, color: K.sky })
    s.addImage({ data: I[ic], x: x + 2.4, y: 3.72, w: 0.38, h: 0.38, altText: t })
    txt(s, t, { x, y: 4.25, w: 2.8, h: 0.62, fontSize: 15, bold: true, color: K.white, valign: 'top' })
    txt(s, d, { x, y: 4.95, w: 2.75, h: 1.1, fontSize: 11.5, color: K.mutedDk, lineSpacingMultiple: 1.25 })
  })
  rect(s, { x: M, y: 6.12, w: CW, h: 0.55, fill: { color: K.ink2 } })
  txt(s, [
    { text: 'Serviços nesta proposta  ', options: { bold: true, color: K.white } },
    { text: 'Consultoria e estratégia · Arquitetura de informação · UX/UI · Desenvolvimento web · SEO técnico · CMS · Publicação e gestão técnica · Manutenção · Automatizações (opcional)', options: { color: K.mutedDk } },
  ], { x: M + 0.25, y: 6.12, w: CW - 0.5, h: 0.55, fontSize: 10.5, valign: 'middle' })
  s.addNotes(
    'Apresentar a Smarty Squad de forma breve: somos uma parceira de soluções digitais que junta estratégia, design, engenharia e acompanhamento. Sublinhar que usamos ferramentas modernas, automatização e inteligência artificial nos processos internos, sempre com revisão humana, segurança e controlo de qualidade. Não alongar: o foco da reunião é a ACAIL. [Inserir aqui, se desejado, dados institucionais confirmados da Smarty Squad.]'
  )

  // =====================================================================
  // 04 — CONHECEMOS A ACAIL
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Contexto')
  eyebrow(s, 'Conhecemos a ACAIL', K.ang)
  s.addText('Uma realidade industrial diversificada. Uma identidade de confiança.', { placeholder: 'title' })
  txt(s, '2005', { x: M, y: 2.1, w: 3.2, h: 0.95, fontSize: 60, bold: true, color: K.ang, charSpacing: -2 })
  txt(s, 'Ano de constituição da ACAIL Angola', { x: M, y: 3.05, w: 3.4, h: 0.3, fontSize: 12, color: K.muted })
  txt(s, '6', { x: M, y: 3.55, w: 3.2, h: 0.95, fontSize: 60, bold: true, color: K.ink, charSpacing: -2 })
  txt(s, 'Setores de atividade, da construção à saúde', { x: M, y: 4.5, w: 3.4, h: 0.3, fontSize: 12, color: K.muted })
  hline(s, M, 5.1, 3.6, K.line)
  txt(s, 'Projetos apresentados publicamente no portefólio', { x: M, y: 5.25, w: 3.8, h: 0.3, fontSize: 10, bold: true, color: K.ink })
  txt(s, 'Ponte da Catumbela · Empreendimento Comandante Gika · Nova Assembleia Nacional · Hospital Prenda', {
    x: M, y: 5.55, w: 3.7, h: 0.8, fontSize: 11, color: K.muted, lineSpacingMultiple: 1.2,
  })
  // diagrama de setores
  const cx = 8.45
  const cy = 4.25
  const sectors = [
    ['Produtos siderúrgicos', K.ink, false],
    ['Gases industriais, medicinais e alimentares', K.gas, true],
    ['Saúde', K.ink, false],
    ['Pré-fabricação em betão', K.pre, true],
    ['Inertes', K.ink, false],
    ['Serviços industriais', K.ink, false],
  ]
  s.addShape(pres.shapes.OVAL, { x: cx - 1.75, y: cy - 1.75, w: 3.5, h: 3.5, fill: { type: 'none' }, line: { color: K.line, width: 1, dashType: 'dash' } })
  s.addShape(pres.shapes.OVAL, { x: cx - 0.95, y: cy - 0.95, w: 1.9, h: 1.9, fill: { color: K.ink }, line: { type: 'none' } })
  txt(s, [
    { text: 'ACAIL', options: { breakLine: true, bold: true, fontSize: 18 } },
    { text: 'ANGOLA', options: { fontSize: 9, charSpacing: 3 } },
  ], { x: cx - 0.95, y: cy - 0.95, w: 1.9, h: 1.9, color: K.white, align: 'center', valign: 'middle' })
  sectors.forEach(([t, c, hi], i) => {
    const a = (-90 + i * 60) * (Math.PI / 180)
    const px = cx + Math.cos(a) * 1.75
    const py = cy + Math.sin(a) * 1.75
    s.addShape(pres.shapes.OVAL, { x: px - 0.13, y: py - 0.13, w: 0.26, h: 0.26, fill: { color: hi ? c : K.white }, line: { color: c, width: 1.5 } })
    const right = Math.cos(a) > 0.1
    const left = Math.cos(a) < -0.1
    const lw = 2.55
    const lx = right ? px + 0.3 : left ? px - 0.3 - lw : px - lw / 2
    const ly = Math.abs(Math.cos(a)) < 0.1 ? (Math.sin(a) < 0 ? py - 0.62 : py + 0.22) : py - 0.22
    txt(s, t, { x: lx, y: ly, w: lw, h: 0.42, fontSize: 11.5, bold: hi, color: hi ? c : K.ink, align: right ? 'left' : left ? 'right' : 'center', valign: Math.abs(Math.cos(a)) < 0.1 && Math.sin(a) < 0 ? 'bottom' : 'middle' })
  })
  caption(s, 'A destaque: as áreas que terão website próprio nesta proposta', { x: 6.2, y: 6.55, w: 4.6, h: 0.25, align: 'center', italic: false })
  s.addNotes(
    'Mostrar preparação. A ACAIL Angola foi constituída em 2005 e organiza a sua atividade em seis setores: produtos siderúrgicos; gases industriais, medicinais e alimentares; saúde; pré-fabricação em betão; inertes; serviços industriais. A atividade serve a construção, a indústria, as infraestruturas e a saúde. O portefólio público refere obras como a Ponte da Catumbela, o Empreendimento Comandante Gika, a Nova Assembleia Nacional e o Hospital Prenda. Nota: não detalhar o âmbito de fornecimento em cada obra; essa informação será validada com a ACAIL.'
  )

  // =====================================================================
  // 05 — OPORTUNIDADE DIGITAL
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Contexto')
  eyebrow(s, 'Oportunidade digital', K.ang)
  s.addText('Da presença institucional à experiência digital', { placeholder: 'title' })
  // observação verificada vs a confirmar
  rect(s, { x: M, y: 2.05, w: 5.95, h: 0.95, fill: { color: K.light } })
  txt(s, [
    { text: 'O QUE EXISTE HOJE', options: { breakLine: true, bold: true, fontSize: 9, color: K.ang, charSpacing: 2 } },
    { text: 'Um website único que reúne informação institucional, produtos, serviços, portefólio e contactos das várias áreas.', options: { fontSize: 12, color: K.ink } },
  ], { x: M + 0.25, y: 2.05, w: 5.5, h: 0.95, valign: 'middle', paraSpaceAfter: 4 })
  rect(s, { x: 6.78, y: 2.05, w: 5.95, h: 0.95, fill: { type: 'none' }, line: { color: K.line, width: 1, dashType: 'dash' } })
  txt(s, [
    { text: 'A CONFIRMAR NO DIAGNÓSTICO', options: { breakLine: true, bold: true, fontSize: 9, color: K.muted, charSpacing: 2 } },
    { text: 'Desempenho, segurança, SEO e acessibilidade não foram auditados nesta fase. Serão avaliados no Discovery.', options: { fontSize: 12, color: K.muted } },
  ], { x: 7.03, y: 2.05, w: 5.5, h: 0.95, valign: 'middle', paraSpaceAfter: 4 })
  txt(s, 'Oito eixos de evolução que propomos trabalhar', { x: M, y: 3.3, w: 8, h: 0.3, fontSize: 12, bold: true })
  const axes = [
    ['Apresentação visual', 'Uma imagem contemporânea que acompanhe a escala do grupo.'],
    ['Informação institucional', 'História, capacidade e compromissos organizados com clareza.'],
    ['Áreas de negócio', 'Cada operação com espaço, mensagem e público próprios.'],
    ['Informação técnica', 'Produtos e documentação fáceis de encontrar e consultar.'],
    ['Dispositivos móveis', 'Experiência pensada primeiro para o telemóvel.'],
    ['Contacto comercial', 'Pedidos dirigidos ao departamento certo, sem etapas a mais.'],
    ['Gestão de conteúdos', 'Atualizações simples, feitas pela equipa ACAIL quando fizer sentido.'],
    ['Pesquisa orgânica', 'Estrutura técnica que facilite a indexação nos motores de pesquisa.'],
  ]
  axes.forEach(([t, d], i) => {
    const col = i % 4
    const row = Math.floor(i / 4)
    const x = M + col * 3.07
    const y = 3.75 + row * 1.5
    hline(s, x, y, 2.85, K.ink, 1)
    txt(s, String(i + 1).padStart(2, '0'), { x, y: y + 0.13, w: 0.5, h: 0.25, fontSize: 10, bold: true, color: K.ang })
    txt(s, t, { x: x + 0.45, y: y + 0.1, w: 2.4, h: 0.3, fontSize: 13, bold: true })
    txt(s, d, { x: x + 0.45, y: y + 0.45, w: 2.4, h: 0.85, fontSize: 11, color: K.muted, lineSpacingMultiple: 1.2 })
  })
  s.addNotes(
    'Tom construtivo. Distinguir claramente: o que sabemos (o website atual concentra a informação de todas as áreas num único domínio) e o que ainda não foi avaliado (desempenho, segurança, SEO, acessibilidade), que será objeto de auditoria no Discovery. Os oito eixos são oportunidades de valorização — não críticas ao trabalho existente.'
  )

  // =====================================================================
  // 06 — A NOSSA PROPOSTA
  // =====================================================================
  pres.addSection({ title: 'Proposta' })
  s = newSlide('Conteúdo escuro', 'Proposta')
  eyebrow(s, 'A nossa proposta', K.sky)
  s.addText('Três websites. Uma estratégia digital integrada.', { placeholder: 'title' })
  // banda superior: grupo
  rect(s, { x: M, y: 1.95, w: CW, h: 0.45, fill: { color: K.ink2 } })
  txt(s, 'IDENTIDADE DO GRUPO ACAIL  ·  Linguagem visual comum  ·  Navegação cruzada entre websites', { x: M + 0.25, y: 1.95, w: CW - 0.5, h: 0.45, fontSize: 10, bold: true, color: K.mutedDk, charSpacing: 1.5, valign: 'middle', align: 'center' })
  const sites = [
    ['ACAIL ANGOLA', 'Identidade corporativa e presença institucional', 'Administração pública, grandes clientes, parceiros e investidores', 'Credibilidade e visão global do grupo', 'plant-raw.jpg', HEX.ang],
    ['ACAIL GÁS SOLUCIONS', 'Especialização técnica e soluções de gases', 'Compradores industriais, engenheiros, unidades de saúde', 'Pedidos de informação técnica e comercial', 'cylinders.jpg', HEX.gas],
    ['ACAIL PRÉ-FABRICADOS', 'Produtos, especificações técnicas e oportunidades comerciais', 'Construtoras, empreiteiros, projetistas, entidades públicas', 'Pedidos de orçamento qualificados', 'pipes-dark.jpg', 'B08A4E'],
  ]
  sites.forEach(([n, role, aud, goal, img, c], i) => {
    const x = M + i * 4.12
    const w = 3.89
    s.addImage({ path: A(img), x, y: 2.6, w, h: 1.25, sizing: { type: 'cover', w, h: 1.25 }, altText: 'Ilustração conceptual' })
    rect(s, { x, y: 3.85, w, h: 2.25, fill: { color: K.ink2 } })
    rect(s, { x: x + 0.25, y: 4.08, w: 0.12, h: 0.12, fill: { color: c } })
    txt(s, n, { x: x + 0.45, y: 4.0, w: 3.3, h: 0.3, fontSize: 12.5, bold: true, color: K.white, charSpacing: 1 })
    txt(s, role, { x: x + 0.25, y: 4.38, w: 3.4, h: 0.55, fontSize: 12, color: K.white, lineSpacingMultiple: 1.15 })
    txt(s, [
      { text: 'Públicos  ', options: { bold: true, color: c } },
      { text: aud, options: { color: K.mutedDk, breakLine: true } },
      { text: 'Objetivo  ', options: { bold: true, color: c } },
      { text: goal, options: { color: K.mutedDk } },
    ], { x: x + 0.25, y: 5.0, w: 3.4, h: 1.0, fontSize: 10.5, lineSpacingMultiple: 1.2, paraSpaceAfter: 4 })
  })
  rect(s, { x: M, y: 6.25, w: CW, h: 0.45, fill: { color: K.ink2 } })
  txt(s, 'BASE PARTILHADA  ·  Sistema de design  ·  Componentes técnicos  ·  Gestão de conteúdos  ·  Publicação e manutenção', { x: M + 0.25, y: 6.25, w: CW - 0.5, h: 0.45, fontSize: 10, bold: true, color: K.mutedDk, charSpacing: 1.5, valign: 'middle', align: 'center' })
  s.addNotes(
    'Ponto-chave: não estamos a dividir o website atual em três páginas. São três websites com objetivos, arquitetura e conteúdos próprios. Independentes na comunicação — cada um fala com o seu público — e coordenados na identidade e na base técnica. A banda superior representa o que os une perante o visitante; a inferior, o que os une nos bastidores e que gera eficiência.'
  )

  // =====================================================================
  // 07 — WEBSITE ACAIL ANGOLA
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Proposta')
  eyebrow(s, 'Website 01 · Institucional', K.ang)
  s.addText('ACAIL Angola: representar a dimensão de um grupo industrial', { placeholder: 'title' })
  s.addImage({ path: A('mock-angola.jpg'), x: M, y: 2.0, w: 6.62, h: 4.6, altText: 'Mockup conceptual da homepage do website ACAIL Angola' })
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: 6.62, h: 4.6, fill: { type: 'none' }, line: { color: K.line, width: 0.75 } })
  caption(s, 'Conceito de design — proposta não aprovada. Logótipo, cores e conteúdos a validar.', { x: M, y: 6.66, w: 6.62, h: 0.2 })
  const rx = 7.95
  txt(s, 'ARQUITETURA SUGERIDA', { x: rx, y: 2.0, w: 4.7, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const arch7 = ['Página inicial institucional', 'Quem Somos', 'História e percurso', 'Áreas de negócio', 'Produtos e serviços', 'Capacidade e instalações', 'Projetos e portefólio', 'Qualidade e compromissos', 'Notícias e atualizações', 'Contactos']
  arch7.forEach((t, i) => {
    const col = Math.floor(i / 5)
    const row = i % 5
    txt(s, [
      { text: String(i + 1).padStart(2, '0') + '  ', options: { color: K.ang, bold: true, fontSize: 10 } },
      { text: t, options: { fontSize: 12 } },
    ], { x: rx + col * 2.42, y: 2.38 + row * 0.36, w: 2.4, h: 0.3 })
  })
  caption(s, 'Secções definitivas dependem dos conteúdos e prioridades aprovados pela ACAIL.', { x: rx, y: 4.2, w: 4.7, h: 0.25 })
  txt(s, 'O QUE ESTE WEBSITE DEVE CONSEGUIR', { x: rx, y: 4.7, w: 4.7, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const goals7 = [
    ['Credibilidade institucional', 'percurso, instalações e obras de referência'],
    ['Organização da oferta', 'seis áreas de negócio, um ponto de entrada'],
    ['Navegação clara', 'cada visitante chega depressa ao que procura'],
  ]
  goals7.forEach(([a, b], i) => {
    s.addImage({ data: I.check, x: rx, y: 5.08 + i * 0.52, w: 0.22, h: 0.22 })
    txt(s, [
      { text: a, options: { bold: true, breakLine: true } },
      { text: b, options: { color: K.muted, fontSize: 11 } },
    ], { x: rx + 0.35, y: 5.04 + i * 0.52, w: 4.3, h: 0.5, fontSize: 12.5 })
  })
  s.addNotes(
    'O website corporativo é a porta de entrada do grupo. Deve servir quem precisa de avaliar a ACAIL como fornecedor ou parceiro: entidades públicas, grandes clientes, investidores. Mostrar o mockup: hero institucional, indicadores factuais (ano de constituição, número de áreas), acesso direto às seis áreas de negócio. Sublinhar que o mockup é um conceito de design não aprovado; logótipo e cores oficiais serão aplicados após validação.'
  )

  // =====================================================================
  // 08 — WEBSITE ACAIL GÁS SOLUCIONS
  // =====================================================================
  s = newSlide('Conteúdo escuro', 'Proposta')
  eyebrow(s, 'Website 02 · Gases e soluções técnicas', 'F09A6E')
  s.addText('ACAIL Gás Solucions: comunicar precisão, segurança e especialização', { placeholder: 'title' })
  s.addImage({ path: A('mock-gas.jpg'), x: 5.9, y: 2.0, w: 6.83, h: 4.65, altText: 'Mockup conceptual da homepage do website ACAIL Gás Solucions' })
  s.addShape(pres.shapes.RECTANGLE, { x: 5.9, y: 2.0, w: 6.83, h: 4.65, fill: { type: 'none' }, line: { color: K.lineDk, width: 0.75 } })
  caption(s, 'Conceito de design — proposta não aprovada. Cores a alinhar com a identidade ACAIL Gás.', { x: 5.9, y: 6.7, w: 6.83, h: 0.2, color: K.mutedDk })
  txt(s, 'ARQUITETURA SUGERIDA', { x: M, y: 2.0, w: 4.7, h: 0.25, fontSize: 9, bold: true, color: 'F09A6E', charSpacing: 2 })
  const arch8 = ['Homepage', 'A Empresa', 'Gases Industriais', 'Gases Medicinais', 'Gases Alimentares', 'Soluções e Aplicações', 'Redes e Serviços Técnicos', 'Qualidade e Segurança', 'Contactos e Pedidos de Informação']
  arch8.forEach((t, i) => {
    txt(s, [
      { text: String(i + 1).padStart(2, '0') + '  ', options: { color: 'F09A6E', bold: true, fontSize: 10 } },
      { text: t, options: { fontSize: 12, color: K.white } },
    ], { x: M, y: 2.36 + i * 0.32, w: 4.7, h: 0.28 })
  })
  hline(s, M, 5.35, 4.7, K.lineDk)
  txt(s, [
    { text: 'Fala com dois públicos ao mesmo tempo', options: { bold: true, color: K.white, breakLine: true } },
    { text: 'Responsáveis de compras, que procuram fornecimento fiável, e equipas técnicas, que procuram aplicações e especificações. A homepage encaminha cada um para a solução certa.', options: { color: K.mutedDk, fontSize: 11 } },
  ], { x: M, y: 5.5, w: 4.75, h: 1.2, fontSize: 12.5, lineSpacingMultiple: 1.15, paraSpaceAfter: 4 })
  s.addNotes(
    'Este website dirige-se a compradores industriais, engenheiros, técnicos e gestores de instalações. O ponto central é o pedido de informação técnica e comercial, visível em todas as páginas. Importante: a oferta identificada em Angola abrange gases industriais, alimentares e medicinais e serviços de redes de gases. As categorias e os serviços concretos serão validados com a operação angolana; não transpomos automaticamente produtos ou certificações da Acail Gás em Portugal. A paleta do mockup é provisória e será alinhada com a identidade visual oficial da ACAIL Gás.'
  )

  // =====================================================================
  // 09 — WEBSITE ACAIL PRÉ-FABRICADOS
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Proposta')
  eyebrow(s, 'Website 03 · Catálogo técnico', K.pre)
  s.addText('ACAIL Pré-Fabricados: engenharia e produto numa experiência digital eficiente', { placeholder: 'title' })
  s.addImage({ path: A('mock-pref.jpg'), x: M, y: 2.0, w: 7.5, h: 4.48, altText: 'Mockup conceptual do catálogo ACAIL Pré-Fabricados' })
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: 7.5, h: 4.48, fill: { type: 'none' }, line: { color: K.line, width: 0.75 } })
  caption(s, 'Conceito de design — proposta não aprovada. Produtos ilustrativos; especificações por preencher com dados ACAIL.', { x: M, y: 6.55, w: 7.5, h: 0.2 })
  const rx9 = 8.55
  txt(s, 'ARQUITETURA SUGERIDA', { x: rx9, y: 2.0, w: 4.2, h: 0.25, fontSize: 9, bold: true, color: K.pre, charSpacing: 2 })
  txt(s, 'Homepage · A Empresa · Capacidade Produtiva · Catálogo de Produtos (Postes, Blocos, Tubos, Lancis) · Fichas Técnicas · Aplicações e Projetos · Pedido de Orçamento · Contactos', {
    x: rx9, y: 2.32, w: 4.18, h: 1.05, fontSize: 11.5, color: K.ink, lineSpacingMultiple: 1.25,
  })
  txt(s, 'FUNCIONALIDADES RECOMENDADAS', { x: rx9, y: 3.6, w: 4.2, h: 0.25, fontSize: 9, bold: true, color: K.pre, charSpacing: 2 })
  const feats = [
    ['Organização por categorias', 'Base'],
    ['Fichas de produto e características estruturadas', 'Base'],
    ['Formulário de pedido de orçamento', 'Base'],
    ['Contacto rápido da equipa comercial', 'Base'],
    ['Documentação PDF para download', 'Recomendada'],
    ['Pesquisa e filtros', 'Se justificado'],
  ]
  feats.forEach(([t, tag], i) => {
    const y = 3.95 + i * 0.4
    hline(s, rx9, y - 0.04, 4.18, K.line)
    txt(s, t, { x: rx9, y, w: 3.0, h: 0.32, fontSize: 11.5, valign: 'middle' })
    const tagC = tag === 'Base' ? K.ink : tag === 'Recomendada' ? K.pre : K.muted
    txt(s, tag, { x: rx9 + 3.0, y, w: 1.18, h: 0.32, fontSize: 9, bold: true, color: tagC, align: 'right', valign: 'middle' })
  })
  caption(s, 'Âmbito final de cada funcionalidade a confirmar na proposta comercial.', { x: rx9, y: 6.4, w: 4.18, h: 0.25 })
  s.addNotes(
    'Transformar um catálogo técnico numa ferramenta comercial. Público: construtoras, empreiteiros, engenheiros, projetistas, entidades públicas e compradores. A unidade de pré-fabricados de betão situa-se em Mazozo e as categorias divulgadas são postes, blocos, tubos e lancis. Cada produto terá uma ficha clara, documentação técnica e um botão de pedido de orçamento. "ACAIL Pré-Fabricados" é usado como identificação comercial do website, sem pressupor autonomia jurídica. Funcionalidades avançadas, como pesquisa e filtros, só se o volume do catálogo o justificar.'
  )

  // =====================================================================
  // 10 — TRÊS PÚBLICOS, TRÊS EXPERIÊNCIAS
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Proposta')
  eyebrow(s, 'Três públicos, três experiências', K.ang)
  s.addText('Uma comunicação direcionada a quem decide', { placeholder: 'title' })
  const journeys = [
    ['Cliente institucional', 'ACAIL Angola', 'bldgAng', HEX.ang, ['Conhece a ACAIL', 'Explora as áreas de atividade', 'Consulta projetos de referência', 'Entra em contacto']],
    ['Comprador industrial', 'ACAIL Gás Solucions', 'factory', HEX.gas, ['Identifica uma necessidade de gases', 'Consulta aplicações e soluções', 'Compara opções com a equipa técnica', 'Pede informação técnica ou comercial']],
    ['Engenheiro ou empreiteiro', 'ACAIL Pré-Fabricados', 'hardhat', HEX.pre, ['Procura um pré-fabricado', 'Consulta especificações', 'Descarrega a documentação', 'Pede orçamento']],
  ]
  journeys.forEach(([who, site, ic, c, steps], r) => {
    const y = 2.1 + r * 1.55
    rect(s, { x: M, y, w: CW, h: 1.35, fill: { color: K.light } })
    s.addImage({ data: I[ic], x: M + 0.3, y: y + 0.3, w: 0.42, h: 0.42 })
    txt(s, who, { x: M + 0.9, y: y + 0.28, w: 2.7, h: 0.3, fontSize: 14, bold: true })
    txt(s, site, { x: M + 0.9, y: y + 0.62, w: 2.7, h: 0.3, fontSize: 10.5, bold: true, color: c })
    const sx = 4.35
    const sw = 1.95
    const gap = 0.17
    hline(s, sx + 0.12, y + 0.42, 3 * (sw + gap), c, 1.25)
    steps.forEach((st, k) => {
      const x = sx + k * (sw + gap)
      const last = k === steps.length - 1
      s.addShape(pres.shapes.OVAL, { x, y: y + 0.3, w: 0.24, h: 0.24, fill: { color: last ? c : K.white }, line: { color: c, width: 1.5 } })
      txt(s, st, { x, y: y + 0.66, w: sw - 0.05, h: 0.55, fontSize: 11.5, bold: last, color: last ? c : K.ink, lineSpacingMultiple: 1.1 })
    })
  })
  caption(s, 'Percursos de exemplo, a validar com as equipas comerciais de cada operação no Discovery.', { x: M, y: 6.75, w: 8, h: 0.2 })
  s.addNotes(
    'Cada website é desenhado a partir de um percurso real de decisão. O cliente institucional quer confiança e visão global; o comprador industrial quer saber se a ACAIL resolve a sua necessidade e falar com alguém técnico; o engenheiro quer especificações e documentação antes de pedir orçamento. O último passo de cada percurso — o contacto — é o momento que todo o design deve facilitar. Estes percursos serão confirmados em entrevistas com as equipas comerciais.'
  )

  // =====================================================================
  // 11 — IDENTIDADE VISUAL E EXPERIÊNCIA
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Proposta')
  eyebrow(s, 'Direção criativa', K.ang)
  s.addText('Uma experiência premium, construída sobre a identidade ACAIL', { placeholder: 'title' })
  // paleta
  txt(s, 'PALETA DO ECOSSISTEMA', { x: M, y: 2.05, w: 4, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const pal = [
    ['Grafite', 'Base do grupo', HEX.ink],
    ['ACAIL Angola', 'Institucional', HEX.ang],
    ['ACAIL Gás', 'Acento técnico', HEX.gas],
    ['Pré-Fabricados', 'Betão e produto', HEX.conc],
  ]
  pal.forEach(([n, d, c], i) => {
    const x = M + i * 1.5
    rect(s, { x, y: 2.4, w: 1.38, h: 1.0, fill: { color: c } })
    txt(s, n, { x, y: 3.48, w: 1.45, h: 0.25, fontSize: 10.5, bold: true })
    txt(s, d, { x, y: 3.72, w: 1.45, h: 0.25, fontSize: 9.5, color: K.muted })
  })
  caption(s, 'Cores provisórias. Serão substituídas pelos códigos oficiais validados de cada marca.', { x: M, y: 4.02, w: 5.9, h: 0.22 })
  // tipografia
  txt(s, 'TIPOGRAFIA E COMPONENTES', { x: M, y: 4.45, w: 4, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  txt(s, 'Aa', { x: M, y: 4.75, w: 1.1, h: 0.85, fontSize: 48, bold: true, charSpacing: -2 })
  txt(s, [
    { text: 'Títulos firmes, texto legível', options: { bold: true, breakLine: true } },
    { text: 'Família sem serifa contemporânea, com hierarquia clara e boa leitura em ecrãs pequenos.', options: { color: K.muted, fontSize: 10.5 } },
  ], { x: M + 1.15, y: 4.8, w: 2.6, h: 0.9, fontSize: 12 })
  // componentes
  rect(s, { x: 4.6, y: 4.82, w: 1.9, h: 0.42, fill: { color: K.ang } })
  txt(s, 'Pedir informação  →', { x: 4.6, y: 4.82, w: 1.9, h: 0.42, fontSize: 10.5, bold: true, color: K.white, align: 'center', valign: 'middle' })
  rect(s, { x: 4.6, y: 5.34, w: 1.9, h: 0.42, fill: { type: 'none' }, line: { color: K.ink, width: 1 } })
  txt(s, 'Ficha técnica  ↓', { x: 4.6, y: 5.34, w: 1.9, h: 0.42, fontSize: 10.5, bold: true, align: 'center', valign: 'middle' })
  ;['Postes', 'Blocos', 'Tubos'].forEach((t, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + i * 0.95, y: 5.9, w: 0.85, h: 0.32, rectRadius: 0.16, fill: { color: i === 0 ? K.ink : K.white }, line: { color: K.ink, width: 0.75 } })
    txt(s, t, { x: M + i * 0.95, y: 5.9, w: 0.85, h: 0.32, fontSize: 9.5, align: 'center', valign: 'middle', color: i === 0 ? K.white : K.ink })
  })
  rect(s, { x: 3.6, y: 5.9, w: 2.9, h: 0.32, fill: { color: K.white }, line: { color: K.line, width: 0.75 } })
  txt(s, 'Pesquisar produto ou aplicação', { x: 3.7, y: 5.9, w: 2.7, h: 0.32, fontSize: 9.5, color: K.muted, valign: 'middle' })
  // princípios
  txt(s, 'PRINCÍPIOS', { x: 6.95, y: 2.05, w: 2.5, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const princ = ['Identidade corporativa preservada', 'Consistência entre os três websites', 'Design responsivo e mobile-first', 'Fotografia industrial real da ACAIL', 'Navegação intuitiva', 'Acessibilidade', 'Clareza da informação técnica']
  princ.forEach((t, i) => {
    hline(s, 6.95, 2.42 + i * 0.6, 2.75, K.line)
    txt(s, t, { x: 6.95, y: 2.5 + i * 0.6, w: 2.75, h: 0.45, fontSize: 11.5, valign: 'top' })
  })
  // telemóvel
  s.addImage({ path: A('mobile-gas.png'), x: 10.25, y: 2.0, w: 2.31, h: 4.74, altText: 'Mockup conceptual mobile do website ACAIL Gás Solucions' })
  caption(s, 'Conceito mobile — não aprovado', { x: 9.95, y: 6.78, w: 2.9, h: 0.2, align: 'center' })
  s.addNotes(
    'O sistema visual parte da identidade oficial de cada marca, que será preservada: logótipos, cores e regras existentes. Sobre essa base, criamos um sistema comum — tipografia, grelhas, componentes — que dá coerência aos três websites sem os tornar iguais. Cada operação tem um acento próprio. As cores aqui apresentadas são provisórias: serão substituídas pelos códigos oficiais assim que os recebermos. Fotografia: privilegiar fotografia real das instalações, produtos e obras da ACAIL, com direitos de utilização confirmados.'
  )

  // =====================================================================
  // 12 — DO WEBSITE AO CONTACTO COMERCIAL
  // =====================================================================
  s = newSlide('Conteúdo escuro', 'Proposta')
  eyebrow(s, 'Pontos de contacto', K.sky)
  s.addText('Transformar interesse em oportunidades de negócio', { placeholder: 'title' })
  const entries = [
    ['msg', 'Pedido de informações'],
    ['file', 'Solicitação de orçamento'],
    ['box', 'Contacto sobre produtos'],
    ['dl', 'Pedido de documentação técnica'],
    ['bldg', 'Contacto institucional'],
    ['msg', 'WhatsApp empresarial (se aprovado)'],
  ]
  txt(s, 'ONDE COMEÇA', { x: M, y: 2.05, w: 3, h: 0.25, fontSize: 9, bold: true, color: K.sky, charSpacing: 2 })
  entries.forEach(([ic, t], i) => {
    const y = 2.4 + i * 0.66
    rect(s, { x: M, y, w: 3.7, h: 0.54, fill: { color: K.ink2 } })
    s.addImage({ data: I[ic], x: M + 0.18, y: y + 0.14, w: 0.26, h: 0.26 })
    txt(s, t, { x: M + 0.6, y, w: 3.0, h: 0.54, fontSize: 11.5, color: K.white, valign: 'middle' })
  })
  // conectores
  entries.forEach((_, i) => {
    const y = 2.67 + i * 0.66
    s.addShape(pres.shapes.LINE, { x: 4.3, y: Math.min(y, 4.29), w: 0.75, h: Math.abs(4.29 - y), flipV: y > 4.29, line: { color: K.lineDk, width: 1 } })
  })
  // núcleo
  rect(s, { x: 5.05, y: 3.25, w: 3.1, h: 2.1, fill: { color: K.ang } })
  s.addImage({ data: I.clip, x: 5.3, y: 3.45, w: 0.36, h: 0.36 })
  txt(s, [
    { text: 'Formulário estruturado', options: { bold: true, fontSize: 15, breakLine: true } },
    { text: 'Recolhe a informação de que a equipa precisa — área, produto, quantidade, prazo — e encaminha para o departamento competente.', options: { fontSize: 11 } },
  ], { x: 5.3, y: 3.95, w: 2.65, h: 1.3, color: K.white, lineSpacingMultiple: 1.15, paraSpaceAfter: 4 })
  // destinos
  const depts = ['Comercial · Gases', 'Saúde · Gases medicinais', 'Comercial · Pré-fabricados', 'Geral · Institucional']
  txt(s, 'ONDE CHEGA', { x: 9.0, y: 2.05, w: 3, h: 0.25, fontSize: 9, bold: true, color: K.sky, charSpacing: 2 })
  depts.forEach((t, i) => {
    const y = 2.75 + i * 0.85
    s.addShape(pres.shapes.LINE, { x: 8.15, y: Math.min(4.3, y + 0.3), w: 0.85, h: Math.abs(y + 0.3 - 4.3), flipV: y + 0.3 < 4.3, line: { color: K.lineDk, width: 1 } })
    rect(s, { x: 9.0, y, w: 3.73, h: 0.6, fill: { type: 'none' }, line: { color: K.lineDk, width: 1 } })
    txt(s, t, { x: 9.2, y, w: 3.4, h: 0.6, fontSize: 12, bold: true, color: K.white, valign: 'middle' })
  })
  txt(s, 'Departamentos e regras de encaminhamento a definir com a ACAIL. Não apresentamos projeções de conversão: os indicadores serão definidos após o lançamento, com dados reais.', {
    x: 9.0, y: 6.2, w: 3.73, h: 0.65, fontSize: 9.5, italic: true, color: K.mutedDk, lineSpacingMultiple: 1.15,
  })
  s.addNotes(
    'Um website institucional também é um canal comercial. Cada ponto de contacto recolhe a informação certa e chega ao departamento competente, evitando emails genéricos sem contexto. O WhatsApp empresarial só será integrado se a ACAIL o aprovar e tiver equipa para responder. Não fazemos promessas de vendas ou de conversão; propomos medir, com as regras de privacidade aplicáveis, quantos pedidos chegam por cada canal após o lançamento.'
  )

  // =====================================================================
  // 13 — TECNOLOGIA E ENGENHARIA
  // =====================================================================
  pres.addSection({ title: 'Execução' })
  s = newSlide('Conteúdo claro', 'Execução')
  eyebrow(s, 'Tecnologia e engenharia', K.ang)
  s.addText('Uma base tecnológica sólida, preparada para evoluir', { placeholder: 'title' })
  // diagrama de arquitetura
  const box = (x, y, w, h, ic, t, d, fill) => {
    rect(s, { x, y, w, h, fill: { color: fill || K.light }, line: fill ? { type: 'none' } : { color: K.line, width: 0.75 } })
    if (ic) s.addImage({ data: I[ic], x: x + 0.2, y: y + 0.2, w: 0.3, h: 0.3 })
    txt(s, t, { x: x + (ic ? 0.62 : 0.2), y: y + 0.17, w: w - 0.8, h: 0.35, fontSize: 12.5, bold: true, color: fill === K.ink ? K.white : K.ink })
    if (d) txt(s, d, { x: x + 0.2, y: y + 0.6, w: w - 0.4, h: h - 0.7, fontSize: 10.5, color: fill === K.ink ? K.mutedDk : K.muted, lineSpacingMultiple: 1.15 })
  }
  box(M, 2.1, 6.6, 0.62, 'monitor', 'Visitantes · computador, tablet e telemóvel', null)
  box(M, 2.97, 6.6, 0.88, 'globe', 'Publicação e distribuição', 'Vercel ou infraestrutura equivalente · HTTPS · CDN', null)
  rect(s, { x: M, y: 4.1, w: 6.6, h: 1.15, fill: { color: K.ink } })
  txt(s, 'Aplicação web', { x: M + 0.2, y: 4.22, w: 3, h: 0.3, fontSize: 12.5, bold: true, color: K.white })
  ;['Next.js', 'React', 'TypeScript', 'Tailwind CSS'].forEach((t, i) => {
    rect(s, { x: M + 0.2 + i * 1.6, y: 4.65, w: 1.48, h: 0.42, fill: { color: K.ink2 } })
    txt(s, t, { x: M + 0.2 + i * 1.6, y: 4.65, w: 1.48, h: 0.42, fontSize: 10.5, color: K.white, align: 'center', valign: 'middle' })
  })
  box(M, 5.5, 2.1, 0.9, 'db', 'CMS', 'Conteúdos e catálogos', null)
  box(M + 2.25, 5.5, 2.1, 0.9, 'mailInk', 'Formulários', 'Envio por email', null)
  box(M + 4.5, 5.5, 2.1, 0.9, 'chart', 'Analytics', 'Com consentimento', null)
  // setas verticais
  ;[[2.72, 2.97], [3.85, 4.1], [5.25, 5.5]].forEach(([a, b]) => vline(s, M + 3.3, a, b - a, K.ink, 1.25))
  txt(s, 'Tecnologias de referência, sujeitas a análise e aprovação no Discovery.', { x: M, y: 6.52, w: 6.6, h: 0.2, fontSize: 9, italic: true, color: K.muted })
  // benefícios
  const bx = 7.75
  txt(s, 'O QUE ISTO SIGNIFICA PARA A ACAIL', { x: bx, y: 2.1, w: 5, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const ben = [
    ['gauge', 'Desempenho', 'Páginas leves, pensadas também para redes móveis.'],
    ['shield', 'Segurança', 'Ligações cifradas, dependências atualizadas, boas práticas de configuração.'],
    ['search', 'SEO técnico', 'Estrutura, metadados e URLs claros para os motores de pesquisa.'],
    ['phone', 'Responsividade e acessibilidade', 'Leitura confortável em qualquer ecrã e para mais utilizadores.'],
    ['branch', 'Manutenção e controlo de versões', 'Código organizado e histórico de alterações; evolução sem recomeçar do zero.'],
  ]
  ben.forEach(([ic, t, d], i) => {
    const y = 2.5 + i * 0.84
    s.addImage({ data: I[ic], x: bx, y: y + 0.03, w: 0.3, h: 0.3 })
    txt(s, t, { x: bx + 0.5, y, w: 4.4, h: 0.3, fontSize: 13, bold: true })
    txt(s, d, { x: bx + 0.5, y: y + 0.32, w: 4.4, h: 0.45, fontSize: 11, color: K.muted })
  })
  s.addNotes(
    'Traduzir tecnologia em benefícios. A arquitetura proposta é moderna e amplamente usada: Next.js e React para a aplicação, TypeScript para código mais robusto, Tailwind CSS para um sistema visual consistente, um CMS para os conteúdos, e publicação em Vercel ou infraestrutura equivalente. As escolhas finais serão confirmadas no Discovery, em função do alojamento preferido pela ACAIL, da equipa que vai gerir conteúdos e das regras de privacidade aplicáveis.'
  )

  // =====================================================================
  // 14 — CONTEÚDOS, CATÁLOGOS E AUTONOMIA
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Execução')
  eyebrow(s, 'Gestão de conteúdos', K.ang)
  s.addText('Informação organizada. Conteúdos preparados para crescer.', { placeholder: 'title' })
  const hdr = (t, al) => ({ text: t, options: { bold: true, fontSize: 9.5, color: K.muted, charSpacing: 1.5, align: al || 'left', fill: { color: K.white }, border: [{ type: 'none' }, { type: 'none' }, { pt: 1.25, color: HEX.ink }, { type: 'none' }] } })
  const cell = (t, o = {}) => ({ text: t, options: { fontSize: 12, color: K.ink, border: [{ type: 'none' }, { type: 'none' }, { pt: 0.75, color: HEX.line }, { type: 'none' }], ...o } })
  const dots = (n) => '●'.repeat(n) + '○'.repeat(3 - n)
  const rows14 = [
    ['Conteúdos institucionais', 'História, missão, instalações, compromissos', 1, 'Estrutura fixa, textos editáveis'],
    ['Catálogos de produtos', 'Categorias, produtos e aplicações', 2, 'CMS recomendado'],
    ['Fichas técnicas', 'Características e especificações estruturadas', 2, 'CMS recomendado'],
    ['Fotografias e documentação', 'Imagens, PDF e catálogos para download', 2, 'Biblioteca de média no CMS'],
    ['Notícias e atualizações', 'Novidades, eventos, comunicados', 3, 'CMS recomendado'],
    ['Contactos por área de negócio', 'Departamentos, emails, encaminhamento', 1, 'Configuração centralizada'],
  ]
  s.addTable(
    [
      [hdr('TIPO DE CONTEÚDO'), hdr('EXEMPLOS'), hdr('FREQUÊNCIA PREVISTA', 'center'), hdr('GESTÃO PROPOSTA')],
      ...rows14.map(([a, b, n, d]) => [
        cell(a, { bold: true }),
        cell(b, { color: K.muted, fontSize: 11 }),
        cell(dots(n), { align: 'center', color: K.ang, fontSize: 12, charSpacing: 3 }),
        cell(d, { fontSize: 11.5, bold: d.startsWith('CMS'), color: d.startsWith('CMS') ? K.ang : K.ink }),
      ]),
    ],
    { x: M, y: 2.1, w: 8.4, colW: [2.55, 2.95, 1.35, 1.55], rowH: [0.4, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58], valign: 'middle', margin: [0.04, 0.08, 0.04, 0], objectName: 'Matriz de conteúdos' }
  )
  txt(s, '●○○ baixa   ●●○ média   ●●● alta', { x: M, y: 6.25, w: 5, h: 0.25, fontSize: 9.5, color: K.muted })
  rect(s, { x: 9.4, y: 2.1, w: 3.33, h: 4.4, fill: { color: K.ink } })
  txt(s, [
    { text: 'DIMENSIONADO À REALIDADE', options: { bold: true, fontSize: 9, color: K.sky, charSpacing: 2, breakLine: true } },
    { text: 'Autonomia onde ela é útil.', options: { bold: true, fontSize: 17, color: K.white, breakLine: true } },
    { text: 'Propomos um CMS para as secções que mudam com frequência. O restante mantém-se estável e protegido.', options: { fontSize: 11.5, color: K.mutedDk, breakLine: true } },
    { text: 'A solução final depende da utilização real e da capacidade da equipa ACAIL para gerir conteúdos — e inclui formação, se contratada.', options: { fontSize: 11.5, color: K.mutedDk } },
  ], { x: 9.65, y: 2.35, w: 2.85, h: 3.95, lineSpacingMultiple: 1.2, paraSpaceAfter: 10 })
  s.addNotes(
    'A autonomia deve ser útil, não um fardo. Separamos o que muda pouco (institucional, contactos) do que muda com frequência (notícias, catálogos, fichas técnicas, documentação). Recomendamos um CMS apenas onde ele traz valor real. A decisão final depende de quem, na ACAIL, vai manter os conteúdos e com que regularidade — tema a tratar no Discovery.'
  )

  // =====================================================================
  // 15 — METODOLOGIA
  // =====================================================================
  s = newSlide('Conteúdo escuro', 'Execução')
  eyebrow(s, 'Metodologia de execução', K.sky)
  s.addText('Um processo estruturado, do diagnóstico ao lançamento', { placeholder: 'title' })
  const phases = [
    ['Discovery e alinhamento', 'Necessidades, públicos, objetivos e materiais existentes.', 'Documento de requisitos'],
    ['Estratégia e arquitetura', 'Conteúdos, estrutura de navegação e jornadas dos utilizadores.', 'Mapa dos websites'],
    ['UX/UI Design', 'Wireframes, identidade digital e protótipos.', 'Protótipos aprovados'],
    ['Desenvolvimento', 'Implementação técnica e funcionalidades contratadas.', 'Ambiente de testes'],
    ['Testes e validação', 'Funcionalidade, conteúdos, responsividade e aceitação.', 'Relatório de validação'],
    ['Publicação e entrega', 'Produção, entrada em funcionamento, documentação e passagem de conhecimento.', 'Websites em produção'],
  ]
  const pw = CW / 6
  hline(s, M + 0.14, 2.55, CW - 0.3, K.lineDk, 1.5)
  phases.forEach(([t, d, e], i) => {
    const x = M + i * pw
    const ok = [2, 4, 5].includes(i)
    s.addShape(pres.shapes.OVAL, { x, y: 2.41, w: 0.28, h: 0.28, fill: { color: i === 0 ? K.sky : K.ink }, line: { color: K.sky, width: 1.5 } })
    txt(s, String(i + 1).padStart(2, '0'), { x, y: 2.95, w: 1, h: 0.4, fontSize: 24, bold: true, color: K.sky })
    txt(s, t, { x, y: 3.5, w: pw - 0.2, h: 0.6, fontSize: 13.5, bold: true, color: K.white, lineSpacingMultiple: 1.05 })
    txt(s, d, { x, y: 4.15, w: pw - 0.25, h: 1.15, fontSize: 11, color: K.mutedDk, lineSpacingMultiple: 1.2 })
    hline(s, x, 5.4, pw - 0.25, K.lineDk)
    txt(s, [
      { text: 'ENTREGÁVEL', options: { fontSize: 8, bold: true, color: K.mutedDk, charSpacing: 1.5, breakLine: true } },
      { text: e, options: { fontSize: 11, bold: true, color: K.white } },
    ], { x, y: 5.5, w: pw - 0.2, h: 0.6, paraSpaceAfter: 2 })
    if (ok) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.98, w: 1.55, h: 0.27, rectRadius: 0.13, fill: { color: K.ink2 }, line: { color: K.sky, width: 0.75 } })
      txt(s, 'Aprovação ACAIL', { x, y: 1.98, w: 1.55, h: 0.27, fontSize: 8.5, bold: true, color: K.sky, align: 'center', valign: 'middle' })
    }
  })
  rect(s, { x: M, y: 6.3, w: CW, h: 0.45, fill: { color: K.ink2 } })
  txt(s, 'Calendarização detalhada: a definir após confirmação do âmbito e dos conteúdos disponíveis.', { x: M + 0.25, y: 6.3, w: CW - 0.5, h: 0.45, fontSize: 11, color: K.white, valign: 'middle' })
  s.addNotes(
    'Seis fases, cada uma com um entregável concreto e pontos de aprovação pela ACAIL — no design, na validação e antes da publicação. As três operações podem avançar em paralelo ou de forma faseada, conforme as prioridades e a disponibilidade de conteúdos. Não apresentamos prazos nesta fase: o calendário depende do âmbito final e dos materiais disponíveis (textos, fotografias, fichas técnicas).'
  )

  // =====================================================================
  // 16 — QUALIDADE
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Execução')
  eyebrow(s, 'Qualidade e garantia de entrega', K.ang)
  s.addText('Qualidade em cada detalhe', { placeholder: 'title' })
  const qa = [
    'Revisão da experiência de utilização',
    'Compatibilidade com diferentes dispositivos',
    'Testes dos formulários',
    'Validação de links e navegação',
    'Verificação de conteúdos',
    'SEO técnico essencial',
    'Segurança e configurações',
    'Testes de desempenho',
    'Aprovação antes da publicação',
    'Documentação e formação, se incluídas',
  ]
  qa.forEach((t, i) => {
    const col = Math.floor(i / 5)
    const row = i % 5
    const x = M + col * 3.75
    const y = 2.15 + row * 0.82
    hline(s, x, y, 3.5, K.line)
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.2, w: 0.36, h: 0.36, fill: { color: K.light }, line: { type: 'none' } })
    s.addImage({ data: I.check, x: x + 0.08, y: y + 0.28, w: 0.2, h: 0.2 })
    txt(s, t, { x: x + 0.55, y: y + 0.15, w: 2.95, h: 0.45, fontSize: 12.5, valign: 'middle' })
  })
  rect(s, { x: 8.4, y: 2.15, w: 4.33, h: 4.45, fill: { color: K.light } })
  txt(s, 'CRITÉRIOS DE ACEITAÇÃO', { x: 8.7, y: 2.4, w: 3.8, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  txt(s, 'Cada website é aceite quando:', { x: 8.7, y: 2.75, w: 3.8, h: 0.35, fontSize: 15, bold: true })
  const crit = [
    'As páginas e funcionalidades acordadas estão implementadas.',
    'Os conteúdos aprovados pela ACAIL estão publicados e revistos.',
    'Os formulários entregam os pedidos aos destinatários definidos.',
    'A navegação foi verificada nos dispositivos e navegadores acordados.',
  ]
  crit.forEach((t, i) => {
    txt(s, String(i + 1), { x: 8.7, y: 3.3 + i * 0.7, w: 0.3, h: 0.3, fontSize: 12, bold: true, color: K.ang })
    txt(s, t, { x: 9.05, y: 3.3 + i * 0.7, w: 3.45, h: 0.62, fontSize: 11.5, lineSpacingMultiple: 1.15 })
  })
  txt(s, 'Os critérios finais e os níveis técnicos de referência são fixados em contrato.', { x: 8.7, y: 6.12, w: 3.8, h: 0.4, fontSize: 9.5, italic: true, color: K.muted })
  s.addNotes(
    'A qualidade é um compromisso de método, não uma promessa abstrata. Antes de qualquer publicação, cada website passa por verificações de experiência, compatibilidade, formulários, links, conteúdos, SEO técnico, segurança e desempenho — e pela aprovação formal da ACAIL. Os critérios de aceitação são objetivos e acordados à partida. Não prometemos certificações nem níveis de desempenho sem os medir e enquadrar tecnicamente.'
  )

  // =====================================================================
  // 17 — ACOMPANHAMENTO
  // =====================================================================
  s = newSlide('Conteúdo claro', 'Execução')
  eyebrow(s, 'Acompanhamento e evolução', K.ang)
  s.addText('Uma parceria que continua depois do lançamento', { placeholder: 'title' })
  rect(s, { x: M, y: 2.1, w: 4.0, h: 4.5, fill: { color: K.ink } })
  txt(s, 'NO PROJETO INICIAL', { x: M + 0.3, y: 2.35, w: 3.5, h: 0.25, fontSize: 9, bold: true, color: K.sky, charSpacing: 2 })
  txt(s, 'Entrega completa', { x: M + 0.3, y: 2.65, w: 3.5, h: 0.4, fontSize: 18, bold: true, color: K.white })
  const incl = ['Configuração de produção e publicação', 'Documentação técnica', 'Passagem de conhecimento à equipa ACAIL', 'Correção de não conformidades detetadas na aceitação']
  incl.forEach((t, i) => {
    s.addImage({ data: I.checkW, x: M + 0.3, y: 3.33 + i * 0.68, w: 0.22, h: 0.22 })
    txt(s, t, { x: M + 0.68, y: 3.27 + i * 0.68, w: 3.1, h: 0.6, fontSize: 12, color: K.white, lineSpacingMultiple: 1.1 })
  })
  txt(s, 'Âmbito exato a confirmar em contrato.', { x: M + 0.3, y: 6.15, w: 3.5, h: 0.3, fontSize: 9.5, italic: true, color: K.mutedDk })
  txt(s, 'SERVIÇOS RECORRENTES OPCIONAIS', { x: 5.0, y: 2.1, w: 6, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const rec = [
    ['Manutenção técnica', 'Funcionamento estável no dia a dia'],
    ['Atualização de dependências', 'Componentes de software atualizados'],
    ['Monitorização', 'Deteção atempada de anomalias'],
    ['Cópias de segurança', 'Recuperação de conteúdos e configurações'],
    ['Correção de problemas', 'Resolução de erros reportados'],
    ['Gestão de conteúdos', 'Publicação feita pela Smarty Squad'],
    ['Melhorias evolutivas', 'Ajustes a partir da utilização real'],
    ['Otimização de desempenho', 'Revisões periódicas de rapidez'],
    ['Novas funcionalidades', 'Desenvolvimento sob orçamento'],
    ['Apoio técnico', 'Esclarecimento à equipa ACAIL'],
  ]
  rec.forEach(([t, d], i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = 5.0 + col * 3.9
    const y = 2.5 + row * 0.8
    hline(s, x, y, 3.7, K.line)
    txt(s, t, { x, y: y + 0.1, w: 3.7, h: 0.3, fontSize: 12.5, bold: true })
    txt(s, d, { x, y: y + 0.4, w: 3.7, h: 0.3, fontSize: 10.5, color: K.muted })
  })
  txt(s, 'Níveis de serviço, horários e tempos de resposta definidos contratualmente, à medida das necessidades da ACAIL.', { x: 5.0, y: 6.55, w: 7.7, h: 0.25, fontSize: 9.5, italic: true, color: K.muted })
  s.addNotes(
    'Um website é um produto vivo. Separamos com clareza o que está incluído no projeto inicial — publicação, documentação, passagem de conhecimento e correção de não conformidades — dos serviços recorrentes opcionais, contratados separadamente e dimensionados às necessidades. Não indicamos níveis de serviço nesta fase: serão definidos em contrato.'
  )

  // =====================================================================
  // 18 — MODELO DE INVESTIMENTO
  // =====================================================================
  pres.addSection({ title: 'Decisão' })
  s = newSlide('Conteúdo claro', 'Decisão')
  eyebrow(s, 'Modelo de investimento', K.ang)
  s.addText('Uma proposta integrada, dimensionada para três realidades', { placeholder: 'title' })
  const TBD = 'A definir após levantamento de requisitos'
  const th = (t, c, sub) => ({
    text: [
      { text: t, options: { bold: true, fontSize: 12, color: c === K.ink ? K.white : K.ink, breakLine: !!sub } },
      ...(sub ? [{ text: sub, options: { fontSize: 9, color: c === K.ink ? K.mutedDk : K.muted } }] : []),
    ],
    options: { fill: { color: c }, valign: 'middle', border: [{ type: 'none' }, { pt: 2, color: HEX.white }, { type: 'none' }, { type: 'none' }] },
  })
  const td = (t, o = {}) => ({ text: t, options: { fontSize: 10.5, color: K.ink, valign: 'middle', border: [{ type: 'none' }, { pt: 2, color: HEX.white }, { pt: 0.75, color: HEX.line }, { type: 'none' }], ...o } })
  const rowsInv = [
    ['Website ACAIL Angola', 'Websites institucionais responsivos', 'Maior profundidade editorial e CMS', '—'],
    ['Website ACAIL Gás Solucions', 'Conteúdos e funcionalidades nucleares', 'Soluções, aplicações e pedidos técnicos', '—'],
    ['Website ACAIL Pré-Fabricados', 'Catálogo base e pedido de orçamento', 'Catálogo estruturado e documentação', '—'],
    ['Componentes partilhados e integrações', 'Sistema de design e formulários', 'Funcionalidades comerciais selecionadas', 'Automatizações e integrações'],
    ['Manutenção e evolução', 'Opcional', 'Opcional', 'Manutenção e desenvolvimento contínuo'],
  ]
  s.addTable(
    [
      [th('Componente', K.white), th('Proposta Essencial', K.light, 'Três websites nucleares'), th('Proposta Recomendada', K.ink, 'Maior profundidade'), th('Serviços Evolutivos', K.light, 'Contratação separada')],
      ...rowsInv.map(([a, b, c2, d]) => [td(a, { bold: true, fontSize: 11.5 }), td(b, { color: K.muted }), td(c2, { fill: { color: 'EAF1F9' } }), td(d, { color: K.muted })]),
      [td('Investimento', { bold: true, fontSize: 11.5 }), td(TBD, { italic: true, color: K.ang, bold: true }), td(TBD, { italic: true, color: K.ang, bold: true, fill: { color: 'EAF1F9' } }), td(TBD, { italic: true, color: K.ang, bold: true })],
    ],
    { x: M, y: 2.05, w: 8.75, colW: [2.3, 2.15, 2.15, 2.15], rowH: [0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.55], margin: [0.05, 0.1, 0.05, 0.1], objectName: 'Matriz de investimento' }
  )
  txt(s, 'Valores, impostos, condições de pagamento e calendário a inserir após validação do âmbito. Conteúdo dos pacotes sujeito a validação comercial.', {
    x: M, y: 6.4, w: 8.75, h: 0.45, fontSize: 9.5, italic: true, color: K.muted, lineSpacingMultiple: 1.15,
  })
  // individual vs integrada
  const ix = 9.65
  txt(s, 'PORQUÊ CONTRATAR EM CONJUNTO', { x: ix, y: 2.05, w: 3.08, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
  const cmp = [
    ['Estratégia', 'Um Discovery para três realidades, em vez de três processos isolados.'],
    ['Componentes', 'Sistema de design e base técnica desenvolvidos uma vez e partilhados.'],
    ['Aprovações', 'Um calendário de decisão coordenado com a administração.'],
    ['Gestão', 'Um interlocutor, uma manutenção, uma linguagem visual.'],
  ]
  cmp.forEach(([t, d], i) => {
    const y = 2.42 + i * 0.95
    hline(s, ix, y, 3.08, K.line)
    txt(s, t, { x: ix, y: y + 0.1, w: 3.08, h: 0.3, fontSize: 12.5, bold: true })
    txt(s, d, { x: ix, y: y + 0.4, w: 3.08, h: 0.55, fontSize: 10.5, color: K.muted, lineSpacingMultiple: 1.1 })
  })
  txt(s, 'Ganhos de eficiência potenciais, a quantificar na proposta financeira.', { x: ix, y: 6.4, w: 3.08, h: 0.45, fontSize: 9.5, italic: true, color: K.muted })
  s.addNotes(
    'Apresentar a estrutura, não os números. Os valores ficam por definir até concluirmos o levantamento de requisitos — é a forma mais honesta de dimensionar três websites com necessidades diferentes. Proposta Essencial: três websites institucionais responsivos com conteúdos e funcionalidades nucleares. Proposta Recomendada: maior profundidade editorial, catálogos estruturados, gestão de conteúdos e funcionalidades comerciais selecionadas. Serviços Evolutivos: manutenção, automatização, integrações e desenvolvimento contínuo, contratados à parte. A contratação integrada permite partilhar estratégia, componentes, aprovações e gestão; os ganhos serão quantificados na proposta financeira. [Campos editáveis: inserir valores após validação.]'
  )

  // =====================================================================
  // 19 — PORQUÊ A SMARTY SQUAD
  // =====================================================================
  s = newSlide('Conteúdo escuro', 'Decisão')
  s.addImage({ path: A('steel.jpg'), x: 8.4, y: 0, w: 4.933, h: 7.5, sizing: { type: 'cover', w: 4.933, h: 7.5 }, altText: 'Ilustração conceptual de varão de aço' })
  eyebrow(s, 'Porquê a Smarty Squad', K.sky)
  s.addText('Mais do que websites. Uma visão de parceria digital.', { placeholder: 'title', w: 7.4 })
  const why = [
    ['Compreensão do negócio', 'Partimos das três operações, não de um modelo.'],
    ['Três realidades industriais', 'Cada website responde ao seu público.'],
    ['Estratégia coordenada', 'Uma visão de grupo, três expressões.'],
    ['Design personalizado', 'Concebido para a ACAIL, não adaptado de um template.'],
    ['Engenharia estruturada', 'Código organizado, documentado e sustentável.'],
    ['Foco no utilizador', 'Percursos curtos até à informação e ao contacto.'],
    ['Processo transparente', 'Fases, entregáveis e aprovações claras.'],
    ['Evolução a longo prazo', 'Uma base preparada para crescer.'],
  ]
  why.forEach(([t, d], i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = M + col * 3.75
    const y = 2.2 + row * 1.08
    hline(s, x, y, 3.5, K.lineDk)
    txt(s, String(i + 1).padStart(2, '0'), { x, y: y + 0.15, w: 0.45, h: 0.3, fontSize: 10, bold: true, color: K.sky })
    txt(s, t, { x: x + 0.45, y: y + 0.12, w: 3.05, h: 0.3, fontSize: 13, bold: true, color: K.white })
    txt(s, d, { x: x + 0.45, y: y + 0.45, w: 3.05, h: 0.5, fontSize: 11, color: K.mutedDk })
  })
  s.addNotes(
    'Fechar o argumento sem exageros nem comparações com concorrentes. Oito razões objetivas que decorrem de tudo o que foi apresentado: compreendemos o negócio, desenhamos para três realidades distintas, coordenamos a estratégia, personalizamos o design, estruturamos a engenharia, focamo-nos no utilizador, trabalhamos com transparência e preparamos a evolução.'
  )

  // =====================================================================
  // 20 — PRÓXIMOS PASSOS
  // =====================================================================
  s = newSlide('Capa', 'Decisão')
  s.addImage({ path: A('cover.jpg'), x: 0, y: 0, w: W, h: 7.5, altText: 'Ilustração conceptual de um complexo industrial ao entardecer' })
  rect(s, { x: 0, y: 0, w: W, h: 7.5, fill: { color: K.ink, transparency: 30 } })
  txt(s, 'PRÓXIMOS PASSOS', { x: M, y: 0.48, w: 6, h: 0.25, fontSize: 9.5, bold: true, color: K.sky, charSpacing: 3 })
  txt(s, 'O próximo capítulo digital da ACAIL começa com uma visão partilhada.', { x: M, y: 0.8, w: 7.6, h: 1.1, fontSize: 28, bold: true, color: K.white, charSpacing: -0.5 })
  const steps = [
    'Reunião de alinhamento com os responsáveis pelas três operações',
    'Validação dos objetivos, prioridades e requisitos de cada website',
    'Levantamento e organização dos materiais disponíveis',
    'Definição do âmbito, investimento e calendarização',
    'Aprovação da proposta e início do projeto',
  ]
  steps.forEach((t, i) => {
    const y = 2.25 + i * 0.62
    s.addShape(pres.shapes.OVAL, { x: M, y: y + 0.02, w: 0.38, h: 0.38, fill: { color: i === 0 ? K.sky : K.ink }, line: { color: K.sky, width: 1 } })
    txt(s, String(i + 1), { x: M, y: y + 0.02, w: 0.38, h: 0.38, fontSize: 11, bold: true, color: i === 0 ? K.ink : K.sky, align: 'center', valign: 'middle' })
    txt(s, t, { x: M + 0.6, y, w: 6.6, h: 0.42, fontSize: 14, color: K.white, valign: 'middle' })
  })
  txt(s, '“A dimensão da ACAIL merece uma presença digital que comunique, com a mesma confiança, a qualidade do seu trabalho.”', {
    x: M, y: 5.55, w: 7.4, h: 0.9, fontSize: 16, italic: true, color: 'D5DEE7', lineSpacingMultiple: 1.2,
  })
  // assinatura
  rect(s, { x: 8.75, y: 4.35, w: 3.98, h: 2.55, fill: { color: K.ink, transparency: 10 }, line: { color: '33475A', width: 0.75 } })
  txt(s, 'SMARTY SQUAD', { x: 9.05, y: 4.6, w: 3.4, h: 0.4, fontSize: 18, bold: true, color: K.white, charSpacing: 4 })
  txt(s, 'Estratégia. Design. Tecnologia.', { x: 9.05, y: 5.02, w: 3.4, h: 0.3, fontSize: 11.5, color: K.sky })
  hline(s, 9.05, 5.48, 3.4, '33475A')
  txt(s, [
    { text: '[Nome do responsável comercial]', options: { breakLine: true, bold: true, color: K.white } },
    { text: '[Cargo]', options: { breakLine: true } },
    { text: '[email@smartysquad.com]', options: { breakLine: true } },
    { text: '[+244 / +351 telefone]', options: {} },
  ], { x: 9.05, y: 5.6, w: 3.4, h: 1.1, fontSize: 10.5, color: K.mutedDk, lineSpacingMultiple: 1.15 })
  s.addNotes(
    'Convidar à decisão com passos concretos e de baixo risco. O primeiro passo é uma reunião de alinhamento com os responsáveis das três operações; a partir daí validamos requisitos, levantamos materiais, definimos âmbito, investimento e calendário, e iniciamos o projeto após aprovação. Ler a frase final. Deixar os contactos e abrir para perguntas. [Substituir os campos entre parênteses retos pelos contactos comerciais reais.]'
  )

  // =====================================================================
  // ANEXO — Fontes e notas de validação
  // =====================================================================
  pres.addSection({ title: 'Anexo' })
  s = newSlide('Conteúdo claro', 'Anexo')
  eyebrow(s, 'Anexo', K.muted)
  s.addText('Fontes e notas de validação', { placeholder: 'title' })
  const colA = [
    ['Fontes consultadas', [
      'www.acailangola.com e página “Quem Somos” — referência indicada pelo cliente (acesso direto indisponível no ambiente de preparação; conteúdos baseados no briefing).',
      'www.acailgas.pt — referência de identidade visual da Acail Gás (Portugal); acesso direto indisponível.',
      'Ver Angola (ago. 2016; nov. 2017), ANGOP e Devex — confirmação de constituição em 2005, seis setores e localização no Pólo Industrial de Viana.',
    ]],
    ['Dados utilizados', [
      'Constituição em 2005; seis setores de atividade; unidade de pré-fabricados em Mazozo (postes, blocos, tubos, lancis).',
      'Projetos citados apenas pelo nome, tal como surgem no portefólio público; âmbito do fornecimento não indicado.',
    ]],
  ]
  const colB = [
    ['A validar com a ACAIL', [
      'Logótipos oficiais e códigos de cor de ACAIL Angola e ACAIL Gás.',
      'Catálogo de gases e serviços da operação angolana (sem transposição da oferta em Portugal).',
      'Designação “ACAIL GÁS SOLUCIONS” mantida conforme indicada pelo cliente.',
      '“ACAIL Pré-Fabricados” como designação comercial, sem pressupor autonomia jurídica.',
      'Fotografias com direitos de utilização; fichas técnicas e especificações.',
    ]],
    ['Notas sobre os elementos visuais', [
      'Mockups: conceitos de design não aprovados. Ilustrações vetoriais conceptuais, que não representam instalações, produtos, colaboradores ou projetos reais.',
      'Wordmark Smarty Squad tipográfico; substituir pelo logótipo oficial.',
    ]],
  ]
  const block = (x, groups) => {
    let y = 2.05
    groups.forEach(([h, items]) => {
      txt(s, h.toUpperCase(), { x, y, w: 5.8, h: 0.25, fontSize: 9, bold: true, color: K.ang, charSpacing: 2 })
      y += 0.32
      s.addText(items.map((t, i) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: i < items.length - 1 } })), {
        x, y, w: 5.8, h: items.length * 0.4 + 0.1, fontSize: 10, color: K.ink, margin: 0, isTextBox: true, valign: 'top', paraSpaceAfter: 4, lineSpacingMultiple: 1.1,
      })
      y += items.length * 0.4 + 0.35
    })
  }
  block(M, colA)
  block(6.93, colB)
  s.addNotes('Anexo de referência para envio por email. Não apresentar em reunião, salvo pedido.')

  require('fs').mkdirSync(path.dirname(OUT), { recursive: true })
  await pres.writeFile({ fileName: OUT })
  await applyTheme(OUT, THEME)
  console.log('✓', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
