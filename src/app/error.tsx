'use client'

import { useEffect } from 'react'
import { Button, ButtonLink } from '@/components/ui/button'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-white">
      <div className="container-site flex min-h-[60vh] flex-col justify-center py-24">
        <p className="font-mono text-sm tracking-[0.2em] text-brand-600">ERRO</p>
        <h1 className="mt-6 max-w-2xl text-h1">Ocorreu um erro inesperado.</h1>
        <p className="mt-6 max-w-xl text-lead text-ink-600">Tente novamente. Se o problema persistir, contacte-nos por e-mail.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Tentar novamente
          </Button>
          <ButtonLink href="/" size="lg" variant="ghost">
            Página inicial
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
