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
  ],
  preview: {
    select: {
      title: 'name',
      isVegan: 'isVegan',
      isGlutenFree: 'isGlutenFree',
      seasonal: 'seasonal',
      media: 'image',
    },
    prepare({ title, isVegan, isGlutenFree, seasonal, media }) {
      const tags = []
      if (isVegan) tags.push('🌱 V')
      if (isGlutenFree) tags.push('🚫 SG')
      if (seasonal) tags.push('🍂 Saison')
      return {
        title: title || 'Sans nom',
        subtitle: tags.join(' ') || undefined,
        media,
      }
    },
  },
})
