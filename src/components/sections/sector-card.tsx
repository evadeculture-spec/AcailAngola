import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Sector } from '@/types/content'
import { MediaFrame } from '@/components/visuals/media-frame'

export function SectorCard({ sector, headingLevel = 'h3' }: { sector: Sector; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  const index = String(sector.order).padStart(2, '0')
  return (
    <article className="group relative flex h-full flex-col bg-white ring-1 ring-ink-200 transition-shadow duration-500 hover:shadow-[0_24px_48px_-28px_rgba(15,76,143,0.45)] hover:ring-ink-300">
      <div className="relative overflow-hidden">
        <MediaFrame
          image={sector.image}
          visual={sector.visual}
          className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 font-mono text-xs tracking-[0.15em] text-ink-900">
          {index}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <Heading className="text-h3">
          <Link href={`/areas-de-negocio/${sector.slug}`} className="after:absolute after:inset-0">
            {sector.name}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{sector.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
          <span className="link-underline">Explorar área</span>
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}
