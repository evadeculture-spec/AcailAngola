import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getNews, getNewsItem } from '@/lib/content'
import { formatNewsDate } from '@/lib/format'
import { pageMetadata } from '@/lib/seo'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'

export const dynamicParams = false

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: PageProps<'/noticias/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) return {}
  return pageMetadata({ title: item.seoTitle ?? item.title, description: item.excerpt, path: `/noticias/${slug}`, type: 'article' })
}

export default async function NewsArticlePage({ params }: PageProps<'/noticias/[slug]'>) {
  const { slug } = await params
  const item = getNewsItem(slug)
  if (!item) notFound()

  return (
    <article>
      <header className="on-dark relative overflow-hidden bg-ink-950 text-ink-300">
        <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
        <div className="relative container-site pt-10 pb-16 lg:pt-12 lg:pb-20">
          <Breadcrumbs
            items={[
              { label: 'Notícias', href: '/noticias' },
              { label: item.title, href: `/noticias/${item.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl lg:mt-16">
            <p className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-brand-200">{item.category}</span>
              <span aria-hidden className="h-3 w-px bg-white/30" />
              <time dateTime={item.date}>{formatNewsDate(item)}</time>
            </p>
            <h1 className="mt-6 text-h1 text-white">{item.title}</h1>
          </div>
        </div>
      </header>

      <div className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <div className="prose-corp mx-auto max-w-3xl">
            <p className="text-lead text-ink-900">{item.excerpt}</p>
            {item.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {item.source && (
            <div className="mx-auto mt-12 max-w-3xl border-t border-ink-200 pt-6">
              <p className="text-sm text-ink-500">Fonte</p>
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-800"
              >
                {item.source.name}
                <ExternalLink aria-hidden className="size-4" />
                <span className="sr-only">(abre numa nova janela)</span>
              </a>
            </div>
          )}
          <div className="mx-auto mt-16 max-w-3xl">
            <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-brand-700">
              <ArrowLeft aria-hidden className="size-4" />
              Voltar ao arquivo de notícias
            </Link>
          </div>
        </div>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.excerpt,
          datePublished: item.date,
          inLanguage: siteConfig.language,
          mainEntityOfPage: absoluteUrl(`/noticias/${item.slug}`),
          publisher: { '@id': absoluteUrl('/#organization') },
          ...(item.source ? { isBasedOn: item.source.url } : {}),
        }}
      />
    </article>
  )
}
