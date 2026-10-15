import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { getProductsBySector, getSector, getSectors } from '@/lib/content'
import { sectorToArea } from '@/lib/contact/schema'
import { pageMetadata } from '@/lib/seo'
import { ProductCard } from '@/components/catalog/product-card'
import { DocumentsList } from '@/components/catalog/documents-list'
import { ContactCta } from '@/components/sections/contact-cta'
import { DepartmentCard } from '@/components/sections/department-card'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { SectorIcon } from '@/components/visuals/sector-icon'

export const dynamicParams = false

export function generateStaticParams() {
  return getSectors().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps<'/areas-de-negocio/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const sector = getSector(slug)
  if (!sector) return {}
  return pageMetadata({ title: sector.seo.title, description: sector.seo.description, path: `/areas-de-negocio/${slug}` })
}

export default async function SectorPage({ params }: PageProps<'/areas-de-negocio/[slug]'>) {
  const { slug } = await params
  const sector = getSector(slug)
  if (!sector) notFound()

  const products = getProductsBySector(sector.slug)
  const documents = products.flatMap((p) => p.datasheets)
  const area = sectorToArea[sector.slug]
  const requestHref = `/contactos?area=${area}&assunto=${encodeURIComponent(`Pedido de informação — ${sector.name}`)}#formulario`
  const others = getSectors().filter((s) => s.slug !== sector.slug)
  const index = String(sector.order).padStart(2, '0')

  return (
    <>
      <PageHero
        eyebrow={`Área de negócio ${index}`}
        title={sector.name}
        lead={sector.summary}
        crumbs={[
          { label: 'Áreas de Negócio', href: '/areas-de-negocio' },
          { label: sector.shortName, href: `/areas-de-negocio/${sector.slug}` },
        ]}
        visual={sector.visual}
        image={sector.image}
        visualLabel={sector.shortName}
        visualIndex={index}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={requestHref} size="lg" arrow>
            Solicitar informação
          </ButtonLink>
          <ButtonLink href="#solucoes" size="lg" variant="outline-light">
            Ver produtos e soluções
          </ButtonLink>
        </div>
      </PageHero>

      {/* Apresentação */}
      <Section labelledBy="apresentacao">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Apresentação</p>
            <h2 id="apresentacao" className="text-h2">
              {sector.tagline}
            </h2>
            <div className="prose-corp mt-8">
              {sector.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">A quem se destina</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {sector.audiences.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[0.9375rem] text-ink-800">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <DepartmentCard ids={[sector.department, ...(sector.extraDepartments ?? [])]} />
            </div>
          </div>
        </div>
      </Section>

      {/* Famílias */}
      <Section tone="muted" labelledBy="familias">
        <SectionHeading
          id="familias"
          eyebrow="Famílias de produtos e serviços"
          title={`O que inclui a área de ${sector.shortName}`}
        />
        <ol className="mt-14 grid gap-px bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {sector.families.map((f, i) => (
            <li key={f.name} className="bg-white p-7">
              <span className="font-mono text-xs text-brand-600">
                {index}.{String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink-950">{f.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{f.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Produtos */}
      <Section id="solucoes" labelledBy="solucoes-title">
        <SectionHeading
          id="solucoes-title"
          align="split"
          eyebrow="Catálogo"
          title="Produtos e soluções"
          lead="Consulte o detalhe de cada família e solicite a informação técnica e as condições de fornecimento ao departamento comercial."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <h3 className="mb-6 text-h3">Documentação técnica</h3>
          <DocumentsList documents={documents} requestHref={requestHref} />
        </div>
      </Section>

      {/* Outras áreas */}
      <section className="border-t border-ink-200 bg-white py-16 lg:py-20" aria-labelledby="outras-areas">
        <div className="container-site">
          <h2 id="outras-areas" className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
            Outras áreas de negócio
          </h2>
          <ul className="mt-8 grid gap-px bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug} className="bg-white">
                <Link href={`/areas-de-negocio/${s.slug}`} className="group flex h-full items-center gap-4 p-5 transition-colors hover:bg-ink-50">
                  <SectorIcon slug={s.slug} className="size-5 shrink-0 text-brand-600" />
                  <span className="text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">{s.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta
        title={`Precisa de uma solução em ${sector.shortName.toLowerCase()}?`}
        area={area}
        department={sector.department}
      />
    </>
  )
}
