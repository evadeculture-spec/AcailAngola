import { ImageResponse } from 'next/og'

export const alt = 'ACAIL Angola — Indústria, engenharia e soluções desde 2005'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#12161a',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 8, height: 64, background: '#0f4c8f' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>ACAIL</div>
            <div style={{ fontSize: 16, letterSpacing: 10, color: '#adc8e8' }}>ANGOLA</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 900 }}>
            Indústria, engenharia e soluções para construir Angola.
          </div>
          <div style={{ marginTop: 28, fontSize: 24, color: '#a3aab3' }}>
            Siderurgia · Gases · Saúde · Pré-Fabricação · Inertes · Serviços — desde 2005
          </div>
        </div>
      </div>
    ),
    size,
  )
}
