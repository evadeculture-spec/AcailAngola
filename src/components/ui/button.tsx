import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-3 font-semibold tracking-[-0.005em] rounded-[2px] transition-colors duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-ink-950 text-white hover:bg-ink-800',
  ghost: 'text-ink-900 border border-ink-300 hover:border-ink-900 bg-transparent',
  light: 'bg-white text-ink-950 hover:bg-brand-50',
  'outline-light': 'border border-white/35 text-white hover:border-white hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
      strokeWidth={2}
    />
  )
}

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  children: ReactNode
}

export function ButtonLink({ variant, size, arrow = false, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  size?: Size
  arrow?: boolean
}

export function Button({ variant, size, arrow = false, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

/** Ligação textual com seta, para "ver mais" em cartões e secções. */
export function ArrowLink({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, 'className'> & { className?: string; children: ReactNode }) {
  return (
    <Link
      className={cn('group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-600', className)}
      {...props}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
