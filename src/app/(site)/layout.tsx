import { ElfsightAccessibility } from '@/components/accessibility/ElfsightAccessibility'
import { ElfsightWebsiteTranslator } from '@/components/accessibility/ElfsightWebsiteTranslator'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'
import StickyCTA from '@/components/ui/StickyCTA'
import StickyMobileCTA from '@/components/conversion/StickyMobileCTA'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import { safeFetch, sanityImageUrl } from '@/lib/sanity'
import {
  SITE_SETTINGS_QUERY,
  normalizeFooterLinkGroups,
  normalizeHeaderNavigationItems,
  normalizeLegalFooterLinks,
  normalizeSocialLinks,
  type SiteSettingsData,
} from '@/lib/queries/siteSettings'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await safeFetch<SiteSettingsData>(SITE_SETTINGS_QUERY)

  const headerLogoUrl = sanityImageUrl(siteSettings?.header?.logo, 396)
  const footerLogoUrl = sanityImageUrl(siteSettings?.footer?.logo, 396)

  const navigationItems = normalizeHeaderNavigationItems(siteSettings?.header?.navigationItems)
  const linkGroups = normalizeFooterLinkGroups(siteSettings?.footer?.linkGroups)
  const legalLinks = normalizeLegalFooterLinks(siteSettings?.footer?.legalLinks)
  const socialLinks = normalizeSocialLinks(siteSettings?.footer?.socialLinks)

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
        navigationItems={navigationItems}
        primaryCtaLabel={siteSettings?.header?.primaryCtaLabel}
        primaryCtaHref={siteSettings?.header?.primaryCtaHref}
      />
      <main>{children}</main>
      <Footer
        logoUrl={footerLogoUrl}
        logoAlt={siteSettings?.footer?.logoAlt}
        description={siteSettings?.footer?.description}
        contactOrganizationName={siteSettings?.footer?.contactOrganizationName}
        contactAddress={siteSettings?.footer?.contactAddress}
        contactPhone={siteSettings?.footer?.contactPhone}
        socialLinks={socialLinks}
        linkGroups={linkGroups}
        legalLinks={legalLinks}
        copyrightText={siteSettings?.footer?.copyrightText}
        copyrightLinkLabel={siteSettings?.footer?.copyrightLinkLabel}
        copyrightLinkUrl={siteSettings?.footer?.copyrightLinkUrl}
        bottomCtaLabel={siteSettings?.footer?.bottomCtaLabel}
        bottomCtaHref={siteSettings?.footer?.bottomCtaHref}
      />
      <BackToTop />
      <StickyCTA />
      <StickyMobileCTA />
      <ElfsightAccessibility />
      <ElfsightWebsiteTranslator />
    </>
  )
}
