export const siteConfig = {
  name: 'ACAIL Angola',
  locale: 'pt_AO',
  language: 'pt-AO',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.acailangola.com').replace(/\/$/, ''),
  defaultTitle: 'ACAIL Angola — Indústria, Engenharia e Soluções desde 2005',
  defaultDescription:
    'Empresa industrial angolana desde 2005: produtos siderúrgicos, gases industriais, medicinais e alimentares, saúde, pré-fabricação em betão, inertes e serviços industriais.',
} as const

/** Demonstrações e homologação: impede a indexação (SITE_NOINDEX=1). */
export const noIndex = process.env.SITE_NOINDEX === '1' || process.env.SITE_NOINDEX === 'true'

export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
