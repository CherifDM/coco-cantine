import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { SiteSettings } from '@/lib/types'

interface HoursAndPricesProps {
  settings?: SiteSettings | null
}

/** Horaires et tarifs de la cantine */
export function HoursAndPrices({ settings }: HoursAndPricesProps) {
  const lunchHours = settings?.lunchHours || 'Lundi au jeudi, 12h30 – 14h30'
  const eveningHours = settings?.eveningHours || 'Vendredi et samedi, 18h30 – minuit'

  const prices = [
    {
      name: 'Solidaire',
      description: 'Pour celles et ceux qui en ont besoin',
      emoji: '💚',
    },
    {
      name: 'Normal',
      description: 'Le tarif standard de la cantine',
      emoji: '🍽️',
    },
    {
      name: 'Soutien',
      description: 'Pour soutenir notre projet associatif',
      emoji: '🌟',
    },
  ]

  return (
    <>
      <Section className="bg-white" ariaLabelledby="hours-title">
        <Container>
          <SectionHeader id="hours-title" title="Nos horaires" />
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <article className="rounded-2xl bg-background p-6 text-center border-2 border-primary/20">
              <span className="text-3xl mb-2 block" aria-hidden="true">☀️</span>
              <h3 className="font-bold text-primary text-lg mb-2">Déjeuner</h3>
              <p className="text-foreground">{lunchHours}</p>
            </article>
            <article className="rounded-2xl bg-background p-6 text-center border-2 border-secondary/20">
              <span className="text-3xl mb-2 block" aria-hidden="true">🌙</span>
              <h3 className="font-bold text-secondary text-lg mb-2">Soirée buvette</h3>
              <p className="text-foreground">{eveningHours}</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledby="prices-title">
        <Container>
          <SectionHeader
            id="prices-title"
            title="Nos tarifs"
            subtitle="Trois prix différenciés pour que chacun·e puisse manger selon ses moyens."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {prices.map((price) => (
              <article
                key={price.name}
                className="rounded-2xl bg-white p-6 shadow-md text-center"
              >
                <span className="text-3xl mb-3 block" aria-hidden="true">{price.emoji}</span>
                <h3 className="text-xl font-bold text-primary mb-2 capitalize">{price.name}</h3>
                <p className="text-text-light">{price.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
