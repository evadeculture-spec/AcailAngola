// Ilustrações conceptuais vetoriais (SVG) usadas na apresentação e nos mockups.
// Não representam instalações, produtos ou projetos reais da ACAIL.

const P = {
  ink: '#0A1520',
  navy: '#0F2A44',
  ang: '#1F5FA8',
  gas: '#E0662B',
  pre: '#A39A8C',
}

function rand(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

// Cena A — complexo industrial ao entardecer (capa / hero institucional)
function plant(w = 2400, h = 1350, opts = {}) {
  const r = rand(opts.seed || 7)
  const horizon = h * (opts.horizon || 0.7)
  const sil = '#08111A'
  const sil2 = '#0E1D2B'
  let s = ''
  // grelha técnica
  for (let x = 0; x <= w; x += 80) s += `<line x1="${x}" y1="0" x2="${x}" y2="${horizon}" stroke="#ffffff" stroke-opacity="0.035"/>`
  for (let y = 0; y <= horizon; y += 80) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#ffffff" stroke-opacity="0.035"/>`
  // plano de fundo: estruturas distantes
  let bg = ''
  for (let i = 0; i < 26; i++) {
    const x = r() * w
    const bw = 30 + r() * 120
    const bh = 30 + r() * 120
    bg += `<rect x="${x}" y="${horizon - bh}" width="${bw}" height="${bh}" fill="${sil2}"/>`
  }
  // chaminés
  const stacks = [w * 0.62, w * 0.655, w * 0.83]
  stacks.forEach((x, i) => {
    const sh = 420 + i * 60
    bg += `<rect x="${x}" y="${horizon - sh}" width="22" height="${sh}" fill="${sil2}"/>`
    bg += `<rect x="${x - 3}" y="${horizon - sh}" width="28" height="10" fill="${sil2}"/>`
    for (let k = 0; k < 3; k++) bg += `<rect x="${x}" y="${horizon - sh + 70 + k * 90}" width="22" height="5" fill="#E0662B" fill-opacity="0.35"/>`
    // fumo
    bg += `<path d="M${x + 11},${horizon - sh} C ${x + 40},${horizon - sh - 120} ${x + 160},${horizon - sh - 140} ${x + 320},${horizon - sh - 230}" stroke="#ffffff" stroke-opacity="0.07" stroke-width="26" fill="none" stroke-linecap="round" filter="url(#blur)"/>`
  })
  // esferas de gás
  let fg = ''
  const spheres = [
    [w * 0.5, 150],
    [w * 0.565, 120],
  ]
  spheres.forEach(([cx, rad]) => {
    const cy = horizon - rad - 60
    for (let k = -2; k <= 2; k++) fg += `<rect x="${cx + k * rad * 0.42 - 5}" y="${cy}" width="10" height="${rad + 60}" fill="${sil}"/>`
    fg += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#sph)"/>`
    fg += `<ellipse cx="${cx}" cy="${cy}" rx="${rad}" ry="${rad * 0.12}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>`
  })
  // tanques verticais
  const tanks = [
    [w * 0.7, 110, 300],
    [w * 0.76, 90, 260],
    [w * 0.9, 130, 220],
  ]
  tanks.forEach(([x, tw, th]) => {
    fg += `<rect x="${x}" y="${horizon - th}" width="${tw}" height="${th}" fill="url(#cyl)"/>`
    fg += `<ellipse cx="${x + tw / 2}" cy="${horizon - th}" rx="${tw / 2}" ry="10" fill="#203448"/>`
    for (let k = 1; k < 5; k++) fg += `<line x1="${x}" y1="${horizon - (th * k) / 5}" x2="${x + tw}" y2="${horizon - (th * k) / 5}" stroke="#000" stroke-opacity="0.25"/>`
  })
  // grua treliçada
  const gx = w * 0.36
  const gTop = horizon - 620
  fg += `<rect x="${gx}" y="${gTop}" width="36" height="620" fill="none" stroke="${sil}" stroke-width="5"/>`
  for (let y = gTop; y < horizon; y += 36) fg += `<path d="M${gx},${y} L${gx + 36},${y + 36} M${gx + 36},${y} L${gx},${y + 36}" stroke="${sil}" stroke-width="3"/>`
  fg += `<rect x="${gx - 260}" y="${gTop - 30}" width="760" height="30" fill="none" stroke="${sil}" stroke-width="5"/>`
  for (let x = gx - 260; x < gx + 500; x += 30) fg += `<path d="M${x},${gTop} L${x + 30},${gTop - 30}" stroke="${sil}" stroke-width="3"/>`
  fg += `<line x1="${gx + 18}" y1="${gTop - 120}" x2="${gx + 480}" y2="${gTop - 30}" stroke="${sil}" stroke-width="3"/>`
  fg += `<line x1="${gx + 18}" y1="${gTop - 120}" x2="${gx - 250}" y2="${gTop - 30}" stroke="${sil}" stroke-width="3"/>`
  fg += `<rect x="${gx + 8}" y="${gTop - 120}" width="20" height="90" fill="${sil}"/>`
  fg += `<line x1="${gx + 380}" y1="${gTop}" x2="${gx + 380}" y2="${gTop + 260}" stroke="${sil}" stroke-width="2"/>`
  fg += `<rect x="${gx + 360}" y="${gTop + 260}" width="40" height="24" fill="${sil}"/>`
  // postes de betão com cabos
  const poles = [0.06, 0.15, 0.24]
  poles.forEach((p, i) => {
    const x = w * p
    const ph = 380 - i * 40
    fg += `<path d="M${x - 9},${horizon} L${x - 5},${horizon - ph} L${x + 5},${horizon - ph} L${x + 9},${horizon} Z" fill="${sil}"/>`
    fg += `<rect x="${x - 50}" y="${horizon - ph + 20}" width="100" height="8" fill="${sil}"/>`
  })
  for (let i = 0; i < poles.length - 1; i++) {
    const x1 = w * poles[i]
    const x2 = w * poles[i + 1]
    const y1 = horizon - (380 - i * 40) + 24
    const y2 = horizon - (380 - (i + 1) * 40) + 24
    for (const dx of [-44, 0, 44]) fg += `<path d="M${x1 + dx},${y1} Q ${(x1 + x2) / 2 + dx},${Math.max(y1, y2) + 50} ${x2 + dx},${y2}" stroke="${sil}" stroke-width="2" fill="none"/>`
  }
  // rack de tubagens
  fg += `<rect x="${w * 0.44}" y="${horizon - 70}" width="${w * 0.5}" height="70" fill="${sil}"/>`
  for (let k = 0; k < 4; k++) fg += `<rect x="${w * 0.44}" y="${horizon - 110 - k * 14}" width="${w * 0.5}" height="8" fill="${sil}"/>`
  // cotas técnicas
  let ann = ''
  const ax = w * 0.565 + 170
  ann += `<line x1="${ax}" y1="${horizon - 300}" x2="${ax}" y2="${horizon}" stroke="#ffffff" stroke-opacity="0.35"/>`
  ann += `<line x1="${ax - 8}" y1="${horizon - 300}" x2="${ax + 8}" y2="${horizon - 300}" stroke="#ffffff" stroke-opacity="0.35"/>`
  ann += `<line x1="${ax - 8}" y1="${horizon}" x2="${ax + 8}" y2="${horizon}" stroke="#ffffff" stroke-opacity="0.35"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#060D14"/>
      <stop offset="0.5" stop-color="#132C44"/>
      <stop offset="0.7" stop-color="#33566F"/>
      <stop offset="0.75" stop-color="#7A5A45"/>
      <stop offset="1" stop-color="#05090D"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="14"/></filter>
    <radialGradient id="glow" cx="0.62" cy="0.7" r="0.5">
      <stop offset="0" stop-color="#E0662B" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#E0662B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sph" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stop-color="#3A5670"/>
      <stop offset="0.6" stop-color="#16293A"/>
      <stop offset="1" stop-color="#08111A"/>
    </radialGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0A1621"/>
      <stop offset="0.35" stop-color="#2C465D"/>
      <stop offset="1" stop-color="#08111A"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#060D14" stop-opacity="${opts.fadeLeft ?? 0.92}"/>
      <stop offset="0.45" stop-color="#060D14" stop-opacity="${(opts.fadeLeft ?? 0.92) * 0.35}"/>
      <stop offset="1" stop-color="#060D14" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${s}${bg}${fg}${ann}
  <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="#05090D"/>
  <rect width="${w}" height="${h}" fill="url(#fade)"/>
</svg>`
}

// Cena B — varões de aço nervurado (vista lateral, diagonal)
function steel(w = 1600, h = 1000, seed = 3) {
  const r = rand(seed)
  let s = ''
  let y = -600
  while (y < h + 900) {
    const d = 16 + r() * 14
    const shade = 0.55 + r() * 0.45
    s += `<g opacity="${shade.toFixed(2)}"><rect x="-800" y="${y}" width="${w + 1600}" height="${d}" rx="${d / 2}" fill="url(#rod)"/>`
    s += `<line x1="-800" y1="${y + d / 2}" x2="${w + 800}" y2="${y + d / 2}" stroke="#0B1218" stroke-opacity="0.55" stroke-width="${d * 0.9}" stroke-dasharray="2 ${(d * 0.55).toFixed(1)}"/></g>`
    y += d + 2 + r() * 6
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="rod" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1B242D"/><stop offset="0.3" stop-color="#8E9AA6"/><stop offset="0.55" stop-color="#4C5966"/><stop offset="1" stop-color="#11181F"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0A1520" stop-opacity="0.85"/><stop offset="0.6" stop-color="#0A1520" stop-opacity="0.25"/><stop offset="1" stop-color="#0A1520" stop-opacity="0.05"/>
    </linearGradient>
    <radialGradient id="wg" cx="0.8" cy="0.2" r="0.6"><stop offset="0" stop-color="#E0662B" stop-opacity="0.18"/><stop offset="1" stop-color="#E0662B" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0B1218"/>
  <g transform="rotate(-24 ${w / 2} ${h / 2})">${s}</g>
  <rect width="${w}" height="${h}" fill="url(#wg)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
</svg>`
}

// Cena C — linha de garrafas de gás
function cylinders(w = 1600, h = 1000, opts = {}) {
  const caps = opts.caps || ['#E0662B', '#E0662B', '#C9D2DA', '#E0662B', '#2E7D5B', '#E0662B', '#C9D2DA', '#E0662B', '#E0662B']
  let s = ''
  const n = 9
  for (let i = 0; i < n; i++) {
    const scale = 1 - i * 0.06
    const cw = 150 * scale
    const ch = 640 * scale
    const x = 120 + i * 170 * (1 - i * 0.025)
    const base = h - 90 - i * 18
    const top = base - ch
    const sh = cw * 0.5
    const body = `M${x},${base} L${x},${top + sh} Q${x},${top} ${x + cw / 2},${top} Q${x + cw},${top} ${x + cw},${top + sh} L${x + cw},${base} Z`
    s = `<g opacity="${1 - i * 0.07}">
      <path d="${body}" fill="url(#cylg)"/>
      <path d="M${x},${top + sh * 1.1} Q${x},${top} ${x + cw / 2},${top} Q${x + cw},${top} ${x + cw},${top + sh * 1.1} L${x + cw},${top + sh * 1.4} L${x},${top + sh * 1.4} Z" fill="${caps[i % caps.length]}" opacity="0.92"/>
      <rect x="${x + cw * 0.36}" y="${top - cw * 0.32}" width="${cw * 0.28}" height="${cw * 0.34}" rx="4" fill="#9AA5AF"/>
      <rect x="${x + cw * 0.3}" y="${top - cw * 0.4}" width="${cw * 0.4}" height="${cw * 0.1}" rx="3" fill="#C2CAD1"/>
      <rect x="${x}" y="${top + ch * 0.55}" width="${cw}" height="${ch * 0.06}" fill="#ffffff" opacity="0.07"/>
    </g>` + s
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bgc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1A25"/><stop offset="1" stop-color="#05090D"/></linearGradient>
    <linearGradient id="cylg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1A2733"/><stop offset="0.28" stop-color="#5E6E7C"/><stop offset="0.42" stop-color="#8794A0"/><stop offset="0.7" stop-color="#2E3D4A"/><stop offset="1" stop-color="#0F1820"/>
    </linearGradient>
    <radialGradient id="lg" cx="0.85" cy="0.15" r="0.7"><stop offset="0" stop-color="#E0662B" stop-opacity="0.22"/><stop offset="1" stop-color="#E0662B" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bgc)"/>
  <rect width="${w}" height="${h}" fill="url(#lg)"/>
  ${Array.from({ length: 21 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${h}" stroke="#fff" stroke-opacity="0.03"/>`).join('')}
  ${s}
  <rect y="${h - 80}" width="${w}" height="80" fill="#04080B"/>
</svg>`
}

// Cena D — tubos de betão empilhados (textura de betão)
function pipes(w = 1600, h = 1000, opts = {}) {
  const R = opts.R || 190
  const rows = [5, 4, 3, 2]
  let s = ''
  rows.forEach((n, ri) => {
    for (let i = 0; i < n; i++) {
      const cx = w / 2 - ((n - 1) * R * 2) / 2 + i * R * 2 + (opts.shift || 0)
      const cy = h - R - ri * R * 1.74 + 20
      s += `<circle cx="${cx}" cy="${cy}" r="${R - 3}" fill="url(#conc)" filter="url(#tex)"/>`
      s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.74}" fill="url(#hole)"/>`
      s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.74}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="6"/>`
      s += `<circle cx="${cx}" cy="${cy}" r="${R - 4}" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="2"/>`
    }
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="tex" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0" result="g"/>
      <feComposite in="g" in2="SourceGraphic" operator="in" result="gi"/>
      <feBlend in="SourceGraphic" in2="gi" mode="multiply"/>
    </filter>
    <radialGradient id="conc" cx="0.38" cy="0.32" r="0.8"><stop offset="0" stop-color="#D3CEC4"/><stop offset="0.65" stop-color="#A39A8C"/><stop offset="1" stop-color="#6E675C"/></radialGradient>
    <radialGradient id="hole" cx="0.6" cy="0.62" r="0.7"><stop offset="0" stop-color="#3A352F"/><stop offset="0.7" stop-color="#16130F"/><stop offset="1" stop-color="#0A0907"/></radialGradient>
    <linearGradient id="bgp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${opts.bg1 || '#E9E6E0'}"/><stop offset="1" stop-color="${opts.bg2 || '#C9C3B8'}"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bgp)"/>
  ${s}
</svg>`
}

