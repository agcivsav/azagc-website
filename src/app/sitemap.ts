import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://www.azagc.org', changeFrequency: 'daily', priority: 1.0, lastModified: now },
    { url: 'https://www.azagc.org/membership/', changeFrequency: 'weekly', priority: 0.95, lastModified: now },
    { url: 'https://www.azagc.org/membership/contractor/', changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: 'https://www.azagc.org/membership/affiliate/', changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: 'https://www.azagc.org/membership/ycf/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/membership/benefits/', changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: 'https://www.azagc.org/membership/dues/', changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/join/', changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/education-training/', changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/education-training/osha-training/', changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/education-training/construction-apprenticeship-arizona/', changeFrequency: 'monthly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/education-training/apprenticeship-programs/', changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: 'https://www.azagc.org/education-training/workforce-development-programs/', changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: 'https://www.azagc.org/education-training/agc-of-america-education/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/advocacy/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/advocacy/policy-priorities/', changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: 'https://www.azagc.org/advocacy/take-action/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/events/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/news-media/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/resources/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/resources/construction-safety-resources/', changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: 'https://www.azagc.org/resources/arizona-infrastructure-projects/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/resources/workforce-shortage-solutions/', changeFrequency: 'monthly', priority: 0.75, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/', changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/arizona-construction-outlook/', changeFrequency: 'weekly', priority: 0.85, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/prevailing-wage-arizona/', changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/contractor-licensing-arizona/', changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/safety/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/industry-resources/labor-hr/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/about/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/about/our-team/', changeFrequency: 'monthly', priority: 0.65, lastModified: now },
    { url: 'https://www.azagc.org/about/committees/', changeFrequency: 'monthly', priority: 0.6, lastModified: now },
    { url: 'https://www.azagc.org/contact/', changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: 'https://www.azagc.org/privacy-policy/', changeFrequency: 'yearly', priority: 0.3, lastModified: now },
    { url: 'https://www.azagc.org/accessibility-statement/', changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ]

  return staticRoutes
}
