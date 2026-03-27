import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'topBar',
            title: 'Top Bar',
            type: 'topBarSettings',
            description: 'Content for the slim bar above the main site header.',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'header',
            title: 'Header',
            type: 'headerSettings',
            description: 'Main site header content, including logo, navigation, and CTA.',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'footer',
            title: 'Footer',
            type: 'footerSettings',
            description: 'Footer logo, description, grouped links, social links, and bottom CTA.',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'seo',
            title: 'Default SEO',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                { name: 'title', type: 'string', title: 'Default Meta Title' },
                { name: 'description', type: 'text', title: 'Default Meta Description', rows: 3 },
                { name: 'ogImage', type: 'image', title: 'Default OG Image' },
            ],
        }),
    ],
    preview: { prepare: () => ({ title: 'Site Settings' }) },
})
