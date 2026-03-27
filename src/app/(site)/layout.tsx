import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'
import StickyCTA from '@/components/ui/StickyCTA'
import StickyMobileCTA from '@/components/conversion/StickyMobileCTA'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import { safeFetch, urlFor } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY, type SiteSettingsData } from '@/lib/queries/siteSettings'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await safeFetch<SiteSettingsData>(SITE_SETTINGS_QUERY)

  const headerLogoUrl = siteSettings?.header?.logo
    ? urlFor(siteSettings.header.logo).width(396).fit('max').url()
    : undefined

  const footerLogoUrl = siteSettings?.footer?.logo
    ? urlFor(siteSettings.footer.logo).width(396).fit('max').url()
    : undefined

  return (
    <>
      <OrganizationJsonLd />
      <ScrollProgress />
      <TopBar
        enabled={siteSettings?.topBar?.enabled ?? true}
        phone={siteSettings?.topBar?.phone}
        announcement={siteSettings?.topBar?.announcement}
        memberLoginLabel={siteSettings?.topBar?.memberLoginLabel}
        memberLoginUrl={siteSettings?.topBar?.memberLoginUrl}
      />
      <Header
        logoUrl={headerLogoUrl}
        logoAlt={siteSettings?.header?.logoAlt}
        navigationItems={siteSettings?.header?.navigationItems}
        primaryCtaLabel={siteSettings?.header?.primaryCtaLabel}
        primaryCtaHref={siteSettings?.header?.primaryCtaHref}
      />
      <main>{children}</main>
      <Footer
        logoUrl={footerLogoUrl}
        logoAlt={siteSettings?.footer?.logoAlt}
        description={siteSettings?.footer?.description}
        socialLinks={siteSettings?.footer?.socialLinks}
        linkGroups={siteSettings?.footer?.linkGroups}
        copyrightText={siteSettings?.footer?.copyrightText}
        bottomCtaLabel={siteSettings?.footer?.bottomCtaLabel}
        bottomCtaHref={siteSettings?.footer?.bottomCtaHref}
      />
      <BackToTop />
      <StickyCTA />
      <StickyMobileCTA />
    </>
  )
}
