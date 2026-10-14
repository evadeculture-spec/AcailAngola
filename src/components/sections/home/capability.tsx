import { Factory, Truck, Wrench } from 'lucide-react'
import { MediaFrame } from '@/components/visuals/media-frame'

const pillars = [
  {
    icon: Factory,
    title: 'Produção',
    text: 'Produção de gases industriais, medicinais e alimentares e fabrico de elementos pré-fabricados de betão nas unidades da empresa.',
  },
  {
    icon: Truck,
    title: 'Fornecimento',
    text: 'Comercialização de produtos siderúrgicos, inertes, equipamentos industriais e hospitalares, material médico e medicamentos.',
  },
  {
    icon: Wrench,
    title: 'Execução técnica',
    text: 'Redes de gases, furos artesianos, estacas, varão moldado, oxicorte e meios de elevação ao serviço da obra e da indústria.',
  },
]

export function HomeCapability() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 py-20 text-ink-300 sm:py-24 lg:py-32" aria-labelledby="capability-title">
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
      <div className="relative container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:order-2">
          <p className="eyebrow mb-6">Capacidade industrial</p>
          <h2 id="capability-title" className="text-h2 text-white">
            Produzir, fornecer e executar a partir de Angola.
          </h2>
          <p className="mt-6 text-lead text-ink-300">
            A atividade da ACAIL Angola combina produção industrial, fornecimento de materiais e equipamentos e execução de
            serviços técnicos — uma cadeia integrada que reduz interfaces para o cliente.
          </p>
          <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-5 py-7">
                <span className="grid size-11 place-items-center border border-white/15 text-brand-300">
                  <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:order-1">
          <div className="grid h-full grid-rows-[1fr_auto] gap-6">
            <MediaFrame visual="services" label="Serviços industriais" index="03" className="aspect-[4/5] ring-1 ring-white/10 lg:aspect-auto lg:min-h-[28rem]" sizes="(min-width:1024px) 40vw, 100vw" />
            <div className="grid grid-cols-2 gap-6">
              <MediaFrame visual="gas" label="Gases" index="01" className="aspect-square ring-1 ring-white/10" sizes="20vw" />
              <MediaFrame visual="precast" label="Betão" index="02" className="aspect-square ring-1 ring-white/10" sizes="20vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
