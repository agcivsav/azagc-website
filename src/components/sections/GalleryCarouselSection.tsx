"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortableTextBlock } from "next-sanity";
import { cn } from "@/lib/utils";
import { urlFor, optimizeSanityCdnUrl, GALLERY_IMAGE_MAX_WIDTH } from "@/lib/sanity";
import { ICarouselSection } from "@/types/common";
import PortableText from "../ui/PortableText";

interface GalleryCarouselSectionProps {
  content: ICarouselSection;
  className?: string;
}

interface NormalizedSlide {
  imageUrl: string;
  alt?: string;
  caption?: string;
}

export function GalleryCarouselSection({
  content,
  className,
}: GalleryCarouselSectionProps) {
  const headingId = useId();
  const carouselLabel =
    content.heading?.trim() || "Image gallery";
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const getSlideImageUrl = (slide: Record<string, unknown>) => {
    const directUrl =
      typeof slide.imageUrl === "string"
        ? slide.imageUrl
        : typeof slide.url === "string"
        ? slide.url
        : typeof slide.src === "string"
        ? slide.src
        : ((slide.image as { asset?: { url?: string } } | undefined)?.asset?.url ?? null);

    if (directUrl) return optimizeSanityCdnUrl(directUrl, GALLERY_IMAGE_MAX_WIDTH);

    const imageSource = slide.image;
    if (!imageSource || typeof imageSource !== "object") return null;

    try {
      return urlFor(imageSource).width(GALLERY_IMAGE_MAX_WIDTH).fit("max").auto("format").url();
    } catch {
      return null;
    }
  };

  const rawSlides = useMemo(() => {
    const maybeSlides = (content as { slides?: unknown; images?: unknown }).slides;
    const maybeImages = (content as { slides?: unknown; images?: unknown }).images;

    if (Array.isArray(maybeSlides)) return maybeSlides;
    if (Array.isArray(maybeImages)) return maybeImages;

    return [];
  }, [content]);

  const validSlides = useMemo<NormalizedSlide[]>(() => {
    const normalized: NormalizedSlide[] = [];

    for (const slide of rawSlides) {
      const imageUrl = getSlideImageUrl(slide as Record<string, unknown>);
      if (!imageUrl) continue;

      normalized.push({
        imageUrl,
        alt:
          typeof (slide as { alt?: unknown }).alt === "string"
            ? (slide as { alt?: string }).alt
            : undefined,
        caption:
          typeof (slide as { caption?: unknown }).caption === "string"
            ? (slide as { caption?: string }).caption
            : undefined,
      });
    }

    return normalized;
  }, [rawSlides]);

  if (!validSlides.length) return null;

  const isSingle = validSlides.length <= 2;

  const canPrev = activeIndex > 0;
  const canNext = activeIndex + visibleCount < validSlides.length;

  const visibleSlides = validSlides.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section
      className={cn("bg-[#ffff] py-20", className)}
      aria-labelledby={content.heading ? headingId : undefined}
    >
      <div className="container-site max-w-7xl">

        {/* HEADER */}
        {(content.heading || content.intro?.length) && (
          <div className="mb-10">
            {content.heading && (
              <h2
                id={headingId}
                className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3"
              >
                {content.heading}
              </h2>
            )}
            {content.intro?.length ? (
              <div className="text-white/50 leading-relaxed max-w-2xl text-sm md:text-base">
                <PortableText value={content.intro as PortableTextBlock[]} />
              </div>
            ) : null}
          </div>
        )}

        {/* 1 OR 2 IMAGES — no slider */}
        {isSingle ? (
          <div className={cn(
            "flex justify-center gap-3",
            validSlides.length === 1 && "max-w-lg mx-auto",
            validSlides.length === 2 && "grid grid-cols-2"
          )}>
            {validSlides.map((slide, i) => (
              <figure key={slide.imageUrl + i} className="relative overflow-hidden rounded-2xl w-full">
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={slide.imageUrl}
                    alt={slide.alt || `Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {slide.caption && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                      <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 text-xs text-white/80">
                        {slide.caption}
                      </figcaption>
                    </>
                  )}
                </div>
              </figure>
            ))}
          </div>
        ) : (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={carouselLabel}
          >
            {/* MULTIPLE IMAGES — slider */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {visibleSlides.map((slide, i) => (
                <figure
                  key={`${slide.imageUrl}-${activeIndex + i}`}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={slide.imageUrl}
                      alt={slide.alt || `Gallery image ${activeIndex + i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {slide.caption && (
                      <>
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                        <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 text-xs text-white/80">
                          {slide.caption}
                        </figcaption>
                      </>
                    )}
                  </div>
                </figure>
              ))}

              {/* Empty placeholders */}
              {visibleSlides.length < visibleCount &&
                Array.from({ length: visibleCount - visibleSlides.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="rounded-2xl bg-white/5"
                    style={{ aspectRatio: "4/3" }}
                    aria-hidden
                  />
                ))}
            </div>

            {/* NAV BUTTONS */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous images"
                onClick={() => setActiveIndex((p) => Math.max(0, p - visibleCount))}
                style={{ height: "50px", width: "50px" }}
                disabled={!canPrev}
                className={cn(
                  "h-14 w-14 flex items-center justify-center rounded-full cursor-pointer",
                  "bg-white/40 border border-white/30",
                  "transition-all duration-300",
                  "hover:bg-white hover:shadow-md hover:scale-105",
                  "active:scale-95",
                  "disabled:opacity-30"
                )}
              >
                <ChevronLeft size={22} aria-hidden />
              </button>

              <button
                type="button"
                aria-label="Next images"
                onClick={() =>
                  setActiveIndex((p) =>
                    Math.min(validSlides.length - visibleCount, p + visibleCount)
                  )
                }
                style={{ height: "50px", width: "50px" }}
                disabled={!canNext}
                className={cn(
                  "h-14 w-14 flex items-center justify-center rounded-full cursor-pointer",
                  "bg-white/40 border border-white/30",
                  "transition-all duration-300",
                  "hover:bg-white hover:shadow-md hover:scale-105",
                  "active:scale-95",
                  "disabled:opacity-30"
                )}
              >
                <ChevronRight size={22} aria-hidden />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}