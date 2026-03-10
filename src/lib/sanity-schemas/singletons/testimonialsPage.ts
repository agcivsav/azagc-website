import { defineField, defineType } from 'sanity'

export const testimonialsPageSingleton = defineType({
  name: 'testimonialsPage',
  title: 'Testimonials Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
      initialValue: 'We Are The Construction Association Of Choice In Arizona',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      initialValue:
        'We work hard to build and sustain trust and credibility as the oldest and most influential construction association. Read what some of our satisfied members and industry partners say about the value of our services, and the continuous improvements we make to the construction industry.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Testimonials Page',
      subtitle: 'About → Testimonials',
    }),
  },
})
