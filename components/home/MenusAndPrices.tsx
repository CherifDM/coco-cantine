import type { PortableTextBlock } from '@portabletext/react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { MenuDay } from '@/components/menu/MenuDay'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { formatMenuDayLabel } from '@/lib/utils'
import type { MenuOfTheDay, SiteSettings } from '@/lib/types'

const DEFAULT_MENU_PHILOSOPHY: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'menu-default',
    children: [
      {
        _type: 'span',
        _key: 'menu-span',
        text: 'Pour limiter les invendus, nous proposons un menu unique chaque jour. Souvent, nous avons davantage de choix (2 ou 3 maximum) pour l\'entrée et le dessert. Tous nos plats sont au moins végétariens, souvent véganes, et surtout délicieux.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
]

const DEFAULT_PRICES_TEXT: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'prices-1',
    children: [
      {
        _type: 'span',
        _key: 'prices-span-1',
        text: 'Nous pensons que bien manger est un droit, or nous n\'avons pas toustes le même porte-monnaie ni les moyens de bien se nourrir.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _type: 'block',
    _key: 'prices-2',
    children: [
      {
        _type: 'span',
        _key: 'prices-span-2',
        text: 'Nous proposons donc 3 tarifs différents en fonction de ce que vous pouvez/voulez payer (c\'est vous qui le déterminez, sentez-vous libre) :',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
]

const PRICES = [
  {
    name: 'Solidaire',
    description: 'Pour celles et ceux qui en ont besoin',
    emoji: '💚',
    accent: 'bg-secondary/10 border-secondary/30',
  },
  {
    name: 'Normal',
    description: 'Le tarif standard de la cantine',
    emoji: '🍽️',
    accent: 'bg-primary/10 border-primary/30',
  },
  {
    name: 'Soutien',
    description: 'Pour soutenir notre projet associatif',
    emoji: '🌟',
    accent: 'bg-gold/20 border-gold/50',
  },
]

interface MenusAndPricesProps {
  menu?: MenuOfTheDay | null
  settings?: SiteSettings | null
}

export function MenusAndPrices({ menu, settings }: MenusAndPricesProps) {
  const menuPhilosophy =
    settings?.menuPhilosophyText && settings.menuPhilosophyText.length > 0
      ? settings.menuPhilosophyText
      : DEFAULT_MENU_PHILOSOPHY

  const pricesText =
    settings?.pricesText && settings.pricesText.length > 0
      ? settings.pricesText
      : DEFAULT_PRICES_TEXT

  return (
    <Section ariaLabelledby="menus-prices-title">
      <Container>
        <SectionHeader
          id="menus-prices-title"
          title="Menus et tarifs"
          subtitle="Découvrez ce que nos cuisinièr·es vous préparent, et mangez selon vos moyens."
        />

        <div className="max-w-3xl mx-auto space-y-8 mb-12">
          <PortableTextRenderer value={menuPhilosophy} />
          <PortableTextRenderer value={pricesText} />

          {settings?.pricesImage?.asset && (
            <figure className="rounded-2xl overflow-hidden bg-light/30 p-3 shadow-sm border-2 border-light">
              <SanityImageComponent
                image={settings.pricesImage}
                alt={settings.pricesImage.alt || 'Affiche des tarifs de La Coco Cantine'}
                width={900}
                height={1200}
                objectFit="contain"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </figure>
          )}
        </div>

        {/* <div className="grid gap-6 md:grid-cols-3 mt-12 max-w-4xl mx-auto">
          {PRICES.map((price) => (
            <article
              key={price.name}
              className={`rounded-2xl border-2 ${price.accent} p-8 text-center card-hover shadow-sm`}
            >
              <span className="text-4xl mb-4 block" aria-hidden="true">{price.emoji}</span>
              <h3 className="text-xl font-bold text-primary mb-2 capitalize">{price.name}</h3>
              <p className="text-muted">{price.description}</p>
            </article>
          ))}
        </div> */}

        <div className="max-w-2xl mx-auto mb-10">
          {menu ? (
            <MenuDay
              dayLabel={formatMenuDayLabel(menu.date)}
              starters={menu.starters}
              mainCourses={menu.mainCourses}
              desserts={menu.desserts}
              specialNote={menu.specialNote}
              isClosed={menu.isClosed}
            />
          ) : (
            <p className="text-center text-muted text-lg">
              Le menu du jour sera bientôt disponible. Revenez nous voir !
            </p>
          )}
        </div>

        <div className="text-center">
          <Button href="/blog?filter=menus" variant="accent">
            Voir les menus de la semaine
          </Button>
        </div>
      </Container>
    </Section>
  )
}
