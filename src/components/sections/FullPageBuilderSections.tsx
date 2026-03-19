import PageBuilderHero from "@/components/sections/PageBuilderHero";
import PageBuilderTextBlock from "@/components/sections/SimpleContent";
import PageBuilderTwoColumn from "@/components/sections/ImageContent";
import PageBuilderTwoImages from "@/components/sections/SplitImages";
import PageBuilderResourceLinks from "@/components/sections/ResourceLinks";
import type { ResourceGroup } from "@/components/sections/ResourceLinks";
import PageBuilderStaffList from "@/components/sections/AwardWinners";
import PageBuilderVideo from "@/components/sections/VideoSection";
import PageBuilderCourseCard from "@/components/sections/SplitContent";
import PageBuilderTabs from "@/components/sections/TabsSection";
import NewsGridSection from "@/components/sections/NewsGridSection";
import EventsListSection from "@/components/sections/EventsListSection";
import TeamImageCardGrid from "@/components/sections/ServicesSection";
import AwardWinnersListSection from "@/components/sections/Features";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";

export type FullPageBuilderSection = {
  _type: string;
  _key?: string;
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: unknown;
  heading?: string | null;
  body?: string | null;
  imagePosition?: string | null;
  image?: unknown;
  leftImage?: unknown;
  rightImage?: unknown;
  leftCaption?: string | null;
  rightCaption?: string | null;
  ctas?: Array<{ label?: string | null; href?: string | null }> | null;
  resourceGroups?: Array<{
    title?: string | null;
    links?: Array<{ label?: string | null; url?: string | null }> | null;
  }> | null;
  items?: Array<{
    name?: string | null;
    title?: string | null;
    company?: string | null;
    role?: string | null;
    headline?: string | null;
    publishedAt?: string | null;
    excerpt?: string | null;
    articleSlug?: string | null;
    articleHeadline?: string | null;
    articlePublishedAt?: string | null;
    articleExcerpt?: string | null;
    url?: string | null;
    image?: unknown;
    heading?: string | null;
    subheading?: string | null;
    companyName?: string | null;
    details?: string | null;
  }> | null;
  videoFile?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
  } | null;
  details?: string | null;
  limit?: number | null;
  sectionTitle?: string | null;
  description?: string | null;
  columns?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  intro?: string | null;
  tabs?: Array<{
    title?: string | null;
    content?: string | null;
    image?: unknown;
  }> | null;
};

export type FullPageBuilderContext = {
  buildImageUrl: (image: unknown) => string | null;
  defaultTitle: string;
  defaultSubtitle: string;
  articles: Array<{
    headline: string;
    slug: string;
    publishedAt: string | null;
    excerpt: string | null;
  }>;
  events: Array<{
    title: string;
    slug: string;
    startDate: string;
    category: string | null;
  }>;
  filtered: Array<{
    title: string;
    slug: string;
    startDate: string;
    category: string | null;
  }>;
  categories: string[];
  months: Array<{ value: string; label: string }>;
  years: Array<{ value: string; label: string }>;
  searchParams: { category?: string; month?: string; year?: string };
};

interface FullPageBuilderSectionsProps {
  sections: FullPageBuilderSection[];
  context: FullPageBuilderContext;
}