// Produto isolado para fichas do catálogo (ilustração)
function product(kind, w = 600, h = 420) {
  const bg = '#ECEAE5'
  const conc = `<defs>
    <filter id="t" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="gi"/><feBlend in="SourceGraphic" in2="gi" mode="multiply"/></filter>
    <linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C8C1B5"/><stop offset="1" stop-color="#9B9284"/></linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8B8274"/><stop offset="1" stop-color="#6E675C"/></linearGradient>
    <linearGradient id="tp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DAD4CA"/><stop offset="1" stop-color="#B9B1A4"/></linearGradient>
  </defs>`
  let g = ''
  if (kind === 'bloco') {
    // bloco com dois furos, isométrico simples
    g = `<g filter="url(#t)">
      <path d="M150,200 L330,140 L470,190 L290,250 Z" fill="url(#tp)"/>
      <path d="M150,200 L290,250 L290,350 L150,300 Z" fill="url(#f)"/>
      <path d="M290,250 L470,190 L470,290 L290,350 Z" fill="url(#s)"/>
    </g>
    <path d="M215,198 L265,181 L300,194 L250,211 Z" fill="#3A352F"/>
    <path d="M325,160 L375,143 L410,156 L360,173 Z" fill="#3A352F"/>`
  } else if (kind === 'tubo') {
    g = `<g filter="url(#t)">
      <rect x="170" y="150" width="300" height="150" fill="url(#f)"/>
      <ellipse cx="470" cy="225" rx="40" ry="75" fill="url(#s)"/>
      <ellipse cx="170" cy="225" rx="40" ry="75" fill="url(#tp)"/>
    </g>
    <ellipse cx="170" cy="225" rx="28" ry="56" fill="#2A2621"/>`
  } else if (kind === 'lancil') {
    g = `<g filter="url(#t)">
      <path d="M110,220 L420,150 L500,175 L500,205 L190,275 L110,250 Z" fill="url(#tp)"/>
      <path d="M110,250 L190,275 L190,320 L110,295 Z" fill="url(#f)"/>
      <path d="M190,275 L500,205 L500,250 L190,320 Z" fill="url(#s)"/>
    </g>`
  } else {
    // poste
    g = `<g filter="url(#t)">
      <path d="M140,300 L480,140 L490,152 L150,318 Z" fill="url(#tp)"/>
      <path d="M150,318 L490,152 L492,168 L156,336 Z" fill="url(#s)"/>
    </g>
    <circle cx="300" cy="230" r="3" fill="#3A352F"/><circle cx="380" cy="192" r="3" fill="#3A352F"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 600 420">${conc}
  <rect width="600" height="420" fill="${bg}"/>
  <ellipse cx="310" cy="${kind === 'poste' ? 330 : 345}" rx="220" ry="18" fill="#000" opacity="0.08"/>${g}</svg>`
}

module.exports = { plant, steel, cylinders, pipes, product, P }
