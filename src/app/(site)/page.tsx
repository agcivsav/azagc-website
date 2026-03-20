export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ProofBar, { type ProofStat } from "@/components/sections/ProofBar";
import MembershipCards from "@/components/sections/MembershipCards";
import BenefitsSection from "@/components/sections/BenefitsSection";
import EventsGrid from "@/components/sections/EventsGrid";
import NewsGrid from "@/components/sections/NewsGrid";
import BottomCTA from "@/components/sections/BottomCTA";
import ExitIntentPopup from "@/components/conversion/ExitIntentPopup";
import ScrollTriggerCTA from "@/components/conversion/ScrollTriggerCTA";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { safeFetch, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "AZAGC — Arizona's Premier Construction Association Since 1934",
  description:
    "Arizona Chapter of the Associated General Contractors of America. Join 500+ contractors, suppliers and service providers building Arizona's future.",
  openGraph: {
    title: "AZAGC — Building Arizona Since 1934",
    description:
      "Arizona's oldest and most influential construction association. Join 500+ member firms.",
    type: "website",
    siteName: "AZAGC",
    url: "https://www.azagc.org",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://www.azagc.org/",
  },
};

const HOMEPAGE_QUERY = `
*[_type == "homePage"][0]{
  hero{
    title,
    subtitle,
    backgroundImage,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    stats[]{
      value,
      prefix,
      suffix,
      label
    }
  },
  promotionBar{
    title,
    body,
    buttonLabel,
    buttonHref
  },
  membershipSection{
    eyebrow,
    title,
    body,
    cards[]{
      title,
      href,
      description,
      image,
      imgAlt
    }
  },
  eventsSection{
    eyebrow,
    title,
    linkLabel,
    linkHref,
    events[]{
      month,
      day,
      tag,
      title,
      description,
      href
    }
  },
  newsSection{
    eyebrow,
    title,
    linkLabel,
    linkHref,
    featured{
      tag,
      title,
      excerpt,
      icon,
      imgSrc,
      imgAlt,
      href
    },
    items[]{
      tag,
      title,
      excerpt,
      href
    }
  },
  bottomCta{
    eyebrow,
    title,
    trustPoints,
    formHeadline,
    formSubheadline,
    formSubmitLabel
  },
  benefitsSection{
    eyebrow,
    title,
    body,
    benefits[]{
      title,
      description
    },
    quote{
      text,
      author,
      image,
      imageAlt
    }
  }
}
`;

type HomeHeroData = {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: unknown;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: ProofStat[];
};

