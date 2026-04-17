import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactDetailsSection } from '@/components/contact/ContactDetailsSection'
import { ContactLeadSection } from '@/components/contact/ContactLeadSection'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import { PageBuilderSections } from '@/components/sections/PageBuilderSections'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { ContactPageJsonLd } from '@/components/seo/JsonLd'
import type { IPageHero } from '@/types/common'
import {
  buildContactPageOgImageUrl,
  fetchContactPage,
} from '@/lib/queries/contactPage'

export const revalidate = 3600

const CANONICAL = 'https://azagc.org/contact/'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await fetchContactPage()
  const heroTitle = doc?.hero?.title?.trim() || 'Contact'
  const title = doc?.seo?.metaTitle?.trim() || `${heroTitle} | AZAGC`
  const description =
    doc?.seo?.metaDescription?.trim() ??
    'Contact AZAGC — phone, email, mailing address, and office location for the Arizona Chapter of AGC.'
  const ogImage = doc?.seo?.ogImage
    ? buildContactPageOgImageUrl(doc.seo.ogImage)
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

export default async function ContactPage() {
  const doc = await fetchContactPage()
  const hero = doc?.hero ?? null
  const heroForComponent: IPageHero | undefined = hero
    ? {
        title: hero.title ?? 'Contact',
        subtitle: hero.subtitle ?? undefined,
        backgroundImage: hero.backgroundImage?.asset?.url
          ? { asset: { url: hero.backgroundImage.asset.url } }
          : undefined,
      }
    : undefined

  const contactHeading = doc?.contactHeading?.trim() || 'Contact us'
  const intro = doc?.intro && Array.isArray(doc.intro) ? doc.intro : null

  return (
    <>
      <ContactPageJsonLd
        url={CANONICAL}
        email={doc?.email}
        telephone={doc?.phone}
        streetAddress={doc?.address}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://azagc.org' },
          { name: 'Contact', url: CANONICAL },
        ]}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span className="text-warm-gray" aria-hidden>
            /
          </span>
          <span className="text-navy font-medium">Contact</span>
        </div>
      </div>

      {hero ? (
        <PageBuilderHero
          title={hero.title ?? 'Contact'}
          hero={heroForComponent}
        />
      ) : (
        <section className="relative bg-navy py-20 overflow-hidden">
          <div className="container-site relative z-10">
            <h1 className="font-normal text-4xl md:text-5xl text-white">Contact</h1>
            <p className="font-body text-lg text-white/80 mt-3 max-w-2xl">
              Reach the Arizona Chapter of the Associated General Contractors of America.
            </p>
          </div>
        </section>
      )}

      <ContactDetailsSection
        contactHeading={contactHeading}
        intro={intro}
        email={doc?.email ?? null}
        phone={doc?.phone ?? null}
        address={doc?.address ?? null}
        mapEmbedUrl={doc?.mapEmbedUrl ?? null}
      />

      <ContactLeadSection leadFormSection={doc?.leadFormSection} />

      <PageBuilderSections sections={doc?.pageBuilderSections} />
    </>
  )
}
