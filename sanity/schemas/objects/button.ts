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
                    { title: 'Upload', value: 'upload' },
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
                    if ((parent as any)?.btnType !== 'none' && parent?.btnType !== 'upload' && currentValue === undefined) return 'This is required if button type is internal.'
                    return true
                }),
            hidden: ({ parent }) => parent?.btnType === 'upload' || parent?.btnType === 'none',
        }),
        defineField({
            name: 'upload',
            title: 'Upload',
            type: 'file',
            description: 'Required if button type is upload.',
            validation: (rule) =>
                rule.custom((currentValue, { parent }) => {
                    if ((parent as any)?.btnType === 'upload' && currentValue === undefined) return 'This is required if button type is upload.'
                    return true
                }),
            hidden: ({ parent }) => parent?.btnType !== 'upload',
        }),
    ]
})