import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      description: 'Un court résumé de l\'article affiché dans la liste',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur·rice',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isDraft',
      title: 'Brouillon',
      type: 'boolean',
      description: 'Cocher pour garder l\'article en brouillon',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date de publication, récentes en premier',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'featuredImage',
      isDraft: 'isDraft',
    },
    prepare({ title, date, media, isDraft }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : ''
      return {
        title: isDraft ? `[BROUILLON] ${title}` : title,
        subtitle: formattedDate,
        media,
      }
    },
  },
})