export default function FullPageBuilderSections({
  sections,
  context,
}: FullPageBuilderSectionsProps) {
  const {
    buildImageUrl,
    defaultTitle,
    defaultSubtitle,
    articles,
    events,
    filtered,
    categories,
    months,
    years,
    searchParams,
  } = context;

  return (
    <>
      {sections.map((section, i) => {
        const key = section._key ?? `${section._type}-${i}`;
        if (section._type === "hero") {
          return (
            <PageBuilderHero
              key={key}
              title={section.title ?? defaultTitle}
              subtitle={section.subtitle ?? null}
              backgroundImageUrl={buildImageUrl(section.backgroundImage)}
            />
          );
        }
        if (section._type === "pageBuilderTextBlock") {
          return (
            <PageBuilderTextBlock
              key={key}
              heading={section.heading ?? ""}
              body={section.body ?? null}
              ctaLabel={section.ctaLabel ?? null}
              ctaHref={section.ctaHref ?? null}
            />
          );
        }
        if (section._type === "pageBuilderTwoColumn") {
          const ctas = (section.ctas ?? [])
            .filter(
              (c): c is { label: string; href: string } =>
                !!c?.label && !!c?.href,
            )
            .map((c) => ({ label: c.label, href: c.href }));
          return (
            <PageBuilderTwoColumn
              key={key}
              imagePosition={
                section.imagePosition === "right" ? "right" : "left"
              }
              heading={section.heading ?? null}
              body={section.body ?? null}
              imageUrl={buildImageUrl(section.image)}
              ctas={ctas}
            />
          );
        }
        if (section._type === "pageBuilderTwoImages") {
          return (
            <PageBuilderTwoImages
              key={key}
              heading={section.heading ?? null}
              leftImageUrl={buildImageUrl(section.leftImage)}
              leftCaption={section.leftCaption ?? null}
              rightImageUrl={buildImageUrl(section.rightImage)}
              rightCaption={section.rightCaption ?? null}
            />
          );
        }
        if (section._type === "pageBuilderResourceLinks") {
          const groups: ResourceGroup[] = (section.resourceGroups ?? [])
            .filter((g): g is NonNullable<typeof g> => !!g?.title)
            .map((g) => ({
              title: g.title!,
              links: (g.links ?? [])
                .filter(
                  (l): l is { label: string; url: string } =>
                    !!l?.label && !!l?.url,
                )
                .map((l) => ({ label: l.label, url: l.url })),
            }));
          return (
            <PageBuilderResourceLinks
              key={key}
              body={section.body ?? null}
              ctaLabel={section.ctaLabel ?? null}
              ctaHref={section.ctaHref ?? null}
              resourceGroups={groups}
            />
          );
        }
        if (section._type === "pageBuilderStaffList") {
          const staffItems = (section.items ?? [])
            .filter((x): x is NonNullable<typeof x> => !!x?.name)
            .map((x) => ({
              name: x.name!,
              title: x.title ?? null,
              company: x.company ?? null,
              role: x.role ?? null,
            }));
          return (
            <PageBuilderStaffList
              key={key}
              heading={section.heading ?? ""}
              items={staffItems}
            />
          );
        }
        if (
          section._type === "pageBuilderVideo" &&
          section.videoFile?.asset?.url
        ) {
          return (
            <PageBuilderVideo
              key={key}
              heading={section.heading ?? null}
              body={section.body ?? null}
              videoUrl={section.videoFile.asset.url}
            />
          );
        }
        if (section._type === "pageBuilderCourseCard") {
          return (
            <PageBuilderCourseCard
              key={key}
              heading={section.heading ?? ""}
              body={section.body ?? null}
              details={section.details ?? null}
              ctaLabel={section.ctaLabel ?? null}
              ctaHref={section.ctaHref ?? null}
            />
          );
        }
        if (section._type === "pageBuilderNewsGrid") {
          const limit = section.limit ?? 24;
          const manualItems = section.items ?? [];
          const gridArticles = manualItems.some(
            (item) => item?.headline ?? item?.articleHeadline,
          )
            ? manualItems
                .filter((item) => item?.headline ?? item?.articleHeadline)
                .map((item) => ({
                  headline: item.headline ?? item.articleHeadline ?? "",
                  slug: item.articleSlug ?? "",
                  publishedAt:
                    item.publishedAt ?? item.articlePublishedAt ?? null,
                  excerpt: item.excerpt ?? item.articleExcerpt ?? null,
                  href: item.articleSlug
                    ? `/news-media/${item.articleSlug}`
                    : (item.url ?? undefined),
                }))
            : articles.slice(0, limit).map((a) => ({
                headline: a.headline,
                slug: a.slug,
                publishedAt: a.publishedAt,
                excerpt: a.excerpt,
              }));
          return (
            <NewsGridSection
              key={key}
              articles={gridArticles}
              heading={section.heading ?? null}
            />
          );
        }
        if (section._type === "pageBuilderEventsList") {
          return (
            <EventsListSection
              key={key}
              events={events}
              filteredEvents={filtered}
              categories={categories}
              months={months}
              years={years}
              currentCategory={searchParams.category ?? ""}
              currentMonth={searchParams.month ?? ""}
              currentYear={searchParams.year ?? ""}
              heading={section.heading ?? null}
            />
          );
        }
        if (section._type === "pageBuilderTabs") {
          const tabItems = (section.tabs ?? [])
            .filter((t): t is NonNullable<typeof t> => !!t?.title)
            .map((t) => ({
              title: t.title!,
              content: t.content ?? null,
              imageUrl: buildImageUrl(t.image) ?? null,
            }));
          return (
            <PageBuilderTabs
              key={key}
              heading={section.heading ?? ""}
              intro={section.intro ?? null}
              tabs={tabItems}
            />
          );
        }
        if (section._type === "teamImageCardSection") {
          const cardItems = (section.items ?? [])
            .filter((i): i is NonNullable<typeof i> => !!i?.heading)
            .map((i) => ({
              imageUrl: buildImageUrl(i.image),
              heading: i.heading!,
              subheading: i.subheading ?? null,
              url: i.url ?? null,
            }));
          return (
            <TeamImageCardGrid
              key={key}
              section={{
                sectionTitle: section.sectionTitle ?? "",
                description: section.description ?? null,
                columns: section.columns ?? "3",
                ctaLabel: section.ctaLabel ?? null,
                ctaHref: section.ctaHref ?? null,
                items: cardItems,
              }}
            />
          );
        }
        if (section._type === "pageBuilderAwardWinnersList") {
          const winnerItems = (section.items ?? [])
            .filter((i): i is NonNullable<typeof i> => !!i?.companyName)
            .map((i) => ({
              companyName: i.companyName!,
              details: i.details ?? null,
            }));
          return (
            <AwardWinnersListSection
              key={key}
              heading={section.heading ?? ""}
              items={winnerItems}
            />
          );
        }
        return null;
      })}
    </>
  );
}
