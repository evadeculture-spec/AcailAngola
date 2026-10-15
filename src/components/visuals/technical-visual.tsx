import { useId, type ReactNode } from 'react'
import type { VisualKey } from '@/types/content'
import { cn } from '@/lib/cn'

/**
 * Ilustrações técnicas vetoriais (estilo "blueprint") usadas enquanto não
 * existirem fotografias reais autorizadas. São leves (SVG inline, sem pedidos
 * de rede), nítidas em qualquer resolução e coerentes com a identidade.
 * Quando houver fotografia, o componente `MediaFrame` passa a mostrá-la.
 */

const LINE = '#a9c1e0'
const ACCENT = '#5b93d3'
const SOFT = 'rgba(169,193,224,0.35)'

interface Props {
  visual: VisualKey
  label?: string
  className?: string
  /** Controla o enquadramento (ex.: hero usa 'slice' para preencher). */
  fit?: 'slice' | 'meet'
}

export function TechnicalVisual({ visual, label, className, fit = 'slice' }: Props) {
  const gid = `tv${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio={`xMidYMid ${fit}`}
      className={cn('block h-full w-full', className)}
      role="img"
      aria-label={label ? `Ilustração técnica — ${label}` : 'Ilustração técnica'}
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1a2b" />
          <stop offset="1" stopColor="#12161a" />
        </linearGradient>
        <pattern id={`${gid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${gid}-glow`} cx="0.7" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#1f62a8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1f62a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${gid}-bg)`} />
      <rect width="800" height="600" fill={`url(#${gid}-glow)`} />
      <rect width="800" height="600" fill={`url(#${gid}-grid)`} />
      <g fill="none" stroke={LINE} strokeWidth="1.5" strokeLinecap="square">
        {drawings[visual]}
      </g>
      <CropMarks />
    </svg>
  )
}

function CropMarks() {
  const s = 'rgba(255,255,255,0.35)'
  return (
    <g stroke={s} strokeWidth="1.2">
      <path d="M24 44V24h20M756 24h20v20M776 556v20h-20M44 576H24v-20" fill="none" />
    </g>
  )
}

function Dim({ x1, y1, x2, y2, text }: { x1: number; y1: number; x2: number; y2: number; text: string }) {
  const vertical = x1 === x2
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g stroke={SOFT} strokeWidth="1">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <path d={`M${x1 - 6} ${y1}h12M${x2 - 6} ${y2}h12`} />
      ) : (
        <path d={`M${x1} ${y1 - 6}v12M${x2} ${y2 - 6}v12`} />
      )}
      <text
        x={vertical ? mx + 10 : mx}
        y={vertical ? my + 4 : my - 10}
        fill="rgba(169,193,224,0.7)"
        stroke="none"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="12"
        textAnchor={vertical ? 'start' : 'middle'}
        letterSpacing="1.5"
      >
        {text}
      </text>
    </g>
  )
}

/** Pontos pseudoaleatórios determinísticos (sem diferenças entre servidor e cliente). */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function Mound({ cx, base, w, h, seed, size }: { cx: number; base: number; w: number; h: number; seed: number; size: number }) {
  const rand = seeded(seed)
  const dots: ReactNode[] = []
  for (let i = 0; i < 140; i++) {
    const x = cx - w / 2 + rand() * w
    const t = 1 - Math.abs(x - cx) / (w / 2)
    const top = base - h * Math.sin((t * Math.PI) / 2)
    const y = top + rand() * (base - top)
    if (y > top + 3) dots.push(<circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(size * (0.6 + rand() * 0.6)).toFixed(1)} />)
  }
  return (
    <g>
      <path d={`M${cx - w / 2} ${base} Q${cx - w / 4} ${base - h * 0.9} ${cx} ${base - h} Q${cx + w / 4} ${base - h * 0.9} ${cx + w / 2} ${base}`} />
      <g stroke={SOFT} strokeWidth="1">{dots}</g>
    </g>
  )
}

function Cylinder({ x, y, h }: { x: number; y: number; h: number }) {
  const w = 64
  return (
    <g>
      <path d={`M${x} ${y + 40} Q${x} ${y} ${x + w / 2} ${y} Q${x + w} ${y} ${x + w} ${y + 40} V${y + h} H${x} Z`} />
      <path d={`M${x} ${y + 70}H${x + w}M${x} ${y + 82}H${x + w}`} stroke={SOFT} />
      <rect x={x + 22} y={y - 22} width="20" height="22" />
      <path d={`M${x + 32} ${y - 22}V${y - 40}H${x + 70}`} stroke={ACCENT} />
    </g>
  )
}

