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

  const activeTab = content.tabs[activeValue];
  const hasEntries = activeTab.entries && activeTab.entries.length > 0;

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
          {activeTab.image?.asset?.url && (
            <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-warm-gray/20">
              <Image
                src={activeTab.image?.asset?.url ?? ""}
                alt={activeTab.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {activeTab.content ? (
            <div className="text-slate leading-relaxed">
              <PortableText value={activeTab.content as PortableTextBlock[]} />
            </div>
          ) : hasContent ? (
            <p className="text-slate/60">No content for this tab yet.</p>
          ) : !activeTab.image?.asset?.url && !hasEntries ? (
            <div className="border border-dashed border-warm-gray rounded-xl p-10 text-center">
              <p className="text-slate text-sm">
                Add content or an image for this tab in Sanity.
              </p>
            </div>
          ) : null}

          {/* Entries listing */}
          {hasEntries && (
            <div
              className={cn(
                "divide-y divide-warm-gray/30",
                activeTab.content && "mt-8",
              )}
            >
              {activeTab.entries!.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-8 py-8 first:pt-0 last:pb-0"
                >
                  {/* Left: content */}
                  <div className="flex-1 text-slate leading-relaxed">
                    <PortableText
                      value={entry.content as PortableTextBlock[]}
                    />
                  </div>

                  {/* Right: logo */}
                  {entry.logo?.asset?.url && (
                    <div className="shrink-0 w-36 flex flex-col items-center gap-2">
                      {entry.link ? (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={entry.logo.asset.url}
                            alt="Logo"
                            width={144}
                            height={96}
                            className="object-contain"
                          />
                        </a>
                      ) : (
                        <Image
                          src={entry.logo.asset.url}
                          alt="Logo"
                          width={144}
                          height={96}
                          className="object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
