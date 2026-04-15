import type { ReactNode } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { PortableTextBlock } from '@portabletext/types'
import PortableText from '@/components/ui/PortableText'
import { isTrustedMapEmbedUrl } from '@/lib/mapEmbed'
import { cn } from '@/lib/utils'

export type ContactDetailsSectionProps = {
  contactHeading: string
  intro: PortableTextBlock[] | null
  email: string | null
  phone: string | null
  address: string | null
  mapEmbedUrl: string | null
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4 md:gap-5 rounded-sm border border-warm-gray bg-cream/40 p-5 md:p-6 transition-colors hover:border-red/25 hover:bg-cream/70">
      <div
        className="shrink-0 w-11 h-11 rounded-full bg-red/15 flex items-center justify-center text-primary"
        aria-hidden
      >
        <Icon className="w-5 h-5" strokeWidth={2} />
      </div>
      <div className="min-w-0 pt-0.5">
        <span className="block font-body font-semibold text-xs uppercase tracking-[0.12em] text-navy/55 mb-1.5">
          {label}
        </span>
        <div className="font-body text-base text-navy leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function ContactDetailsSection({
  contactHeading,
  intro,
  email,
  phone,
  address,
  mapEmbedUrl,
}: ContactDetailsSectionProps) {
  const hasIntro = Array.isArray(intro) && intro.length > 0
  const emailTrim = email?.trim() || null
  const phoneTrim = phone?.trim() || null
  const addressTrim = address?.trim() || null
  const mapUrl = mapEmbedUrl?.trim() || null
  const safeMapUrl = mapUrl && isTrustedMapEmbedUrl(mapUrl) ? mapUrl : null
  const hasContactBlock = Boolean(emailTrim || phoneTrim || addressTrim)
  const showMap = Boolean(safeMapUrl)
function normalizePhone(phone: string | null | undefined) {
  if (!phone) return null

  const digits = phone.replace(/\D/g, '')
  if (!digits) return null

  const normalized = digits.startsWith('1') ? digits : `1${digits}`

  return `+${normalized}`
}
  const linkClass =
    'font-medium text-navy hover:text-primary underline-offset-2 hover:underline transition-colors min-h-[44px] inline-flex items-center break-words'
const phoneHref = normalizePhone(phoneTrim)

  return (
    <section className="bg-white border-t border-warm-gray py-16 md:py-20">
      <div className="container-site">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-3">
            Get in touch
          </p>
          <h2 className="font-normal text-3xl sm:text-4xl text-navy tracking-tight leading-tight mb-5">
            {contactHeading}
          </h2>
          {hasIntro ? (
            <div className="prose prose-slate max-w-none font-body text-slate leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-primary [&_a:hover]:text-navy">
              <PortableText value={intro!} />
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            'grid gap-10 lg:gap-12 items-start',
            showMap && hasContactBlock ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-2xl',
          )}
        >
          <div className="space-y-4">
            {hasContactBlock ? (
              <>
                {addressTrim ? (
                  <ContactRow icon={MapPin} label="Address">
                    <p className="whitespace-pre-line m-0">{addressTrim}</p>
                  </ContactRow>
                ) : null}
                  {phoneTrim ? (
  <ContactRow icon={Phone} label="Phone">
    {(() => {
      const phoneHref = normalizePhone(phoneTrim)

      return phoneHref ? (
        <Link href={`tel:${phoneHref}`} className={linkClass}>
          {phoneTrim}
        </Link>
      ) : (
        phoneTrim
      )
    })()}
  </ContactRow>
) : null}
                {emailTrim ? (
                  <ContactRow icon={Mail} label="Email">
                    <Link href={`mailto:${emailTrim}`} className={cn(linkClass, 'break-all')}>
                      {emailTrim}
                    </Link>
                  </ContactRow>
                ) : null}
              </>
            ) : (
              <div className="rounded-sm border border-dashed border-warm-gray bg-cream/50 px-6 py-10 text-center">
                <p className="font-body text-sm text-slate max-w-md mx-auto m-0">
                  Add contact details and an optional map in{' '}
                  <span className="text-navy font-medium">Sanity Studio → Contact Page</span>.
                </p>
              </div>
            )}
          </div>

          {showMap ? (
            <div className="lg:sticky lg:top-8">
              <p className="font-body font-semibold text-xs uppercase tracking-[0.12em] text-navy/55 mb-3">
                Location
              </p>
              <div
                className="w-full rounded-sm overflow-hidden border border-warm-gray bg-cream/30 shadow-sm ring-1 ring-navy/[0.04]"
                style={{ aspectRatio: '16 / 10' }}
              >
                <iframe
                  title="Office location map"
                  src={safeMapUrl!}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
