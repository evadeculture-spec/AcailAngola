import { getFeaturedProducts } from '@/lib/content'
import { ArrowLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { ProductCard } from '@/components/catalog/product-card'

export function HomeFeaturedProducts() {
  return (
    <Section labelledBy="products-title">
      <SectionHeading
        id="products-title"
        align="split"
        eyebrow="Produtos e Soluções"
        title="Uma seleção representativa da oferta."
        lead="Consulte o catálogo institucional por área de negócio e solicite informação técnica e condições de fornecimento ao departamento comercial."
        action={<ArrowLink href="/produtos">Abrir o catálogo</ArrowLink>}
      />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {getFeaturedProducts(6).map((p) => (
          <li key={p.slug} className="reveal">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
