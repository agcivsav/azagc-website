import { cn } from "@/lib/utils";
import { IVideoSection } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "next-sanity";

interface VideoSectionProps {
  content: IVideoSection;
  className?: string;
}

export default function VideoSection({
  content,
  className,
}: VideoSectionProps) {
  if (!content.videoFile?.asset?.url) return null;

  return (
    <section className={cn("bg-cream py-12 md:py-16", className)}>
      <div className="container-site max-w-2xl mx-auto">
        {content.heading && (
          <h2 className="font-normal text-2xl text-center md:text-3xl text-navy mb-4">
            {content.heading}
          </h2>
        )}

        {content.body && (
          <div className="font-body text-slate text-center text-base leading-relaxed mb-6 whitespace-pre-wrap">
            <PortableText value={content.body as PortableTextBlock[]} />
          </div>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden bg-navy/10 max-w-3xl mx-auto">
          <video controls className="w-full h-full object-cover">
            <source src={content.videoFile.asset.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
