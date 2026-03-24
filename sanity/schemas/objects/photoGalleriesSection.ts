import { defineField, defineType } from "sanity";

export const photoGalleriesSection = defineType({
  name: "photoGalleriesSection",
  title: "Photo Galleries (external links)",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "simpleContent",
      description: "Optional short text above the gallery cards.",
    }),
    defineField({
      name: "galleries",
      title: "Galleries",
      type: "array",
      validation: (R) => R.required().min(1),
      of: [
        defineField({
          name: "gallery",
          title: "Gallery",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "url",
              title: "Gallery URL",
              type: "url",
              validation: (R) =>
                R.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "coverImage",
              title: "Cover image",
              type: "image",
              options: { hotspot: true },
              description:
                "Optional. Shown on the card; without it, a themed placeholder is used.",
            }),
          ],
          preview: {
            select: { title: "title", media: "coverImage" },
            prepare: ({ title }: { title?: string }) => ({
              title: title ?? "Gallery",
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Photo galleries: ${heading}` : "Photo galleries",
    }),
  },
});
