import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du site',
      type: 'string',
      initialValue: 'La Coco Cantine',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      description: 'Slogan affiché dans le header',
      initialValue: 'Pour que tout le monde puisse bien manger !',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      initialValue: 'Place des fêtes, 75020 Paris',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'lunchHours',
      title: 'Horaires déjeuner',
      type: 'string',
      initialValue: 'Lundi au jeudi, 12h30 - 14h30',
    }),
    defineField({
      name: 'eveningHours',
      title: 'Horaires soirée (buvette)',
      type: 'string',
      initialValue: 'Vendredi et samedi, 18h30 - minuit',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'signal', title: 'Signal', type: 'url' }),
        defineField({ name: 'helloasso', title: 'HelloAsso', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Image de couverture (Hero)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutText',
      title: 'Texte de présentation',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Le texte d\'accueil principal du site',
    }),
    defineField({
      name: 'pricesText',
      title: 'Texte sur les tarifs',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texte expliquant les 3 tarifs (solidaire, normal, soutien)',
    }),
    defineField({
        name: 'partnersIntroText',
        title: 'Texte d\'introduction - Partenaires',
        type: 'array',
        of: [{ type: 'block' }],
        description: 'Texte en haut de la page "Nos partenaires"',
        initialValue: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Nos partenaires dans cette grande aventure cantinesque :',
              },
            ],
          },
        ],
      }),
      defineField({
        name: 'volunteerPageRef',
        title: 'Page "Rejoindre"',
        type: 'reference',
        to: [{ type: 'volunteerPage' }],
        description: 'Référence vers la page complète "Rejoindre"',
      }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'address',
    },
  },
})