import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Contact AZAGC | Arizona Chapter AGC",
  description: "Contact AZAGC — 1825 W. Adams St., Phoenix, AZ 85007. Phone: (602) 252-3926. Reach us for membership, events, training, and advocacy inquiries.",
  alternates: { canonical: "https://www.azagc.org/contact/" },
}

const FAQS = [{"question":"What are AZAGC office hours?","answer":"The AZAGC office is open Monday through Friday, 8:00 AM to 5:00 PM MST. We are closed on major holidays."},{"question":"How quickly will someone respond to my inquiry?","answer":"We respond to all inquiries within one business day. For urgent matters, please call us directly at (602) 252-3926."},{"question":"Where is AZAGC located?","answer":"AZAGC is located at 1825 W. Adams St., Phoenix, AZ 85007, near downtown Phoenix."},{"question":"Who should I contact for media inquiries?","answer":"Media inquiries should be directed to the AZAGC communications team via the contact form. Include your publication and deadline in your message."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Contact", url: "https://www.azagc.org/contact/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Contact</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">We're here to help. Whether you have questions about membership, upcoming events, training programs, or advocacy — reach out to the AZAGC team.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">AZAGC Headquarters</h2>
            <p className="font-body text-base text-slate leading-relaxed"><strong>Address:</strong> 1825 W. Adams St., Phoenix, AZ 85007<br/><strong>Phone:</strong> <a href="tel:6022523926" class="text-red hover:underline">(602) 252-3926</a><br/><strong>Email:</strong> info@azagc.org<br/><strong>Hours:</strong> Monday–Friday, 8:00 AM – 5:00 PM MST</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Membership Inquiries</h2>
            <p className="font-body text-base text-slate leading-relaxed">Ready to join AZAGC or have questions about membership options and dues? Our membership team responds within one business day. You can also use the form below to request a personalized membership proposal.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Education & Training</h2>
            <p className="font-body text-base text-slate leading-relaxed">For questions about OSHA training, apprenticeship programs, or AGC of America education courses, contact our training coordinator. We can arrange on-site training for groups of 10 or more.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="contact-page" headline="Send Us a Message" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
