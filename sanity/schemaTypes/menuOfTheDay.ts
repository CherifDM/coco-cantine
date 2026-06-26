import { defineType, defineField } from 'sanity'

export const menuOfTheDay = defineType({
  name: 'menuOfTheDay',
  title: 'Menu du jour',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Jour de la semaine',
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
      name: 'specialNote',
      title: 'Note spéciale du jour',
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
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isVegan',
              title: 'Végan (V)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'isGlutenFree',
              title: 'Sans gluten (SG)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'description',
              title: 'Description (optionnelle)',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'isVegan',
            },
            prepare({ title, subtitle }) {
              const tags = []
              if (subtitle) tags.push('🌱 V')
              return {
                title: title || 'Sans nom',
                subtitle: tags.join(' '),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'mainCourses',
      title: 'Plats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isVegan',
              title: 'Végan (V)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'isGlutenFree',
              title: 'Sans gluten (SG)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'description',
              title: 'Description (optionnelle)',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'isVegan',
            },
            prepare({ title, subtitle }) {
              const tags = []
              if (subtitle) tags.push('🌱 V')
              return {
                title: title || 'Sans nom',
                subtitle: tags.join(' '),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'desserts',
      title: 'Desserts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isVegan',
              title: 'Végan (V)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'isGlutenFree',
              title: 'Sans gluten (SG)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'description',
              title: 'Description (optionnelle)',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'isVegan',
            },
            prepare({ title, subtitle }) {
              const tags = []
              if (subtitle) tags.push('🌱 V')
              return {
                title: title || 'Sans nom',
                subtitle: tags.join(' '),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  orderings: [
    {
      title: 'Date, récentes en premier',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      date: 'date',
      dayOfWeek: 'dayOfWeek',
      mainCourses: 'mainCourses',
    },
    prepare({ date, dayOfWeek, mainCourses }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : 'Date inconnue'
      const daysMap = {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
      }
      const dayLabel = daysMap[dayOfWeek as keyof typeof daysMap] || ''
      const count = mainCourses?.length || 0
      return {
        title: `${dayLabel} ${formattedDate}`,
        subtitle: `${count} plat${count > 1 ? 's' : ''}`,
      }
    },
  },
})