import { defineField, defineType } from 'sanity'

export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Show Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      options: {
        list: [
          'Shadow Theatre',
          'Teatro Live!',
          'Die-Nasty',
          'Trunk Theatre',
          'House of Hush',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'startDate',
      title: 'Opening Night',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Closing Night',
      type: 'date',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Display Text',
      description: 'e.g. "April 9 – April 19" or "Every Monday at 7:30"',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'externalLink',
      title: 'Ticket Link',
      description: 'Link to buy tickets (leave blank if not yet available)',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Pin this show as featured (overrides date logic)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'company',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Opening Night',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
})
