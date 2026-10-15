import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/content'
import { getSector } from '@/lib/content'
import { SectorIcon } from '@/components/visuals/sector-icon'

export function ProductCard({ product }: { product: Product }) {
  const sector = getSector(product.sector)
  return (
    <article className="group relative flex h-full flex-col border border-ink-200 bg-white p-6 transition-colors duration-300 hover:border-brand-600">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center bg-ink-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <SectorIcon slug={product.sector} className="size-5" />
        </span>
        <span className="text-right text-xs font-medium tracking-[0.08em] text-ink-500 uppercase">
          {sector?.shortName}
        </span>
      </div>
      <h3 className="mt-6 font-display text-lg font-bold text-ink-950">
        <Link href={`/produtos/${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-xs font-medium tracking-[0.06em] text-ink-500 uppercase">{product.category}</p>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{product.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
        <span className="link-underline">Ver detalhe</span>
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  )
}
