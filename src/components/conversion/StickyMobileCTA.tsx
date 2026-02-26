'use client'
import Link from 'next/link'

interface StickyMobileCTAProps {
  href?: string
  label?: string
}

export default function StickyMobileCTA({ href = '/join', label = 'Join AZAGC →' }: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-red">
      <Link
        href={href}
        className="flex items-center justify-center w-full font-body font-semibold text-sm text-white py-4 active:bg-red-hover transition-colors"
      >
        {label}
      </Link>
    </div>
  )
}
