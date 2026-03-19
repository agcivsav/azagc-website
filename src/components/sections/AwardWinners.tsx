import { cn } from "@/lib/utils";
import { IAwardSection } from "@/types/common";

interface AwardsListSectionProps {
  content: IAwardSection;
  className?: string;
}

export default function AwardsListSection({
  content,
  className,
}: AwardsListSectionProps) {
  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site max-w-3xl">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
          {content.heading}
        </h2>
        {content.awards.length > 0 ? (
          <ul className="space-y-4">
            {content.awards.map((award, i) => (
              <li
                key={i}
                className="font-body text-slate text-base leading-relaxed border-b border-warm-gray/50 pb-4 last:border-0"
              >
                <span className="font-semibold text-navy">{award.name}</span>
                {[award.awardTitle, award.company].filter(Boolean).length >
                  0 && (
                  <span className="text-slate">
                    {" — "}
                    {[award.awardTitle, award.company]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-slate/70">No awards listed yet.</p>
        )}
      </div>
    </section>
  );
}
