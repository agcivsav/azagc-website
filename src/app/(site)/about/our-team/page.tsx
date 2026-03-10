import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import TeamCards, { type TeamSectionData } from '@/components/sections/TeamCards'
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
    sectionTitle,
    description,
    columns,
    members[]->{
      _id,
      name,
      title,
      companyName,
      photo
    }
  }
}
`

type OurTeamPageData = {
  heroHeadline?: string | null
  heroSubtitle?: string | null
  sections?: Array<{
    sectionTitle?: string | null
    description?: string | null
    columns?: string | null
    members?: Array<{
      _id?: string | null
      name?: string | null
      title?: string | null
      companyName?: string | null
      photo?: unknown
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

export default async function OurTeamPage() {
  const data = await safeFetch<OurTeamPageData>(OUR_TEAM_QUERY)

  const headline = data?.heroHeadline ?? 'Our Team'
  const subtitle = data?.heroSubtitle ?? "Meet the AZAGC leadership team dedicated to advancing Arizona's construction industry."
  const sections: TeamSectionData[] =
    data?.sections
      ?.filter((s): s is NonNullable<typeof s> => !!s?.sectionTitle)
      .map((s) => ({
        sectionTitle: s.sectionTitle!,
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
      })) ?? []

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
        {sections.length > 0 ? (
          sections.map((section, i) => (
            <TeamCards key={section.sectionTitle + String(i)} section={section} />
          ))
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
