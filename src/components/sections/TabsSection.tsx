"use client";

import { cn } from "@/lib/utils";
import { ITabsSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import { useState } from "react";
import PortableText from "../ui/PortableText";
import Image from "next/image";

interface TabsSectionProps {
  content: ITabsSection;
  className?: string;
}

export default function TabsSection({ content, className }: TabsSectionProps) {
  const [activeValue, setActiveValue] = useState(0);
  const hasContent = content.tabs.some(
    (t) => t.content && t.content.length > 0,
  );

  if (!content.tabs.length) return null;

  return (
    <section className={cn("bg-white py-20", className)}>
      <div className="container-site max-w-5xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4">
            {content.heading}
          </h2>
          <div className="text-slate leading-relaxed max-w-2xl">
            <PortableText value={content.intro as PortableTextBlock[]} />
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="flex flex-wrap gap-3 mb-10">
          {content.tabs.map((tab, key) => {
            const isActive = activeValue === key;

            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveValue(key)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "bg-navy text-white shadow-md"
                    : "bg-warm-gray/40 text-slate hover:bg-warm-gray",
                )}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-warm-gray/40 rounded-2xl p-6 md:p-8 shadow-sm">
          {content.tabs[activeValue].image?.asset?.url && (
            <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-warm-gray/20">
              <Image
                src={content.tabs[activeValue].image?.asset?.url ?? ""}
                alt={content.tabs[activeValue].title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {content.tabs[activeValue].content ? (
            <div className="text-slate leading-relaxed whitespace-pre-wrap">
              <PortableText
                value={content.tabs[activeValue].content as PortableTextBlock[]}
              />
            </div>
          ) : hasContent ? (
            <p className="text-slate/60">No content for this tab yet.</p>
          ) : !content.tabs[activeValue].image?.asset?.url ? (
            <div className="border border-dashed border-warm-gray rounded-xl p-10 text-center">
              <p className="text-slate text-sm">
                Add content or an image for this tab in Sanity.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
