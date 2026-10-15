import type { Product, SectorSlug } from '@/types/content'

/** Normaliza para pesquisa: minúsculas e sem acentos. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

export interface CatalogFilter {
  query: string
  sector: SectorSlug | 'todos'
}

export function filterProducts(items: Product[], { query, sector }: CatalogFilter): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  return items.filter((p) => {
    if (sector !== 'todos' && p.sector !== sector) return false
    if (terms.length === 0) return true
    const haystack = normalize(
      [p.name, p.category, p.summary, ...p.applications, ...p.keywords].join(' '),
    )
    return terms.every((t) => haystack.includes(t))
  })
}
