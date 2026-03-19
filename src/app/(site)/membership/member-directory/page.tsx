import type { Metadata } from "next";
import Link from "next/link";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import MemberDirectoryGrid from "@/components/sections/MemberDirectoryGrid";
import Pagination from "@/components/ui/Pagination";
import { safeFetch, urlFor } from "@/lib/sanity";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const PER_PAGE = 15;

const PAGE_QUERY = `*[_type == "memberDirectoryPage"][0]{
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
}`;

const MEMBERS_COUNT_QUERY = `count(*[_type == "memberDirectory"])`;

const MEMBERS_PAGINATED_QUERY = `*[_type == "memberDirectory"] | order(businessName asc) [$start...$end]{
  _id,
  businessName,
  logo,
  website,
  address,
  phone
}`;

type PageData = {
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: unknown;
    noIndex?: boolean | null;
  } | null;
  hero?: {
    title?: string | null;
    subtitle?: string | null;
    backgroundImage?: { asset?: { url?: string } } | null;
  } | null;
};

type MemberDoc = {
  _id: string;
  businessName: string;
  logo?: unknown;
  website?: string | null;
  address?: string | null;
  phone?: string | null;
};

function buildLogoUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(360).height(120).fit("max").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

function buildOgImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(630).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await safeFetch<PageData>(PAGE_QUERY);
  const seo = pageData?.seo;

  const title = seo?.metaTitle ?? "Member Directory | AZAGC";
  const description =
    seo?.metaDescription ??
    "Browse AZAGC&apos;s member directory to connect with Arizona construction contractors and affiliates.";

  const ogImage = seo?.ogImage ? buildOgImageUrl(seo.ogImage) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: "https://www.azagc.org/membership/member-directory/",
    },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function MemberDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const [pageData, totalCount, members] = await Promise.all([
    safeFetch<PageData>(PAGE_QUERY),
    safeFetch<number>(MEMBERS_COUNT_QUERY),
    safeFetch<MemberDoc[]>(MEMBERS_PAGINATED_QUERY, { start, end }),
  ]);

  const hero = pageData?.hero ?? null;
  const totalMembers = typeof totalCount === "number" ? totalCount : 0;
  const totalPages = Math.max(1, Math.ceil(totalMembers / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const allMembers = Array.isArray(members) ? members : [];
  const membersWithLogoUrl = allMembers.map((m) => ({
    ...m,
    logoUrl: m.logo ? buildLogoUrl(m.logo) : null,
  }));

  const heroForComponent = hero
    ? {
        title: hero.title ?? "Member Directory",
        subtitle: hero.subtitle ?? undefined,
        backgroundImage: hero.backgroundImage?.asset?.url
          ? { asset: { url: hero.backgroundImage.asset.url } }
          : undefined,
      }
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.azagc.org" },
          { name: "Membership", url: "https://www.azagc.org/membership/" },
          {
            name: "Member Directory",
            url: "https://www.azagc.org/membership/member-directory/",
          },
        ]}
      />

      {hero ? (
        <PageBuilderHero
          title={hero.title ?? "Member Directory"}
          hero={heroForComponent}
        />
      ) : (
        <section className="relative bg-navy py-20 overflow-hidden">
          <div className="container-site relative z-10">
            <h1 className="font-normal text-4xl md:text-5xl text-white">
              Member Directory
            </h1>
            <p className="font-body text-lg text-white/80 mt-3 max-w-2xl">
              {`Browse AZAGC's member directory to connect with Arizona construction contractors and affiliates.`}
            </p>
          </div>
        </section>
      )}

      <MemberDirectoryGrid
        members={membersWithLogoUrl}
        heading="Our Members"
        className="border-t border-warm-gray"
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/membership/member-directory"
        ariaLabel="Member directory pagination"
      />

      {/* <CTABandFromSanity /> */}
    </>
  );
}
