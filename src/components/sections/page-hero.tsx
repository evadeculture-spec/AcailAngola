import type { ReactNode } from 'react'
import type { ImageAsset, VisualKey } from '@/types/content'
import type { Crumb } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { MediaFrame } from '@/components/visuals/media-frame'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  crumbs: Crumb[]
  visual?: VisualKey
  image?: ImageAsset
  visualLabel?: string
  visualIndex?: string
  children?: ReactNode
}

/** Hero das páginas internas: fundo antracite, título H1 e ilustração/fotografia. */
export function PageHero({ eyebrow, title, lead, crumbs, visual, image, visualLabel, visualIndex, children }: PageHeroProps) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
      <div className="relative container-site grid gap-12 pt-10 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-12 lg:pb-24">
        <div className={visual || image ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-12 mb-6 lg:mt-20">{eyebrow}</p>
          <h1 className="text-h1 text-white">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lead text-ink-300">{lead}</p>}
          {children && <div className="mt-10">{children}</div>}
        </div>
        {(visual || image) && (
          <div className="lg:col-span-5 lg:self-end">
            <MediaFrame
              image={image}
              visual={visual ?? 'company'}
              label={visualLabel}
              index={visualIndex}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full ring-1 ring-white/10"
            />
          </div>
        )}
      </div>
    </section>
  )
}
