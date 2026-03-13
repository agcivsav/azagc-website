import { defineField, defineType } from 'sanity'

export const pageBuilderAwardWinnersListObject = defineType({
  name: 'pageBuilderAwardWinnersList',
  title: 'Award Winners List (e.g. Build Arizona)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      // validation: (R) => R.required(),
      description: 'List points section"',
    }),
    defineField({
      name: 'items',
      title: 'Winners',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'awardWinnerEntry',
          fields: [
            { name: 'companyName', type: 'string', title: 'Company name', validation: (R) => R.required() },
            {
              name: 'details',
              type: 'text',
              title: 'Project details',
              rows: 5,
              description: 'One line per project or detail (e.g. project name, location, type of work).',
            },
          ],
          preview: {
            select: { title: 'companyName' },
            prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Entry' }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Award winners: ${heading}` : 'Award winners list',
    }),
  },
})
