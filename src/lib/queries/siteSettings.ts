export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings" && _id in ["siteSettings", "drafts.siteSettings"]]
| order(_id == "drafts.siteSettings" desc)[0]{
  siteName,
  topBar{
    enabled,
    phone,
    announcement,
    memberLoginLabel,
    memberLoginUrl
  },
  header{
    logo,
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
    logo,
    logoAlt,
    description,
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
  siteName?: string | null
  topBar?: {
    enabled?: boolean | null
    phone?: string | null
    announcement?: string | null
    memberLoginLabel?: string | null
    memberLoginUrl?: string | null
  } | null
  header?: {
    logo?: unknown
    logoAlt?: string | null
    navigationItems?: HeaderNavigationItem[] | null
    primaryCtaLabel?: string | null
    primaryCtaHref?: string | null
  } | null
  footer?: {
    logo?: unknown
    logoAlt?: string | null
    description?: string | null
    socialLinks?: SocialLink[] | null
    linkGroups?: FooterLinkGroup[] | null
    copyrightText?: string | null
    bottomCtaLabel?: string | null
    bottomCtaHref?: string | null
  } | null
} | null
