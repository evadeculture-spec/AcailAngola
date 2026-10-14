import { getSectors } from '@/lib/content'
import { ArrowLink } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { SectorCard } from '@/components/sections/sector-card'

export function HomeSectors() {
  return (
    <Section tone="muted" labelledBy="sectors-title">
      <SectionHeading
        id="sectors-title"
        align="split"
        eyebrow="Áreas de Negócio"
        title="As nossas áreas de negócio"
        lead="Da siderurgia aos serviços industriais, cada área dispõe de equipa comercial própria e articula-se com as restantes para responder a projetos completos."
        action={<ArrowLink href="/areas-de-negocio">Ver todas as áreas</ArrowLink>}
      />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {getSectors().map((s) => (
          <li key={s.slug} className="reveal">
            <SectorCard sector={s} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
