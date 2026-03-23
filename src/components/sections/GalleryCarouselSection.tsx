"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortableTextBlock } from "next-sanity";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // ✅ Responsive visible count
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

    if (directUrl) return directUrl;

    const imageSource = slide.image;
    if (!imageSource || typeof imageSource !== "object") return null;

    try {
      return urlFor(imageSource).width(1600).fit("max").url();
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

  const canPrev = activeIndex > 0;
  const canNext = activeIndex + visibleCount < validSlides.length;

  const visibleSlides = validSlides.slice(
    activeIndex,
    activeIndex + visibleCount
  );

  return (
    <section className={cn("bg-[#0a0a0a] py-20", className)}>
      <div className="container-site max-w-7xl">

        {/* HEADER */}
        {(content.heading || content.intro?.length) && (
          <div className="mb-10">
            {content.heading && (
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
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

        {/* IMAGES */}
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
            Array.from({
              length: visibleCount - visibleSlides.length,
            }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-2xl bg-white/5"
                style={{ aspectRatio: "4/3" }}
              />
            ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center gap-4">
          {/* PREV */}
          <button
            onClick={() =>
              setActiveIndex((p) => Math.max(0, p - visibleCount))
            }
            style={{height: "50px", width: "50px"}}
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
            <ChevronLeft size={22} />
          </button>

          {/* NEXT */}
          <button
            onClick={() =>
              setActiveIndex((p) =>
                Math.min(validSlides.length - visibleCount, p + visibleCount)
              )
            }
                        style={{height: "50px", width: "50px"}}

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
            <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
}