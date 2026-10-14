/**
 * Modelos de conteúdo do website.
 *
 * Todos os conteúdos vivem em `src/data/` como objetos tipados. Os tipos estão
 * desenhados para corresponderem 1:1 a futuros documentos de um CMS headless
 * (ex.: Sanity), de modo a que a migração substitua apenas a camada de acesso
 * (`src/lib/content.ts`), sem alterar componentes.
 *
 * Regra editorial: campos opcionais ficam `undefined` quando a informação não
 * está validada. A interface nunca preenche esses campos com valores fictícios.
 */

export type SectorSlug =
  | 'produtos-siderurgicos'
  | 'gases'
  | 'saude'
  | 'pre-fabricacao-betao'
  | 'inertes'
  | 'servicos'

export type DepartmentId = 'geral' | 'gas' | 'soldadura' | 'saude' | 'prefabricados' | 'lobito'

export type VisualKey =
  | 'steel'
  | 'gas'
  | 'health'
  | 'precast'
  | 'aggregates'
  | 'services'
  | 'company'
  | 'quality'
  | 'projects'
  | 'contact'

/** Imagem autorizada (fotografia real). Só é usada quando existir em `public/images`. */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  credit?: string
}

export interface Department {
  id: DepartmentId
  name: string
  email: string
  /** Telefone apenas quando confirmado na fonte oficial. */
  phone?: string
  description: string
}

export interface Location {
  id: string
  name: string
  region: string
  role: string
  address: string
  /** Consulta usada para gerar a ligação de direções / mapa. */
  mapQuery: string
}

export interface SectorFamily {
  name: string
  description: string
}

export interface Sector {
  slug: SectorSlug
  order: number
  name: string
  shortName: string
  tagline: string
  summary: string
  intro: string[]
  families: SectorFamily[]
  audiences: string[]
  department: DepartmentId
  /** Contactos complementares (ex.: soldadura na área siderúrgica). */
  extraDepartments?: DepartmentId[]
  visual: VisualKey
  image?: ImageAsset
  seo: { title: string; description: string }
}

export interface Specification {
  label: string
  value: string
}

export interface Datasheet {
  title: string
  /** Caminho em `public/documents`. */
  href: string
  sizeLabel?: string
}

export interface Product {
  slug: string
  name: string
  sector: SectorSlug
  category: string
  summary: string
  description: string[]
  applications: string[]
  /** Especificações técnicas validadas. Vazio => tabela não é publicada. */
  specifications: Specification[]
  datasheets: Datasheet[]
  keywords: string[]
  featured?: boolean
  image?: ImageAsset
}

export interface Project {
  slug: string
  name: string
  location?: string
  category: string
  /** Âmbito de fornecimento documentalmente confirmado. */
  scope?: string
  summary: string
  image?: ImageAsset
}

export interface NewsItem {
  slug: string
  title: string
  /** Título curto para SEO (≤ 55 caracteres) quando o título é longo. */
  seoTitle?: string
  /** ISO (AAAA-MM-DD) ou AAAA-MM quando só o mês é conhecido. */
  date: string
  datePrecision: 'day' | 'month' | 'year'
  category: 'Imprensa' | 'Feiras e Eventos' | 'Institucional'
  excerpt: string
  body: string[]
  source?: { name: string; url: string }
  image?: ImageAsset
}

export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}
