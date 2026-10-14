import { Info, MapPin } from 'lucide-react'
import { getProjects } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { ContactCta } from '@/components/sections/contact-cta'
import { PageHero } from '@/components/sections/page-hero'
import { MediaFrame } from '@/components/visuals/media-frame'
import type { VisualKey } from '@/types/content'

export const metadata = pageMetadata({
  title: 'Projetos',
  description:
    'Projetos de referência do portefólio da ACAIL Angola: Ponte da Catumbela, Empreendimento Comandante Gika, Nova Assembleia Nacional e Hospital Prenda.',
  path: '/projetos',
})

const visualByCategory: Record<string, VisualKey> = {
  Infraestruturas: 'projects',
  Saúde: 'health',
}

export default function ProjectsPage() {
  const projects = getProjects()
  return (
    <>
      <PageHero
        eyebrow="Projetos"
        title="Projetos de referência"
        lead="Obras de referência nacional que integram o portefólio histórico da ACAIL Angola, em infraestruturas, edifícios institucionais, empreendimentos e unidades de saúde."
        crumbs={[{ label: 'Projetos', href: '/projetos' }]}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-28" aria-label="Lista de projetos">
        <div className="container-site">
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug} id={p.slug} className="reveal">
                <article aria-labelledby={`${p.slug}-title`}>
                  <MediaFrame
                    image={p.image}
                    visual={visualByCategory[p.category] ?? 'company'}
                    label={p.category}
                    index={String(i + 1).padStart(2, '0')}
                    className="aspect-[16/10]"
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                  <div className="mt-7 grid grid-cols-[3rem_1fr] gap-4">
                    <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">{p.category}</p>
                      <h2 id={`${p.slug}-title`} className="mt-2 font-display text-[1.75rem] leading-tight font-bold text-ink-950">
                        {p.name}
                      </h2>
                      {p.location && (
                        <p className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] text-ink-600">
                          <MapPin aria-hidden className="size-4 text-brand-600" />
                          {p.location}
                        </p>
                      )}
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">{p.summary}</p>
                      {p.scope && (
                        <dl className="mt-5 border-t border-ink-200 pt-4 text-[0.9375rem]">
                          <dt className="font-semibold text-ink-900">Âmbito do fornecimento</dt>
                          <dd className="mt-1 text-ink-700">{p.scope}</dd>
                        </dl>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <aside className="mt-20 flex gap-4 border-l-2 border-brand-600 bg-ink-50 p-6 text-[0.9375rem] leading-relaxed text-ink-700 lg:max-w-3xl">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
            <p>
              As obras apresentadas constituem referências históricas do portefólio institucional da ACAIL Angola. O detalhe
              do âmbito de cada fornecimento é publicado após validação documental.
            </p>
          </aside>
        </div>
      </section>

      <ContactCta title="Tem um projeto em preparação?" lead="Fale com a equipa comercial sobre os materiais, os gases, os pré-fabricados e os serviços de que o seu projeto necessita." />
    </>
  )
}
