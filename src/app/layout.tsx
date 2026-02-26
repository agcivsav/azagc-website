import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'
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
    default: 'Associated General Contractors — Arizona Chapter | AZAGC',
    template: '%s | AZAGC',
  },
  description:
    'AZAGC — Arizona Chapter of the Associated General Contractors of America. Supporting Arizona contractors through advocacy, education, and industry resources since 1934.',
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
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
            n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,"script",
            "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init","${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
            fbq("track","PageView");
          `}</Script>
        )}
        {children}
      </body>
    </html>
  )
}
