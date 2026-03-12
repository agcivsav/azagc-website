import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import AdvocacyHero from '@/components/sections/AdvocacyHero'
import VoterToolsContent, { type VoterToolLink } from '@/components/sections/VoterToolsContent'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Voter Tools',
  description:
    'Are you ballot ready? Register to vote, find early voting details, and access Arizona voter tools and AGC Construction Votes.',
}

const PAGE_QUERY = `
*[_type == "voterToolsPage"][0]{
  heroTitle,
  heroBackgroundImage,
  mainHeading,
  introParagraph,
  subheading,
  descriptionParagraph,
  bulletItems,
  concludingParagraph,
  ctaLabel,
  ctaUrl,
  sidebarTitle,
  sidebarLinks[]{
    label,
    url
  }
}
`

type VoterToolsPageData = {
  heroTitle?: string | null
  heroBackgroundImage?: unknown
  mainHeading?: string | null
  introParagraph?: string | null
  subheading?: string | null
  descriptionParagraph?: string | null
  bulletItems?: string[] | null
  concludingParagraph?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  sidebarTitle?: string | null
  sidebarLinks?: Array<{ label?: string | null; url?: string | null }> | null
} | null

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(1600).height(900).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

const DEFAULT_SIDEBAR_LINKS: VoterToolLink[] = [
  { label: '', url: '' },

]

export default async function VoterToolsPage() {
  const data = await safeFetch<VoterToolsPageData>(PAGE_QUERY)

  const heroTitle = data?.heroTitle ?? ''
  const heroImageUrl = buildImageUrl(data?.heroBackgroundImage)
  const mainHeading = data?.mainHeading ?? ''
  const sidebarTitle = data?.sidebarTitle ?? ''
  const ctaLabel = data?.ctaLabel ?? ''
  const sidebarLinks: VoterToolLink[] =
    data?.sidebarLinks?.filter((l): l is { label: string; url: string } => !!l?.label && !!l?.url).map((l) => ({
      label: l.label!,
      url: l.url!,
    })) ?? DEFAULT_SIDEBAR_LINKS

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/advocacy" className="hover:text-navy transition-colors no-underline">Advocacy</a>
          <span>/</span>
          <a href="/advocacy/voter-tools" className="hover:text-navy transition-colors no-underline">
            Voter Tools
          </a>
        </div>
      </div>

      <AdvocacyHero title={heroTitle} backgroundImageUrl={heroImageUrl} />

      <VoterToolsContent
        mainHeading={mainHeading}
        introParagraph={data?.introParagraph ?? null}
        subheading={data?.subheading ?? null}
        descriptionParagraph={data?.descriptionParagraph ?? null}
        bulletItems={data?.bulletItems ?? []}
        concludingParagraph={data?.concludingParagraph ?? null}
        ctaLabel={ctaLabel}
        ctaUrl={data?.ctaUrl ?? null}
        sidebarTitle={sidebarTitle}
        sidebarLinks={sidebarLinks}
      />

      <CTABandFromSanity />
    </>
  )
}
