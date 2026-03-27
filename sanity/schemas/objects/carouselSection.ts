import { defineField, defineType } from 'sanity'

export const carouselSection = defineType({
  name: 'carouselSection',
  title: 'Slider / Gallery',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro text (optional)',
      type: 'simpleContent',
      description: 'Short text above the gallery.',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineField({
          name: 'slide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO.',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'caption' },
          prepare: ({ media, title }) => ({
  media,
  title: title || 'Gallery slide',
}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Gallery: ${heading}` : 'Gallery section',
    }),
  },
})
