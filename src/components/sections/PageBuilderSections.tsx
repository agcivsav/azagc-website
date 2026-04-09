import type { ISection } from "@/types/common";
import {
  mapPageBuilderSection,
  type PageBuilderRenderOptions,
} from "@/components/sections/pageBuilderSectionMapper";

type PageBuilderSectionsProps = PageBuilderRenderOptions & {
  sections?: ISection[] | null;
};

export function PageBuilderSections({
  sections,
  affiliateSecondTextAnchorByKey,
  imagePresentation,
}: PageBuilderSectionsProps) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((section, index) =>
        mapPageBuilderSection(section, index, {
          affiliateSecondTextAnchorByKey,
          imagePresentation,
        }),
      )}
    </>
  );
}
