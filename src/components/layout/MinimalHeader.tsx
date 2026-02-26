import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function MinimalHeader() {
  return (
    <header className="bg-navy py-4 border-b border-white/10">
      <div className="container-site flex items-center justify-between">
        <Link href="/" className="font-display text-2xl text-white font-bold">AZAGC</Link>
        <div className="flex items-center gap-4">
          <a href="tel:+1XXXXXXXXXX" className="hidden sm:block font-body text-sm text-white/60 hover:text-white transition-colors">
            Questions? Call us
          </a>
          <Button href="/join" variant="gold" size="sm">Join Now</Button>
        </div>
      </div>
    </header>
  )
}
