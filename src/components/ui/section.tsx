import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'white' | 'muted' | 'dark' | 'brand'

const tones: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-ink-50',
  dark: 'on-dark bg-ink-950 text-ink-300 [&_h2]:text-white [&_h3]:text-white',
  brand: 'on-dark bg-brand-800 text-brand-100 [&_h2]:text-white [&_h3]:text-white',
}

interface SectionProps {
  id?: string
  tone?: Tone
  className?: string
  containerClassName?: string
  children: ReactNode
  labelledBy?: string
}

export function Section({ id, tone = 'white', className, containerClassName, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative py-20 sm:py-24 lg:py-32', tones[tone], className)}
    >
      <div className={cn('container-site', containerClassName)}>{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'split'
  action?: ReactNode
  className?: string
}

/** Cabeçalho de secção: sobretítulo, título H2 e texto de abertura. */
export function SectionHeading({ id, eyebrow, title, lead, align = 'left', action, className }: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
        <div className="lg:col-span-6">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h2 id={id} className="text-h2">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {lead && <p className="text-lead text-ink-600 [.on-dark_&]:text-ink-300">{lead}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      </div>
    )
  }
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      {lead && <p className="mt-6 text-lead text-ink-600 [.on-dark_&]:text-ink-300">{lead}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}
