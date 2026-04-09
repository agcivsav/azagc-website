import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import LayoutButton from "@/components/layout/Button";
import type { IButton, ISponsorLogosSection } from "@/types/common";

function isAbsoluteUrl(href: string) {
  return /^https?:\/\//i.test(href.trim());
}

function normalizeInternalHref(href: string) {
  const t = href.trim();
  if (isAbsoluteUrl(t)) return t;
  return t.startsWith("/") ? t : `/${t}`;
}

type SponsorLogosSectionProps = {
  content: ISponsorLogosSection;
};

function resolveLogoSrc(logo: NonNullable<ISponsorLogosSection["logos"][number]["logo"]>) {
  const direct = logo.asset?.url;
  if (typeof direct === "string" && direct.length > 0) return direct;
  try {
    return urlFor({ _type: "image", asset: logo.asset }).width(400).height(200).fit("max").url();
  } catch {
    return null;
  }
}

export default function SponsorLogosSection({ content }: SponsorLogosSectionProps) {
  const { sectionTitle, description, columns = "3", logos, button } = content;
  const items = (logos ?? []).filter((row) => {
    if (!row?.logo?.asset || !row.url?.trim()) return false;
    return resolveLogoSrc(row.logo) != null;
  });
  if (!sectionTitle || items.length === 0) return null;

  const gridCols =
    columns === "2"
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === "4"
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const tileClass = cn(
    "group flex min-h-[112px] items-center justify-center rounded-lg border border-warm-gray bg-white p-6 shadow-sm",
    "transition-all duration-200 hover:border-primary/40 hover:shadow-md",
    "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
  );

  return (
    <section className="bg-cream py-14 md:py-20 border-t border-warm-gray/80">
      <div className="container-site max-w-5xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-normal text-2xl md:text-3xl text-navy tracking-tight mb-3">
            {sectionTitle}
          </h2>
          {description ? (
            <p className="font-body text-slate text-base max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        <ul className={cn("grid gap-5 md:gap-6", gridCols)}>
          {items.map((row, i) => {
            const src = resolveLogoSrc(row.logo!)!;
            const rawUrl = row.url.trim();
            const external = isAbsoluteUrl(rawUrl);
            const href = external ? rawUrl : normalizeInternalHref(rawUrl);
            const newTab = row.openInNewTab ?? external;
            const imageAlt = row.alt?.trim() || "Sponsor logo";

            const inner = (
              <Image
                src={src}
                alt={imageAlt}
                width={280}
                height={120}
                className="max-h-14 md:max-h-[4.5rem] w-auto max-w-full object-contain opacity-95 transition-opacity group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            );

            return (
              <li key={`${href}-${i}`}>
                {external ? (
                  <a
                    href={href}
                    className={cn(tileClass, "no-underline")}
                    {...(newTab
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={cn(tileClass, "no-underline")}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {button?.label &&
        button.btnType !== "none" &&
        (button.btnType === "upload" || !!button.link?.trim()) ? (
          <div className="flex justify-center mt-10 md:mt-12">
            <LayoutButton button={button as IButton} variant="primary" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
