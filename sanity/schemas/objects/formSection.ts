import { defineField, defineType } from 'sanity'

export const formSection = defineType({
    name: 'formSection',
    title: 'Form Section',
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
            name: 'button',
            title: 'Button',
            type: 'button',
            options: { collapsible: true, collapsed: true },
        }),
        defineField({
            name: 'formTitle',
            title: 'Form Title',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'formSubtitle',
            title: 'Form Subtitle',
            type: 'text',
            rows: 2,
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'formSubmitLabel',
            title: 'Form Submit Label',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'formId',
            title: 'Form ID',
            type: 'string',
            validation: (R) => R.required(),
            description: 'Do not change the ID without asking the developer'
        })


    ],
    preview: {
        select: { title: 'sectionTitle' },
        prepare: ({ title }: { title?: string }) => ({ title: title ? `Form: ${title}` : 'Form' }),
    },
})
