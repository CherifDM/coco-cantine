import { defineType, defineField } from 'sanity'

export const weeklyMenu = defineType({
  name: 'weeklyMenu',
  title: 'Menu de la semaine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Menus de la semaine',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weekStart',
      title: 'Début de la semaine',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'text',
      description: 'Ex: "Pour tendre vers une cuisine accessible, éthique et durable..."',
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isClosed',
              title: 'Fermé ce jour',
              type: 'boolean',
              description: 'Cocher si la cantine est fermée ce jour-là',
              initialValue: false,
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
                    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'isVegan', title: '🌱 V', type: 'boolean' }),
                    defineField({ name: 'isGlutenFree', title: '🚫 SG', type: 'boolean' }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      isVegan: 'isVegan',
                      isGlutenFree: 'isGlutenFree',
                    },
                    prepare({ title, isVegan, isGlutenFree }) {
                      const tags = []
                      if (isVegan) tags.push('🌱 V')
                      if (isGlutenFree) tags.push('🚫 SG')
                      return {
                        title: title || 'Sans nom',
                        subtitle: tags.join(' '),
                      }
                    },
                  },
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
                    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'isVegan', title: '🌱 V', type: 'boolean' }),
                    defineField({ name: 'isGlutenFree', title: '🚫 SG', type: 'boolean' }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      isVegan: 'isVegan',
                      isGlutenFree: 'isGlutenFree',
                    },
                    prepare({ title, isVegan, isGlutenFree }) {
                      const tags = []
                      if (isVegan) tags.push('🌱 V')
                      if (isGlutenFree) tags.push('🚫 SG')
                      return {
                        title: title || 'Sans nom',
                        subtitle: tags.join(' '),
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            }),
            defineField({
              name: 'desserts',
              title: 'Desserts',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'isVegan', title: '🌱 V', type: 'boolean' }),
                    defineField({ name: 'isGlutenFree', title: '🚫 SG', type: 'boolean' }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      isVegan: 'isVegan',
                      isGlutenFree: 'isGlutenFree',
                    },
                    prepare({ title, isVegan, isGlutenFree }) {
                      const tags = []
                      if (isVegan) tags.push('🌱 V')
                      if (isGlutenFree) tags.push('🚫 SG')
                      return {
                        title: title || 'Sans nom',
                        subtitle: tags.join(' '),
                      }
                    },
                  },
                },
              ],
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'isPublished',
      title: 'Publié',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Début de semaine, récent en premier',
      name: 'weekStartDesc',
      by: [{ field: 'weekStart', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      weekStart: 'weekStart',
      days: 'days',
    },
    prepare({ weekStart, days }) {
      const formattedDate = weekStart ? `Semaine du ${new Date(weekStart).toLocaleDateString('fr-FR')}` : 'Date inconnue'
      const dayCount = days?.length || 0
      return {
        title: formattedDate,
        subtitle: `${dayCount} jour${dayCount > 1 ? 's' : ''}`,
      }
    },
  },
})