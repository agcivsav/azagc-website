import type { SanityImageField } from '@/lib/sanity'

/** Prefer draft when present (token / preview), else published singleton, else any siteSettings doc. */
export const SITE_SETTINGS_QUERY = `
coalesce(
  *[_type == "siteSettings" && _id == "drafts.siteSettings"][0],
  *[_type == "siteSettings" && _id == "siteSettings"][0],
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]
){
  topBar{
    enabled,
    phone,
    announcement,
    memberLoginLabel,
    memberLoginUrl
  },
  header{
    logo{
      crop,
      hotspot,
      asset->{
        _id,
        url
      }
    },
    logoAlt,
    navigationItems[]{
      label,
      href,
      children[]{
        label,
        href
      }
    },
    primaryCtaLabel,
    primaryCtaHref
  },
  footer{
    logo{
      crop,
      hotspot,
      asset->{
        _id,
        url
      }
    },
    logoAlt,
    description,
    contactOrganizationName,
    contactAddress,
    contactPhone,
    socialLinks[]{
      platform,
      label,
      url
    },
    linkGroups[]{
      title,
      links[]{
        label,
        href
      }
    },
    legalLinks[]{
      label,
      href
    },
    copyrightText,
    bottomCtaLabel,
    bottomCtaHref
  }
}
`

export type SiteNavLink = {
  label?: string | null
  href?: string | null
}

export type HeaderNavigationItem = SiteNavLink & {
  children?: SiteNavLink[] | null
}

export type SocialLink = {
  platform?: string | null
  label?: string | null
  url?: string | null
}

export type FooterLinkGroup = {
  title?: string | null
  links?: SiteNavLink[] | null
}

export type SiteSettingsData = {
  topBar?: {
    enabled?: boolean | null
    phone?: string | null
    announcement?: string | null
    memberLoginLabel?: string | null
    memberLoginUrl?: string | null
  } | null
  header?: {
    logo?: SanityImageField
    logoAlt?: string | null
    navigationItems?: HeaderNavigationItem[] | null
    primaryCtaLabel?: string | null
    primaryCtaHref?: string | null
  } | null
  footer?: {
    logo?: SanityImageField
    logoAlt?: string | null
    description?: string | null
    contactOrganizationName?: string | null
    contactAddress?: string | null
    contactPhone?: string | null
    socialLinks?: SocialLink[] | null
    linkGroups?: FooterLinkGroup[] | null
    legalLinks?: SiteNavLink[] | null
    copyrightText?: string | null
    bottomCtaLabel?: string | null
    bottomCtaHref?: string | null
  } | null
} | null

/** Keep Sanity-driven nav when at least one valid item exists; strip invalid rows and child links. */
export function normalizeHeaderNavigationItems(
  items: HeaderNavigationItem[] | null | undefined
): HeaderNavigationItem[] | undefined {
  if (!items?.length) return undefined
  const out = items
    .filter((i) => Boolean(i.label?.trim()) && Boolean(i.href?.trim()))
    .map((i) => {
      const children = i.children?.filter(
        (c) => Boolean(c.label?.trim()) && Boolean(c.href?.trim())
      )
      return {
        label: i.label,
        href: i.href,
        ...(children?.length ? { children } : {}),
      }
    })
  return out.length ? out : undefined
}

export function normalizeLegalFooterLinks(
  links: SiteNavLink[] | null | undefined
): SiteNavLink[] | undefined {
  if (!links?.length) return undefined
  const out = links.filter((l) => Boolean(l.label?.trim()) && Boolean(l.href?.trim()))
  return out.length ? out : undefined
}

export function normalizeFooterLinkGroups(
  groups: FooterLinkGroup[] | null | undefined
): FooterLinkGroup[] | undefined {
  if (!groups?.length) return undefined
  const out = groups
    .map((g) => ({
      title: g.title,
      links: g.links?.filter((l) => Boolean(l.label?.trim()) && Boolean(l.href?.trim())) ?? [],
    }))
    .filter((g) => Boolean(g.title?.trim()) && g.links.length > 0)
  return out.length ? out : undefined
}

export function normalizeSocialLinks(links: SocialLink[] | null | undefined): SocialLink[] | undefined {
  if (!links?.length) return undefined
  const out = links.filter((l) => Boolean(l.platform?.trim()) && Boolean(l.url?.trim()))
  return out.length ? out : undefined
}
