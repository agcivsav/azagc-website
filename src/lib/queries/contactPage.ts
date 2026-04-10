import type { PortableTextBlock } from '@portabletext/types'
import { safeFetch, urlFor } from '@/lib/sanity'
import { PAGE_BUILDER_SECTIONS_GROQ } from '@/lib/queries/pageBuilderSectionsGroq'
import type { ISection } from '@/types/common'

export type ContactPageSeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: unknown
  noIndex?: boolean | null
} | null

export type ContactPageLeadFormSection = {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  bulletPoints?: string[] | null
}

export type ContactPageDoc = {
  seo?: ContactPageSeo
  hero?: {
    title?: string | null
    subtitle?: string | null
    backgroundImage?: { asset?: { url?: string } } | null
  } | null
  contactHeading?: string | null
  intro?: PortableTextBlock[] | null
  email?: string | null
  phone?: string | null
  address?: string | null
  mapEmbedUrl?: string | null
  leadFormSection?: ContactPageLeadFormSection | null
  pageBuilderSections?: ISection[] | null
}

const contactCoalesce = `coalesce(
  *[_type == "contactPage" && _id == "drafts.contactPage"][0],
  *[_type == "contactPage" && _id == "contactPage"][0],
  *[_type == "contactPage"] | order(_updatedAt desc)[0]
)`

const heroProjection = `hero{
  title,
  subtitle,
  backgroundImage{
    asset->{
      _id,
      url,
      metadata{dimensions}
    }
  }
}`

export const CONTACT_PAGE_QUERY = `${contactCoalesce}{
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  },
  ${heroProjection},
  contactHeading,
  intro,
  email,
  phone,
  address,
  mapEmbedUrl,
  leadFormSection{
    eyebrow,
    heading,
    intro,
    bulletPoints
  },
${PAGE_BUILDER_SECTIONS_GROQ}
}`

export function fetchContactPage(): Promise<ContactPageDoc | null> {
  return safeFetch<ContactPageDoc>(CONTACT_PAGE_QUERY)
}

export function buildContactPageOgImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') return undefined
  try {
    const url = urlFor(image).width(1200).height(630).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : undefined
  } catch {
    return undefined
  }
}
