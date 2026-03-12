import { defineField, defineType } from 'sanity'

export const homeHeroObject = defineType({
  name: 'homeHero',
  title: 'Homepage Hero',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline in the homepage hero section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Supporting copy under the main headline',
    }),
     defineField({
      name: 'description',
      title: 'description',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image shown behind the hero content',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'Text for the primary hero button',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA Link',
      type: 'string',
      description: 'URL for the primary hero button',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      description: 'Text for the secondary hero button',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA Link',
      type: 'string',
      description: 'URL for the secondary hero button',
    }),
    defineField({
      name: 'stats',
      title: 'Proof Bar Stats',
      type: 'array',
      description: 'Stats displayed in the proof bar below the hero',
      of: [
        defineField({
          name: 'stat',
          title: 'Stat',
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'number' },
            {
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'E.g. +, %, B',
            },
            {
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'E.g. $',
            },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
  ],
})

