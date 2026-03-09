import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Logo from '../../../public/logo-svg.svg'

const FOOTER_LINKS = {
  Membership: [
    { label: 'Contractor Membership', href: '/membership/contractor' },
    { label: 'Affiliate Membership', href: '/membership/affiliate' },
    { label: 'Member Benefits', href: '/membership/benefits' },
    { label: 'Join Now', href: '/join' },
    { label: 'Member Portal', href: '/member-portal' },
  ],
  Organization: [
    { label: 'About AZAGC', href: '/about' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Board of Directors', href: '/about/board' },
    { label: 'Advocacy', href: '/advocacy' },
    { label: 'Education', href: '/education' },
  ],
  Resources: [
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news' },
    { label: 'Sponsorship', href: '/sponsorship' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      {/* Main footer grid */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand col */}
          <div>
            <Link href="/" className="font-normal text-2xl font-bold mb-4 block">
                      <Image src={Logo} alt="" className="w-[198px] p-2 relative right-[23px]"/>
            
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              The Arizona Chapter of the Associated General Contractors of America. Building Arizona safer, better, together since 1934.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/AZAGC/', label: 'Facebook' },
                { icon: Instagram, href: 'https://x.com/azagc', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://www.youtube.com/azagc1934', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} Arizona Chapter AGC. All rights reserved.
          </p>
          <Button href="/join" variant="primary" size="sm">
            Become a Member
          </Button>
        </div>
      </div>
    </footer>
  )
}
