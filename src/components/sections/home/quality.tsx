import { HardHat, Leaf, ShieldCheck } from 'lucide-react'
import { ArrowLink } from '@/components/ui/button'
import { MediaFrame } from '@/components/visuals/media-frame'

export const qsaPillars = [
  {
    icon: ShieldCheck,
    title: 'Qualidade',
    text: 'Qualidade dos processos produtivos e dos produtos, acompanhada por uma cultura de melhoria contínua e de satisfação do cliente.',
  },
  {
    icon: HardHat,
    title: 'Segurança',
    text: 'Segurança de pessoas, instalações e operações como condição para produzir, transportar e executar com responsabilidade.',
  },
  {
    icon: Leaf,
    title: 'Ambiente',
    text: 'Responsabilidade ambiental na gestão das atividades industriais, dos recursos e do impacto das operações.',
  },
]

export function HomeQuality() {
  return (
    <section className="bg-ink-50 py-20 sm:py-24 lg:py-32" aria-labelledby="qsa-title">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Qualidade, Segurança e Ambiente</p>
            <h2 id="qsa-title" className="text-h2">
              Um compromisso institucional que orienta toda a atividade.
            </h2>
            <p className="mt-6 max-w-xl text-lead text-ink-600">
              Qualidade, segurança e ambiente constituem o compromisso central da ACAIL Angola, presente na produção, no
              fornecimento e na execução de serviços.
            </p>
            <ArrowLink href="/empresa#qsa" className="mt-8">
              Missão, visão e valores
            </ArrowLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <MediaFrame visual="quality" label="Qualidade · Segurança · Ambiente" index="QSA" className="aspect-[4/3]" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
        </div>
        <ul className="mt-16 grid gap-px bg-ink-200 ring-1 ring-ink-200 md:grid-cols-3 lg:mt-20">
          {qsaPillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-white p-8 lg:p-10">
              <Icon aria-hidden className="size-7 text-brand-600" strokeWidth={1.5} />
              <h3 className="mt-6 text-h3">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
