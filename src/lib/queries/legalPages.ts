import type { PortableTextBlock } from '@portabletext/types'
import { safeFetch, urlFor } from '@/lib/sanity'

export type LegalPageSeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: unknown
  noIndex?: boolean | null
} | null

export type LegalPageDoc = {
  heading?: string | null
  body?: PortableTextBlock[] | null
  seo?: LegalPageSeo
}

const privacyPolicyCoalesce = `coalesce(
  *[_type == "privacyPolicyPage" && _id == "drafts.privacyPolicyPage"][0],
  *[_type == "privacyPolicyPage" && _id == "privacyPolicyPage"][0],
  *[_type == "privacyPolicyPage"] | order(_updatedAt desc)[0]
)`

const accessibilityCoalesce = `coalesce(
  *[_type == "accessibilityStatementPage" && _id == "drafts.accessibilityStatementPage"][0],
  *[_type == "accessibilityStatementPage" && _id == "accessibilityStatementPage"][0],
  *[_type == "accessibilityStatementPage"] | order(_updatedAt desc)[0]
)`

const legalProjection = `{
  heading,
  body,
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  }
}`

export const PRIVACY_POLICY_PAGE_QUERY = `${privacyPolicyCoalesce}${legalProjection}`

export const ACCESSIBILITY_STATEMENT_PAGE_QUERY = `${accessibilityCoalesce}${legalProjection}`

export function fetchPrivacyPolicyPage(): Promise<LegalPageDoc | null> {
  return safeFetch<LegalPageDoc>(PRIVACY_POLICY_PAGE_QUERY)
}

export function fetchAccessibilityStatementPage(): Promise<LegalPageDoc | null> {
  return safeFetch<LegalPageDoc>(ACCESSIBILITY_STATEMENT_PAGE_QUERY)
}

export function buildLegalPageOgImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') return undefined
  try {
    const url = urlFor(image).width(1200).height(630).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : undefined
  } catch {
    return undefined
  }
}
