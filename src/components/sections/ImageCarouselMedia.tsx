"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { ImageCarouselOverlayNav } from "./ImageCarouselOverlayNav";
import { ImageCarouselSlideImage } from "./ImageCarouselSlideImage";
import type { CarouselSlideView } from "./imageCarouselTypes";

export type { CarouselSlideView };

type ImageCarouselMediaProps = {
  slides: CarouselSlideView[];
  imagePresentation: "crop" | "contain";
  heading?: string;
};

export function ImageCarouselMedia({
  slides,
  imagePresentation,
  heading,
}: ImageCarouselMediaProps) {
  const n = slides.length;

  const options = useMemo(
    () => ({
      align: "center" as const,
      loop: n > 1,
      duration: 28,
    }),
    [n],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncFromEmbla = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", syncFromEmbla);
    emblaApi.on("select", syncFromEmbla);
    emblaApi.on("reInit", syncFromEmbla);
    // `init` often fires when the viewport ref mounts, before this effect runs.
    // Sync after layout so `canScrollPrev` / `canScrollNext` match measured slides.
    const rafId = requestAnimationFrame(() => {
      syncFromEmbla(emblaApi);
    });
    return () => {
      cancelAnimationFrame(rafId);
      emblaApi.off("init", syncFromEmbla);
      emblaApi.off("select", syncFromEmbla);
      emblaApi.off("reInit", syncFromEmbla);
    };
  }, [emblaApi, syncFromEmbla]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  if (!n) return null;

  const active = slides[selectedIndex];
  const label = heading || "Image carousel";

  return (
    <div
      className="relative mx-auto w-full max-w-lg rounded-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white">
        <div ref={emblaRef} className="touch-pan-y">
          <div className="flex">
            {slides.map((slide, i) => {
              const inView =
                i === selectedIndex ||
                i === selectedIndex - 1 ||
                i === selectedIndex + 1;
              return (
                <div
                  key={`${slide.url}-${i}`}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}`}
                  aria-hidden={i !== selectedIndex}
                >
                  <ImageCarouselSlideImage
                    slide={slide}
                    imagePresentation={imagePresentation}
                    priority={i === 0}
                    inView={inView}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {n > 1 ? (
          <ImageCarouselOverlayNav
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            canPrev={canPrev}
            canNext={canNext}
            selectedIndex={selectedIndex}
            slideCount={n}
          />
        ) : null}
      </div>

      {active?.caption ? (
        <p
          key={selectedIndex}
          className="mt-4 text-center font-body text-sm leading-relaxed text-slate"
          aria-live="polite"
        >
          {active.caption}
        </p>
      ) : null}

      {n > 1 ? (
        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          aria-label={`${label} pagination`}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1} of ${n}`}
              aria-current={i === selectedIndex}
              className={cn(
                "h-2.5 min-h-[10px] rounded-full transition-[width,background-color,transform] duration-300 ease-out",
                i === selectedIndex
                  ? "w-9 scale-100 bg-primary shadow-sm"
                  : "w-2.5 min-w-[10px] bg-warm-gray hover:scale-110 hover:bg-slate/50",
              )}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
