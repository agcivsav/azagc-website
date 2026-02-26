/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azagc.org',
  generateRobotsTxt: true,
  exclude: ['/studio/*', '/api/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/studio/', '/api/'] },
    ],
  },
}
