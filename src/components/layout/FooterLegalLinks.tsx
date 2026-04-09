import Link from 'next/link'
import type { SiteNavLink } from '@/lib/queries/siteSettings'

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href.trim())
}

export function FooterLegalLink({ href, label }: { href: string; label: string }) {
  const className =
    'font-body text-sm text-white/60 transition-colors hover:text-white underline-offset-2 hover:underline'
  const trimmed = href.trim()
  if (isExternalHref(trimmed)) {
    return (
      <a href={trimmed} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return (
    <Link href={path} className={className}>
      {label}
    </Link>
  )
}

type FooterLegalLinksRowProps = {
  links: SiteNavLink[]
}

export function FooterLegalLinksRow({ links }: FooterLegalLinksRowProps) {
  const valid = links.filter(
    (l) => Boolean(l.href?.trim()) && Boolean(l.label?.trim()),
  )
  if (!valid.length) return null

  return (
    <nav aria-label="Legal and policies" className="min-h-[44px] flex items-center">
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {valid.map((link, idx) => {
          const href = link.href!.trim()
          const label = link.label!.trim()
          return (
            <li key={`${href}-${label}`} className="flex items-center">
              {idx > 0 ? (
                <span className="mx-2 text-white/25 select-none" aria-hidden>
                  |
                </span>
              ) : null}
              <FooterLegalLink href={href} label={label} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
