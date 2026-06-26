import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Événement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'type',
      title: 'Type d\'événement',
      type: 'string',
      options: {
        list: [
          { title: '🎵 Concert', value: 'concert' },
          { title: '🎤 Karaoké', value: 'karaoke' },
          { title: '💃 Bal/Soirée dansante', value: 'bal' },
          { title: '🎨 Atelier', value: 'atelier' },
          { title: '🍷 Apéro', value: 'apero' },
          { title: '🎪 Autre', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date et heure',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Date et heure de fin (optionnelle)',
      type: 'datetime',
      description: 'Si l\'événement dure plusieurs jours',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      description: 'Visible dans la liste des événements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu détaillé',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Contenu complet de la page événement',
    }),
    defineField({
      name: 'image',
      title: 'Image de l\'événement',
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
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: 'Ex: "Prix libre", "6€", "Gratuit"',
      placeholder: 'Prix libre conseillé 6€',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
      description: 'Par défaut : La Coco Cantine',
      initialValue: 'La Coco Cantine, 29 rue du soleil, 75020 Paris',
    }),
    defineField({
      name: 'organizer',
      title: 'Organisateur·rice',
      type: 'string',
      description: 'Nom du groupe ou de la personne qui organise',
    }),
    defineField({
      name: 'schedule',
      title: 'Programme horaire',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'time',
              title: 'Horaire',
              type: 'string',
              placeholder: '20h-22h',
            }),
            defineField({
              name: 'activity',
              title: 'Activité',
              type: 'string',
              placeholder: 'Fanfares !',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        },
      ],
      description: 'Programme détaillé avec horaires (ex: Karao Coco #3)',
    }),
    defineField({
      name: 'isPublished',
      title: 'Publié',
      type: 'boolean',
      description: 'Cocher pour afficher l\'événement sur le site',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      description: 'Cocher pour mettre en avant sur la page d\'accueil',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, prochains en premier',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      type: 'type',
      media: 'image',
    },
    prepare({ title, date, type, media }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : ''
      const emojis = {
        concert: '🎵',
        karaoke: '🎤',
        bal: '💃',
        atelier: '🎨',
        apero: '🍷',
        other: '🎪',
      }
      return {
        title: `${emojis[type as keyof typeof emojis] || '📅'} ${title}`,
        subtitle: formattedDate,
        media,
      }
    },
  },
})