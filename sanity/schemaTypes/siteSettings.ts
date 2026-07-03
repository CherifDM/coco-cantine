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
      name: 'menuPhilosophyText',
      title: 'Texte — Menu du jour',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Explication sur le menu unique quotidien (page d\'accueil)',
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Pour limiter les invendus, nous proposons un menu unique chaque jour. Souvent, nous avons davantage de choix (2 ou 3 maximum) pour l\'entrée et le dessert. Tous nos plats sont au moins végétariens, souvent véganes, et surtout délicieux.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pricesText',
      title: 'Texte sur les tarifs',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texte expliquant les 3 tarifs (solidaire, normal, soutien)',
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Nous pensons que bien manger est un droit, or nous n\'avons pas toustes le même porte-monnaie ni les moyens de bien se nourrir.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Nous proposons donc 3 tarifs différents en fonction de ce que vous pouvez/voulez payer (c\'est vous qui le déterminez, sentez-vous libre) :',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pricesImage',
      title: 'Photo des tarifs',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          initialValue: 'Affiche des tarifs de La Coco Cantine',
        }),
      ],
    }),
    defineField({
      name: 'usefulLinksIntro',
      title: 'Introduction — Liens utiles',
      type: 'string',
      description: 'Phrase d\'introduction de la section liens utiles (page d\'accueil)',
      initialValue: 'En attendant de nous rendre visite, vous pouvez :',
    }),
    defineField({
      name: 'usefulLinksText',
      title: 'Liens utiles (page d\'accueil)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Liste de liens utiles avec liens cliquables',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texte de présentation',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Le texte d\'accueil principal du site',
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