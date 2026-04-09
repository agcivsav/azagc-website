import { defineArrayMember, defineField, defineType } from 'sanity'

export const imageCarouselContent = defineType({
  name: 'imageCarouselContent',
  title: 'Image carousel (two column)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleContent',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Carousel images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'carouselSlide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              // validation: (R) => R.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: { alt: 'alt', media: 'image' },
            prepare: ({ alt, media }) => ({
              title: alt || 'Slide',
              media,
            }),
          },
        }),
      ],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: 'button',
      title: 'Button 1',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'button3',
      title: 'Button 3',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { heading: 'heading', slides: 'slides' },
    prepare: ({ heading, slides }) => ({
      title: heading ? `Carousel: ${heading}` : 'Image carousel',
      subtitle: Array.isArray(slides) ? `${slides.length} slide(s)` : undefined,
    }),
  },
})
