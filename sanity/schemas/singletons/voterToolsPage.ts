import { defineField, defineType } from 'sanity'

export const voterToolsPageSingleton = defineType({
  name: 'voterToolsPage',
  title: 'Voter Tools Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Voter Tools',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Are You Ballot Ready?',
    }),
    defineField({
      name: 'introParagraph',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'AGC Of America Construction Vote Election Center',
    }),
    defineField({
      name: 'descriptionParagraph',
      title: 'Description Paragraph',
      type: 'text',
      rows: 4,
      description: 'Text below the subheading (e.g. how Construction Votes helps members).',
    }),
    defineField({
      name: 'bulletItems',
      title: 'Bullet List Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Register to vote, Request absentee ballot, etc.',
    }),
    defineField({
      name: 'concludingParagraph',
      title: 'Concluding Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button/Link Label',
      type: 'string',
      initialValue: 'Click Here To Visit AGC Construction Votes',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      description: 'Link for the main call-to-action.',
    }),
    defineField({
      name: 'sidebarTitle',
      title: 'Sidebar Title',
      type: 'string',
      initialValue: 'Voter Tools',
    }),
defineField({
  name: 'sidebarLinks',
  title: 'Sidebar Links',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'voterToolLink',
      fields: [
        defineField({
          name: 'label',
          title: 'Link Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: { label: 'label' },
        prepare: ({ label }: { label?: string }) => ({
          title: label ?? 'Link',
        }),
      },
    },
  ],
})
  ],
  preview: {
    prepare: () => ({ title: 'Voter Tools Page', subtitle: 'Advocacy → Voter Tools' }),
  },
})
