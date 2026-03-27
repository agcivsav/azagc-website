import { defineArrayMember, defineField, defineType } from 'sanity'

import { CarouselSlidesArrayInput } from '../../components/CarouselSlidesArrayInput'

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
      description:
        'Use the drop zone above the list to add many slides at once (drag multiple images or choose files). Drag slide cards to reorder; edit alt/caption on each slide.',
      components: {
        input: CarouselSlidesArrayInput,
      },
      options: {
        layout: 'grid',
        sortable: true,
      },
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
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
