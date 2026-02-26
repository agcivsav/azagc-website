import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'
import StickyCTA from '@/components/ui/StickyCTA'
import StickyMobileCTA from '@/components/conversion/StickyMobileCTA'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <ScrollProgress />
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <StickyCTA />
      <StickyMobileCTA />
    </>
  )
}
