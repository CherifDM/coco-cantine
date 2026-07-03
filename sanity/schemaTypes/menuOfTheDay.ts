import { defineType, defineField } from 'sanity'
import { menuCourseGroupsField } from './menuFields'

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
      name: 'isClosed',
      title: 'Cantine fermée',
      type: 'boolean',
      description: 'Cocher si la cantine est fermée ce jour-là',
      initialValue: false,
    }),
    defineField({
      name: 'specialNote',
      title: 'Note spéciale du jour',
      type: 'text',
      description: 'Ex: "Mardi nous proposons au moins un menu sans aucun produit d\'origine animale"',
    }),
    menuCourseGroupsField('starters', 'Entrées', { maxGroups: 5 }),
    menuCourseGroupsField('mainCourses', 'Plats', {
      required: true,
      minGroups: 1,
      maxGroups: 5,
    }),
    menuCourseGroupsField('desserts', 'Desserts', { maxGroups: 5 }),
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
      isClosed: 'isClosed',
      groupCount: 'mainCourses.length',
      firstDish: 'mainCourses.0.dishes.0->name',
    },
    prepare({ date, isClosed, groupCount, firstDish }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : 'Date inconnue'
      if (isClosed) {
        return { title: formattedDate, subtitle: 'Fermé' }
      }
      return {
        title: formattedDate,
        subtitle: `${groupCount || 0} option(s) de plat${firstDish ? ` — ${firstDish}` : ''}`,
      }
    },
  },
})
