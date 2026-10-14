import { cn } from '@/lib/cn'

/**
 * Assinatura tipográfica provisória.
 * Deve ser substituída pelo logótipo oficial em SVG assim que o ficheiro
 * vetorial e a autorização de utilização forem fornecidos (docs/client-handover.md).
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const main = tone === 'dark' ? 'text-ink-950' : 'text-white'
  const sub = tone === 'dark' ? 'text-brand-600' : 'text-brand-200'
  return (
    <span className={cn('inline-flex items-center gap-3 select-none', className)}>
      <span aria-hidden className="block h-9 w-1 bg-brand-600" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[1.375rem] font-extrabold tracking-[0.04em]', main)}>ACAIL</span>
        <span className={cn('mt-1 text-[0.625rem] font-semibold tracking-[0.42em] uppercase', sub)}>Angola</span>
      </span>
    </span>
  )
}
