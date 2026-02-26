'use client'
/**
 * StickyMobileCTA — fixed bottom bar on viewports < 768px.
 * Hides when a <form> element enters the viewport.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface StickyMobileCTAProps {
  href?: string
  label?: string
}

export default function StickyMobileCTA({
  href = '/join',
  label = 'Join AZAGC — Get Benefits Overview →',
}: StickyMobileCTAProps) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Watch all forms — hide bar when any form enters viewport
    const forms = document.querySelectorAll('form')
    if (!forms.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting)
        setHidden(anyVisible)
      },
      { threshold: 0.3 }
    )

    forms.forEach((f) => observer.observe(f))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <Link
        href={href}
        className="flex items-center justify-center w-full bg-red font-body font-semibold text-sm text-white py-4 active:bg-red-hover transition-colors"
      >
        {label}
      </Link>
    </div>
  )
}
