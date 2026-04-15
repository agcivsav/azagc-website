import Link from 'next/link'
import { Phone, LogIn } from 'lucide-react'

type TopBarProps = {
  enabled?: boolean
  phone?: string | null
  announcement?: string | null
  memberLoginLabel?: string | null
  memberLoginUrl?: string | null
}

export default function TopBar({
  enabled = true,
  phone,
  announcement,
  memberLoginLabel,
  memberLoginUrl,
}: TopBarProps) {
  if (!enabled) return null

  const phoneTrim = phone?.trim() ?? ''
  const announcementTrim = announcement?.trim() ?? ''
  const loginLabelTrim = memberLoginLabel?.trim() ?? ''
  const loginUrlTrim = memberLoginUrl?.trim() ?? ''

  const showPhone = Boolean(phoneTrim)
  const showAnnouncement = Boolean(announcementTrim)
  const showLogin = Boolean(loginLabelTrim && loginUrlTrim)

  if (!showPhone && !showAnnouncement && !showLogin) return null

  const telHref = showPhone ? `tel:+1${phoneTrim.replace(/\D/g, '')}` : ''

  return (
    <div className="bg-[#131313E8] text-white/70 text-xs font-body">
      <div className="container-site flex items-center justify-between h-9 gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {showPhone ? (
            <a
              href={telHref}
              className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
            >
              <Phone className="w-3 h-3 shrink-0" />
              <span>{phoneTrim}</span>
            </a>
          ) : null}
          {showPhone && showAnnouncement ? (
            <span className="hidden sm:block text-white/30 shrink-0" aria-hidden>
              |
            </span>
          ) : null}
          {showAnnouncement ? (
            <span className="hidden sm:block truncate">{announcementTrim}</span>
          ) : null}
        </div>
        {showLogin ? (
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href={loginUrlTrim}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LogIn className="w-3 h-3" />
              <span>{loginLabelTrim}</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
