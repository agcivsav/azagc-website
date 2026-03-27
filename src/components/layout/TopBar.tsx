import Link from 'next/link'
import { Phone, LogIn } from 'lucide-react'

type TopBarProps = {
  enabled?: boolean
  phone?: string | null
  announcement?: string | null
  memberLoginLabel?: string | null
  memberLoginUrl?: string | null
}

const DEFAULT_PHONE = '(602) 252-3926'
const DEFAULT_ANNOUNCEMENT = "Arizona's Premier Construction Association — Since 1934"
const DEFAULT_MEMBER_LOGIN_LABEL = 'Member Login'
const DEFAULT_MEMBER_LOGIN_URL = 'https://membersonly.azagc.org'

export default function TopBar({
  enabled = true,
  phone,
  announcement,
  memberLoginLabel,
  memberLoginUrl,
}: TopBarProps) {
  if (!enabled) return null

  const phoneValue = phone || DEFAULT_PHONE
  const announcementValue = announcement || DEFAULT_ANNOUNCEMENT
  const memberLoginLabelValue = memberLoginLabel || DEFAULT_MEMBER_LOGIN_LABEL
  const memberLoginUrlValue = memberLoginUrl || DEFAULT_MEMBER_LOGIN_URL
  const telHref = `tel:${phoneValue.replace(/\D/g, '')}`

  return (
    <div className="bg-[#131313E8] text-white/70 text-xs font-body">
      <div className="container-site flex items-center justify-between h-9">
        <div className="flex items-center gap-4">
          <a href={telHref} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            <span>{phoneValue}</span>
          </a>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="hidden sm:block">{announcementValue}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={memberLoginUrlValue} className="flex items-center gap-1.5 hover:text-white transition-colors" target="_blank" rel="noopener">
            <LogIn className="w-3 h-3" />
            <span>{memberLoginLabelValue}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
