'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Membership', href: '/membership', children: [
    { label: 'Contractor Members', href: '/membership/contractor' },
    { label: 'Affiliate Members', href: '/membership/affiliate' },
    { label: 'Benefits', href: '/membership/benefits' },
  ]},
  { label: 'Advocacy', href: '/advocacy' },
  { label: 'Education', href: '/education' },
  { label: 'Events', href: '/events' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-40 bg-navy transition-all duration-300',
      scrolled ? 'shadow-lg py-0' : 'py-0',
    )}>
      <div className="container-site flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* Replace with <Image> once logo is in Sanity */}
          <span className="font-display text-2xl text-white font-bold tracking-tight">AZAGC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="font-body font-medium text-sm text-white/80 hover:text-white px-3 py-5 inline-block transition-colors"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="absolute top-full left-0 w-52 bg-navy-deep border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block font-body font-medium text-sm text-white/70 hover:text-white hover:bg-navy-mid px-4 py-3 transition-colors border-b border-white/5 last:border-0"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button href="/join" variant="gold" size="sm">
            Join Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-deep border-t border-white/10 pb-4">
          {NAV_LINKS.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-body font-medium text-sm text-white/80 hover:text-white px-6 py-3 border-b border-white/5"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-body text-sm text-white/60 hover:text-white pl-10 pr-6 py-2.5 border-b border-white/5"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="px-6 pt-4">
            <Button href="/join" variant="gold" className="w-full justify-center">
              Join AZAGC Now
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
