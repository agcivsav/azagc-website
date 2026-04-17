import type { Metadata } from 'next'
import { LegalPolicyContent } from '@/components/legal/LegalPolicyContent'
import {
  buildLegalPageOgImageUrl,
  fetchPrivacyPolicyPage,
} from '@/lib/queries/legalPages'

export const revalidate = 3600

const CANONICAL = 'https://azagc.org/privacy-policy/'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchPrivacyPolicyPage()
  const heading = doc?.heading?.trim() || 'Privacy Policy'
  const title = doc?.seo?.metaTitle?.trim() || heading
  const description =
    doc?.seo?.metaDescription?.trim() ??
    'AZAGC privacy policy — how we collect, use, and protect your information.'
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

export default async function PrivacyPolicyPage() {
  const doc = await fetchPrivacyPolicyPage()
  const heading = doc?.heading?.trim() || 'Privacy Policy'
  const body = doc?.body && Array.isArray(doc.body) ? doc.body : null

  return (
    <LegalPolicyContent
      breadcrumbHref="/privacy-policy/"
      breadcrumbLabel="Privacy Policy"
      heading={heading}
      body={body}
    />
  )
}
