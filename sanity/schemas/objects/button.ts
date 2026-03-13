import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'button',
    title: 'Button',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
        }),
        defineField({
            name: 'btnType',
            title: 'Button Type',
            type: 'string',
            initialValue: 'internal',
            options: {
                list: [
                    { title: 'Internal', value: 'internal' },
                    { title: 'External', value: 'external' },
                    { title: 'None', value: 'none' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Required if button type is internal.',
            validation: (rule) =>
                rule.custom((currentValue, { parent }) => {
                    if ((parent as any)?.btnType !== 'none' && currentValue === undefined) return 'This is required if button type is internal.'
                    return true
                }),
        })
    ]
})