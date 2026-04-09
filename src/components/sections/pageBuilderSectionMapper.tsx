import type { ReactNode } from "react";
import SimpleContent from "@/components/sections/SimpleContent";
import ImageContent from "@/components/sections/ImageContent";
import ImageCarouselContent from "@/components/sections/ImageCarouselContent";
import SplitImagesSection from "@/components/sections/SplitImages";
import ResourceLinksSection from "@/components/sections/ResourceLinks";
import AwardsListSection from "@/components/sections/AwardWinners";
import VideoSection from "@/components/sections/VideoSection";
import SplitContentSection from "@/components/sections/SplitContent";
import TabsSection from "@/components/sections/TabsSection";
import TabsTestimonialSection from "@/components/sections/TabsTestimonialSection";
import FeaturesSection from "@/components/sections/Features";
import CommitteeCards from "@/components/sections/CommitteeCards";
import CTABand from "@/components/sections/CTABand";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamByRole from "@/components/sections/TeamByRole";
import { GalleryCarouselSection } from "@/components/sections/GalleryCarouselSection";
import NewsGridSection from "@/components/sections/NewsGridSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PhotoGalleriesSection from "@/components/sections/PhotoGalleriesSection";
import EmbedPanelsSection from "@/components/sections/EmbedPanelsSection";
import FAQAccordion from "@/components/sections/FAQAccordion";
import PageBuilderFormSection from "@/components/sections/PageBuilderFormSection";
import SponsorLogosSection from "@/components/sections/SponsorLogosSection";
import type {
  IAwardSection,
  ICarouselSection,
  ICommitteesSection,
  ICTABand,
  IFAQSection,
  IFeaturesSection,
  IFormSection,
  IImageContent,
  IImageCarouselContent,
  INewsSection,
  IPhotoGalleriesSection,
  IResourceLinksSection,
  ISection,
  IServicesSection,
  ISimpleContent,
  ISplitContentSection,
  ISplitImagesSection,
  ITabsSection,
  ITabsTestimonialSection,
  ITeamSectionByRole,
  ITestimonialsSection,
  IVideoSection,
  IEmbedPanelsSection,
  ISponsorLogosSection,
} from "@/types/common";

export type PageBuilderRenderOptions = {
  affiliateSecondTextAnchorByKey?: Map<string, string>;
  imagePresentation?: "contain" | "crop";
};

export function mapPageBuilderSection(
  section: ISection,
  index: number,
  opts: PageBuilderRenderOptions,
): ReactNode {
  const key = section._key ?? `${section._type}-${index}`;
  const imagePresentation = opts.imagePresentation ?? "crop";
  const anchorMap = opts.affiliateSecondTextAnchorByKey;

  if (section._type === "contentSection") {
    return (
      <SimpleContent
        key={key}
        content={section as ISimpleContent}
        anchorId={anchorMap?.get(key)}
      />
    );
  }
  if (section._type === "imageContent") {
    return (
      <ImageContent
        key={key}
        content={section as IImageContent}
        reverse={index % 2 === 0}
        imagePresentation={imagePresentation}
      />
    );
  }
  if (section._type === "imageCarouselContent") {
    return (
      <ImageCarouselContent
        key={key}
        content={section as IImageCarouselContent}
        reverse={index % 2 === 0}
        imagePresentation={imagePresentation}
      />
    );
  }
  if (section._type === "splitImagesSection") {
    return (
      <SplitImagesSection key={key} content={section as ISplitImagesSection} />
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
    return <AwardsListSection key={key} content={section as IAwardSection} />;
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
    return <TeamByRole key={key} content={section as ITeamSectionByRole} />;
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
        articles={((section as INewsSection).items ?? []).map((item) => ({
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
  if (section._type === "faqSection") {
    if ((section as IFAQSection).enabled === false) return null;
    return (
      <FAQAccordion
        key={key}
        title={(section as IFAQSection).heading}
        items={(section as IFAQSection).items ?? []}
      />
    );
  }
  if (section._type === "formSection") {
    return (
      <PageBuilderFormSection key={key} content={section as IFormSection} />
    );
  }
  if (section._type === "sponsorLogosSection") {
    return (
      <SponsorLogosSection key={key} content={section as ISponsorLogosSection} />
    );
  }
  return null;
}
