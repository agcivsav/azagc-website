'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface StickyCTAProps {
  href?: string
  label?: string
}

export default function StickyCTA({ href = '/join', label = 'Become a Member →' }: StickyCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      href={href}
      className={cn(
        'fixed bottom-6 right-6 z-40 bg-red text-white font-body font-semibold text-sm px-5 py-3 rounded-full shadow-xl hover:bg-red-hover transition-all duration-300 hidden sm:flex items-center gap-2',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
    >
      {label}
    </Link>
  )
}
