import { defineType, defineField } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Site web',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Brève description du partenariat (visible sur la page)',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: '🏛️ Institution publique', value: 'public' },
          { title: '🏢 Entreprise privée', value: 'private' },
          { title: '🤝 Association', value: 'association' },
          { title: '🌱 Organisation écologique', value: 'eco' },
          { title: '📋 Autre', value: 'other' },
        ],
      },
      initialValue: 'other',
    }),
    defineField({
      name: 'isMainPartner',
      title: 'Partenaire principal',
      type: 'boolean',
      description: 'Cocher pour les partenaires majeurs (ex: Métropole du Grand Paris)',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      description: 'Cocher pour afficher dans la section "À la une"',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      description: 'Plus le nombre est petit, plus le partenaire apparaît en premier',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nom, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
      isMain: 'isMainPartner',
    },
    prepare({ title, subtitle, media, isMain }) {
      const categories = {
        public: '🏛️ Institution',
        private: '🏢 Entreprise',
        association: '🤝 Association',
        eco: '🌱 Écologique',
        other: '📋 Autre',
      }
      return {
        title: isMain ? `⭐ ${title}` : title,
        subtitle: categories[subtitle as keyof typeof categories] || subtitle,
        media,
      }
    },
  },
})