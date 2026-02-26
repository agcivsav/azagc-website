import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.azagc.org',
        pathname: '/**',
      },
    ],
  },
  experimental: {},
  async redirects() {
    return [
      // WordPress artifacts
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/feed/', destination: '/', permanent: true },
      // WP taxonomy archives → news hub
      { source: '/category/:slug', destination: '/news-media/', permanent: true },
      { source: '/tag/:slug', destination: '/news-media/', permanent: true },
      { source: '/author/:slug', destination: '/about/our-team/', permanent: true },
      // Legacy URL patterns
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
    ]
  },
}

export default nextConfig
