import type { Metadata } from 'next'
import { LegalPolicyContent } from '@/components/legal/LegalPolicyContent'
import { PageBuilderSections } from '@/components/sections/PageBuilderSections'
import {
  buildLegalPageOgImageUrl,
  fetchAccessibilityStatementPage,
} from '@/lib/queries/legalPages'

export const revalidate = 3600

const CANONICAL = 'https://azagc.org/accessibility-statement'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchAccessibilityStatementPage()
  const heading = doc?.heading?.trim() || 'Accessibility Statement'
  const title = doc?.seo?.metaTitle?.trim() || heading
  const description =
    doc?.seo?.metaDescription?.trim() ??
    'AZAGC accessibility statement and our commitment to digital inclusion.'
  const ogImage = doc?.seo?.ogImage
    ? buildLegalPageOgImageUrl(doc.seo.ogImage)
    : undefined

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: doc?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function AccessibilityStatementPage() {
  const doc = await fetchAccessibilityStatementPage()
  const heading = doc?.heading?.trim() || 'Accessibility Statement'
  const body = doc?.body && Array.isArray(doc.body) ? doc.body : null

  return (
    <>
      <LegalPolicyContent
        breadcrumbHref="/accessibility-statement/"
        breadcrumbLabel="Accessibility Statement"
        heading={heading}
        body={body}
      />
      <PageBuilderSections sections={doc?.pageBuilderSections} />
    </>
  )
}
