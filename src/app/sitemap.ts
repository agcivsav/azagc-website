import type { MetadataRoute } from 'next'
import { safeFetch } from '@/lib/sanity'

const BASE_URL = 'https://www.azagc.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1.0, lastModified: now },
    { url: `${BASE_URL}/membership/`, changeFrequency: 'weekly', priority: 0.95, lastModified: now },
    { url: `${BASE_URL}/membership/contractor/`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/affiliate/`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/ycf/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/membership/benefits/`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/dues/`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/join/`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/osha-training/`, changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/construction-apprenticeship-arizona/`, changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/apprenticeship-programs/`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/education-training/workforce-development-programs/`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/education-training/agc-of-america-education/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/advocacy/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/advocacy/policy-priorities/`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/advocacy/take-action/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/events/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/news-media/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/resources/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/resources/construction-safety-resources/`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/resources/arizona-infrastructure-projects/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/resources/workforce-shortage-solutions/`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/industry-resources/`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/arizona-construction-outlook/`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/industry-resources/prevailing-wage-arizona/`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/contractor-licensing-arizona/`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/safety/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/industry-resources/labor-hr/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/about/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/about/our-team/`, changeFrequency: 'monthly', priority: 0.65, lastModified: now },
    { url: `${BASE_URL}/about/committees/`, changeFrequency: 'monthly', priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/contact/`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/privacy-policy/`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
    { url: `${BASE_URL}/accessibility-statement/`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ]

  // Dynamic Sanity routes — only runs when Sanity is properly configured
  let eventRoutes: MetadataRoute.Sitemap = []
  let newsRoutes: MetadataRoute.Sitemap = []

  try {
    const [events, articles] = await Promise.all([
      safeFetch<{ slug: string; date: string }[]>(
        `*[_type == "event" && defined(slug.current)]{ "slug": slug.current, date }`
      ),
      safeFetch<{ slug: string; publishedAt: string }[]>(
        `*[_type == "newsArticle" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
      ),
    ])

    if (events) {
      eventRoutes = events.map((e) => ({
        url: `${BASE_URL}/events/${e.slug}/`,
        lastModified: e.date ? new Date(e.date) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }

    if (articles) {
      newsRoutes = articles.map((a) => ({
        url: `${BASE_URL}/news-media/${a.slug}/`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (err) {
    console.error('[sitemap] Dynamic route fetch failed:', err)
  }

  return [...staticRoutes, ...eventRoutes, ...newsRoutes]
}
