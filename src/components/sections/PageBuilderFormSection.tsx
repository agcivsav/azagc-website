import LeadForm from "@/components/forms/LeadForm";
import PortableText from "@/components/ui/PortableText";
import { IFormSection } from "@/types/common";
import { PortableTextBlock } from "@portabletext/types";

interface PageBuilderFormSectionProps {
  content: IFormSection;
}

export default function PageBuilderFormSection({
  content,
}: PageBuilderFormSectionProps) {
  return (
    <section className="py-16 px-4 bg-white">
      {(content.sectionTitle || (content.description?.length ?? 0) > 0) && (
        <div className="max-w-4xl mx-auto mb-8">
          {content.sectionTitle ? (
            <h2 className="font-normal text-2xl text-navy mb-3">
              {content.sectionTitle}
            </h2>
          ) : null}
          {(content.description?.length ?? 0) > 0 ? (
            <div className="font-body text-base text-slate leading-relaxed">
              <PortableText value={content.description as PortableTextBlock[]} />
            </div>
          ) : null}
        </div>
      )}
      <div className="max-w-xl bg-navy p-7 mx-auto">
        <LeadForm
          source={content.formId}
          headline={content.formTitle}
          subheadline={content.formSubtitle}
          submitLabel={content.formSubmitLabel}
          dark
        />
      </div>
    </section>
  );
}
