import { cn } from "@/lib/utils";
import { ISplitContentSection } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "next-sanity";
import Button from "../layout/Button";

interface SplitContentSectionProps {
  content: ISplitContentSection;
  className?: string;
  reverse?: boolean;
}

export default function SplitContentSection({
  content,
  className,
  reverse = false,
}: SplitContentSectionProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16",
        reverse ? "bg-cream" : "bg-white",
        className,
      )}
    >
      <div className="container-site max-w-5xl">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-3">
          {content.heading}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            {content.body && (
              <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
                <PortableText value={content.body as PortableTextBlock[]} />
              </div>
            )}
          </div>
          <div className="lg:pl-4">
            {content.details && (
              <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
                <PortableText value={content.details as PortableTextBlock[]} />
              </div>
            )}
{content.button?.label && content.button?.link && (
  <Button button={content.button} />
)}          </div>
        </div>
      </div>
    </section>
  );
}
