'use client'

import { Map as MapIcon } from 'lucide-react'
import { useState } from 'react'
import { mapEmbedUrl } from '@/data/company'
import { TechnicalVisual } from '@/components/visuals/technical-visual'

/**
 * Mapa carregado apenas por ação do utilizador: evita pedidos e cookies de
 * terceiros (Google) sem consentimento e melhora o desempenho da página.
 */
export function LocationMap({ query, name }: { query: string; name: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-950">
      {loaded ? (
        <iframe
          title={`Mapa — ${name}`}
          src={mapEmbedUrl(query)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <TechnicalVisual visual="contact" className="absolute inset-0 opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex h-11 items-center gap-2 bg-white px-5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brand-50"
            >
              <MapIcon aria-hidden className="size-4" />
              Carregar mapa
              <span className="sr-only">de {name}</span>
            </button>
            <p className="max-w-xs text-xs leading-relaxed text-ink-300">
              O mapa é fornecido pela Google. Ao carregá-lo, serão transmitidos dados à Google.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
