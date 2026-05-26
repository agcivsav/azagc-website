"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl, CARD_IMAGE_MAX_WIDTH } from "@/lib/sanity";
import { IServicesSection } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "next-sanity";
import Button from "../layout/Button";

interface ServicesSectionProps {
  content: IServicesSection;
  className?: string;
}

export default function ServicesSection({
  content,
  className,
}: ServicesSectionProps) {
  const cols =
    content.columns === "4"
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";
  const items = content.items?.filter((i) => i?.title) ?? [];

  if (items.length === 0) return null;

  return (
    <section className={cn("py-12", className)}>
      <div className="container-site">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
          {content.sectionTitle}
        </h2>
        {content.description && (
          <div className="font-body text-slate text-base mb-8 max-w-2xl">
            <PortableText value={content.description as PortableTextBlock[]} />
          </div>
        )}
        <ul
          className={cn("grid grid-cols-1 gap-6", cols)}
          aria-label={`Cards: ${content.sectionTitle}`}
        >
          {items.map((item, i) => {
            const cardImageSrc = sanityImageUrl(item.image, CARD_IMAGE_MAX_WIDTH);
            return (
              <div
                key={i}
                className="h-full flex flex-col bg-white rounded-xl border border-warm-gray overflow-hidden hover:shadow-lg transition"
              >
                {cardImageSrc && (
                  <div className="relative w-full aspect-video bg-warm-gray/30 shrink-0">
                    <Image
                      src={cardImageSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 text-center flex-grow">
                  <h3 className="font-semibold text-navy text-lg">
                    {item.title}
                  </h3>
                  {item.button?.label && (
                    <Button button={item.button} variant="primary" />
                  )}
                </div>
              </div>
            );
          })}
        </ul>
        {content.button?.label && (
          <div className="mt-8 text-center">
            <Button button={content.button} variant="primary" />
          </div>
        )}
      </div>
    </section>
  );
}
