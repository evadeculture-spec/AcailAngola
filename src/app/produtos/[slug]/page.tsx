import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, MessageSquareText } from 'lucide-react'
import { getProduct, getProducts, getRelatedProducts, getSector } from '@/lib/content'
import { sectorToArea } from '@/lib/contact/schema'
import { pageMetadata } from '@/lib/seo'
import { DocumentsList } from '@/components/catalog/documents-list'
import { ProductCard } from '@/components/catalog/product-card'
import { DepartmentCard } from '@/components/sections/department-card'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button'

export const dynamicParams = false

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/produtos/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  const sector = getSector(product.sector)
  return pageMetadata({
    title: `${product.name} — ${sector?.shortName ?? 'Produtos'}`,
    description: `${product.summary} Solicite informação técnica e condições de fornecimento à ACAIL Angola.`,
    path: `/produtos/${slug}`,
  })
}

export default async function ProductPage({ params }: PageProps<'/produtos/[slug]'>) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  const sector = getSector(product.sector)
  if (!sector) notFound()

  const related = getRelatedProducts(product, 3)
  const requestHref = `/contactos?area=${sectorToArea[sector.slug]}&assunto=${encodeURIComponent(
    `Pedido de informação — ${product.name}`,
  )}#formulario`

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        lead={product.summary}
        crumbs={[
          { label: 'Produtos e Soluções', href: '/produtos' },
          { label: sector.shortName, href: `/areas-de-negocio/${sector.slug}` },
          { label: product.name, href: `/produtos/${product.slug}` },
        ]}
        visual={sector.visual}
        image={product.image}
        visualLabel={product.name}
        visualIndex={String(sector.order).padStart(2, '0')}
      >
        <ButtonLink href={requestHref} size="lg" arrow>
          Solicitar informação
        </ButtonLink>
      </PageHero>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-7">
            <div>
              <h2 className="text-h3">Descrição</h2>
              <div className="prose-corp mt-5">
                {product.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            {product.applications.length > 0 && (
              <div>
                <h2 className="text-h3">Aplicações</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.applications.map((a) => (
                    <li key={a} className="flex items-start gap-3 border-b border-ink-100 pb-3 text-[0.9375rem] text-ink-800">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-h3">Especificações técnicas</h2>
              {product.specifications.length > 0 ? (
                <div className="mt-5 overflow-x-auto border border-ink-200" role="region" aria-label="Tabela de especificações" tabIndex={0}>
                  <table className="w-full min-w-[28rem] text-left text-[0.9375rem]">
                    <caption className="sr-only">Especificações técnicas de {product.name}</caption>
                    <tbody>
                      {product.specifications.map((s) => (
                        <tr key={s.label} className="border-b border-ink-100 last:border-0">
                          <th scope="row" className="w-2/5 bg-ink-50 px-5 py-3.5 font-medium text-ink-700">
                            {s.label}
                          </th>
                          <td className="px-5 py-3.5 text-ink-900">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                  Dimensões, classes e restantes características técnicas são confirmadas pelo departamento comercial, em
                  função da referência e da quantidade pretendidas.
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-5 text-h3">Fichas técnicas</h2>
              <DocumentsList documents={product.datasheets} requestHref={requestHref} />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="bg-ink-950 p-7 text-ink-300">
                <MessageSquareText aria-hidden className="size-6 text-brand-300" strokeWidth={1.5} />
                <h2 className="mt-5 font-display text-xl font-bold text-white">Pedido de informação</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">
                  Indique quantidades, especificações e local de entrega. O pedido é encaminhado para o departamento
                  responsável.
                </p>
                <ButtonLink href={requestHref} variant="light" arrow className="mt-6 w-full">
                  Solicitar informação
                </ButtonLink>
              </div>
              <DepartmentCard ids={[sector.department, ...(sector.extraDepartments ?? [])]} />
              <Link
                href={`/areas-de-negocio/${sector.slug}`}
                className="block border border-ink-200 p-5 text-[0.9375rem] font-semibold text-ink-900 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                Área de negócio: {sector.name} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-50 py-16 lg:py-24" aria-labelledby="relacionados">
          <div className="container-site">
            <h2 id="relacionados" className="text-h3">
              Outros produtos e serviços em {sector.shortName}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
