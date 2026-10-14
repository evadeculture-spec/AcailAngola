import type { NavItem } from '@/types/content'
import { sectors } from './sectors'

export const sectorNav: NavItem[] = sectors.map((s) => ({
  label: s.name,
  href: `/areas-de-negocio/${s.slug}`,
  description: s.tagline,
}))

export const mainNav: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'A Empresa', href: '/empresa' },
  { label: 'Áreas de Negócio', href: '/areas-de-negocio', children: sectorNav },
  { label: 'Produtos e Soluções', href: '/produtos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contactos', href: '/contactos' },
]

export const legalNav: NavItem[] = [
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
  { label: 'Política de Cookies', href: '/politica-de-cookies' },
]
