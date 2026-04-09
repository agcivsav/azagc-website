import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function MinimalHeader() {
  return (
    <header className="bg-white py-4 border-b border-warm-gray">
      <div className="container-site flex items-center justify-between">
        <Link href="/" className="font-normal text-2xl text-navy font-bold">AZAGC</Link>
        <div className="flex items-center gap-4">
          <a href="tel:+1XXXXXXXXXX" className="hidden sm:block font-body text-sm text-slate hover:text-navy transition-colors">
            Questions? Call us
          </a>
          <Button href="/join" variant="gold" size="sm">Join Now</Button>
        </div>
      </div>
    </header>
  )
}
