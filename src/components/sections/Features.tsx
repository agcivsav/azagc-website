import { cn } from "@/lib/utils";
import { IFeaturesSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import PortableText from "../ui/PortableText";

interface FeaturesSectionProps {
  content: IFeaturesSection;
  className?: string;
}

export default function FeaturesSection({
  content,
  className,
}: FeaturesSectionProps) {
  const cols =
    content.columns === "4"
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
          {content.sectionTitle}
        </h2>
        {content.description && (
          <p className="font-body text-slate text-base mb-8 max-w-2xl">
            <PortableText value={content.description as PortableTextBlock[]} />
          </p>
        )}
        <div className={cn("grid grid-cols-1 gap-8 md:gap-10", cols)}>
          {content.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h3 className="font-semibold text-navy text-base leading-tight">
                {item.title}
              </h3>
              {item.description && (
                <div className="font-body text-slate text-sm mt-2 space-y-1">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
