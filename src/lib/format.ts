import type { NewsItem } from '@/types/content'

const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

/** Formata respeitando a precisão conhecida da data (nunca inventa o dia). */
export function formatNewsDate(item: Pick<NewsItem, 'date' | 'datePrecision'>): string {
  const [y, m, d] = item.date.split('-')
  const month = m ? MONTHS[Number(m) - 1] : undefined
  if (item.datePrecision === 'year' || !month) return y ?? item.date
  if (item.datePrecision === 'month' || !d) return `${month} de ${y}`
  return `${Number(d)} de ${month} de ${y}`
}

export function newsYear(item: Pick<NewsItem, 'date'>): string {
  return item.date.slice(0, 4)
}
