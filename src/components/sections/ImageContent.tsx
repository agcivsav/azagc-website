import Image from "next/image";
import { cn } from "@/lib/utils";
import { IImageContent } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "next-sanity";
import Button from "../layout/Button";

export type CtaItem = { label: string; href: string };

interface ImageContentProps {
  content: IImageContent;
  reverse?: boolean;
  className?: string;
}

export default function ImageContent({
  content,
  reverse = false,
  className,
}: ImageContentProps) {
  const imageBlock = content.image?.asset?.url?.startsWith("http") ? (
    <div className="relative aspect-[4/3] min-h-[240px] rounded-xl overflow-hidden bg-warm-gray/20">
      <Image
        src={content.image.asset.url}
        alt={content.heading ?? ""}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  ) : null; // <-- don't render anything if imageUrl is invalid

  const textBlock = (
    <div className="flex flex-col justify-center">
      {content.heading && (
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
          {content.heading}
        </h2>
      )}
      {content.body && (
        <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
          <PortableText value={content.body as PortableTextBlock[]} />
        </div>
      )}
      <ul className="space-y-3">
        {content.button?.label && (
          <li>
            <Button button={content.button} />
          </li>
        )}
        {content.button2?.label && (
          <li>
            <Button button={content.button2} />
          </li>
        )}
        {content.button3?.label && (
          <li>
            <Button button={content.button3} />
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center",
            !reverse && "lg:grid-flow-dense",
          )}
        >
          {imageBlock && (
            <div className={reverse ? undefined : "lg:col-start-2"}>
              {imageBlock}
            </div>
          )}
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
