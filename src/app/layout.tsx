import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
// import Analytics from "@/components/layout/Analytics";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://azagc.org",
  ),
  title: {
    default: "Associated General Contractors — Arizona Chapter | AZAGC",
    template: "%s | AZAGC",
  },
  description:
    "AZAGC — Arizona Chapter of the Associated General Contractors of America. Supporting Arizona contractors through advocacy, education, and industry resources since 1934.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://azagc.org",
    siteName: "AZAGC",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
    >
      {/* <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: ` (function() {
          if (typeof window === 'undefined') return;
          if (typeof window.signals !== 'undefined') return;
          var script = document.createElement('script');
          script.src = 'https://cdn.cr-relay.com/v1/site/02195228-c20a-4cb8-8891-e391c412b4cb/signals.js';
          script.async = true;
          window.signals = Object.assign(
            [],
            ['page', 'identify', 'form'].reduce(function (acc, method){
              acc[method] = function () {
                signals.push([method, arguments]);
                return signals;
              };
            return acc;
            }, {})
          );
          document.head.appendChild(script);
        })();`,
                }}
            ></Script> */}
      <GoogleTagManager gtmId="GTM-MDTQBN8V" />
      <Script
        src="https://informationcompany52.com/js/817494.js"
        strategy="afterInteractive"
      />
      <body className="font-body antialiased bg-cream text-charcoal">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://informationcompany52.com/817494.png"
            style={{ display: "none" }}
            alt=""
          />
        </noscript>
        {/* <Analytics /> */}
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
        <GoogleAnalytics gaId="G-8HD10Z0Z9P" />
      </body>
    </html>
  );
}
