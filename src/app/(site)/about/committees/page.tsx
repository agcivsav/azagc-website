import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import CommitteeCards from '@/components/sections/CommitteeCards'
import type { CommitteeCardItem } from '@/components/sections/CommitteeCards'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Committees',
  description:
    'AZAGC committees drive policy, workforce, and industry initiatives. Learn how to get involved.',
}

const PAGE_QUERY = `
*[_type == "committeesPage"][0]{
  heroHeadline,
  heroSubtitle
}
`

const COMMITTEES_QUERY = `
*[_type == "committee" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  image,
  buttonLabel
}
`

type CommitteesPageData = {
  heroHeadline?: string | null
  heroSubtitle?: string | null
} | null

type CommitteeDoc = {
  _id?: string | null
  name?: string | null
  slug?: string | null
  description?: string | null
  image?: unknown
  buttonLabel?: string | null
}

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(600).height(400).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

export default async function CommitteesPage() {
  const [pageData, committeeDocs] = await Promise.all([
    safeFetch<CommitteesPageData>(PAGE_QUERY),
    safeFetch<CommitteeDoc[]>(COMMITTEES_QUERY),
  ])

  const headline = pageData?.heroHeadline ?? 'Committees'
  const subtitle =
    pageData?.heroSubtitle ??
    'AZAGC committees drive policy, workforce, and industry initiatives. Learn how to get involved.'

  const committees: CommitteeCardItem[] = Array.isArray(committeeDocs)
    ? committeeDocs
        .filter((c): c is CommitteeDoc => {
          const s = (c?.slug && typeof c.slug === 'string' ? c.slug : '').replace(/\/$/, '')
          return !!c?.name && s.length > 0
        })
        .map((c) => ({
          _id: c._id ?? '',
          name: c.name!,
          slug: (c.slug || '').replace(/\/$/, ''),
          description: c.description ?? null,
          imageUrl: buildImageUrl(c.image),
          buttonLabel: c.buttonLabel ?? null,
        }))
    : []

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-navy transition-colors no-underline">About</a>
          <span>/</span>
          <a href="/about/committees" className="hover:text-navy transition-colors no-underline">
            Committees
          </a>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">About</SectionLabel>
          <SectionTitle as="h1" className="text-white">{headline}</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{subtitle}</p>
        </div>
      </section>

      {committees.length > 0 ? (
        <CommitteeCards committees={committees} />
      ) : (
        <section className="bg-cream py-16">
          <div className="container-site">
            <p className="font-body text-slate text-center py-8">
              Add committees in Sanity Studio to display them here. Each committee can have a card image, title, and button.
            </p>
          </div>
        </section>
      )}

      <CTABandFromSanity />
    </>
  )
}
