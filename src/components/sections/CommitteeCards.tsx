"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl, CARD_IMAGE_MAX_WIDTH } from "@/lib/sanity";
import { ICommitteesSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import PortableText from "../ui/PortableText";

interface CommitteeCardsProps {
  content: ICommitteesSection;
  className?: string;
}

export default function CommitteeCards({
  content,
  className,
}: CommitteeCardsProps) {
  if (!content?.committees?.length) return null;
  return (
    <section
      className={cn("bg-cream py-16", className)}
      aria-label="Committees"
    >
      <div className="container-site">
        {content.sectionTitle && (
          <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
            {content.sectionTitle}
          </h2>
        )}
        {content.description && (
          <div className="font-body text-slate text-base mb-8 max-w-2xl">
            <PortableText value={content.description as PortableTextBlock[]} />
          </div>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.committees.map((committee) => {
            const href = `/about/committees/${committee.slug.current}`;
            const imgSrc = sanityImageUrl(committee.thumbnailImage, CARD_IMAGE_MAX_WIDTH);
            const imgAlt = committee.title;

            return (
              <li key={committee.slug.current}>
                <Link
                  href={href}
                  className="block h-full bg-white rounded-xl overflow-hidden border border-warm-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red/40 group no-underline text-inherit"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-warm-gray/20">
                    {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-normal text-xl text-navy mb-2 group-hover:text-red transition-colors">
                      {committee.title}
                    </h2>

                    <span
                      className="inline-flex items-center justify-center font-body font-semibold text-sm px-5 py-2.5 rounded-sm bg-[#ea0a2a] text-white transition-colors group-hover:bg-red-hover"
                      aria-hidden
                    >
                      {"Learn more"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
