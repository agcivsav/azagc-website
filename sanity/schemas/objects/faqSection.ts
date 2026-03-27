import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "enabled",
      title: "Enable section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      initialValue: "Frequently Asked Questions",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      validation: (R) => R.min(1).required(),
      of: [
        defineField({
          name: "item",
          title: "FAQ item reference",
          type: "reference",
          to: [{ type: "faqItem" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: { title?: string }) => ({
      title: title ? `FAQ: ${title}` : "FAQ section",
    }),
  },
});
