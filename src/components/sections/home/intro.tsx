import { company } from '@/data/company'
import { ArrowLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { MediaFrame } from '@/components/visuals/media-frame'

export function HomeIntro() {
  return (
    <Section labelledBy="intro-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">A Empresa</p>
          <h2 id="intro-title" className="text-h2">
            Uma organização industrial com atividade em seis setores complementares.
          </h2>
          <MediaFrame
            visual="steel"
            label="Produtos siderúrgicos"
            index="ACAIL"
            className="mt-12 hidden aspect-[16/10] lg:block"
            sizes="50vw"
          />
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <div className="prose-corp">
            <p className="text-lead text-ink-900">
              Constituída em {company.foundingYear}, a ACAIL Angola desenvolve atividade industrial, comercial e de serviços
              a partir das suas unidades em Luanda, Icolo e Bengo e Benguela.
            </p>
            <p>
              A empresa fornece produtos siderúrgicos, produz e distribui gases industriais, medicinais e alimentares, apoia
              unidades de saúde, fabrica elementos pré-fabricados de betão, comercializa inertes e presta serviços
              industriais de apoio à obra e à indústria.
            </p>
            <p>
              Esta diversidade permite responder, de forma coordenada, a diferentes fases de um mesmo projeto — da fundação
              à estrutura, da instalação técnica à operação.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 border-t border-ink-200">
            <div className="border-r border-ink-200 py-6 pr-6">
              <dt className="text-sm text-ink-500">Constituição</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-ink-950">{company.foundingYear}</dd>
            </div>
            <div className="py-6 pl-6">
              <dt className="text-sm text-ink-500">Compromisso</dt>
              <dd className="mt-1 font-display text-lg leading-snug font-bold text-ink-950">{company.commitment}</dd>
            </div>
          </dl>
          <ArrowLink href="/empresa" className="mt-8">
            Conhecer a ACAIL Angola
          </ArrowLink>
        </div>
      </div>
    </Section>
  )
}
