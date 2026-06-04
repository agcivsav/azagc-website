import BackToTop from '@/components/ui/BackToTop'
import StickyCTA from '@/components/ui/StickyCTA'
import StickyMobileCTA from '@/components/conversion/StickyMobileCTA'

export function FloatingActions() {
  return (
    <aside aria-label="Page shortcuts">
      <BackToTop />
      <StickyCTA />
      <StickyMobileCTA />
    </aside>
  )
}
