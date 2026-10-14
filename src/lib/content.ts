/**
 * Camada de acesso ao conteúdo. Hoje lê ficheiros tipados em `src/data`;
 * numa segunda fase pode passar a consultar um CMS headless mantendo as
 * mesmas assinaturas.
 */
import { news } from '@/data/news'
import { products } from '@/data/products'
import { projects } from '@/data/projects'
import { sectors } from '@/data/sectors'
import type { NewsItem, Product, Sector, SectorSlug } from '@/types/content'

export function getSectors(): Sector[] {
  return [...sectors].sort((a, b) => a.order - b.order)
}

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug)
}

export function getProducts(): Product[] {
  return products
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsBySector(slug: SectorSlug): Product[] {
  return products.filter((p) => p.sector === slug)
}

export function getFeaturedProducts(limit = 6): Product[] {
  // Um produto em destaque por setor, para uma seleção representativa.
  const picked: Product[] = []
  for (const sector of getSectors()) {
    const p = products.find((x) => x.sector === sector.slug && x.featured)
    if (p) picked.push(p)
  }
  return picked.slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products.filter((p) => p.sector === product.sector && p.slug !== product.slug).slice(0, limit)
}

export function getProjects() {
  return projects
}

export function getNews(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date))
}

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug)
}
