import Image from "next/image";
import { cn } from "@/lib/utils";
import { ISplitImagesSection } from "@/types/common";

interface SplitImagesSectionProps {
  content: ISplitImagesSection;
  className?: string;
}

export default function SplitImagesSection({
  content,
  className,
}: SplitImagesSectionProps) {
  const hasLeft = content.leftImage?.asset?.url;
  const hasRight = content.rightImage?.asset?.url;

  if (!hasLeft && !hasRight) return null;

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        {content.heading && (
          <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
            {content.heading}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:items-start">
          {hasLeft && (
            <figure className="rounded-xl border border-warm-gray/50 bg-warm-gray/10 shadow-sm p-2 flex flex-col overflow-visible">
              <div className="relative w-full min-h-[240px] aspect-[4/3] overflow-visible">
                <Image
                  src={content.leftImage?.asset?.url as string}
                  alt={content.leftCaption ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              {content.leftCaption && (
                <figcaption className="p-4 font-body text-sm text-slate">
                  {content.leftCaption}
                </figcaption>
              )}
            </figure>
          )}

          {hasRight && (
            <figure className="rounded-xl border border-warm-gray/50 bg-warm-gray/10 shadow-sm p-2 flex flex-col overflow-visible">
              <div className="relative w-full min-h-[240px] aspect-[4/3] overflow-visible">
                <Image
                  src={content.rightImage?.asset?.url as string}
                  alt={content.rightCaption ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              {content.rightCaption && (
                <figcaption className="p-4 font-body text-sm text-slate">
                  {content.rightCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
