import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { ExternalLink, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IPhotoGalleriesSection } from "@/types/common";
import PortableText from "@/components/ui/PortableText";
import SectionLabel from "@/components/ui/SectionLabel";

interface PhotoGalleriesSectionProps {
  content: IPhotoGalleriesSection;
  className?: string;
}

export default function PhotoGalleriesSection({
  content,
  className,
}: PhotoGalleriesSectionProps) {
  const items = (content.galleries ?? []).filter(
    (g): g is NonNullable<typeof g> =>
      !!g?.title?.trim() && typeof g.url === "string" && g.url.length > 0,
  );

  if (items.length === 0) return null;

  const hasIntro = Array.isArray(content.intro) && content.intro.length > 0;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream py-16 md:py-20",
        className,
      )}
      aria-labelledby="photo-galleries-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0v64M0 32h64' stroke='%23231F20' stroke-width='0.4' fill='none'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-navy-mid/10 blur-3xl" />

      <div className="container-site relative max-w-6xl">
        <header className="mb-10 md:mb-14 max-w-3xl">
          <SectionLabel color="gold" className="mb-3">
            Photo archives
          </SectionLabel>
          <h2
            id="photo-galleries-heading"
            className="font-normal text-3xl sm:text-4xl text-navy leading-tight"
          >
            {content.heading}
          </h2>
          {hasIntro && (
            <div className="mt-5 font-body text-slate text-base leading-relaxed">
              <PortableText value={content.intro as PortableTextBlock[]} />
            </div>
          )}
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 list-none p-0 m-0">
          {items.map((item) => (
            <li key={`${item.url}-${item.title}`}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block overflow-hidden rounded-2xl border border-warm-gray/80 bg-white shadow-[0_4px_24px_-8px_rgba(35,31,32,0.12)]",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-1 hover:border-red/30 hover:shadow-[0_20px_40px_-20px_rgba(35,31,32,0.2)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy/20">
                  {item.coverImage?.asset?.url ? (
                    <Image
                      src={item.coverImage.asset.url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-navy via-navy-mid to-teal"
                      aria-hidden
                    >
                      <div className="rounded-full bg-white/10 p-4 ring-1 ring-white/20">
                        <Images
                          className="h-10 w-10 text-gold/90"
                          strokeWidth={1.25}
                        />
                      </div>
                      <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-cream/80">
                        Gallery
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/35 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <p className="font-normal text-xl text-white leading-snug drop-shadow-sm md:text-2xl line-clamp-3">
                      {item.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider text-gold">
                      View gallery
                      <ExternalLink
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
