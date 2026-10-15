import { Suspense } from 'react'
import { getProducts, getSectors } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { CatalogExplorer, CatalogGrouped } from '@/components/catalog/catalog-explorer'
import { ContactCta } from '@/components/sections/contact-cta'
import { PageHero } from '@/components/sections/page-hero'

export const metadata = pageMetadata({
  title: 'Produtos e Soluções',
  description:
    'Catálogo institucional da ACAIL Angola: produtos siderúrgicos, gases, equipamentos e material médico, pré-fabricados de betão, inertes e serviços industriais.',
  path: '/produtos',
})

export default function ProductsPage() {
  const products = getProducts()
  const sectors = getSectors().map(({ slug, name, shortName }) => ({ slug, name, shortName }))
  return (
    <>
      <PageHero
        eyebrow="Produtos e Soluções"
        title="Catálogo institucional"
        lead="Pesquise por produto, aplicação ou área de negócio. Cada ficha permite solicitar informação técnica e condições de fornecimento ao departamento comercial."
        crumbs={[{ label: 'Produtos e Soluções', href: '/produtos' }]}
      />
      <section className="bg-white pb-24 lg:pb-32" aria-label="Catálogo de produtos">
        <div className="container-site">
          <Suspense fallback={<CatalogGrouped products={products} sectors={sectors} />}>
            <CatalogExplorer products={products} sectors={sectors} />
          </Suspense>
        </div>
      </section>
      <ContactCta
        title="Não encontrou o que procura?"
        lead="A gama disponível pode incluir referências ainda não publicadas no catálogo. Descreva a sua necessidade e encaminharemos o pedido para o departamento adequado."
      />
    </>
  )
}
