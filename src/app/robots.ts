import type { MetadataRoute } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Em pré-visualizações da Vercel, impede a indexação.
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
  return {
    rules: isPreview ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  }
}
