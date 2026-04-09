"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PortableTextBlock } from "next-sanity";
import { cn } from "@/lib/utils";
import type { IImageCarouselContent } from "@/types/common";
import PortableText from "../ui/PortableText";
import Button from "../layout/Button";
import {
  ImageCarouselMedia,
  type CarouselSlideView,
} from "./ImageCarouselMedia";

type Props = {
  content: IImageCarouselContent;
  reverse?: boolean;
  className?: string;
  imagePresentation?: "crop" | "contain";
};

export default function ImageCarouselContent({
  content,
  reverse = false,
  className,
  imagePresentation = "crop",
}: Props) {
  const slides = useMemo<CarouselSlideView[]>(() => {
    const out: CarouselSlideView[] = [];
    for (const s of content.slides ?? []) {
      const url = s.image?.asset?.url;
      if (typeof url !== "string" || !url.startsWith("http")) continue;
      const alt = s.alt?.trim() || content.heading || "Slide";
      const dims = s.image?.asset?.metadata?.dimensions;
      out.push({
        url,
        alt,
        caption: s.caption?.trim(),
        w: dims?.width,
        h: dims?.height,
      });
    }
    return out;
  }, [content.slides, content.heading]);

  const [index, setIndex] = useState(0);
  const n = slides.length;
  const safeIndex = n ? Math.min(index, n - 1) : 0;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (n < 2) return;
      setIndex((prev) => (prev + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    setIndex((prev) => (n ? Math.min(prev, n - 1) : 0));
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const textBlock = (
    <div className="flex flex-col justify-center">
      {content.heading ? (
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
          {content.heading}
        </h2>
      ) : null}
      {content.body ? (
        <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
          <PortableText value={content.body as PortableTextBlock[]} />
        </div>
      ) : null}
      <ul className="space-y-3">
        {content.button?.label ? (
          <li>
            <Button button={content.button} />
          </li>
        ) : null}
        {content.button2?.label ? (
          <li>
            <Button button={content.button2} />
          </li>
        ) : null}
        {content.button3?.label ? (
          <li>
            <Button button={content.button3} />
          </li>
        ) : null}
      </ul>
    </div>
  );

  const carouselBlock =
    n > 0 ? (
      <ImageCarouselMedia
        slides={slides}
        safeIndex={safeIndex}
        setIndex={setIndex}
        go={go}
        imagePresentation={imagePresentation}
        heading={content.heading}
      />
    ) : null;

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center",
            !reverse && "lg:grid-flow-dense",
          )}
        >
          {carouselBlock ? (
            <div className={reverse ? undefined : "lg:col-start-2"}>
              {carouselBlock}
            </div>
          ) : null}
          <div
            className={!reverse ? "lg:col-start-1 lg:row-start-1" : undefined}
          >
            {textBlock}
          </div>
        </div>
      </div>
    </section>
  );
}
