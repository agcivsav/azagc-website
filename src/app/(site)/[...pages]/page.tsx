import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import NewsGridSection from "@/components/sections/NewsGridSection";
import { safeFetch } from "@/lib/sanity";
import {
  IAwardSection,
  ICarouselSection,
  ICommitteesSection,
  ICTABand,
  IFeaturesSection,
  IImageContent,
  INewsSection,
  IPage,
  IPhotoGalleriesSection,
  IResourceLinksSection,
  ISection,
  IServicesSection,
  ISimpleContent,
  ISplitContentSection,
  ISplitImagesSection,
  ITabsSection,
  ITeamSectionByRole,
  ITestimonialsSection,
  IVideoSection,
  IEmbedPanelsSection,
  ITabsTestimonialSection,
} from "@/types/common";
import SimpleContent from "@/components/sections/SimpleContent";
import ImageContent from "@/components/sections/ImageContent";
import SplitImagesSection from "@/components/sections/SplitImages";
import ResourceLinksSection from "@/components/sections/ResourceLinks";
import AwardsListSection from "@/components/sections/AwardWinners";
import VideoSection from "@/components/sections/VideoSection";
import SplitContentSection from "@/components/sections/SplitContent";
import TabsSection from "@/components/sections/TabsSection";
import FeaturesSection from "@/components/sections/Features";
import CommitteeCards from "@/components/sections/CommitteeCards";
import CTABand from "@/components/sections/CTABand";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamByRole from "@/components/sections/TeamByRole";
import { GalleryCarouselSection } from "@/components/sections/GalleryCarouselSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PhotoGalleriesSection from "@/components/sections/PhotoGalleriesSection";
import EmbedPanelsSection from "@/components/sections/EmbedPanelsSection";
import TabsTestimonialSection from "@/components/sections/TabsTestimonialSection";

export const metadata: Metadata = {
  title: "About AZAGC | Arizona Chapter AGC Since 1934",
  description:
    "Learn about AZAGC — the Arizona Chapter of the Associated General Contractors of America. Our history, mission, leadership, and impact since 1934.",
  alternates: { canonical: "https://www.azagc.org/about/" },
};

const FAQS = [
  {
    question: "What does AZAGC stand for?",
    answer:
      "AZAGC stands for Arizona Chapter of the Associated General Contractors of America. We are the Arizona affiliate of the national AGC organization.",
  },
  {
    question: "Where is AZAGC located?",
    answer:
      "AZAGC is located at 1825 W. Adams St., Phoenix, AZ 85007. You can reach us by phone at (602) 252-3926.",
  },
  {
    question: "How is AZAGC different from other construction associations?",
    answer:
      "AZAGC is the only Arizona construction association with full-time Capitol lobbyists, a DOL-registered apprenticeship program, and 90 years of continuous operation. We are part of the AGC of America national network with 27,000+ member companies.",
  },
  {
    question: "Is AZAGC a nonprofit?",
    answer:
      "Yes. AZAGC is a nonprofit trade association organized under Section 501(c)(6) of the Internal Revenue Code.",
  },
];

