import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import Analytics from '@/components/layout/Analytics'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azagc.org'),
  title: {
    default: 'Arizona Agribusiness & Equine Center | AZAGC',
    template: '%s | AZAGC',
  },
  description:
    'AZAGC advances Arizona agriculture through workforce development, advocacy, and industry partnerships. Join the community that shapes the future of Arizona agribusiness.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.azagc.org',
    siteName: 'AZAGC',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="font-body antialiased bg-cream text-charcoal">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
