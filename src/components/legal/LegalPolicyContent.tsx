import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'
import PortableText from '@/components/ui/PortableText'

export type LegalPolicyContentProps = {
  breadcrumbHref: string
  breadcrumbLabel: string
  heading: string
  body: PortableTextBlock[] | null
  emptyMessage?: string
}

export function LegalPolicyContent({
  breadcrumbHref,
  breadcrumbLabel,
  heading,
  body,
  emptyMessage = 'This page will appear here once it is published in Sanity Studio.',
}: LegalPolicyContentProps) {
  const hasBody = Array.isArray(body) && body.length > 0

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={breadcrumbHref}
            className="hover:text-navy transition-colors no-underline"
          >
            {breadcrumbLabel}
          </Link>
        </div>
      </div>

      <section className="bg-navy py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <h1 className="font-normal text-3xl md:text-4xl text-white tracking-tight">
            {heading}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <div className="bg-white border border-warm-gray rounded-xl p-8 md:p-10">
            {hasBody ? (
              <div className="prose prose-slate max-w-none font-body text-slate leading-relaxed [&_p]:mb-5 [&_p:last-child]:mb-0">
                <PortableText value={body} />
              </div>
            ) : (
              <p className="font-body text-sm text-slate text-center">{emptyMessage}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
