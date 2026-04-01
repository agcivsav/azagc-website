import { formatEventDate } from "@/lib/utils";

const FEATURED_EXCERPT_MAX = 100;
const SIDEBAR_EXCERPT_MAX = 72;

export function truncateNewsExcerpt(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

export type AgcEventHomeFragment = {
  title?: string;
  slug?: string;
  startDate?: string;
  timezone?: string;
  category?: string | null;
  excerpt?: string | null;
};

export type NewsDocHomeFragment = {
  _type?: string;
  _id?: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string | null;
  publishedAt?: string | null;
  featuredImage?: unknown;
};

export type HomeNewsFeatured = {
  tag: string;
  title: string;
  excerpt: string;
  icon: string;
  imgSrc: string;
  imgAlt: string;
  href?: string;
};

export type HomeNewsSidebarItem = {
  tag: string;
  title: string;
  excerpt: string;
  href: string;
};

export function mapAgcEventToHomeCard(event: AgcEventHomeFragment) {
  const slug = event.slug?.trim();
  const title = event.title?.trim();
  if (!slug || !title || !event.startDate) return null;

  const { month, day } = formatEventDate(event.startDate, event.timezone);
  const tag =
    event.category?.split("/").pop()?.trim() ||
    event.category?.trim() ||
    "Event";

  return {
    month,
    day,
    tag,
    title,
    description: event.excerpt?.trim() || "",
    href: `/events/events-calendar/${slug}`,
  };
}

function newsHref(doc: NewsDocHomeFragment): string {
  const s = doc.slug?.current;
  if (!s) return "/news-media/";
  return doc._type === "newsMediaPolicies"
    ? `/news-media/policies/${s}`
    : `/news-media/${s}`;
}

function newsTag(doc: NewsDocHomeFragment): string {
  if (doc._type === "newsMediaPolicies") return "Policy";
  return "News";
}

export function mapNewsDocToSidebarItem(doc: NewsDocHomeFragment) {
  const title = doc.title?.trim();
  if (!title) return null;
  const raw = doc.excerpt?.trim() || "";
  return {
    tag: newsTag(doc),
    title,
    excerpt: truncateNewsExcerpt(raw, SIDEBAR_EXCERPT_MAX),
    href: newsHref(doc),
  };
}

export function buildHomepageEvents(
  referenced: AgcEventHomeFragment[] | null | undefined,
  legacy:
    | {
        month?: string;
        day?: string;
        tag?: string;
        title?: string;
        description?: string;
        href?: string;
      }[]
    | null
    | undefined,
  upcomingFallback: AgcEventHomeFragment[] | null | undefined,
) {
  const fromRefs = (referenced ?? [])
    .map((e) => mapAgcEventToHomeCard(e))
    .filter((x): x is NonNullable<typeof x> => x != null);

  if (fromRefs.length > 0) return fromRefs.slice(0, 3);

  const manual =
    legacy?.filter((e) => e.month && e.day && e.title).map((event) => ({
      month: event.month as string,
      day: event.day as string,
      tag: event.tag || "Event",
      title: event.title as string,
      description: event.description || "",
      href: event.href || "/events/events-calendar",
    })) ?? [];

  if (manual.length > 0) return manual;

  const fallback =
    (upcomingFallback ?? [])
      .map((e) => mapAgcEventToHomeCard(e))
      .filter((x): x is NonNullable<typeof x> => x != null) ?? [];

  return fallback.slice(0, 3);
}

/**
 * Left (featured) column: manual Sanity fields only (image URL, title, etc.).
 * Right column: news document references → else manual items → else latest articles.
 */
export function buildHomepageNews(
  newsRefs: NewsDocHomeFragment[] | null | undefined,
  legacyFeatured: {
    tag?: string;
    title?: string;
    excerpt?: string;
    icon?: string;
    imgSrc?: string;
    imgAlt?: string;
    href?: string;
  } | null,
  legacyItems:
    | { tag?: string; title?: string; excerpt?: string; href?: string }[]
    | null
    | undefined,
  latestFallback: NewsDocHomeFragment[] | null | undefined,
): {
  featured: HomeNewsFeatured | undefined;
  items: HomeNewsSidebarItem[] | undefined;
} {
  const fromRefs = (newsRefs ?? [])
    .filter((d) => d?.title?.trim())
    .map((d) => mapNewsDocToSidebarItem(d))
    .filter((x): x is HomeNewsSidebarItem => x != null);

  let items: HomeNewsSidebarItem[] | undefined =
    fromRefs.length > 0
      ? fromRefs
      : legacyItems
            ?.filter((item) => item.title)
            .map((item) => ({
              tag: item.tag || "News",
              title: item.title as string,
              excerpt: truncateNewsExcerpt(
                item.excerpt || "",
                SIDEBAR_EXCERPT_MAX,
              ),
              href: item.href || "/news-media/",
            })) ?? undefined;

  if (!items || items.length === 0) {
    const latest = (latestFallback ?? []).filter((d) => d.title?.trim());
    const mapped = latest
      .map((d) => mapNewsDocToSidebarItem(d))
      .filter((x): x is HomeNewsSidebarItem => x != null);
    items = mapped.length > 0 ? mapped.slice(0, 5) : undefined;
  }

  let featured: HomeNewsFeatured | undefined;
  if (legacyFeatured?.imgSrc && legacyFeatured.title) {
    featured = {
      tag: legacyFeatured.tag || "News",
      title: legacyFeatured.title,
      excerpt: truncateNewsExcerpt(
        legacyFeatured.excerpt || "",
        FEATURED_EXCERPT_MAX,
      ),
      icon: legacyFeatured.icon || "⚡",
      imgSrc: legacyFeatured.imgSrc,
      imgAlt:
        legacyFeatured.imgAlt || legacyFeatured.title || "Featured article",
      href: legacyFeatured.href || "/news-media/",
    };
  }

  const featuredHref = featured?.href?.replace(/\/$/, "") || "";
  if (featuredHref && items?.length) {
    items = items.filter(
      (i) => (i.href || "").replace(/\/$/, "") !== featuredHref,
    );
    if (items.length === 0) items = undefined;
  }

  return {
    featured,
    items,
  };
}
