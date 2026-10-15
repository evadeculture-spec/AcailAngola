import Link from 'next/link'
import { company, locations } from '@/data/company'
import { getSectors } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { TechnicalVisual } from '@/components/visuals/technical-visual'

export function HomeHero() {
  const sectors = getSectors()
  const facts = [
    { value: String(company.foundingYear), label: 'Ano de constituição' },
    { value: String(company.sectorsCount), label: 'Áreas de negócio' },
    { value: String(locations.length), label: 'Localizações em Angola' },
  ]
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink-950 text-ink-300" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25 lg:left-[46%] lg:opacity-100">
        <TechnicalVisual visual="company" className="h-full w-full opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />
      </div>
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0 -z-10 opacity-60" />

      <div className="container-site flex min-h-[calc(100svh-4.5rem)] flex-col justify-between pt-16 pb-10 lg:min-h-[calc(100svh-5rem)] lg:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow mb-8">ACAIL Angola · Desde {company.foundingYear}</p>
          <h1 id="hero-title" className="text-display text-white">
            Indústria, engenharia e soluções para construir Angola.
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-ink-300">
            Desde {company.foundingYear}, a ACAIL Angola produz e disponibiliza soluções para a construção, a indústria, a
            saúde e as infraestruturas — do aço aos gases, do betão pré-fabricado aos serviços técnicos.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/areas-de-negocio" size="lg" arrow>
              Explorar Soluções
            </ButtonLink>
            <ButtonLink href="/contactos" size="lg" variant="outline-light">
              Contactar a ACAIL
            </ButtonLink>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/12 pt-8 lg:grid-cols-12">
          <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-xs leading-snug text-ink-400 sm:text-sm">{f.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold text-white sm:text-4xl">{f.value}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="Áreas de negócio" className="lg:col-span-7">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm lg:justify-end">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/areas-de-negocio/${s.slug}`}
                    className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
                  >
                    <span className="font-mono text-xs text-brand-300">{String(s.order).padStart(2, '0')}</span>
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
