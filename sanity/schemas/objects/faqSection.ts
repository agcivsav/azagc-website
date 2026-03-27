import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
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
          title: "FAQ item",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
            prepare: ({ title }: { title?: string }) => ({
              title: title ?? "FAQ item",
            }),
          },
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
