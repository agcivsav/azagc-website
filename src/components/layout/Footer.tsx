import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Logo from '../../../public/logo-svg.svg'
import type { FooterLinkGroup, SiteNavLink, SocialLink } from '@/lib/queries/siteSettings'
import { FooterContactBlock } from '@/components/layout/FooterContactBlock'
import { FooterLegalLinksRow } from '@/components/layout/FooterLegalLinks'

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
  youtube: Youtube,
} as const

type FooterProps = {
  logoUrl?: string | null
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
}

export default function Footer({
  logoUrl,
  logoAlt,
  description,
  contactOrganizationName,
  contactAddress,
  contactPhone,
  socialLinks,
  linkGroups,
  legalLinks,
  copyrightText,
  bottomCtaLabel,
  bottomCtaHref,
}: FooterProps) {
  const footerLinkGroups = linkGroups ?? []
  const footerLegalLinks = legalLinks ?? []
  const footerSocialLinks = (socialLinks ?? []).filter((item) => Boolean(item.url?.trim()))
  const descriptionTrim = description?.trim() ?? ''
  const logoAltText = logoAlt?.trim() ?? ''

  const copyrightRaw = copyrightText?.trim() ?? ''
  const copyright = copyrightRaw
    ? copyrightRaw.replace('{{year}}', String(new Date().getFullYear()))
    : ''

  const hasBottomCta = Boolean(
    bottomCtaLabel?.trim() && bottomCtaHref?.trim(),
  )
  const showBottomBar =
    Boolean(copyright) || footerLegalLinks.length > 0 || hasBottomCta

  const hasContactBlock = Boolean(
    contactOrganizationName?.trim() ||
      contactAddress?.trim() ||
      contactPhone?.trim(),
  )

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-site py-14 md:py-16">
         <Link href="/" className="font-normal text-2xl font-bold block w-fit">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAltText}
                  width={198}
                  height={48}
                  className="w-[198px] p-2 relative right-[23px] h-auto"
                />
              ) : (
                <Image
                  src={Logo}
                  alt={logoAltText}
                  className="w-[198px] p-2 relative right-[23px]"
                />
              )}
            </Link>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-x-12 lg:items-start">
          <div className="flex max-w-md flex-col gap-7 lg:max-w-none">
           
            <FooterContactBlock
              organizationName={contactOrganizationName}
              address={contactAddress}
              phone={contactPhone}
            />
            {descriptionTrim ? (
              <p
                className={
                  hasContactBlock
                    ? 'font-body text-sm leading-relaxed text-white/55 border-t border-white/[0.08] pt-7'
                    : 'font-body text-sm leading-relaxed text-white/55'
                }
              >
                {descriptionTrim}
              </p>
            ) : null}
            {footerSocialLinks.length > 0 ? (
              <div>
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-primary mb-3">
                  Follow
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {footerSocialLinks.map(({ platform, url, label }) => {
                    const Icon =
                      SOCIAL_ICONS[(platform || 'facebook') as keyof typeof SOCIAL_ICONS]
                    if (!Icon || !url) return null

                    return (
                      <a
                        key={`${platform}-${url}`}
                        href={url}
                        aria-label={label?.trim() || platform || 'Social link'}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </a>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title ?? ''} className="min-w-0">
              {group.title?.trim() ? (
                <h4 className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-4">
                  {group.title.trim()}
                </h4>
              ) : null}
              <ul className="space-y-2.5">
                {group.links?.map((link) => (
                  <li key={link.href || link.label}>
                    <Link
                      href={link.href || '#'}
                      className="font-body text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showBottomBar ? (
        <div className="border-t border-white/10">
          <div className="container-site py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
              {copyright ? (
                <p className="font-body text-xs text-white/40">{copyright}</p>
              ) : null}
              <FooterLegalLinksRow links={footerLegalLinks} />
            </div>
            {hasBottomCta ? (
              <Button
                href={bottomCtaHref!.trim()}
                variant="primary"
                size="sm"
              >
                {bottomCtaLabel!.trim()}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </footer>
  )
}
