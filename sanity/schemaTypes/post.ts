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
      of: [
        { type: 'block' },
        {
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
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
          ],
        },
        // Permet d'inclure le menu de la semaine dans un article
        {
          type: 'object',
          name: 'weeklyMenu',
          title: 'Menu de la semaine',
          fields: [
            defineField({
              name: 'description',
              title: 'Description introductive',
              type: 'text',
              description: 'Texte avant les menus (ex: "Pour tendre vers une cuisine accessible...")',
            }),
            defineField({
              name: 'days',
              title: 'Jours de la semaine',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'day',
                      title: 'Jour',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Lundi', value: 'monday' },
                          { title: 'Mardi', value: 'tuesday' },
                          { title: 'Mercredi', value: 'wednesday' },
                          { title: 'Jeudi', value: 'thursday' },
                          { title: 'Vendredi', value: 'friday' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'specialNote',
                      title: 'Note spéciale',
                      type: 'text',
                      description: 'Ex: "Mardi nous proposons au moins un menu sans aucun produit d\'origine animale"',
                    }),
                    defineField({
                      name: 'starters',
                      title: 'Entrées',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({ name: 'name', title: 'Nom', type: 'string' }),
                            defineField({ name: 'isVegan', title: 'Végan (V)', type: 'boolean' }),
                            defineField({ name: 'isGlutenFree', title: 'Sans gluten (SG)', type: 'boolean' }),
                          ],
                        },
                      ],
                    }),
                    defineField({
                      name: 'mainCourses',
                      title: 'Plats',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({ name: 'name', title: 'Nom', type: 'string' }),
                            defineField({ name: 'isVegan', title: 'Végan (V)', type: 'boolean' }),
                            defineField({ name: 'isGlutenFree', title: 'Sans gluten (SG)', type: 'boolean' }),
                          ],
                        },
                      ],
                    }),
                    defineField({
                      name: 'desserts',
                      title: 'Desserts',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({ name: 'name', title: 'Nom', type: 'string' }),
                            defineField({ name: 'isVegan', title: 'Végan (V)', type: 'boolean' }),
                            defineField({ name: 'isGlutenFree', title: 'Sans gluten (SG)', type: 'boolean' }),
                          ],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
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
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: '📝 Article', value: 'article' },
          { title: '🍽️ Menus de la semaine', value: 'menus' },
          { title: '📅 Événements', value: 'events' },
          { title: '📢 Info', value: 'info' },
        ],
      },
      initialValue: 'article',
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
      category: 'category',
    },
    prepare({ title, date, media, isDraft, category }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : ''
      const categoryEmojis = {
        article: '📝',
        menus: '🍽️',
        events: '📅',
        info: '📢',
      }
      const emoji = categoryEmojis[category as keyof typeof categoryEmojis] || ''
      return {
        title: isDraft ? `[BROUILLON] ${title}` : title,
        subtitle: `${emoji} ${formattedDate}`,
        media,
      }
    },
  },
})