import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { breadcrumbJsonLd, type Crumb } from '@/lib/seo'
import { JsonLd } from './json-ld'

/** Breadcrumbs visíveis + BreadcrumbList estruturado. O primeiro item é sempre "Início". */
export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const all: Crumb[] = [{ label: 'Início', href: '/' }, ...items]
  const muted = tone === 'dark' ? 'text-ink-400 hover:text-white' : 'text-ink-500 hover:text-ink-950'
  const current = tone === 'dark' ? 'text-white' : 'text-ink-950'
  return (
    <>
      <nav aria-label="Localização na página" className="text-[0.8125rem]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={current}>
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className={`transition-colors ${muted}`}>
                      {c.label}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5 opacity-50" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  )
}
