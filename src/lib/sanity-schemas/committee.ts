import { defineType, defineField } from 'sanity'

export const committeeSchema = defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the committee card on the About → Committees page.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Optional summary for the card (e.g. one line).',
    }),
    defineField({
      name: 'chair',
      title: 'Chair',
      type: 'string',
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Meeting Schedule',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main rich text content for the committee detail page.',
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      description: 'Optional text block and grid sections below the intro.',
      of: [
        {
          type: 'object',
          name: 'committeeTextBlock',
          title: 'Text section',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'body', type: 'text', title: 'Body', rows: 6 },
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title ? `Text: ${title}` : 'Text section' }) },
        },
        {
          type: 'object',
          name: 'committeeGridSection',
          title: 'Grid section (image, heading, description)',
          fields: [
            {
              name: 'items',
              type: 'array',
              title: 'Grid items',
              of: [
                {
                  type: 'object',
                  name: 'committeeGridItem',
                  fields: [
                    { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                    { name: 'heading', type: 'string', title: 'Heading' },
                    { name: 'description', type: 'text', title: 'Description', rows: 3 },
                    { name: 'url', type: 'url', title: 'External link (optional)', description: 'Card becomes clickable to this URL.' },
                  ],
                  preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Grid item' }) },
                },
              ],
            },
          ],
          preview: { prepare: () => ({ title: 'Grid section' }) },
        },
        {
          type: 'object',
          name: 'committeeMeetingInfoResources',
          title: 'Meeting Info & Resources (two columns)',
          fields: [
            { name: 'leftHeading', type: 'string', title: 'Left column heading', initialValue: 'Meeting Info' },
            { name: 'leftDescription', type: 'text', title: 'Left description', rows: 2, description: 'e.g. "Monthly at 8:00 AM | AZAGC Office"' },
            { name: 'leftDatesHeading', type: 'string', title: 'Left dates subheading', description: 'e.g. "2026 Dates"' },
            {
              name: 'leftDates',
              type: 'array',
              title: 'Left dates list',
              of: [{ type: 'string', name: 'line', title: 'Line', description: 'e.g. "January 22 - All Industry"' }],
            },
            { name: 'rightHeading', type: 'string', title: 'Right column heading', initialValue: 'Resources' },
            { name: 'rightBody', type: 'text', title: 'Right body', rows: 4, description: 'e.g. "There are no committee related resources at this time."' },
            {
              name: 'rightLinks',
              type: 'array',
              title: 'Right resource links (optional)',
              of: [
                { type: 'object', name: 'resourceLink', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'url', type: 'url', title: 'URL' }], preview: { select: { title: 'label' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Link' }) } },
              ],
            },
          ],
          preview: { prepare: () => ({ title: 'Meeting Info & Resources' }) },
        },
      ],
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Card Button Label',
      type: 'string',
      initialValue: 'Learn more',
      description: 'Label for the button on the committee card.',
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'chair', media: 'image' } },
})
