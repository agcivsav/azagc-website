import { safeFetch } from '@/lib/sanity'
import { newsSearchGlobPattern, sanitizeNewsSearchQuery } from '@/lib/newsSearch'

/** Shared projection for news listing cards (news index + search). */
export const NEWS_LIST_CARD_PROJECTION = `
  headline,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
`

const NEWS_SEARCH_FILTER = `(
  title match $pattern ||
  (defined(headline) && headline match $pattern) ||
  (defined(excerpt) && excerpt match $pattern) ||
  (defined(body) && pt::text(body) match $pattern)
)`

/** All articles, newest first, paginated. */
export const NEWS_LIST_ALL_QUERY = `*[_type == "newsArticle"] | order(publishedAt desc) [$start...$end]{${NEWS_LIST_CARD_PROJECTION}}`

export const NEWS_LIST_ALL_COUNT_QUERY = `count(*[_type == "newsArticle"])`

/** Articles matching search glob pattern, paginated. */
export const NEWS_LIST_SEARCH_QUERY = `*[_type == "newsArticle" && ${NEWS_SEARCH_FILTER}] | order(publishedAt desc) [$start...$end]{${NEWS_LIST_CARD_PROJECTION}}`

export const NEWS_LIST_SEARCH_COUNT_QUERY = `count(*[_type == "newsArticle" && ${NEWS_SEARCH_FILTER}])`

export type NewsListCard = {
  headline?: string | null
  title?: string | null
  slug: string
  publishedAt: string | null
  excerpt: string | null
}

export type NewsMediaLandingPageData = {
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: unknown
    noIndex?: boolean | null
  } | null
  hero?: {
    title?: string | null
    subtitle?: string | null
    backgroundImage?: { asset?: { url?: string } } | null
  } | null
}

export const NEWS_MEDIA_LANDING_PAGE_QUERY = `*[_type == "newsMediaPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  },
  hero{
    title,
    subtitle,
    backgroundImage{
      asset->{
        _id,
        url,
        metadata{dimensions}
      }
    }
  }
}`

export function fetchNewsMediaLandingPageData(): Promise<NewsMediaLandingPageData | null> {
  return safeFetch<NewsMediaLandingPageData>(NEWS_MEDIA_LANDING_PAGE_QUERY)
}

export async function fetchNewsArticleListForIndex(
  qParam: string | string[] | undefined,
  start: number,
  end: number,
): Promise<{
  searchQuery: string | null
  totalCount: number
  articles: NewsListCard[]
}> {
  const qRaw = Array.isArray(qParam) ? qParam[0] : qParam
  const searchQuery = sanitizeNewsSearchQuery(qRaw)
  const pattern = searchQuery ? newsSearchGlobPattern(searchQuery) : null
  const listParams = pattern ? { start, end, pattern } : { start, end }
  const [totalCount, articles] = await Promise.all([
    safeFetch<number>(
      pattern ? NEWS_LIST_SEARCH_COUNT_QUERY : NEWS_LIST_ALL_COUNT_QUERY,
      pattern ? { pattern } : {},
    ),
    safeFetch<NewsListCard[]>(
      pattern ? NEWS_LIST_SEARCH_QUERY : NEWS_LIST_ALL_QUERY,
      listParams,
    ),
  ])
  return {
    searchQuery,
    totalCount: typeof totalCount === 'number' ? totalCount : 0,
    articles: Array.isArray(articles) ? articles : [],
  }
}
