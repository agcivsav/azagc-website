import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import AdvocacyHero from '@/components/sections/AdvocacyHero'
import TakeActionSection, { type TakeActionTab } from '@/components/sections/TakeActionSection'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Take Action',
  description:
    'Make your voice heard on legislative and regulatory matters affecting the construction industry. State and local campaigns, surveys, events, and federal issues.',
}

const PAGE_QUERY = `
*[_type == "takeActionPage"][0]{
  heroTitle,
  heroBackgroundImage,
  contentHeading,
  contentIntro,
  tabs[]{
    label,
    value,
    content
  }
}
`

type TakeActionPageData = {
  heroTitle?: string | null
  heroBackgroundImage?: unknown
  contentHeading?: string | null
  contentIntro?: string | null
  tabs?: Array<{ label?: string | null; value?: string | null; content?: string | null }> | null
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

export default async function TakeActionPage() {
  const data = await safeFetch<TakeActionPageData>(PAGE_QUERY)

  const heroTitle = data?.heroTitle ?? 'Take Action'
  const heroImageUrl = buildImageUrl(data?.heroBackgroundImage)
  const contentHeading = data?.contentHeading ?? 'Make Your Voice Heard'
  const contentIntro =
    data?.contentIntro ??
    "Our members are the association's greatest advocates. At times throughout the year, it is necessary to call upon the membership to make its voice heard loudly and clearly on legislative and regulatory matters affecting the construction industry."
  const tabs: TakeActionTab[] =
    data?.tabs?.filter((t): t is NonNullable<typeof t> => !!t?.label).map((t) => ({
      label: t.label!,
      value: t.value ?? t.label?.toLowerCase().replace(/\s+/g, '-') ?? 'tab',
      content: t.content ?? null,
    })) ?? [
      { label: 'State and Local - Campaigns', value: 'campaigns' },
      { label: 'State and Local - Surveys', value: 'surveys' },
      { label: 'State and Local - Events', value: 'events' },
      { label: 'Federal Issues', value: 'federal' },
    ]

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/advocacy" className="hover:text-navy transition-colors no-underline">Advocacy</a>
          <span>/</span>
          <a href="/advocacy/take-action" className="hover:text-navy transition-colors no-underline">
            Take Action
          </a>
        </div>
      </div>

      <AdvocacyHero title={heroTitle} backgroundImageUrl={heroImageUrl} />

      <TakeActionSection
        heading={contentHeading}
        intro={contentIntro}
        tabs={tabs}
      />

      <CTABandFromSanity />
    </>
  )
}
