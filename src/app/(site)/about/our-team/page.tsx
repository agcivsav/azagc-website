import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import TeamCards, { type TeamSectionData } from '@/components/sections/TeamCards'
import TeamImageCardGrid, {
  type TeamImageCardSectionData,
} from '@/components/sections/TeamImageCardGrid'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the AZAGC leadership team dedicated to advancing the construction industry in Arizona.',
}

const OUR_TEAM_QUERY = `
*[_type == "ourTeamPage"][0]{
  heroHeadline,
  heroSubtitle,
  sections[]{
    _type,
    sectionTitle,
    description,
    columns,
    ctaLabel,
    ctaHref,
    members[]->{
      _id,
      name,
      title,
      companyName,
      photo
    },
    items[]{
      image,
      heading,
      subheading,
      url,
         ctaLabel,
    ctaHref
    }
  }
}
`
type OurTeamPageData = {
  heroHeadline?: string | null
  heroSubtitle?: string | null
  sections?: Array<{
    _type?: string | null
    sectionTitle?: string | null
    description?: string | null
    columns?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    members?: Array<{
      _id?: string | null
      name?: string | null
      title?: string | null
      companyName?: string | null
      photo?: unknown
    }> | null
    items?: Array<{
      image?: unknown
      heading?: string | null
      subheading?: string | null   // <-- add this
      url?: string | null
        ctaLabel?: string | null
    ctaHref?: string | null
    }> | null
  }> | null
} | null

function buildPhotoUrl(photo: unknown): string | null {
  if (!photo) return null
  try {
    return urlFor(photo).width(600).height(800).fit('crop').url()
  } catch {
    return null
  }
}

function buildImageUrl(image: unknown): string | null {
  if (!image) return null
  try {
    return urlFor(image).width(800).height(450).fit('crop').url()
  } catch {
    return null
  }
}

export default async function OurTeamPage() {
  const data = await safeFetch<OurTeamPageData>(OUR_TEAM_QUERY)

  const headline = data?.heroHeadline ?? 'Our Team'
  const subtitle = data?.heroSubtitle ?? "Meet the AZAGC leadership team dedicated to advancing Arizona's construction industry."

  type TeamSection = TeamSectionData & { _type?: string }
  type ImageCardSection = TeamImageCardSectionData & { _type?: string }
  const teamSections: TeamSection[] = []
  const imageCardSections: ImageCardSection[] = []

  for (const s of data?.sections ?? []) {
    if (!s?.sectionTitle) continue
    if (s._type === 'teamImageCardSection') {
      imageCardSections.push({
        _type: 'teamImageCardSection',
        sectionTitle: s.sectionTitle,
        description: s.description ?? null,
        columns: s.columns ?? '3',
        ctaLabel: s.ctaLabel ?? null,
        ctaHref: s.ctaHref ?? null,
        items:
          s.items?.map((item) => ({
            imageUrl: buildImageUrl(item?.image),
            heading: item?.heading ?? '',
            subheading: item?.subheading ?? null,
            url: item?.url ?? null,
               ctaLabel: item?.subheading ?? null,
            ctaHref: item?.url ?? null,
          })) ?? [],
      })
    } else {
      teamSections.push({
        sectionTitle: s.sectionTitle,
        description: s.description ?? null,
        columns: s.columns ?? '3',
        members:
          s.members?.filter((m): m is NonNullable<typeof m> => !!m && !!m._id).map((m) => ({
            _id: m._id!,
            name: m.name ?? '',
            title: m.title ?? null,
            companyName: m.companyName ?? null,
            photoUrl: buildPhotoUrl(m.photo),
          })) ?? [],
      })
    }
  }

  const hasSections = teamSections.length > 0 || imageCardSections.length > 0

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-navy transition-colors no-underline">About</a>
          <span>/</span>
          <a href="/about/our-team" className="hover:text-navy transition-colors no-underline">Our Team</a>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">About</SectionLabel>
          <SectionTitle as="h1" className="text-white">{headline}</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{subtitle}</p>
        </div>
      </section>

      <section className="bg-cream py-8">
        {hasSections ? (
          <>
            {teamSections.map((section, i) => (
              <TeamCards
                key={`team-${section.sectionTitle}-${i}`}
                section={section}
              />
            ))}
            {imageCardSections.map((section, i) => (
              <TeamImageCardGrid
                key={`cards-${section.sectionTitle}-${i}`}
                section={section}
              />
            ))}
          </>
        ) : (
          <div className="container-site max-w-4xl">
            <div className="bg-white border border-warm-gray p-10 rounded-xl">
              <p className="font-body text-slate text-sm text-center">
                Add team sections and members in{' '}
                <a href="/studio" className="text-red hover:underline">Sanity Studio</a> (Our Team Page) to display them here.
              </p>
            </div>
          </div>
        )}
      </section>

      <CTABand />
    </>
  )
}
