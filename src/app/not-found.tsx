import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
      <div className="relative container-site flex min-h-[70vh] flex-col justify-center py-24">
        <p className="font-mono text-sm tracking-[0.2em] text-brand-300">ERRO 404</p>
        <h1 className="mt-6 max-w-2xl text-h1 text-white">A página que procura não foi encontrada.</h1>
        <p className="mt-6 max-w-xl text-lead">
          O endereço pode ter sido alterado ou a página pode já não existir. Utilize a navegação ou volte à página inicial.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Página inicial
          </ButtonLink>
          <ButtonLink href="/produtos" size="lg" variant="outline-light">
            Produtos e Soluções
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
