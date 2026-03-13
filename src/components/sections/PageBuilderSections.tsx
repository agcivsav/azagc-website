import PageBuilderHero from "@/components/sections/PageBuilderHero";
import PageBuilderTextBlock from "@/components/sections/PageBuilderTextBlock";
import PageBuilderTwoColumn from "@/components/sections/PageBuilderTwoColumn";
import PageBuilderTwoImages from "@/components/sections/PageBuilderTwoImages";
import PageBuilderResourceLinks from "@/components/sections/PageBuilderResourceLinks";
import type { ResourceGroup } from "@/components/sections/PageBuilderResourceLinks";

export type IndustryResourcesSectionItem = {
  _type: string;
  _key?: string;
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: unknown;
  heading?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
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
};

export const INDUSTRY_RESOURCES_PAGE_QUERY_FRAGMENT = `
  sections[]{
    _type,
    _key,
    title,
    subtitle,
    backgroundImage,
    heading,
    body,
    ctaLabel,
    ctaHref,
    imagePosition,
    image,
    leftImage,
    rightImage,
    leftCaption,
    rightCaption,
    ctas[]{ label, href },
    resourceGroups[]{ title, links[]{ label, url } }
  }
`;

interface PageBuilderSectionsProps {
  sections: IndustryResourcesSectionItem[];
  buildImageUrl: (image: unknown) => string | null;
  defaultTitle: string;
  defaultSubtitle?: string;
}

export default function PageBuilderSections({
  sections,
  buildImageUrl,
  defaultTitle,
  defaultSubtitle = "",
}: PageBuilderSectionsProps) {
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
        return null;
      })}
    </>
  );
}
