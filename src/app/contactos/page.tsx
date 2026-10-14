import { Suspense } from 'react'
import { Mail, MapPin, Navigation } from 'lucide-react'
import { departments, directionsUrl, locations } from '@/data/company'
import { pageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/forms/contact-form'
import { ContactFormWithParams } from '@/components/forms/contact-form-with-params'
import { LocationMap } from '@/components/sections/location-map'
import { PageHero } from '@/components/sections/page-hero'
import { Section, SectionHeading } from '@/components/ui/section'

export const metadata = pageMetadata({
  title: 'Contactos',
  description:
    'Contacte a ACAIL Angola: departamentos comerciais de gases, soldadura, saúde e pré-fabricados, e localizações em Viana (Luanda), Mazozo (Icolo e Bengo) e Catumbela (Benguela).',
  path: '/contactos',
})

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Fale com a equipa certa."
        lead="Cada área de negócio dispõe de contacto comercial próprio. Utilize o formulário — encaminhamos o pedido para o departamento correspondente — ou escreva diretamente para o endereço indicado."
        crumbs={[{ label: 'Contactos', href: '/contactos' }]}
      />

      {/* Departamentos */}
      <Section labelledBy="departamentos" className="py-16! lg:py-24!">
        <SectionHeading id="departamentos" eyebrow="Departamentos comerciais" title="Contactos por área" />
        <ul className="mt-12 grid gap-px bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <li key={d.id} className="flex flex-col bg-white p-7">
              <h3 className="font-display text-lg font-bold text-ink-950">{d.name}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{d.description}</p>
              <a
                href={`mailto:${d.email}`}
                className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold break-all text-brand-600 hover:text-brand-800"
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                {d.email}
              </a>
              {d.phone && <p className="mt-1 text-sm text-ink-700">{d.phone}</p>}
            </li>
          ))}
        </ul>
      </Section>

      {/* Formulário */}
      <Section tone="muted" id="formulario" labelledBy="formulario-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">Formulário</p>
            <h2 id="formulario-title" className="text-h2">
              Pedido de informação
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-600">
              Indique a área de interesse para que o pedido seja encaminhado ao departamento responsável. Para pedidos de
              orçamento, inclua quantidades, especificações e local de entrega.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink-500">
              Os dados enviados são utilizados exclusivamente para responder ao seu pedido.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>
        </div>
      </Section>

      {/* Localizações */}
      <Section labelledBy="localizacoes">
        <SectionHeading
          id="localizacoes"
          align="split"
          eyebrow="Localizações"
          title="Onde estamos"
          lead="Unidades nas províncias de Luanda, Icolo e Bengo e Benguela."
        />
        <ul className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {locations.map((l) => (
            <li key={l.id} className="flex flex-col">
              <LocationMap query={l.mapQuery} name={l.name} />
              <div className="mt-6 flex flex-1 flex-col">
                <p className="text-sm font-medium text-brand-700">{l.role}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-ink-950">{l.name}</h3>
                <p className="mt-3 flex flex-1 gap-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-ink-400" />
                  {l.address}
                </p>
                <a
                  href={directionsUrl(l.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 w-fit items-center gap-2 border border-ink-300 px-4 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-900"
                >
                  <Navigation aria-hidden className="size-4" />
                  Obter direções
                  <span className="sr-only">para {l.name} (abre numa nova janela)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
