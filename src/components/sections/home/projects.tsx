import { MapPin } from 'lucide-react'
import { getProjects } from '@/lib/content'
import { ArrowLink } from '@/components/ui/button'
import { MediaFrame } from '@/components/visuals/media-frame'

export function HomeProjects() {
  const projects = getProjects()
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32" aria-labelledby="projects-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6">Projetos de referência</p>
            <h2 id="projects-title" className="text-h2">
              Presença em obras de referência nacional.
            </h2>
            <p className="mt-6 text-lead text-ink-600">
              Referências históricas que integram o portefólio da ACAIL Angola, em infraestruturas, edifícios institucionais
              e unidades de saúde.
            </p>
            <MediaFrame visual="projects" label="Infraestruturas" index="REF" className="mt-10 aspect-[16/10]" sizes="(min-width:1024px) 40vw, 100vw" />
            <ArrowLink href="/projetos" className="mt-8">
              Ver portefólio
            </ArrowLink>
          </div>
        </div>
        <ol className="border-t border-ink-200 lg:col-span-6 lg:col-start-7">
          {projects.map((p, i) => (
            <li key={p.slug} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-b border-ink-200 py-8 sm:grid-cols-[4.5rem_1fr] lg:py-10">
              <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">{p.category}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-[1.75rem]">{p.name}</h3>
                {p.location && (
                  <p className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] text-ink-600">
                    <MapPin aria-hidden className="size-4 text-brand-600" />
                    {p.location}
                  </p>
                )}
                {p.scope && <p className="mt-3 text-[0.9375rem] text-ink-700">{p.scope}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
