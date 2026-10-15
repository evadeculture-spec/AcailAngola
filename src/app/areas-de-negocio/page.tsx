import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProductsBySector, getSectors } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { ContactCta } from '@/components/sections/contact-cta'
import { PageHero } from '@/components/sections/page-hero'
import { MediaFrame } from '@/components/visuals/media-frame'

export const metadata = pageMetadata({
  title: 'Áreas de Negócio',
  description:
    'Produtos siderúrgicos, gases industriais, medicinais e alimentares, saúde, pré-fabricação em betão, inertes e serviços industriais: as seis áreas de negócio da ACAIL Angola.',
  path: '/areas-de-negocio',
})

export default function SectorsPage() {
  const sectors = getSectors()
  return (
    <>
      <PageHero
        eyebrow="Áreas de Negócio"
        title="Seis áreas de negócio ao serviço da construção, da indústria e da saúde."
        lead="Cada área reúne produtos, soluções e serviços especializados, com equipa comercial dedicada e articulação com as restantes áreas da empresa."
        crumbs={[{ label: 'Áreas de Negócio', href: '/areas-de-negocio' }]}
      >
        <ul className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex h-9 items-center border border-white/15 px-3.5 text-sm text-ink-300 transition-colors hover:border-white/50 hover:text-white"
              >
                {s.shortName}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="bg-white">
        {sectors.map((s, i) => {
          const count = getProductsBySector(s.slug).length
          const reversed = i % 2 === 1
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="border-b border-ink-100 py-16 last:border-b-0 sm:py-20 lg:py-24"
            >
              <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={reversed ? 'lg:order-2 lg:col-span-6 lg:col-start-7' : 'lg:col-span-6'}>
                  <Link href={`/areas-de-negocio/${s.slug}`} tabIndex={-1} aria-hidden className="group block overflow-hidden">
                    <MediaFrame
                      image={s.image}
                      visual={s.visual}
                      label={s.shortName}
                      index={String(s.order).padStart(2, '0')}
                      className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(min-width:1024px) 50vw, 100vw"
                    />
                  </Link>
                </div>
                <div className={reversed ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5 lg:col-start-8'}>
                  <p className="font-mono text-sm text-brand-600">{String(s.order).padStart(2, '0')} / 06</p>
                  <h2 id={`${s.slug}-title`} className="mt-4 text-h2">
                    {s.name}
                  </h2>
                  <p className="mt-5 text-lead text-ink-600">{s.summary}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {s.families.slice(0, 6).map((f) => (
                      <li key={f.name} className="bg-ink-50 px-3 py-1.5 text-sm text-ink-700">
                        {f.name}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link
                      href={`/areas-de-negocio/${s.slug}`}
                      className="group inline-flex h-11 items-center gap-3 bg-ink-950 px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Conhecer a área
                      <span className="sr-only">: {s.name}</span>
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href={`/produtos?setor=${s.slug}`} className="text-[0.9375rem] font-semibold text-brand-600 hover:text-brand-800">
                      {count} {count === 1 ? 'produto ou serviço' : 'produtos e serviços'} no catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <ContactCta />
    </>
  )
}
