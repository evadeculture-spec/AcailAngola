'use client'

import { Search, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react'
import type { Product, Sector, SectorSlug } from '@/types/content'
import { filterProducts } from '@/lib/catalog'
import { cn } from '@/lib/cn'
import { ProductCard } from './product-card'

interface Props {
  products: Product[]
  sectors: Pick<Sector, 'slug' | 'name' | 'shortName'>[]
}

type SectorFilter = SectorSlug | 'todos'

export function CatalogExplorer({ products, sectors }: Props) {
  const params = useSearchParams()
  const initialSector = params.get('setor')
  const validSector = sectors.some((s) => s.slug === initialSector) ? (initialSector as SectorSlug) : 'todos'

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sector, setSector] = useState<SectorFilter>(validSector)
  const deferredQuery = useDeferredValue(query)
  const searchId = useId()

  const results = useMemo(
    () => filterProducts(products, { query: deferredQuery, sector }),
    [products, deferredQuery, sector],
  )

  // Mantém o URL partilhável sem provocar nova navegação.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (sector === 'todos') url.searchParams.delete('setor')
    else url.searchParams.set('setor', sector)
    if (deferredQuery.trim()) url.searchParams.set('q', deferredQuery.trim())
    else url.searchParams.delete('q')
    window.history.replaceState(window.history.state, '', url)
  }, [sector, deferredQuery])

  const filtering = sector !== 'todos' || deferredQuery.trim() !== ''
  const counts = useMemo(() => {
    const map = new Map<SectorSlug, number>()
    for (const p of filterProducts(products, { query: deferredQuery, sector: 'todos' })) {
      map.set(p.sector, (map.get(p.sector) ?? 0) + 1)
    }
    return map
  }, [products, deferredQuery])

  return (
    <div>
      <div className="sticky top-[4.5rem] z-20 -mx-4 border-b border-ink-200 bg-white/95 px-4 py-5 backdrop-blur sm:-mx-6 sm:px-6 lg:top-20 lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor={searchId} className="sr-only">
              Pesquisar produtos e serviços
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar: varão, gases, blocos, grua…"
              autoComplete="off"
              className="h-12 w-full border border-ink-300 bg-white pr-11 pl-12 text-[0.9375rem] text-ink-950 placeholder:text-ink-500 focus:border-brand-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-600"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center text-ink-500 hover:text-ink-950"
                aria-label="Limpar pesquisa"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
          <div role="group" aria-label="Filtrar por área de negócio" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:pb-0">
            {[{ slug: 'todos' as const, shortName: 'Todos' }, ...sectors].map((s) => {
              const active = sector === s.slug
              const count = s.slug === 'todos' ? undefined : (counts.get(s.slug) ?? 0)
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSector(s.slug)}
                  className={cn(
                    'inline-flex h-10 shrink-0 items-center gap-2 border px-4 text-sm font-medium transition-colors',
                    active
                      ? 'border-ink-950 bg-ink-950 text-white'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-ink-500',
                  )}
                >
                  {s.shortName}
                  {count !== undefined && (
                    <span className={cn('text-xs', active ? 'text-ink-300' : 'text-ink-500')}>{count}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-ink-500">
        {results.length === 0
          ? 'Nenhum resultado encontrado.'
          : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 border border-dashed border-ink-300 bg-ink-50 p-10 text-center">
          <p className="font-display text-xl font-bold text-ink-950">Não encontrámos produtos para esta pesquisa.</p>
          <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] text-ink-600">
            Experimente outros termos ou contacte o departamento comercial — a gama disponível pode incluir referências
            ainda não publicadas no catálogo.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setSector('todos')
            }}
            className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            Limpar filtros
          </button>
        </div>
      ) : filtering ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <CatalogGrouped products={products} sectors={sectors} />
      )}
    </div>
  )
}

/** Listagem agrupada por área — também usada como versão estática (sem JavaScript). */
export function CatalogGrouped({ products, sectors }: Props) {
  return (
    <div className="mt-6 space-y-16">
      {sectors.map((s) => {
        const items = products.filter((p) => p.sector === s.slug)
        if (items.length === 0) return null
        return (
          <section key={s.slug} aria-labelledby={`cat-${s.slug}`}>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink-200 pb-4">
              <h2 id={`cat-${s.slug}`} className="text-h3">
                {s.name}
              </h2>
              <span className="text-sm text-ink-500">{items.length}</span>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
