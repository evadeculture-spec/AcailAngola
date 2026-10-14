import { Download, FileText } from 'lucide-react'
import type { Datasheet } from '@/types/content'
import { ButtonLink } from '@/components/ui/button'

interface DocumentsListProps {
  documents: Datasheet[]
  requestHref: string
}

/**
 * Lista de fichas técnicas. Sem documentos validados, explica como os obter
 * em vez de apresentar ligações vazias.
 */
export function DocumentsList({ documents, requestHref }: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col gap-6 border border-dashed border-ink-300 bg-ink-50 p-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <FileText aria-hidden className="mt-0.5 size-6 shrink-0 text-ink-500" strokeWidth={1.5} />
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-700">
            As fichas técnicas e a documentação de produto são disponibilizadas pelo departamento comercial, de acordo com
            a referência e a aplicação pretendidas.
          </p>
        </div>
        <ButtonLink href={requestHref} variant="ghost" className="shrink-0">
          Pedir documentação
        </ButtonLink>
      </div>
    )
  }
  return (
    <ul className="divide-y divide-ink-200 border-y border-ink-200">
      {documents.map((d) => (
        <li key={d.href}>
          <a href={d.href} download className="group flex items-center justify-between gap-4 py-5">
            <span className="flex items-center gap-4">
              <FileText aria-hidden className="size-5 text-brand-600" strokeWidth={1.5} />
              <span className="font-medium text-ink-900 group-hover:text-brand-700">{d.title}</span>
            </span>
            <span className="flex items-center gap-2 text-sm text-ink-500">
              PDF{d.sizeLabel ? ` · ${d.sizeLabel}` : ''}
              <Download aria-hidden className="size-4 text-brand-600" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
