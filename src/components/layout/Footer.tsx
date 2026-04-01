import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Logo from '../../../public/logo-svg.svg'
import type { FooterLinkGroup, SocialLink } from '@/lib/queries/siteSettings'

const DEFAULT_FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: 'Membership',
    links: [
    { label: 'Contractor Membership', href: '/membership/contractor' },
    { label: 'Affiliate Membership', href: '/membership/affiliate' },
    // { label: 'Member Benefits', href: '/membership/benefits' },
    { label: 'Join Now', href: '/join' },
    { label: 'Member Directory', href: '/membership/member-directory' },
  ],
  },
  {
    title: 'Organization',
    links: [
    { label: 'About AZAGC', href: '/about' },
        { label: 'Membership', href: '/membership' },

    { label: 'Industry Resources', href: '/industry-resources' },
    { label: 'Advocacy', href: '/advocacy' },
    { label: 'Education', href: '/education-training' },

  ],
  },
  {
    title: 'Resources',
    links: [
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news-media' },

    { label: 'Contact Us', href: '/contact' },
    // { label: 'Privacy Policy', href: '/privacy' },
  ],
  },
]

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/AZAGC/' },
  { platform: 'x', label: 'X', url: 'https://x.com/azagc' },
  { platform: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/azagc1934' },
]

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
  socialLinks?: SocialLink[] | null
  linkGroups?: FooterLinkGroup[] | null
  copyrightText?: string | null
  bottomCtaLabel?: string | null
  bottomCtaHref?: string | null
}

export default function Footer({
  logoUrl,
  logoAlt,
  description = 'The Arizona Chapter of the Associated General Contractors of America. Building Arizona safer, better, together since 1934.',
  socialLinks,
  linkGroups,
  copyrightText,
  bottomCtaLabel = 'Become a Member',
  bottomCtaHref = '/join',
}: FooterProps) {
  const footerLinkGroups = linkGroups?.length ? linkGroups : DEFAULT_FOOTER_LINKS
  const footerSocialLinks = (socialLinks?.length ? socialLinks : DEFAULT_SOCIAL_LINKS).filter(
    (item) => item.url
  )
  const copyright =
    copyrightText?.replace('{{year}}', String(new Date().getFullYear())) ||
    `© ${new Date().getFullYear()} Arizona Chapter AGC. All rights reserved.`

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="font-normal text-2xl font-bold mb-4 block">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt || 'AZAGC'}
                  width={198}
                  height={48}
                  className="w-[198px] p-2 relative right-[23px] h-auto"
                />
              ) : (
                <Image src={Logo} alt={logoAlt || 'AZAGC'} className="w-[198px] p-2 relative right-[23px]" />
              )}
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex items-center gap-3">
              {footerSocialLinks.map(({ platform, url, label }) => {
                const Icon = SOCIAL_ICONS[(platform || 'facebook') as keyof typeof SOCIAL_ICONS]
                if (!Icon || !url) return null

                return (
                  <a
                    key={`${platform}-${url}`}
                    href={url}
                    aria-label={label || platform || 'Social link'}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links?.map((link) => (
                  <li key={link.href || link.label}>
                    <Link
                      href={link.href || '#'}
                      className="font-body text-sm text-white/60 hover:text-white transition-colors"
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

      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            {copyright}
          </p>
          <Button href={bottomCtaHref || '/join'} variant="primary" size="sm">
            {bottomCtaLabel || 'Become a Member'}
          </Button>
        </div>
      </div>
    </footer>
  )
}
