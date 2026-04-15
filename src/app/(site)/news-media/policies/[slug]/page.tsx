import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableText from "@/components/ui/PortableText";
import { safeFetch, urlFor } from "@/lib/sanity";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import type { PortableTextBlock } from "@portabletext/types";

const POLICY_QUERY = `*[_type == "newsMediaPolicies" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
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
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  }
}`;

type PolicyDoc = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string | null;
  body: PortableTextBlock[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: unknown;
    noIndex?: boolean | null;
  } | null;
};

export async function generateStaticParams() {
  const raw = await (
    await import("@/lib/sanity")
  ).safeFetch<unknown>(`*[_type == "newsMediaPolicies"].slug`);
  const slugs: Array<{ current: string } | null> = Array.isArray(raw)
    ? raw
    : ((raw ?? []) as Array<{ current: string } | null>);
  const safe = slugs.filter(
    (s): s is { current: string } =>
      s != null && typeof (s as { current?: unknown }).current === "string",
  );
  return safe.map((s) => ({ slug: s.current.replace(/\/$/, "") }));
}

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(630).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

async function getPolicy(slug: string): Promise<PolicyDoc | null> {
  return safeFetch(POLICY_QUERY, { slug }, 120);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPolicy(slug);
  if (!doc) return { title: "Policy Not Found" };

  const title = doc.seo?.metaTitle ?? doc.title;
  const description =
    doc.seo?.metaDescription ??
    doc.excerpt ??
    `${doc.title} — AZAGC news & media policy.`;
  const ogImage = doc.seo?.ogImage ? buildImageUrl(doc.seo.ogImage) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.azagc.org/news-media/policies/${slug}`,
    },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getPolicy(slug);
  if (!doc) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.azagc.org" },
          { name: "News & Media", url: "https://www.azagc.org/news-media/" },
          {
            name: "Policies",
            url: "https://www.azagc.org/news-media/policies/",
          },
          {
            name: doc.title,
            url: `https://www.azagc.org/news-media/policies/${slug}`,
          },
        ]}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/news-media"
            className="hover:text-navy transition-colors no-underline"
          >
            News &amp; Media
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/news-media/policies"
            className="hover:text-navy transition-colors no-underline"
          >
            Policies
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate max-w-48">{doc.title}</span>
        </div>
      </div>

      <article className="bg-white">
        <header className="container-site max-w-3xl mx-auto pt-12 md:pt-16 pb-8">
          <h1 className="font-normal text-3xl sm:text-4xl md:text-[2.75rem] text-navy leading-[1.15] tracking-tight">
            {doc.title}
          </h1>
        </header>

        <div className="container-site max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="prose prose-slate max-w-none font-body text-slate leading-relaxed [&_p]:mb-5 [&_figure]:w-fit [&_figure]:max-w-full [&_figure_img]:m-0! [&_figure_img]:h-auto! [&_figure_img]:w-auto! [&_figure_img]:max-w-full">
            <PortableText value={Array.isArray(doc.body) ? doc.body : null} />
          </div>

          <p className="mt-12">
            <Link
              href="/news-media/policies"
              className="font-body text-sm font-semibold text-red hover:text-navy transition-colors"
            >
              ← Back to Policies
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
