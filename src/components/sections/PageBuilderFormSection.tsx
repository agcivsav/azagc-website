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
    <div className="container-site max-w-3xl">
      
 <div className=" w-full lg:flex justify-between items-center">
    {(content.sectionTitle || (content.description?.length ?? 0) > 0) && (
        <div className=" mb-8">
          {content.sectionTitle ? (
            <h2 className="font-normal text-2xl text-navy mb-3">
              {content.sectionTitle}
            </h2>
          ) : null}
          {(content.description?.length ?? 0) > 0 ? (
            <div className="font-body text-base text-slate leading-relaxed lg:w-[600px]">
              <PortableText value={content.description as PortableTextBlock[]} />
            </div>
          ) : null}
        </div>
      )}

       <div className="max-w-xl bg-white border border-warm-gray p-7 rounded-sm shadow-sm">
        <LeadForm
          source={content.formId}
          formId={content.formId}
          headline={content.formTitle}
          subheadline={content.formSubtitle}
          submitLabel={content.formSubmitLabel}
        />
      </div>
 </div>
    </div>
    </section>
  );
}
