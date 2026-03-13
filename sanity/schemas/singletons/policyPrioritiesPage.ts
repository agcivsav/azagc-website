import { defineField, defineType } from 'sanity'

export const policyPrioritiesPageSingleton = defineType({
  name: 'policyPrioritiesPage',
  title: 'Policy Priorities Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
      initialValue: 'Policy Priorities',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue: "AZAGC's legislative priorities for Arizona — infrastructure, workforce, environment, and more.",
    }),
    defineField({
      name: 'sectionTitle',
      title: '"Where We Stand" Section Title',
      type: 'string',
      initialValue: 'Where We Stand',
    }),
    defineField({
      name: 'sectionIntro',
      title: 'Section Intro Paragraphs',
      type: 'text',
      rows: 8,
      description: 'Intro text below the section title. Use line breaks for multiple paragraphs.',
      initialValue:
        "Our national organization, AGC of America, formed in 1918 following a request by President Woodrow Wilson that contractors form an association so they could speak with one voice on matters of concern to the growing industry. Likewise, the Arizona chapter formed in 1934 to serve as the voice of the construction industry in Arizona.\n\nWe strive to create a strong, vibrant, competitive and safe construction market. No other trade association covers the wide variety of important construction issues such as infrastructure, safety and health, workforce development, energy and environment, labor and HR, taxes and more. Some of our current priorities are listed below, but we are neither narrow in focus nor limited in scope.",
    }),
        defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      of: [
        { type: 'pageBuilderTextBlock' },
         
      ],
      description: 'Optional text block and award winners list sections below the main content.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Policy Priorities Page',
      subtitle: 'Advocacy → Policy Priorities',
    }),
  },
})
