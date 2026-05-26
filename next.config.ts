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
            {
                source: '/uploads/sites/1/Lovas_Phil.pdf',
                destination: '/',
                permanent: true,
            },
            { source: '/mc-template', destination: '/', permanent: true },
            { source: '/mc-template/', destination: '/', permanent: true },
            {
                source:
                    '/2023/09/22/manufacturing-transportation-gains-lift-construction-starts',
                destination: '/',
                permanent: true,
            },
            {
                source:
                    '/2023/09/22/manufacturing-transportation-gains-lift-construction-starts/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/advocacy/air-quality/',
                destination: '/advocacy',
                permanent: true,
            },
            {
                source: '/news-media/3/',
                destination: '/news-media?page=3',
                permanent: true,
            },
            {
                source: '/uploads/sites/1/AGC-Micro_Slurry-Seal-Guide.pdf',
                destination: '/',
                permanent: true,
            }
        ]
    },
}

export default nextConfig
