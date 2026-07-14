import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'lineDrawingEnabled',
      title: 'Line Drawing Cards',
      description: 'Apply the line-drawing filter to show poster images in cards',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
