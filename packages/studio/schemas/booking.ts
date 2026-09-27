import { defineField, defineType } from 'sanity'

export const booking = defineType({
  name: 'booking',
  title: 'Rehearsal Room Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Purpose / Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'room',
      title: 'Room',
      type: 'string',
      options: {
        list: [
          { title: 'Rehearsal Room A', value: 'room-a' },
          { title: 'Rehearsal Room B', value: 'room-b' },
          { title: 'Main Stage', value: 'main-stage' },
          { title: 'Studio Space', value: 'studio' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g. 09:00',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g. 12:00',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bookedBy',
      title: 'Booked By',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Group',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Calendar Colour',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: '#FF5F38' },
          { title: 'Blue', value: '#3B82F6' },
          { title: 'Green', value: '#10B981' },
          { title: 'Purple', value: '#8B5CF6' },
          { title: 'Yellow', value: '#F59E0B' },
          { title: 'Red', value: '#EF4444' },
        ],
      },
      initialValue: '#FF5F38',
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (oldest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      room: 'room',
      startTime: 'startTime',
      endTime: 'endTime',
      bookedBy: 'bookedBy',
    },
    prepare({ title, date, room, startTime, endTime, bookedBy }) {
      const roomLabel: Record<string, string> = {
        'room-a': 'Room A',
        'room-b': 'Room B',
        'main-stage': 'Main Stage',
        'studio': 'Studio',
      }
      return {
        title: title || 'Untitled Booking',
        subtitle: `${date} · ${startTime}–${endTime} · ${roomLabel[room] ?? room} · ${bookedBy}`,
      }
    },
  },
})
