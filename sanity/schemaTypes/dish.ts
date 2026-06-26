import { defineType, defineField } from 'sanity'

export const dish = defineType({
  name: 'dish',
  title: 'Plat',
  type: 'document',
  liveEdit: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du plat',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brève description du plat (ingrédients principaux, origine...)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'price',
      title: 'Prix (en €)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Entrée', value: 'starter' },
          { title: 'Plat', value: 'main' },
          { title: 'Dessert', value: 'dessert' },
          { title: 'Boisson', value: 'drink' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isVegetarian',
      title: 'Végétarien',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isVegan',
      title: 'Végan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isGlutenFree',
      title: 'Sans gluten',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Photo du plat',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: "Description pour l'accessibilité",
        }),
      ],
    }),
    defineField({
      name: 'isDailySpecial',
      title: 'Plat du jour',
      type: 'boolean',
      description: 'Cocher si ce plat est proposé comme plat du jour',
      initialValue: false,
    }),
    defineField({
      name: 'seasonal',
      title: 'Plat de saison',
      type: 'boolean',
      description: 'Cocher si ce plat est de saison',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Nom, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Prix, croissant',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sans nom',
        subtitle: subtitle ? `${subtitle}€` : 'Prix non défini',
        media,
      }
    },
  },
})