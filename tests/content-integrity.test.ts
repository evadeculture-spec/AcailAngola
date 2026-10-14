import { describe, expect, it } from 'vitest'
import { departments, locations } from '@/data/company'
import { mainNav } from '@/data/navigation'
import { news } from '@/data/news'
import { products } from '@/data/products'
import { projects } from '@/data/projects'
import { legacyRedirects } from '@/data/redirects'
import { sectors } from '@/data/sectors'
import { sectorToArea } from '@/lib/contact/schema'

const unique = (xs: string[]) => new Set(xs).size === xs.length

describe('integridade do conteúdo', () => {
  it('tem as seis áreas de negócio, com ordem e slugs únicos', () => {
    expect(sectors).toHaveLength(6)
    expect(unique(sectors.map((s) => s.slug))).toBe(true)
    expect(sectors.map((s) => s.order).sort()).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('cada setor tem produtos, departamento válido e área de formulário', () => {
    const deptIds = departments.map((d) => d.id)
    for (const s of sectors) {
      expect(products.some((p) => p.sector === s.slug)).toBe(true)
      expect(deptIds).toContain(s.department)
      for (const d of s.extraDepartments ?? []) expect(deptIds).toContain(d)
      expect(sectorToArea[s.slug]).toBeDefined()
    }
  })

  it('produtos têm slugs únicos e setor existente', () => {
    expect(unique(products.map((p) => p.slug))).toBe(true)
    const slugs = sectors.map((s) => s.slug)
    for (const p of products) {
      expect(slugs).toContain(p.sector)
      expect(p.summary.length).toBeGreaterThan(10)
      expect(p.description.length).toBeGreaterThan(0)
    }
  })

  it('não publica especificações ou fichas técnicas sem fonte (estado atual)', () => {
    // Quando forem acrescentadas fichas oficiais, este teste deve ser atualizado em conjunto.
    for (const p of products) {
      for (const d of p.datasheets) expect(d.href.startsWith('/documents/')).toBe(true)
    }
  })

  it('não contém Lorem Ipsum nem marcadores de preenchimento', () => {
    const all = JSON.stringify({ sectors, products, projects, news, departments, locations })
    expect(all).not.toMatch(/lorem|ipsum|TODO|xxx/i)
  })

  it('os quatro projetos de referência estão presentes', () => {
    expect(projects.map((p) => p.name)).toEqual([
      'Ponte da Catumbela',
      'Empreendimento Comandante Gika',
      'Nova Assembleia Nacional',
      'Hospital Prenda',
    ])
  })

  it('notícias têm data no formato correto e fonte quando são de imprensa', () => {
    for (const n of news) {
      expect(n.date).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/)
      if (n.category === 'Imprensa') expect(n.source?.url).toMatch(/^https:\/\//)
    }
  })

  it('os e-mails dos departamentos pertencem ao domínio oficial', () => {
    for (const d of departments) expect(d.email).toMatch(/@acailangola\.com$/)
  })

  it('a navegação principal tem os sete itens previstos', () => {
    expect(mainNav.map((n) => n.label)).toEqual([
      'Início',
      'A Empresa',
      'Áreas de Negócio',
      'Produtos e Soluções',
      'Projetos',
      'Notícias',
      'Contactos',
    ])
  })

  it('redirecionamentos antigos apontam para rotas internas', () => {
    for (const r of legacyRedirects) {
      expect(r.source).toMatch(/\.php$/)
      expect(r.destination.startsWith('/')).toBe(true)
    }
  })
})
