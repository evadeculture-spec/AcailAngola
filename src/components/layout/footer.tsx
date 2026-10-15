import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { company, departments, locations } from '@/data/company'
import { legalNav, mainNav } from '@/data/navigation'
import { sectors } from '@/data/sectors'
import { Logo } from '@/components/ui/logo'

export function Footer() {
  const year = new Date().getFullYear()
  const general = departments.find((d) => d.id === 'geral')

  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-ink-400" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0 opacity-60" />
      <div className="relative container-site">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">
              Empresa industrial angolana constituída em {company.foundingYear}, com atividade em seis áreas: siderurgia,
              gases, saúde, pré-fabricação em betão, inertes e serviços industriais.
            </p>
            {general && (
              <a
                href={`mailto:${general.email}`}
                className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-white hover:text-brand-200"
              >
                <Mail aria-hidden className="size-4" />
                {general.email}
              </a>
            )}
          </div>

          <nav aria-label="Mapa do website" className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-white uppercase">Navegação</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Áreas de negócio" className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-white uppercase">Áreas de Negócio</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/areas-de-negocio/${s.slug}`} className="transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-white uppercase">Localizações</p>
            <ul className="mt-5 space-y-5 text-[0.9375rem]">
              {locations.map((l) => (
                <li key={l.id} className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>
                    <span className="block font-medium text-white">{l.name}</span>
                    <span className="block text-sm">{l.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
