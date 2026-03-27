import { defineField, defineType } from "sanity";

export const embedPanelsSection = defineType({
  name: "embedPanelsSection",
  title: "Embed panels (rail + stage)",
  type: "object",
  description:
    "Category rail with a main stage for up to two iframe embeds per panel. Replaces a classic tab bar while keeping tabs section unchanged.",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro (optional)",
      type: "simpleContent",
    }),
    defineField({
      name: "panels",
      title: "Panels",
      type: "array",
      validation: (R) => R.required().min(1),
      of: [
        defineField({
          name: "panel",
          title: "Panel",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Shown in the left rail (desktop) or dropdown (mobile).",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "embedUrl",
              title: "Embed URL (iframe)",
              type: "array",
              of: [
                {
                  type: "url",
                  validation: (R) => R.uri({ scheme: ["http", "https"] }),
                },
              ],
              description:
                "Optional. Full-page tool embed (https). Maximum of 2 embeds per panel.",
              validation: (R) => R.required().max(2),
            }),
          ],
          preview: {
            select: { label: "label" },
            prepare: ({ label }: { label?: string }) => ({
              title: label ?? "Panel",
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Embed panels: ${heading}` : "Embed panels",
    }),
  },
});
