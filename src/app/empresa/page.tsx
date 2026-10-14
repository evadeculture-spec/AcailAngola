import Link from 'next/link'
import { Eye, MapPin, Navigation, Target } from 'lucide-react'
import { company, directionsUrl, locations, values } from '@/data/company'
import { getSectors } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { ContactCta } from '@/components/sections/contact-cta'
import { qsaPillars } from '@/components/sections/home/quality'
import { PageHero } from '@/components/sections/page-hero'
import { Section, SectionHeading } from '@/components/ui/section'
import { MediaFrame } from '@/components/visuals/media-frame'
import { SectorIcon } from '@/components/visuals/sector-icon'

export const metadata = pageMetadata({
  title: 'A Empresa',
  description:
    'Conheça a ACAIL Angola: empresa industrial constituída em 2005, com seis áreas de negócio, unidades em Viana, Mazozo e Catumbela e um compromisso com a qualidade, a segurança e o ambiente.',
  path: '/empresa',
})

export default function CompanyPage() {
  const sectors = getSectors()
  return (
    <>
      <PageHero
        eyebrow="A Empresa"
        title="Uma empresa industrial angolana, construída sobre a qualidade e a capacidade de execução."
        lead={`Constituída em ${company.foundingYear}, a ACAIL Angola desenvolve atividade industrial, comercial e de serviços em seis áreas de negócio complementares.`}
        crumbs={[{ label: 'A Empresa', href: '/empresa' }]}
        visual="company"
        visualLabel="Pólo industrial"
        visualIndex="ACAIL"
      />

      {/* Apresentação e história */}
      <Section labelledBy="historia">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Apresentação</p>
            <h2 id="historia" className="text-h2">
              Desde {company.foundingYear}
            </h2>
            {/* Elemento decorativo (SVG): o ano já está presente no título. */}
            <svg aria-hidden viewBox="0 0 400 110" className="mt-8 w-64 sm:w-96">
              <text x="0" y="96" className="fill-ink-100 font-display" fontSize="120" fontWeight="800" letterSpacing="-4">
                {company.foundingYear}
              </text>
            </svg>
          </div>
          <div className="prose-corp lg:col-span-7 lg:col-start-6">
            <p className="text-lead text-ink-900">
              A ACAIL Angola foi constituída em {company.foundingYear} e desenvolveu, ao longo da sua atividade, uma presença
              em diferentes setores produtivos, de comercialização e de serviços.
            </p>
            <p>
              A partir do Pólo Industrial de Viana, em Luanda, a empresa estruturou a sua oferta em torno de necessidades
              concretas da construção, da indústria e da saúde: produtos siderúrgicos, gases industriais, medicinais e
              alimentares, equipamentos e material médico, elementos pré-fabricados de betão, inertes e serviços
              industriais.
            </p>
            <p>
              A unidade de pré-fabricados de betão em Mazozo, Icolo e Bengo, e a presença no Pólo de Desenvolvimento
              Industrial da Catumbela, em Benguela, completam uma implantação que permite servir clientes em diferentes
              regiões do país.
            </p>
            <p>
              A diversidade de áreas não é um fim em si mesma: permite à ACAIL Angola acompanhar o cliente em várias fases
              do mesmo projeto, com interlocutores especializados em cada domínio.
            </p>
          </div>
        </div>
      </Section>

      {/* Atividade */}
      <Section tone="muted" labelledBy="atividade">
        <SectionHeading
          id="atividade"
          eyebrow="Atividade"
          title="Seis áreas de negócio"
          lead="Cada área dispõe de equipa e contacto comercial próprios, e articula-se com as restantes sempre que o projeto o exige."
        />
        <ul className="mt-14 grid gap-px bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li key={s.slug} className="bg-white">
              <Link href={`/areas-de-negocio/${s.slug}`} className="group flex h-full flex-col p-8 transition-colors hover:bg-brand-50/50">
                <div className="flex items-center justify-between">
                  <SectorIcon slug={s.slug} className="size-7 text-brand-600" />
                  <span className="font-mono text-xs text-ink-500">{String(s.order).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-h3 group-hover:text-brand-700">{s.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{s.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Missão, visão */}
      <Section labelledBy="missao">
        <h2 id="missao" className="sr-only">
          Missão e visão
        </h2>
        <div className="grid gap-px bg-ink-200 ring-1 ring-ink-200 lg:grid-cols-2">
          <div className="bg-white p-8 sm:p-12 lg:p-16">
            <Target aria-hidden className="size-8 text-brand-600" strokeWidth={1.5} />
            <p className="eyebrow mt-8 mb-4">Missão</p>
            <p className="font-display text-2xl leading-snug font-semibold text-ink-950 sm:text-[1.75rem]">
              Fornecer produtos e serviços industriais de qualidade que respondam com rigor e eficiência às necessidades dos
              clientes, assegurando processos seguros e ambientalmente responsáveis.
            </p>
          </div>
          <div className="bg-ink-950 p-8 sm:p-12 lg:p-16">
            <Eye aria-hidden className="size-8 text-brand-300" strokeWidth={1.5} />
            <p className="eyebrow mt-8 mb-4 text-brand-200!">Visão</p>
            <p className="font-display text-2xl leading-snug font-semibold text-white sm:text-[1.75rem]">
              Ser um parceiro industrial de referência em Angola, reconhecido pela qualidade, pela flexibilidade e pela
              capacidade de execução nas diferentes áreas em que atua.
            </p>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section labelledBy="valores" className="pt-0!">
        <SectionHeading id="valores" eyebrow="Valores" title="Princípios que orientam a atividade" />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} className="border-t-2 border-brand-600 pt-6">
              <span className="font-mono text-sm text-ink-500">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-h3">{v.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{v.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* QSA */}
      <Section tone="dark" id="qsa" labelledBy="qsa-heading">
        <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Compromisso institucional</p>
            <h2 id="qsa-heading" className="text-h2">
              Qualidade, Segurança e Ambiente
            </h2>
            <p className="mt-6 text-lead">
              O compromisso central da ACAIL Angola assenta em três dimensões indissociáveis, aplicadas à produção, ao
              fornecimento e à execução de serviços.
            </p>
            <MediaFrame visual="quality" className="mt-10 aspect-[4/3] ring-1 ring-white/10" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
          <ul className="space-y-px lg:col-span-6 lg:col-start-7">
            {qsaPillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-b border-white/10 py-8 first:pt-0">
                <div className="flex items-center gap-4">
                  <Icon aria-hidden className="size-6 text-brand-300" strokeWidth={1.5} />
                  <h3 className="text-h3">{title}</h3>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed">{text}</p>
              </li>
            ))}
            <li className="pt-8 text-[0.9375rem] leading-relaxed">
              Este compromisso traduz-se na qualidade dos processos e dos produtos, na formação e valorização dos recursos
              humanos, na melhoria contínua e na eficiência operacional.
            </li>
          </ul>
        </div>
      </Section>

      {/* Instalações */}
      <Section labelledBy="instalacoes">
        <SectionHeading
          id="instalacoes"
          align="split"
          eyebrow="Instalações e presença"
          title="Três localizações em Angola"
          lead="A implantação da ACAIL Angola abrange as províncias de Luanda, Icolo e Bengo e Benguela."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <MediaFrame visual="contact" label="Presença em Angola" index="AO" className="aspect-[4/3] lg:col-span-6" sizes="(min-width:1024px) 50vw, 100vw" />
          <ul className="divide-y divide-ink-200 border-y border-ink-200 lg:col-span-6">
            {locations.map((l) => (
              <li key={l.id} className="flex flex-col gap-4 py-7 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-950">{l.name}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">{l.role}</p>
                    <p className="mt-2 text-[0.9375rem] text-ink-600">{l.address}</p>
                  </div>
                </div>
                <a
                  href={directionsUrl(l.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 pl-9 text-sm font-semibold text-brand-600 hover:text-brand-800 sm:pl-0"
                >
                  <Navigation aria-hidden className="size-4" />
                  Direções
                  <span className="sr-only">para {l.name} (abre numa nova janela)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactCta title="Fale com a ACAIL Angola." lead="Para pedidos institucionais, parcerias ou informação comercial, contacte-nos através do formulário ou do endereço geral." />
    </>
  )
}
