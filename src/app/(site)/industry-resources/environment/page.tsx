import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import PageBuilderSections, {
  INDUSTRY_RESOURCES_PAGE_QUERY_FRAGMENT,
  type IndustryResourcesSectionItem,
} from '@/components/sections/PageBuilderSections'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Environment',
  description: 'Environmental compliance resources and guidance for Arizona contractors.',
}

const PAGE_QUERY = `*[_type == "environmentPage"][0]{ ${INDUSTRY_RESOURCES_PAGE_QUERY_FRAGMENT} }`

type PageData = { sections?: IndustryResourcesSectionItem[] | null } | null

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(1200).height(800).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

export default async function EnvironmentPage() {
  const data = await safeFetch<PageData>(PAGE_QUERY)
  const sections = data?.sections ?? []

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/industry-resources" className="hover:text-navy transition-colors no-underline">
            Industry Resources
          </a>
          <span>/</span>
          <a href="/industry-resources/environment" className="hover:text-navy transition-colors no-underline">
            Environment
          </a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <PageBuilderHero
            title="Environment"
            subtitle="Environmental compliance resources and guidance for Arizona contractors."
          />
          <section className="bg-cream py-16">
            <div className="container-site max-w-2xl text-center">
              <p className="font-body text-slate">
                Add sections in Sanity Studio (Environment Page) to build this page.
              </p>
            </div>
          </section>
        </>
      ) : (
        <PageBuilderSections
          sections={sections}
          buildImageUrl={buildImageUrl}
          defaultTitle="Environment"
          defaultSubtitle="Environmental compliance resources and guidance for Arizona contractors."
        />
      )}

      <CTABandFromSanity />
    </>
  )
}