const PAGE_QUERY = `
*[_type == "page" && slug.current == $slug][0]{
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset-> {
        url
      }
    },
    noIndex
  },
  title,
  slug,
  hero {
    title,
    subtitle,
    backgroundImage {
        asset-> {
          url
        }
    }
  },
  pageBuilderSections[]{
    _type,
    _key,
    _type == "featuresSection" => {
        sectionTitle,
        description,
        items[] {
            title,
            description,
        },
        columns,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "contentSection" => {
        heading,
        body,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button3 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "imageContent" => {
        heading,
        body,
        image {
            asset-> {
                url
            }
        },
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button3 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "videoSection" => {
        heading,
        body,
        videoFile {
            asset-> {
                url
            }
        }
    },
    _type == "splitImagesSection" => {
        heading,
        leftImage {
            asset-> {
                url
            }
        },
        rightImage {
            asset-> {
                url
            }
        },
        leftCaption,
        rightCaption
    },
    _type == "awardSection" => {
        heading,
        awards[] {
            name,
            awardTitle,
            company,
            image {
                asset-> {
                    url,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            }
        }
    },
    _type == "resourceLinksSection" => {
        body,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        resourceGroups[] {
            title,
            links[] {
                label,
                url,
            }
        }
    },
    _type == "splitContentSection" => {
        heading,
        body,
        details,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "teamSectionByRole" => {
        sectionTitle,
        description,
        teamByRole[] {
            role,
            members[]-> {
                name,
                title,
                companyName,
                 button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
                photo {
                    asset-> {
                        url
                    }
                }
            }
        },
        columns,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "servicesSection" => {
        sectionTitle,
        description,
        items[] {
            image {
                asset-> {
                    url
                }
            },
            title,
            button {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        columns,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "newsSection" => {
        heading,
        items[]-> {
            _type,
            _key,
            _type == "newsArticle" => {
                title,
                slug,
                excerpt,
                publishedAt,
                featuredImage {
                    asset-> {
                        url
                    }
                }
            },
            _type == "newsMediaPolicies" => {
                title,
                slug,
                excerpt,
            }
        }
    },
    _type == "formSection" => {
        sectionTitle,
        description,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        formTitle,
        formSubtitle,
        formSubmitLabel,
        formId,
    },
    _type == "committeesSection" => {
        sectionTitle,
        description,
        committees[] -> {
            _key,
            title,
            slug,
            thumbnailImage {
                asset-> {
                    url
                }
            }
        },
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "tabsSection" => {
        heading,
        "intro": intro[]{
            ...,
            _type == "image" => {
                ...,
                asset->{
                    _id,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            },
            _type == "button" => {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        tabs[] {
            title,
            "content": content[]{
                ...,
                _type == "image" => {
                    ...,
                    asset->{
                        _id,
                        metadata {
                            dimensions {
                                width,
                                height
                            }
                        }
                    }
                },
                _type == "button" => {
                    label,
                    btnType,
                    link,
                    upload {
                        asset-> {
                            url
                        }
                    }
                }
            },
            image {
                asset-> {
                    url
                }
            },
            entries[] {
                "content": content[]{
                    ...,
                    _type == "image" => {
                        ...,
                        asset->{
                            _id,
                            metadata {
                                dimensions {
                                    width,
                                    height
                                }
                            }
                        }
                    },
                    _type == "button" => {
                        label,
                        btnType,
                        link,
                        upload {
                            asset-> {
                                url
                            }
                        }
                    }
                },
                link,
                logo {
                    asset-> {
                        url
                    }
                }
            }
        }
    },
    _type == "tabsTestimonialSection" => {
        heading,
        "intro": intro[]{
            ...,
            _type == "image" => {
                ...,
                asset->{
                    _id,
                    metadata {
                        dimensions {
                            width,
                            height
                        }
                    }
                }
            },
            _type == "button" => {
                label,
                btnType,
                link,
                upload {
                    asset-> {
                        url
                    }
                }
            }
        },
        tabs[] {
            title,
            testimonials[]-> {
                _id,
                name,
                designation,
                companyLogo {
                    asset-> {
                        url,
                        metadata {
                            dimensions {
                                width,
                                height
                            }
                        }
                    }
                },
                quote
            }
        }
    },
    _type == "ctaBand" => {
        headline,
        subtext,
        button {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        },
        button2 {
            label,
            btnType,
            link,
            upload {
                asset-> {
                    url
                }
            }
        }
    },
    _type == "carouselSection" => {
      heading,
      intro,
      slides[] {
        alt,
        caption,
        "imageUrl": image.asset->url,
        image,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },
    _type == "testimonialsSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      testimonials[]->{
        _id,
        name,
        designation,
        companyLogo {
          asset-> {
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        quote
      }
    },
    _type == "photoGalleriesSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      galleries[]{
        title,
        url,
        coverImage {
          asset-> {
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    },
    _type == "embedPanelsSection" => {
      heading,
      "intro": intro[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        _type == "button" => {
          label,
          btnType,
          link,
          upload {
            asset-> {
              url
            }
          }
        }
      },
      panels[]{
        label,
        embedUrl
      }
    }
  }
}
`;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ pages: string[] }>;
  searchParams: Promise<{ category?: string; month?: string; year?: string }>;
}) {
  const pageParams = await params;
  const [pageData] = await Promise.all([
    safeFetch<IPage | null>(PAGE_QUERY, {
      slug: pageParams.pages.join("/"),
    }),
  ]);

  const sections = pageData?.pageBuilderSections ?? [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.azagc.org" },
          {
            name: pageParams.pages.join("/"),
            url: `https://www.azagc.org/${pageParams.pages.join("/")}`,
          },
        ]}
      />

      <PageBuilderHero title={pageData?.title ?? ""} hero={pageData?.hero} />
      {sections.map((section: ISection, index: number) => {
        const key = section._key ?? `${section._type}-${index}`;

        if (section._type === "contentSection") {
          return (
            <SimpleContent key={key} content={section as ISimpleContent} />
          );
        }
        if (section._type === "imageContent") {
          return (
            <ImageContent
              key={key}
              content={section as IImageContent}
              reverse={index % 2 === 0}
            />
          );
        }
        if (section._type === "splitImagesSection") {
          return (
            <SplitImagesSection
              key={key}
              content={section as ISplitImagesSection}
            />
          );
        }
        if (section._type === "resourceLinksSection") {
          return (
            <ResourceLinksSection
              key={key}
              content={section as IResourceLinksSection}
            />
          );
        }
        if (section._type === "awardSection") {
          return (
            <AwardsListSection key={key} content={section as IAwardSection} />
          );
        }
        if (section._type === "videoSection") {
          return <VideoSection key={key} content={section as IVideoSection} />;
        }
        if (section._type === "splitContentSection") {
          return (
            <SplitContentSection
              key={key}
              content={section as ISplitContentSection}
              reverse={index % 2 === 0}
            />
          );
        }
        if (section._type === "tabsSection") {
          return <TabsSection key={key} content={section as ITabsSection} />;
        }
        if (section._type === "tabsTestimonialSection") {
          return (
            <TabsTestimonialSection
              key={key}
              content={section as ITabsTestimonialSection}
            />
          );
        }
        if (section._type === "featuresSection") {
          return (
            <FeaturesSection key={key} content={section as IFeaturesSection} />
          );
        }
        if (section._type === "committeesSection") {
          return (
            <CommitteeCards key={key} content={section as ICommitteesSection} />
          );
        }
        if (section._type === "ctaBand") {
          return <CTABand key={key} content={section as ICTABand} />;
        }
        if (section._type === "servicesSection") {
          return (
            <ServicesSection key={key} content={section as IServicesSection} />
          );
        }
        if (section._type === "teamSectionByRole") {
          return (
            <TeamByRole key={key} content={section as ITeamSectionByRole} />
          );
        }
        if (section._type === "carouselSection") {
          return (
            <GalleryCarouselSection
              key={key}
              content={section as ICarouselSection}
            />
          );
        }
        if (section._type === "newsSection") {
          return (
            <NewsGridSection
              key={key}
              heading={(section as INewsSection).heading ?? null}
              articles={(section as INewsSection).items.map((item) => ({
                headline: item.title,
                slug: item.slug?.current ?? "",
                excerpt: item.excerpt,
                href:
                  item._type === "newsArticle"
                    ? `/news-media/${item.slug?.current ?? ""}`
                    : `/news-media/policies/${item.slug?.current ?? ""}`,
                publishedAt: null,
              }))}
            />
          );
        }
        if (section._type === "testimonialsSection") {
          return (
            <TestimonialsSection
              key={key}
              content={section as ITestimonialsSection}
            />
          );
        }
        if (section._type === "photoGalleriesSection") {
          return (
            <PhotoGalleriesSection
              key={key}
              content={section as IPhotoGalleriesSection}
            />
          );
        }
        if (section._type === "embedPanelsSection") {
          return (
            <EmbedPanelsSection
              key={key}
              content={section as IEmbedPanelsSection}
            />
          );
        }
        // if (section._type === "teamImageCardSection") {
        //   const cardItems = (section.items ?? [])
        //     .filter((i): i is NonNullable<typeof i> => !!i?.heading)
        //     .map((i) => ({
        //       imageUrl: buildImageUrl(i.image),
        //       heading: i.heading!,
        //       subheading: i.subheading ?? null,
        //       url: i.url ?? null,
        //     }));
        //   return (
        //     <TeamImageCardGrid
        //       key={key}
        //       section={{
        //         sectionTitle: section.sectionTitle ?? "",
        //         description: section.description ?? null,
        //         columns: section.columns ?? "3",
        //         ctaLabel: section.ctaLabel ?? null,
        //         ctaHref: section.ctaHref ?? null,
        //         items: cardItems,
        //       }}
        //     />
        //   );
        // }
        // if (section._type === "pageBuilderAwardWinnersList") {
        //   const winnerItems = (section.items ?? [])
        //     .filter((i): i is NonNullable<typeof i> => !!i?.companyName)
        //     .map((i) => ({
        //       companyName: i.companyName!,
        //       details: i.details ?? null,
        //     }));
        //   return (
        //     <AwardWinnersListSection
        //       key={key}
        //       heading={section.heading ?? ""}
        //       items={winnerItems}
        //     />
        //   );
        // }
        // if (section._type === "pageBuilderNewsGrid") {
        //   const limit = section.limit ?? 24;
        //   const manualItems = section.items ?? [];
        //   const gridArticles = manualItems.some(
        //     (item) => item?.headline ?? item?.articleHeadline,
        //   )
        //     ? manualItems
        //         .filter((item) => item?.headline ?? item?.articleHeadline)
        //         .map((item) => ({
        //           headline: item.headline ?? item.articleHeadline ?? "",
        //           slug: item.articleSlug ?? "",
        //           publishedAt:
        //             item.publishedAt ?? item.articlePublishedAt ?? null,
        //           excerpt: item.excerpt ?? item.articleExcerpt ?? null,
        //           href: item.articleSlug
        //             ? `/news-media/${item.articleSlug}`
        //             : (item.url ?? undefined),
        //         }))
        //     : articles.slice(0, limit).map((a) => ({
        //         headline: a.headline,
        //         slug: a.slug,
        //         publishedAt: a.publishedAt,
        //         excerpt: a.excerpt,
        //       }));
        //   return (
        //     <NewsGridSection
        //       key={key}
        //       articles={gridArticles}
        //       heading={section.heading ?? null}
        //     />
        //   );
        // }
        // if (section._type === "pageBuilderEventsList") {
        //   return (
        //     <EventsListSection
        //       key={key}
        //       events={events}
        //       filteredEvents={filtered}
        //       categories={categories}
        //       months={months.map((m) => ({
        //         value: String(m),
        //         label: MONTH_NAMES[m] ?? "",
        //       }))}
        //       years={years.map((y) => ({
        //         value: String(y),
        //         label: String(y),
        //       }))}
        //       currentCategory={params.category ?? ""}
        //       currentMonth={params.month ?? ""}
        //       currentYear={params.year ?? ""}
        //       heading={section.heading ?? null}
        //     />
        //   );
        // }

        return null;
      })}
    </>
  );
}
