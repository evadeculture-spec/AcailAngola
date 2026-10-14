import type { MetadataRoute } from 'next'
import { getNews, getProducts, getSectors } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/empresa', '/areas-de-negocio', '/produtos', '/projetos', '/noticias', '/contactos']
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...getSectors().map((s) => ({
      url: absoluteUrl(`/areas-de-negocio/${s.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getProducts().map((p) => ({
      url: absoluteUrl(`/produtos/${p.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getNews().map((n) => ({
      url: absoluteUrl(`/noticias/${n.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    })),
  ]
}
