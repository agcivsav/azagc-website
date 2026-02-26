import Link from 'next/link'
import { Phone, LogIn } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-navy-deep text-white/70 text-xs font-body">
      <div className="container-site flex items-center justify-between h-9">
        <div className="flex items-center gap-4">
          <a href="tel:6022523926" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            <span>(602) 252-3926</span>
          </a>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="hidden sm:block">Arizona&apos;s Premier Construction Association — <strong className="text-white/90">Since 1934</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://membersonly.azagc.org" className="flex items-center gap-1.5 hover:text-white transition-colors" target="_blank" rel="noopener">
            <LogIn className="w-3 h-3" />
            <span>Member Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
