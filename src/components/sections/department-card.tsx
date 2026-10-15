import { Mail } from 'lucide-react'
import type { DepartmentId } from '@/types/content'
import { departmentById } from '@/data/company'

/** Cartão de contacto comercial contextualizado. */
export function DepartmentCard({ ids, title = 'Contacto comercial' }: { ids: DepartmentId[]; title?: string }) {
  const depts = ids.map(departmentById)
  return (
    <aside className="border border-ink-200 bg-white p-7" aria-label={title}>
      <p className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">{title}</p>
      <ul className="mt-5 divide-y divide-ink-100">
        {depts.map((d) => (
          <li key={d.id} className="py-4 first:pt-0 last:pb-0">
            <p className="font-semibold text-ink-950">Departamento {d.name}</p>
            <p className="mt-1 text-sm text-ink-600">{d.description}</p>
            <a
              href={`mailto:${d.email}`}
              className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] font-medium break-all text-brand-600 hover:text-brand-800"
            >
              <Mail aria-hidden className="size-4 shrink-0" />
              {d.email}
            </a>
            {d.phone && <p className="mt-1 text-sm text-ink-700">{d.phone}</p>}
          </li>
        ))}
      </ul>
    </aside>
  )
}
