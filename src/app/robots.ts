import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/lp/'],
      },
    ],
    sitemap: 'https://www.azagc.org/sitemap.xml',
  }
}
