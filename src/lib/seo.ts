import type { Metadata } from 'next'
import { company, departments, locations } from '@/data/company'
import { absoluteUrl, siteConfig } from './site'

interface PageMetaInput {
  title?: string
  description?: string
  path: string
  type?: 'website' | 'article'
}

/** Metadados por página: título, descrição, canonical, Open Graph e X Cards. */
export function pageMetadata({ title, description, path, type = 'website' }: PageMetaInput): Metadata {
  const desc = description ?? siteConfig.defaultDescription
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
  return {
    title: title ?? { absolute: siteConfig.defaultTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: desc },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: company.name,
    url: siteConfig.url,
    logo: absoluteUrl('/icon.svg'),
    foundingDate: String(company.foundingYear),
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.headquarters.street,
      addressLocality: company.headquarters.locality,
      addressRegion: company.headquarters.region,
      addressCountry: company.headquarters.country,
    },
    location: locations.map((l) => ({
      '@type': 'Place',
      name: l.name,
      address: { '@type': 'PostalAddress', streetAddress: l.address, addressCountry: 'AO' },
    })),
    contactPoint: departments.map((d) => ({
      '@type': 'ContactPoint',
      contactType: d.name,
      email: d.email,
      areaServed: 'AO',
      availableLanguage: ['Portuguese'],
      ...(d.phone ? { telephone: d.phone } : {}),
    })),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { '@id': absoluteUrl('/#organization') },
  }
}

export interface Crumb {
  label: string
  href: string
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  }
}
