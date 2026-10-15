import type { MetadataRoute } from 'next'
import { absoluteUrl, noIndex, siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Em pré-visualizações da Vercel ou com SITE_NOINDEX, impede a indexação.
  const isPreview = noIndex || (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')
  return {
    rules: isPreview ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  }
}
