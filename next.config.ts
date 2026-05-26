import type { NextConfig } from 'next'
import type { Redirect } from 'next/dist/lib/load-custom-routes'
import { legacyRedirects } from './src/config/legacy-redirects'

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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {},
  async redirects() {
    return [
      ...legacyRedirects,
      {
        source: '/advocacy/air-quality',
        destination: '/advocacy',
        permanent: true,
      },
      {
        source: '/advocacy/air-quality/',
        destination: '/advocacy',
        permanent: true,
      },
      {
        source: '/uploads/sites/1/AGC-Micro_Slurry-Seal-Guide.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id' }],
        destination: '/',
        permanent: true,
      },
    ] as Redirect[]
  },
}

export default nextConfig
