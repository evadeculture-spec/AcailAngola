import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { PageHero } from './page-hero'

interface LegalPageProps {
  title: string
  path: string
  children: ReactNode
}

/** Estrutura das páginas legais, com aviso explícito de documento em validação. */
export function LegalPage({ title, path, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Informação legal" title={title} crumbs={[{ label: title, href: path }]} />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <div role="note" className="mb-12 flex gap-3 border-l-2 border-amber-600 bg-amber-50 p-5 text-[0.9375rem] text-ink-900">
              <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-700" />
              <p>
                <strong>Documento em preparação.</strong> Este texto descreve o funcionamento técnico do website e está
                sujeito a revisão e validação jurídica pela ACAIL Angola antes da publicação definitiva.
              </p>
            </div>
            <div className="prose-corp">{children}</div>
          </div>
        </div>
      </section>
    </>
  )
}
