import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getNews } from '@/lib/content'
import { formatNewsDate, newsYear } from '@/lib/format'
import { pageMetadata } from '@/lib/seo'
import { PageHero } from '@/components/sections/page-hero'
import type { NewsItem } from '@/types/content'

export const metadata = pageMetadata({
  title: 'Notícias',
  description: 'Arquivo de notícias e referências na imprensa sobre a ACAIL Angola.',
  path: '/noticias',
})

export default function NewsPage() {
  const items = getNews()
  const byYear = items.reduce<Record<string, NewsItem[]>>((acc, item) => {
    const y = newsYear(item)
    ;(acc[y] ??= []).push(item)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a))
  const categories = Array.from(new Set(items.map((i) => i.category)))

  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="Arquivo de notícias"
        lead="Notícias institucionais, participação em feiras e eventos e referências à ACAIL Angola na imprensa, organizadas por ano de publicação."
        crumbs={[{ label: 'Notícias', href: '/noticias' }]}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">Arquivo</h2>
              <ul className="mt-5 space-y-2">
                {years.map((y) => (
                  <li key={y}>
                    <a href={`#ano-${y}`} className="flex justify-between text-[0.9375rem] text-ink-800 hover:text-brand-700">
                      {y}
                      <span className="text-ink-400">{byYear[y]?.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <h2 className="mt-10 text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">Categorias</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c} className="bg-ink-50 px-3 py-1.5 text-sm text-ink-700">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {years.map((y) => (
              <section key={y} id={`ano-${y}`} aria-labelledby={`ano-${y}-title`} className="mb-16 last:mb-0">
                <h2 id={`ano-${y}-title`} className="border-b border-ink-950 pb-4 font-display text-4xl font-extrabold text-ink-950">
                  {y}
                </h2>
                <ul className="divide-y divide-ink-200">
                  {byYear[y]?.map((item) => (
                    <li key={item.slug}>
                      <article className="group relative grid gap-3 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8">
                        <div className="text-sm text-ink-500">
                          <time dateTime={item.date}>{formatNewsDate(item)}</time>
                          <p className="mt-1 font-semibold text-brand-600">{item.category}</p>
                        </div>
                        <div>
                          <h3 className="font-display text-xl leading-snug font-bold text-ink-950 group-hover:text-brand-700 sm:text-2xl">
                            <Link href={`/noticias/${item.slug}`} className="after:absolute after:inset-0">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{item.excerpt}</p>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                            Ler notícia
                            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <p className="mt-16 border-t border-ink-200 pt-8 text-sm leading-relaxed text-ink-500">
              O arquivo histórico de notícias da ACAIL Angola — incluindo distinções em feiras e a participação em eventos
              industriais — está a ser recuperado e revisto, e será publicado com as datas originais de cada notícia.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
