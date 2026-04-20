import type { MetadataRoute } from 'next'
import { safeFetch } from '@/lib/sanity'

const BASE_URL = 'https://azagc.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, changeFrequency: 'daily', priority: 1.0, lastModified: now },
    { url: `${BASE_URL}/membership`, changeFrequency: 'weekly', priority: 0.95, lastModified: now },
    { url: `${BASE_URL}/membership/contractor`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/affiliate`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/ycf`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/membership/member-directory`, changeFrequency: 'weekly', priority: 0.72, lastModified: now },
    { url: `${BASE_URL}/membership/benefits`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${BASE_URL}/membership/dues`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/join`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/lp/membership`, changeFrequency: 'weekly', priority: 0.82, lastModified: now },
    { url: `${BASE_URL}/lp/apprenticeship`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/lp/contractor-membership`, changeFrequency: 'weekly', priority: 0.82, lastModified: now },
    { url: `${BASE_URL}/lp/supplier-membership`, changeFrequency: 'weekly', priority: 0.82, lastModified: now },
    { url: `${BASE_URL}/education-training`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/osha-training`, changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/construction-apprenticeship-arizona`, changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/education-training/apprenticeship-programs`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/education-training/workforce-development-programs`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/education-training/agc-of-america-education`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/advocacy`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/advocacy/policy-priorities`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/advocacy/take-action`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/events`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/events/events-calendar`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/news-media`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/news-media/policies`, changeFrequency: 'monthly', priority: 0.65, lastModified: now },
    { url: `${BASE_URL}/resources`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/resources/construction-safety-resources`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/resources/arizona-infrastructure-projects`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/resources/workforce-shortage-solutions`, changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: `${BASE_URL}/industry-resources`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/arizona-construction-outlook`, changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: `${BASE_URL}/industry-resources/prevailing-wage-arizona`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/contractor-licensing-arizona`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${BASE_URL}/industry-resources/safety`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/industry-resources/labor-hr`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/about/our-team`, changeFrequency: 'monthly', priority: 0.65, lastModified: now },
    { url: `${BASE_URL}/about/committees`, changeFrequency: 'monthly', priority: 0.6, lastModified: now },
    { url: `${BASE_URL}/strategicplanning`, changeFrequency: 'monthly', priority: 0.62, lastModified: now },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
    { url: `${BASE_URL}/accessibility-statement`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ]

  // Dynamic Sanity routes — only runs when Sanity is properly configured
  let eventRoutes: MetadataRoute.Sitemap = []
  let newsRoutes: MetadataRoute.Sitemap = []
  let policyRoutes: MetadataRoute.Sitemap = []
  let committeeRoutes: MetadataRoute.Sitemap = []

  try {
    const [events, articles, policies, committees] = await Promise.all([
      safeFetch<{ slug: string; date: string }[]>(
        `*[_type == "agcEvent" && defined(slug.current)]{ "slug": slug.current, "date": startDate }`
      ),
      safeFetch<{ slug: string; publishedAt: string }[]>(
        `*[_type == "newsArticle" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
      ),
      safeFetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "newsMediaPolicies" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
      ),
      safeFetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "committee" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
      ),
    ])

    if (events) {
      eventRoutes = events.map((e) => ({
        url: `${BASE_URL}/events/events-calendar/${e.slug}`,
        lastModified: e.date ? new Date(e.date) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }

    if (articles) {
      newsRoutes = articles.map((a) => ({
        url: `${BASE_URL}/news-media/${a.slug}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }

    if (policies) {
      policyRoutes = policies.map((p) => ({
        url: `${BASE_URL}/news-media/policies/${p.slug}`,
        lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      }))
    }

    if (committees) {
      committeeRoutes = committees.map((c) => ({
        url: `${BASE_URL}/about/committees/${c.slug}`,
        lastModified: c._updatedAt ? new Date(c._updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      }))
    }
  } catch (err) {
    console.error('[sitemap] Dynamic route fetch failed:', err)
  }

  return [...staticRoutes, ...eventRoutes, ...newsRoutes, ...policyRoutes, ...committeeRoutes]
}
