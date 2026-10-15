import { ContactCta } from '@/components/sections/contact-cta'
import { HomeCapability } from '@/components/sections/home/capability'
import { HomeFeaturedProducts } from '@/components/sections/home/featured-products'
import { HomeHero } from '@/components/sections/home/hero'
import { HomeIntro } from '@/components/sections/home/intro'
import { HomeProjects } from '@/components/sections/home/projects'
import { HomeQuality } from '@/components/sections/home/quality'
import { HomeSectors } from '@/components/sections/home/sectors'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ path: '/' })

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeSectors />
      <HomeCapability />
      <HomeFeaturedProducts />
      <HomeProjects />
      <HomeQuality />
      <ContactCta />
    </>
  )
}
