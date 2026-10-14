import { Boxes, Factory, Flame, HeartPulse, Mountain, Wrench, type LucideIcon } from 'lucide-react'
import type { SectorSlug } from '@/types/content'

export const sectorIcons: Record<SectorSlug, LucideIcon> = {
  'produtos-siderurgicos': Factory,
  gases: Flame,
  saude: HeartPulse,
  'pre-fabricacao-betao': Boxes,
  inertes: Mountain,
  servicos: Wrench,
}

export function SectorIcon({ slug, className }: { slug: SectorSlug; className?: string }) {
  const Icon = sectorIcons[slug]
  return <Icon aria-hidden className={className} strokeWidth={1.5} />
}
