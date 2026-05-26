import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl, CONTENT_IMAGE_MAX_WIDTH } from "@/lib/sanity";
import type { IButton, IImage, ISplitImagesSection } from "@/types/common";
import Button from "@/components/layout/Button";

interface SplitImagesSectionProps {
  content: ISplitImagesSection;
  className?: string;
}

function SplitImageColumn({
  image,
  caption,
  button,
  side,
  sectionHeading,
}: {
  image?: IImage;
  caption?: string;
  button?: IButton;
  side: "left" | "right";
  sectionHeading: string;
}) {
  const url = sanityImageUrl(image, CONTENT_IMAGE_MAX_WIDTH);
  if (!url) return null;

  const dims = image?.asset?.metadata?.dimensions;
  const intrinsicW = dims?.width && dims.width > 0 ? dims.width : CONTENT_IMAGE_MAX_WIDTH;
  const intrinsicH = dims?.height && dims.height > 0 ? dims.height : 1000;
  const w = Math.min(intrinsicW, CONTENT_IMAGE_MAX_WIDTH);
  const h = Math.round((intrinsicH / intrinsicW) * w);
  const altText =
    caption?.trim() ||
    (sectionHeading
      ? `${sectionHeading} — ${side === "left" ? "Left" : "Right"} image`
      : `${side === "left" ? "Left" : "Right"} image`);

  return (
    <figure className="flex flex-col gap-4 h-full justify-between">
      <div className="flex w-full min-h-0 justify-center rounded-xl border border-warm-gray/50 bg-warm-gray/10 p-3 md:p-5 shadow-sm">
        <Image
          src={url}
          alt={altText}
          width={w}
          height={h}
          className="h-auto max-h-[min(92vh,2000px)] w-auto max-w-full object-contain object-top"
          sizes="(max-width: 768px) 100vw, calc(50vw - 2.5rem)"
        />
      </div>
      {caption?.trim() ? (
        <figcaption className="px-1 text-center font-body text-sm text-slate sm:text-left">
          {caption.trim()}
        </figcaption>
      ) : null}
      {button?.label ? (
        <div className="flex justify-center sm:justify-start">
          <Button button={button} />
        </div>
      ) : null}
    </figure>
  );
}

export default function SplitImagesSection({
  content,
  className,
}: SplitImagesSectionProps) {
  const hasLeft = Boolean(content.leftImage?.asset?.url);
  const hasRight = Boolean(content.rightImage?.asset?.url);

  if (!hasLeft && !hasRight) return null;

  const heading = content.heading?.trim() ?? "";

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        {heading ? (
          <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8 md:mb-10">
            {heading}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 md:items-start">
          {hasLeft ? (
            <SplitImageColumn
              image={content.leftImage}
              caption={content.leftCaption}
              button={content.leftButton}
              side="left"
              sectionHeading={heading}
            />
          ) : null}
          {hasRight ? (
            <SplitImageColumn
              image={content.rightImage}
              caption={content.rightCaption}
              button={content.rightButton}
              side="right"
              sectionHeading={heading}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
