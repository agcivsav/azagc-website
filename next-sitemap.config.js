/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://azagc.org',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/lp',
    '/lp/*',
    '/studio',
    '/studio/*',
    '/api/*',
    '/server-sitemap.xml',
  ],
  transform: async (config, path) => {
    if (
      path.startsWith('/lp') ||
      path === '/robots.txt' ||
      path.includes('sitemap')
    ) {
      return null
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/lp/'],
      },
    ],
  },
}