type PromotionBarData = {
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

type MembershipSectionData = {
  eyebrow?: string;
  title?: string;
  body?: string;
  cards?: {
    title?: string;
    href?: string;
    description?: string;
    image?: unknown;
    imgAlt?: string;
  }[];
};

type EventsSectionData = {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  linkHref?: string;
  events?: {
    month?: string;
    day?: string;
    tag?: string;
    title?: string;
    description?: string;
    href?: string;
  }[];
};

type NewsSectionData = {
  eyebrow?: string;
  title?: string;
  linkLabel?: string;
  linkHref?: string;
  featured?: {
    tag?: string;
    title?: string;
    excerpt?: string;
    icon?: string;
    imgSrc?: string;
    imgAlt?: string;
    href?: string;
  } | null;
  items?:
    | {
        tag?: string;
        title?: string;
        excerpt?: string;
        href?: string;
      }[]
    | null;
};

type BottomCtaData = {
  eyebrow?: string;
  title?: string;
  trustPoints?: string[];
  formHeadline?: string;
  formSubheadline?: string;
  formSubmitLabel?: string;
};

type BenefitsSectionData = {
  eyebrow?: string;
  title?: string;
  body?: string;
  benefits?: {
    title?: string;
    description?: string;
  }[];
  quote?: {
    text?: string;
    author?: string;
    image?: unknown;
    imageAlt?: string;
  };
};

type HomePageData = {
  hero?: HomeHeroData;
  promotionBar?: PromotionBarData;
  membershipSection?: MembershipSectionData;
  eventsSection?: EventsSectionData;
  newsSection?: NewsSectionData;
  bottomCta?: BottomCtaData;
  benefitsSection?: BenefitsSectionData;
};

export default async function HomePage() {
  const data = await safeFetch<HomePageData>(HOMEPAGE_QUERY);
  console.log(data);

  const heroBackgroundImageUrl = data?.hero?.backgroundImage
    ? urlFor(data.hero.backgroundImage).width(1600).height(900).url()
    : undefined;

  const midCtaTitle = data?.promotionBar?.title ?? "";
  const midCtaBody = data?.promotionBar?.body ?? "";
  const midCtaButtonLabel = data?.promotionBar?.buttonLabel ?? "";
  const midCtaButtonHref = data?.promotionBar?.buttonHref ?? "";

  const membershipEyebrow = data?.membershipSection?.eyebrow ?? "";
  const membershipTitle = data?.membershipSection?.title ?? "";
  const membershipBody = data?.membershipSection?.body ?? "";

  const eventsEyebrow = data?.eventsSection?.eyebrow ?? "Upcoming Events";
  const eventsTitle = data?.eventsSection?.title ?? "Connect & Grow";
  const eventsLinkLabel =
    data?.eventsSection?.linkLabel ?? "View full calendar →";
  const eventsLinkHref = data?.eventsSection?.linkHref ?? "/events/";

  const newsEyebrow = data?.newsSection?.eyebrow ?? "Industry News";
  const newsTitle = data?.newsSection?.title ?? "Stay Informed";
  const newsLinkLabel = data?.newsSection?.linkLabel ?? "All news →";
  const newsLinkHref = data?.newsSection?.linkHref ?? "/news-media/";

  const bottomCtaEyebrow = data?.bottomCta?.eyebrow;
  const bottomCtaTitle = data?.bottomCta?.title;
  const bottomCtaTrustPoints = data?.bottomCta?.trustPoints;
  const bottomCtaFormHeadline = data?.bottomCta?.formHeadline;
  const bottomCtaFormSubheadline = data?.bottomCta?.formSubheadline;
  const bottomCtaFormSubmitLabel = data?.bottomCta?.formSubmitLabel;

  const membershipCards =
    data?.membershipSection?.cards && data.membershipSection.cards.length > 0
      ? data.membershipSection.cards
          .filter(
            (
              card,
            ): card is NonNullable<MembershipSectionData["cards"]>[number] =>
              !!card && !!card.title,
          )
          .map((card) => ({
            title: card.title as string,
            href: card.href || "#",
            description: card.description || "",
            imgSrc: card.image
              ? urlFor(card.image).width(600).height(400).fit("crop").url()
              : undefined,
            imgAlt: card.imgAlt || card.title || "",
          }))
      : undefined;
  const benefitsItems =
    data?.benefitsSection?.benefits && data.benefitsSection.benefits.length > 0
      ? data.benefitsSection.benefits
          .filter(
            (b): b is NonNullable<BenefitsSectionData["benefits"]>[number] =>
              !!b && !!b.title,
          )
          .map((b) => ({
            title: b.title as string,
            description: b.description || "",
          }))
      : undefined;

  const benefitsQuoteImageUrl = data?.benefitsSection?.quote?.image
    ? urlFor(data.benefitsSection.quote.image)
        .width(600)
        .height(800)
        .fit("crop")
        .url()
    : undefined;

  const eventsForGrid =
    data?.eventsSection?.events &&
    Array.isArray(data.eventsSection.events) &&
    data.eventsSection.events.length > 0
      ? data.eventsSection.events
          .filter(
            (
              event,
            ): event is NonNullable<EventsSectionData["events"]>[number] =>
              !!event && !!event.month && !!event.day && !!event.title,
          )
          .map((event) => ({
            month: event.month as string,
            day: event.day as string,
            tag: event.tag || "Event",
            title: event.title as string,
            description: event.description || "",
            href: event.href || "/events/",
          }))
      : undefined;

  const featuredSource = data?.newsSection?.featured ?? null;
  const newsItemsSource = data?.newsSection?.items ?? null;

  const featuredNews =
    featuredSource && featuredSource.imgSrc
      ? {
          tag: featuredSource.tag || "News",
          title: featuredSource.title || "",
          excerpt: featuredSource.excerpt || "",
          icon: featuredSource.icon || "⚡",
          imgSrc: featuredSource.imgSrc,
          imgAlt:
            featuredSource.imgAlt ||
            featuredSource.title ||
            "Featured news article",
          href: featuredSource.href || "/news-media/",
        }
      : undefined;

  const newsItems =
    newsItemsSource && newsItemsSource.length > 0
      ? newsItemsSource
          .filter(
            (item): item is NonNullable<NewsSectionData["items"]>[number] =>
              !!item && !!item.title,
          )
          .map((item) => ({
            tag: item.tag || "News",
            title: item.title as string,
            excerpt: item.excerpt || "",
            href: item.href || "/news-media/",
          }))
      : undefined;

  return (
    <>
      {/* ── Structured data ── */}
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* ── HERO ── */}
      <Hero
        title={data?.hero?.title}
        subtitle={data?.hero?.subtitle}
        description={data?.hero?.description}
        backgroundImageUrl={heroBackgroundImageUrl}
        primaryCtaLabel={data?.hero?.primaryCtaLabel}
        primaryCtaHref={data?.hero?.primaryCtaHref}
        secondaryCtaLabel={data?.hero?.secondaryCtaLabel}
        secondaryCtaHref={data?.hero?.secondaryCtaHref}
      />

      {/* ── PROOF BAR ── */}
      <ProofBar stats={data?.hero?.stats} />

      {/* ── WHO JOINS — Membership cards ── */}
      <section className="bg-white py-[72px]" id="membership">
        <div className="max-w-[1180px] mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
              {membershipEyebrow}
            </p>
            <h2 className="font-normal text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy mb-3">
              {membershipTitle}
            </h2>
            <p className="font-body text-[0.95rem] text-light-slate max-w-[520px] mx-auto leading-[1.6]">
              {membershipBody}
            </p>
          </div>
          <MembershipCards cards={membershipCards} />
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <BenefitsSection
        eyebrow={data?.benefitsSection?.eyebrow}
        title={data?.benefitsSection?.title}
        body={data?.benefitsSection?.body}
        benefits={benefitsItems}
        quoteTitle={data?.benefitsSection?.quote?.author}
        quoteDescription={data?.benefitsSection?.quote?.text}
        quoteImage={
          benefitsQuoteImageUrl
            ? {
                url: benefitsQuoteImageUrl,
                alt: data?.benefitsSection?.quote?.imageAlt,
              }
            : undefined
        }
      />

      {/* ── CTA MID — red band ── */}
      <section
        className="relative py-[52px] text-center overflow-hidden"
        style={{ background: "#C8462A" }}
      >
        {/* Radial overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: "#ea0a2a",
          }}
        />
        <div className="max-w-[1180px] mx-auto px-6 relative z-10">
          <h2 className="font-normal text-[clamp(1.6rem,3.5vw,2.2rem)] text-white mb-2">
            {midCtaTitle}
          </h2>
          <p className="font-body text-white/85 text-[1rem] mb-6">
            {midCtaBody}
          </p>
          <Link
            href={midCtaButtonHref}
            className="inline-flex items-center gap-2 bg-navy text-white font-body font-semibold text-[0.92rem] px-7 py-3.5 rounded-[9px] no-underline transition-all duration-300 hover:bg-[#1A2238] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(26,34,56,0.3)]"
          >
            {midCtaButtonLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="bg-white py-[72px]" id="events">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex justify-between items-end mb-9">
            <div>
              <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
                {eventsEyebrow}
              </p>
              <h2 className="font-normal text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                {eventsTitle}
              </h2>
            </div>
            <Link
              href={eventsLinkHref}
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              {eventsLinkLabel}
            </Link>
          </div>
          <EventsGrid events={eventsForGrid} />
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="bg-white py-[72px]" id="news">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex justify-between items-end mb-9">
            <div>
              <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
                {newsEyebrow}
              </p>
              <h2 className="font-normal text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                {newsTitle}
              </h2>
            </div>
            <Link
              href={newsLinkHref}
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              {newsLinkLabel}
            </Link>
          </div>
          <NewsGrid featured={featuredNews} items={newsItems} />
        </div>
      </section>

      {/* ── BOTTOM CTA — teal ── */}
      <BottomCTA
        source="homepage-bottom"
        eyebrow={bottomCtaEyebrow}
        title={bottomCtaTitle}
        points={bottomCtaTrustPoints}
        formHeadline={bottomCtaFormHeadline}
        formSubheadline={bottomCtaFormSubheadline}
        formSubmitLabel={bottomCtaFormSubmitLabel}
      />

      {/* ── CONVERSION OVERLAYS ── */}
      <ExitIntentPopup />
      <ScrollTriggerCTA />
    </>
  );
}
