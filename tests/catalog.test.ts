import { describe, expect, it } from 'vitest'
import { filterProducts, normalize } from '@/lib/catalog'
import { products } from '@/data/products'

describe('pesquisa do catálogo', () => {
  it('ignora acentos e maiúsculas', () => {
    expect(normalize('Varão ELETROSSOLDADA')).toBe('varao eletrossoldada')
    const r = filterProducts(products, { query: 'varao', sector: 'todos' })
    expect(r.map((p) => p.slug)).toContain('varao-de-construcao')
  })

  it('pesquisa por palavras-chave e aplicações', () => {
    const r = filterProducts(products, { query: 'oxigénio', sector: 'todos' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((p) => p.sector === 'gases' || p.sector === 'saude')).toBe(true)
  })

  it('filtra por setor', () => {
    const r = filterProducts(products, { query: '', sector: 'inertes' })
    expect(r.map((p) => p.slug).sort()).toEqual(['areias', 'brita', 'burgau'])
  })

  it('combina termos (AND)', () => {
    expect(filterProducts(products, { query: 'tubos betão', sector: 'todos' }).map((p) => p.slug)).toEqual(['tubos-de-betao'])
  })

  it('devolve vazio para termos inexistentes', () => {
    expect(filterProducts(products, { query: 'xyzabc', sector: 'todos' })).toHaveLength(0)
  })
})
