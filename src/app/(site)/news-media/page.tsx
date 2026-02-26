import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "News & Media | AZAGC",
  description: "AZAGC news and media — construction industry updates, legislative alerts, member news, and advocacy developments for Arizona contractors.",
  alternates: { canonical: "https://www.azagc.org/news-media/" },
}

const FAQS = [{"question":"How do I submit member news to AZAGC?","answer":"Email your news to the AZAGC communications team or contact us through the form on this page. We feature member news in our newsletter and on the website."},{"question":"Does AZAGC have a newsletter?","answer":"Yes. AZAGC publishes a regular member newsletter with legislative updates, event announcements, member news, and industry data. Members receive it automatically; fill out the form to subscribe."},{"question":"Can I use AZAGC news content?","answer":"AZAGC news content may be shared with attribution to AZAGC. For reprints or significant use, please contact our communications team."},{"question":"Where can I find AZAGC on social media?","answer":"AZAGC is active on LinkedIn, Facebook, and Twitter/X. Follow us for real-time legislative alerts, event announcements, and industry news."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "News Media", url: "https://www.azagc.org/news-media/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">News & Media</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">News & Media</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">The latest news, advocacy updates, member spotlights, and industry analysis from AZAGC — Arizona's construction association since 1934.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Industry News</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC tracks the legislation, regulations, and market developments that affect Arizona contractors. Our news updates cover legislative session activity, OSHA and ADEQ regulatory changes, state infrastructure investment announcements, and labor market data relevant to Arizona construction.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Member News</h2>
            <p className="font-body text-base text-slate leading-relaxed">We celebrate member achievements — new projects, company milestones, leadership appointments, and community involvement. If your company has news to share, contact the AZAGC communications team to be featured in our member spotlight.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Press & Media Inquiries</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC is a resource for journalists covering Arizona construction, contracting, labor, and infrastructure topics. Our executive team is available for comment and background on construction industry issues. Contact us at (602) 252-3926 or through the form below.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="news-page" headline="Subscribe to AZAGC News" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