const drawings: Record<VisualKey, ReactNode> = {
  steel: (
    <g>
      {/* Perfil em I — secção */}
      <path d="M150 190h200v26h-89v168h89v26H150v-26h89V216h-89z" />
      <path d="M239 216v168M261 216v168" stroke={SOFT} />
      <Dim x1={150} y1={160} x2={350} y2={160} text="b" />
      <Dim x1={380} y1={190} x2={380} y2={410} text="h" />
      {/* Feixe de varões — secção */}
      {[
        [520, 250], [572, 250], [624, 250],
        [494, 295], [546, 295], [598, 295], [650, 295],
        [520, 340], [572, 340], [624, 340],
        [546, 385], [598, 385],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="23" stroke={i === 5 ? ACCENT : LINE} />
          <circle cx={cx} cy={cy} r="15" stroke={SOFT} />
        </g>
      ))}
      <Dim x1={471} y1={440} x2={673} y2={440} text="Ø" />
      {/* Barra em alçado */}
      <path d="M150 470h520" />
      {Array.from({ length: 26 }, (_, i) => (
        <path key={i} d={`M${160 + i * 20} 462l10 16`} stroke={SOFT} />
      ))}
      <path d="M150 486h520" />
    </g>
  ),
  gas: (
    <g>
      <Cylinder x={150} y={210} h={250} />
      <Cylinder x={250} y={210} h={250} />
      <Cylinder x={350} y={210} h={250} />
      <path d="M220 170H560V250" stroke={ACCENT} />
      <path d="M320 170v18M420 170v18" stroke={ACCENT} />
      {/* válvulas */}
      <path d="M470 160l20 20v-20l-20 20z" />
      <circle cx="560" cy="270" r="22" />
      <path d="M560 270l11-12" stroke={ACCENT} />
      <path d="M582 270H660V420H560M660 340h40" />
      <circle cx="560" cy="420" r="8" />
      <circle cx="700" cy="340" r="8" />
      <path d="M120 460H720" stroke={SOFT} />
      <Dim x1={460} y1={210} x2={460} y2={460} text="H" />
    </g>
  ),
  health: (
    <g>
      <circle cx="260" cy="290" r="140" stroke={SOFT} />
      <circle cx="260" cy="290" r="110" />
      <path d="M232 210h56v52h52v56h-52v52h-56v-52h-52v-56h52z" stroke={ACCENT} />
      <path d="M400 230H720M400 260H720" />
      {[460, 540, 620, 700].map((x) => (
        <g key={x}>
          <path d={`M${x} 260v40`} />
          <rect x={x - 16} y="300" width="32" height="22" />
          <circle cx={x} cy="311" r="4" stroke={ACCENT} />
        </g>
      ))}
      <path d="M80 470H300l20-40 22 70 20-90 18 60h20l10-20 10 20h380" stroke={ACCENT} />
    </g>
  ),
  precast: (
    <g>
      {/* blocos isométricos */}
      {([
        [130, 360], [230, 360], [180, 331], [280, 331], [180, 302], [230, 273],
      ] as const satisfies ReadonlyArray<readonly [number, number]>).map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y}l50 -29l50 29l-50 29z`} />
          <path d={`M${x} ${y}v50l50 29v-50M${x + 100} ${y}v50l-50 29`} />
          <path d={`M${x + 20} ${y + 22}v26M${x + 80} ${y + 22}v26`} stroke={SOFT} />
        </g>
      ))}
      {/* tubo */}
      <ellipse cx="490" cy="400" rx="70" ry="70" />
      <ellipse cx="490" cy="400" rx="52" ry="52" stroke={ACCENT} />
      <path d="M490 330h130M490 470h130" />
      <path d="M620 330a20 70 0 0 1 0 140" stroke={SOFT} />
      {/* poste */}
      <path d="M690 110l-10 360h-24l-10-360z" />
      <path d="M672 150v280" stroke={SOFT} />
      <Dim x1={720} y1={110} x2={720} y2={470} text="L" />
      <path d="M100 480H740" stroke={SOFT} />
    </g>
  ),
  aggregates: (
    <g>
      <Mound cx={200} base={430} w={240} h={150} seed={7} size={1.6} />
      <Mound cx={420} base={430} w={240} h={190} seed={19} size={3} />
      <Mound cx={630} base={430} w={220} h={130} seed={41} size={4.6} />
      <path d="M60 430H760" />
      <g fontFamily="ui-monospace, Menlo, monospace" fontSize="12" fill="rgba(169,193,224,0.75)" stroke="none" letterSpacing="2" textAnchor="middle">
        <text x="200" y="465">AREIA</text>
        <text x="420" y="465">BRITA</text>
        <text x="630" y="465">BURGAU</text>
      </g>
      {/* peneiro */}
      <rect x="560" y="110" width="140" height="90" stroke={SOFT} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${580 + i * 20} 110v90`} stroke={SOFT} />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <path key={`h${i}`} d={`M560 ${128 + i * 18}h140`} stroke={SOFT} />
      ))}
    </g>
  ),
  services: (
    <g>
      {/* auto-grua */}
      <path d="M100 420h300v-50H300l-30-40h-60v40H100z" />
      <circle cx="150" cy="430" r="22" />
      <circle cx="210" cy="430" r="22" />
      <circle cx="350" cy="430" r="22" />
      <path d="M230 370L520 150" strokeWidth="2" />
      <path d="M250 370L540 158" stroke={SOFT} />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${250 + i * 26} ${355 - i * 19.7}l-14 -6`} stroke={SOFT} />
      ))}
      <path d="M530 154v130" stroke={ACCENT} />
      <rect x="500" y="284" width="60" height="44" stroke={ACCENT} />
      {/* sonda de furação */}
      <path d="M640 440L680 140L720 440M652 340h56M662 250h36" />
      <path d="M680 440v120" strokeDasharray="6 8" stroke={ACCENT} />
      <path d="M60 452H760" />
      <path d="M60 470H760" stroke={SOFT} strokeDasharray="2 10" />
    </g>
  ),
  company: (
    <g>
      {/* nave industrial com cobertura em shed */}
      <path d="M90 450V290l70-50v50l70-50v50l70-50v50l70-50v210" />
      <path d="M90 330h280M90 370h280" stroke={SOFT} />
      {[120, 180, 240, 300].map((x) => (
        <rect key={x} x={x} y="395" width="30" height="55" stroke={SOFT} />
      ))}
      {/* chaminés e silos */}
      <path d="M400 450V200h26v250M440 450V230h20v220" />
      <g>
        <path d="M500 450V260a40 14 0 0 1 80 0v190" />
        <ellipse cx="540" cy="260" rx="40" ry="14" stroke={ACCENT} />
        <path d="M600 450V280a40 14 0 0 1 80 0v170" />
        <ellipse cx="640" cy="280" rx="40" ry="14" stroke={ACCENT} />
      </g>
      <path d="M500 330h180M500 390h180" stroke={SOFT} />
      <path d="M60 450H740" />
      <Dim x1={90} y1={490} x2={370} y2={490} text="PÓLO INDUSTRIAL" />
    </g>
  ),
  quality: (
    <g>
      <circle cx="400" cy="290" r="180" stroke={SOFT} />
      <circle cx="400" cy="290" r="140" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2
        const r1 = 180
        const r2 = i % 5 === 0 ? 166 : 174
        return (
          <path
            key={i}
            d={`M${(400 + r1 * Math.cos(a)).toFixed(1)} ${(290 + r1 * Math.sin(a)).toFixed(1)}L${(400 + r2 * Math.cos(a)).toFixed(1)} ${(290 + r2 * Math.sin(a)).toFixed(1)}`}
            stroke={SOFT}
          />
        )
      })}
      <path d="M340 292l40 40l84 -90" stroke={ACCENT} strokeWidth="3" />
    </g>
  ),
  projects: (
    <g>
      <path d="M60 330H740M60 346H740" />
      <path d="M160 330Q400 120 640 330" stroke={ACCENT} />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 200 + i * 40
        const t = (x - 160) / 480
        const y = 330 - 4 * 210 * t * (1 - t) * 0.995
        return <path key={i} d={`M${x} ${y.toFixed(1)}V330`} stroke={SOFT} />
      })}
      <path d="M160 346v134M640 346v134M120 480h80M600 480h80" />
      <path d="M60 470c80 -10 140 10 220 0s160 -10 240 0s160 10 220 0" stroke={SOFT} />
      <Dim x1={160} y1={520} x2={640} y2={520} text="VÃO" />
    </g>
  ),
  contact: (
    <g>
      {/* costa estilizada de Angola (aproximação esquemática) */}
      <path
        d="M300 20C305 60 318 100 331 129S350 160 340 190 318 230 324 262 354 320 370 360 392 410 386 440 372 480 368 500 352 560 340 600"
        stroke={SOFT}
      />
      <path d="M300 20C305 60 318 100 331 129S350 160 340 190 318 230 324 262 354 320 370 360 392 410 386 440 372 480 368 500 352 560 340 600H800V20Z" fill="rgba(31,98,168,0.08)" stroke="none" />
      {[
        { x: 357, y: 150, l: 'VIANA' },
        { x: 392, y: 172, l: 'MAZOZO' },
        { x: 392, y: 478, l: 'CATUMBELA' },
      ].map((p) => (
        <g key={p.l}>
          <circle cx={p.x} cy={p.y} r="16" stroke={SOFT} />
          <circle cx={p.x} cy={p.y} r="5" fill={ACCENT} stroke="none" />
          <path d={`M${p.x + 16} ${p.y}h60`} stroke={SOFT} />
          <text x={p.x + 84} y={p.y + 4} fill="rgba(169,193,224,0.85)" stroke="none" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" letterSpacing="2">
            {p.l}
          </text>
        </g>
      ))}
    </g>
  ),
}
