import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import LeadForm from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Page Not Found | AZAGC',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <section className="bg-navy py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="font-display text-8xl text-red mb-4">404</p>
            <h1 className="font-display text-3xl text-white mb-4">Page Not Found</h1>
            <p className="font-body text-base text-white/70 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Try one of the links below or use the form to reach our team.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Home', href: '/' },
                { label: 'Membership', href: '/membership/' },
                { label: 'Events', href: '/events/' },
                { label: 'News', href: '/news-media/' },
                { label: 'Contact', href: '/contact/' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-cream px-4">
          <div className="max-w-lg mx-auto">
            <LeadForm
              source="404-page"
              headline="Still looking for something? We can help."
              subheadline="Fill out the form and our team will point you in the right direction."
              submitLabel="Send Message →"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
