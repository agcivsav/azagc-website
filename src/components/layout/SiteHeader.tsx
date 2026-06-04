import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import ScrollProgress from '@/components/layout/ScrollProgress'
import type { HeaderNavigationItem } from '@/lib/queries/siteSettings'

type SiteHeaderProps = {
  topBarEnabled?: boolean
  phone?: string | null
  announcement?: string | null
  memberLoginLabel?: string | null
  memberLoginUrl?: string | null
  logoUrl?: string | null
  logoAlt?: string | null
  navigationItems?: HeaderNavigationItem[] | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
}

export function SiteHeader({
  topBarEnabled,
  phone,
  announcement,
  memberLoginLabel,
  memberLoginUrl,
  logoUrl,
  logoAlt,
  navigationItems,
  primaryCtaLabel,
  primaryCtaHref,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      <ScrollProgress />
      <TopBar
        enabled={topBarEnabled}
        phone={phone}
        announcement={announcement}
        memberLoginLabel={memberLoginLabel}
        memberLoginUrl={memberLoginUrl}
      />
      <Header
        logoUrl={logoUrl}
        logoAlt={logoAlt}
        navigationItems={navigationItems}
        primaryCtaLabel={primaryCtaLabel}
        primaryCtaHref={primaryCtaHref}
      />
    </header>
  )
}
