import { defineField, defineType } from 'sanity'

export const ourTeamPageSingleton = defineType({
  name: 'ourTeamPage',
  title: 'Our Team Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
      description: 'Main heading (e.g. "We Are Passionate About Advancing The Construction Industry In Arizona")',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      title: 'Team Sections',
      type: 'array',
      of: [{ type: 'teamSection' }, { type: 'teamImageCardSection' } , { type: 'pageBuilderTextBlock' }], 
      description: 'Add sections like "Executive Committee" and "Directors". Order determines display order.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Our Team Page',
      subtitle: 'About → Our Team',
    }),
  },
})
