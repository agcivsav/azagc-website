import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | AZAGC',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="bg-white border-b border-warm-gray py-24 md:py-32 px-4 text-center min-h-[50vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <p className="font-normal text-7xl sm:text-8xl text-primary mb-2" aria-hidden>
          404
        </p>
        <h1 className="font-normal text-2xl sm:text-3xl text-navy mb-4">Page not found</h1>
        <p className="font-body text-base text-slate mb-10 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
          <Link
            href="/"
            className="font-body text-sm font-semibold bg-primary hover:bg-red-hover text-white px-6 py-3 rounded-sm transition-colors"
          >
            Back to home
          </Link>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Membership', href: '/membership/' },
              { label: 'Events', href: '/events/' },
              { label: 'Contact', href: '/contact/' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-sm font-semibold border border-warm-gray bg-cream hover:border-navy/20 hover:bg-warm-gray/60 text-navy px-4 py-2 rounded-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
