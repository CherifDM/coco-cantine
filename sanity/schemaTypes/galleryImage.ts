import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo de la galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Court titre pour identifier la photo',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: "Description pour l'accessibilité",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'text',
      description: 'Légende qui s\'affiche sous la photo',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Plats', value: 'food' },
          { title: 'Événements', value: 'events' },
          { title: 'Lieu', value: 'place' },
          { title: 'Équipe', value: 'team' },
          { title: 'Autre', value: 'other' },
        ],
      },
      initialValue: 'food',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sans titre',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})