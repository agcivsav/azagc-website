import { defineField, defineType } from 'sanity'

export const committeesSection = defineType({
    name: 'committeesSection',
    title: 'Committees Section',
    type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [
        defineField({
            name: 'sectionTitle',
            title: 'Section heading',
            type: 'string',
            // validation: (R) => R.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'simpleContent',
        }),
        defineField({
            name: 'committees',
            title: 'Committees',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'committee' }],
                },
            ],
            validation: (R) => R.required().min(1),
        }),

        defineField({
            name: 'button',
            title: 'Button',
            type: 'button',
            options: { collapsible: true, collapsed: true },
        }),

    ],
    preview: {
        select: { title: 'sectionTitle' },
        prepare: ({ title }: { title?: string }) => ({ title: title ? `Features: ${title}` : 'Features' }),
    },
})
