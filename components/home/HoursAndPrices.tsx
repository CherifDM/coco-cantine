import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { WaveDivider } from '@/components/ui/WaveDivider'
import type { SiteSettings } from '@/lib/types'

interface HoursAndPricesProps {
  settings?: SiteSettings | null
}

export function HoursAndPrices({ settings }: HoursAndPricesProps) {
  const lunchHours = settings?.lunchHours || 'Lundi au jeudi, 12h30 – 14h30'
  const eveningHours = settings?.eveningHours || 'Vendredi et samedi, 18h30 – minuit'

  const prices = [
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

  return (
    <>
      <Section className="bg-light" ariaLabelledby="hours-title">
        <Container>
          <SectionHeader id="hours-title" title="Nos horaires" />
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <article className="rounded-2xl bg-white p-8 text-center border-2 border-primary/20 card-hover shadow-sm">
              <span className="text-4xl mb-3 block" aria-hidden="true">☀️</span>
              <h3 className="font-bold text-primary text-xl mb-2">Déjeuner</h3>
              <p className="text-dark">{lunchHours}</p>
            </article>
            <article className="rounded-2xl bg-white p-8 text-center border-2 border-secondary/20 card-hover shadow-sm">
              <span className="text-4xl mb-3 block" aria-hidden="true">🌙</span>
              <h3 className="font-bold text-secondary text-xl mb-2">Soirée buvette</h3>
              <p className="text-dark">{eveningHours}</p>
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
                className={`rounded-2xl border-2 ${price.accent} p-8 text-center card-hover shadow-sm`}
              >
                <span className="text-4xl mb-4 block" aria-hidden="true">{price.emoji}</span>
                <h3 className="text-xl font-bold text-primary mb-2 capitalize">{price.name}</h3>
                <p className="text-muted">{price.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <WaveDivider fill="var(--light)" />
    </>
  )
}
