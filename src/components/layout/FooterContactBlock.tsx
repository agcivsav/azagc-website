import { MapPin, Shield, Smartphone } from 'lucide-react'

export type FooterContactBlockProps = {
  organizationName?: string | null
  address?: string | null
  phone?: string | null
}

const iconClass = 'mt-[2px] h-4 w-4 shrink-0 text-primary'

function telHref(phone: string) {
  let cleaned = phone.replace(/[^\d+]/g, '') // keep digits and +

  // if it doesn't start with +1, force +1
  if (!cleaned.startsWith('+')) {
    cleaned = cleaned.replace(/\D/g, '') // remove all non-digits
    if (!cleaned.startsWith('1')) {
      cleaned = '1' + cleaned
    }
    cleaned = `+${cleaned}`
  }

  return cleaned ? `tel:${cleaned}` : undefined
}

function ContactPhoneRow({ phoneTrim }: { phoneTrim: string }) {
  const href = telHref(phoneTrim)
  return (
    <li className="flex gap-3 items-start">
      <Smartphone className={iconClass} strokeWidth={2} aria-hidden />
      <p className="font-body text-sm leading-relaxed text-white/65 min-w-0">
        {href ? (
          <a
            href={href}
            className="text-white/75 hover:text-white transition-colors no-underline hover:underline"
          >
            {phoneTrim}
          </a>
        ) : (
          phoneTrim
        )}
      </p>
    </li>
  )
}

export function FooterContactBlock({
  organizationName,
  address,
  phone,
}: FooterContactBlockProps) {
  const org = organizationName?.trim() ?? ''
  const addr = address?.trim() ?? ''
  const phoneTrim = phone?.trim() ?? ''
  if (!org && !addr && !phoneTrim) return null

  const textClass = 'font-body text-sm leading-relaxed text-white/65 min-w-0'

  return (
    <div>
      <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-primary mb-4">
        Contact
      </p>
      <ul className="flex flex-col gap-3.5" aria-label="Contact details">
        {org ? (
          <li className="flex gap-3 items-start">
            <Shield className={iconClass} strokeWidth={2} aria-hidden />
            <p className={textClass}>{org}</p>
          </li>
        ) : null}
        {addr ? (
          <li className="flex gap-3 items-start">
            <MapPin className={iconClass} strokeWidth={2} aria-hidden />
            <p className={`${textClass} whitespace-pre-line`}>{addr}</p>
          </li>
        ) : null}
        {phoneTrim ? <ContactPhoneRow phoneTrim={phoneTrim} /> : null}
      </ul>
    </div>
  )
}
