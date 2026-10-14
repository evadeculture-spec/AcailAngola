import { ButtonLink } from '@/components/ui/button'
import type { DepartmentId } from '@/types/content'
import { departmentById } from '@/data/company'
import { Mail } from 'lucide-react'

interface ContactCtaProps {
  title?: string
  lead?: string
  /** Área pré-selecionada no formulário (?area=). */
  area?: string
  department?: DepartmentId
}

/** Chamada à ação comercial no fim das páginas. */
export function ContactCta({
  title = 'Encontre a solução certa para o seu projeto.',
  lead = 'Descreva a sua necessidade e a equipa comercial da área correspondente responderá com a informação técnica e as condições de fornecimento.',
  area,
  department = 'geral',
}: ContactCtaProps) {
  const dept = departmentById(department)
  const href = area ? `/contactos?area=${area}#formulario` : '/contactos#formulario'
  return (
    <section className="on-dark relative overflow-hidden bg-brand-700 text-brand-100" aria-labelledby="cta-heading">
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative container-site grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Contacto comercial</p>
          <h2 id="cta-heading" className="text-h2 text-white">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lead text-brand-100">{lead}</p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href} variant="light" size="lg" arrow>
              Solicitar Informações
            </ButtonLink>
          </div>
          <a
            href={`mailto:${dept.email}`}
            className="inline-flex items-center gap-2 text-[0.9375rem] text-white/85 transition-colors hover:text-white"
          >
            <Mail aria-hidden className="size-4" />
            {dept.email}
          </a>
        </div>
      </div>
    </section>
  )
}
