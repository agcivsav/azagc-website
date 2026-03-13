import { defineField, defineType } from 'sanity'

export const featuresSection = defineType({
    name: 'featuresSection',
    title: 'Features Section',
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
            name: 'items',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'featureItem',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() },
                        { name: 'description', type: 'text', title: 'Description', validation: (R) => R.required() },

                    ],
                    preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Feature' }) },
                },
            ],
        }),
        defineField({
            name: 'columns',
            title: 'Cards per row',
            type: 'string',
            options: {
                list: [
                    { title: '3 columns', value: '3' },
                    { title: '4 columns', value: '4' },
                ],
                layout: 'radio',
            },
            initialValue: '3',
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
