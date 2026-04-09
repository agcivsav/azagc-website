"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlideView = {
  url: string;
  alt: string;
  caption?: string;
  w?: number;
  h?: number;
};

const navBtnClass =
  "pointer-events-auto z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-navy-deep/70 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-navy-deep/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type ImageCarouselMediaProps = {
  slides: CarouselSlideView[];
  safeIndex: number;
  setIndex: (i: number) => void;
  go: (dir: -1 | 1) => void;
  imagePresentation: "crop" | "contain";
  heading?: string;
};

export function ImageCarouselMedia({
  slides,
  safeIndex,
  setIndex,
  go,
  imagePresentation,
  heading,
}: ImageCarouselMediaProps) {
  const n = slides.length;
  const active = slides[safeIndex];
  if (!n || !active) return null;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={heading || "Image carousel"}
    >
      <div className="relative overflow-hidden rounded-lg bg-warm-gray/15">
        <div aria-live="polite" className="pointer-events-none select-none">
          {imagePresentation === "contain" ? (
            <div className="relative flex min-h-[200px] w-full items-center justify-center">
              <Image
                src={active.url}
                alt={active.alt}
                width={active.w ?? 1200}
                height={active.h ?? 800}
                className="h-auto w-full max-h-[min(28rem,70vh)] object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={safeIndex === 0}
                draggable={false}
              />
            </div>
          ) : (
            <div className="relative aspect-[4/3] min-h-[240px]">
              <Image
                src={active.url}
                alt={active.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={safeIndex === 0}
                draggable={false}
              />
            </div>
          )}
        </div>
        {n > 1 ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between gap-2 px-2">
            <button
              type="button"
              className={navBtnClass}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className={navBtnClass}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
      {active.caption ? (
        <p className="mt-3 text-center font-body text-sm text-slate">{active.caption}</p>
      ) : null}
      {n > 1 ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1} of ${n}`}
              aria-current={i === safeIndex}
              className={cn(
                "h-2.5 min-h-[10px] min-w-[10px] rounded-full transition-all",
                i === safeIndex ? "w-8 bg-primary" : "w-2.5 bg-warm-gray hover:bg-slate/60",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
