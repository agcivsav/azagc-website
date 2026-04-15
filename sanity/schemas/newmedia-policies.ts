export const newmediaPoliciesSchema = {
    name: 'newsMediaPolicies',
    title: 'News Media Policies',
    type: 'document',
    fields: [
        {
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (r: { required: () => unknown }) => r.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (r: { required: () => unknown }) => r.required(),
        },

        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (r: { max: (n: number) => unknown }) => r.max(300),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }, { type: 'button' }],
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'slug.current' },
    },
}
