import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mixs',
  title: 'Mixs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du mix',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Numéro du mix',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'DJ',
      description: 'Select the artist associated with this mix',
      type: 'reference',
      to: [{ type: 'artists' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Lien du mix',
      type: 'url',
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'genre' }] }],
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
