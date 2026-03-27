import { defineField, defineType } from 'sanity'

export const headerNavigationItemObject = defineType({
  name: 'headerNavigationItem',
  title: 'Header Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path / URL',
      type: 'string',
      description: 'Top-level destination for this menu item.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'children',
      title: 'Dropdown Links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      description: 'Optional secondary links shown in the desktop dropdown and mobile submenu.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
      children: 'children',
    },
    prepare({ title, subtitle, children }) {
      const count = Array.isArray(children) ? children.length : 0
      return {
        title,
        subtitle: count ? `${subtitle} • ${count} sub-links` : subtitle,
      }
    },
  },
})
