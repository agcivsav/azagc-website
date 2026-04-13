"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { ISimpleContent } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "@portabletext/react";
import Button from "../layout/Button";

interface SimpleContentProps {
  content: ISimpleContent;
  className?: string;
  anchorId?: string;
}

export default function SimpleContent({
  content,
  className,
  anchorId,
}: SimpleContentProps) {
  const headingId = useId();
  return (
    <section
      className={cn("bg-cream py-12 md:py-16 scroll-mt-[91px]", className)}
      id={anchorId}
      aria-labelledby={headingId}
    >
      <div className="container-site max-w-3xl">
        <h2
          id={headingId}
          className="font-normal text-2xl md:text-3xl text-navy mb-4"
        >
          {content.heading}
        </h2>
        {content.body && Array.isArray(content.body) && (
          <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
            <PortableText value={content.body as PortableTextBlock[]} />
          </div>
        )}
        <div className="flex flex-col w-fit gap-2">
   {content.button?.label && <Button button={content.button} />}
                {content.button2?.label && <Button button={content.button2} />}
        {content.button3?.label && <Button button={content.button3} />}
        </div>
     

      </div>
    </section>
  );
}
