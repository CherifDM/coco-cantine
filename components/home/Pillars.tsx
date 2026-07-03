import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { WaveDivider } from '@/components/ui/WaveDivider'

const PILLARS = [
  {
    icon: '🍽️',
    title: 'Se restaurer',
    description:
      'Des plats végétariens savoureux et accessibles, préparés avec des produits bio, locaux et beaucoup d\'amour.',
    color: 'border-primary/30 bg-white',
  },
  {
    icon: '🤝',
    title: 'Rencontrer du monde',
    description:
      'Un lieu convivial où se retrouver, échanger et tisser des liens dans le quartier militant de Place des fêtes.',
    color: 'border-secondary/30 bg-light',
  },
  {
    icon: '🌱',
    title: 'Partager notre engagement',
    description:
      'Solidarité, écologie et alimentation responsable au cœur de notre projet associatif.',
    color: 'border-accent/30 bg-white',
  },
]

export function Pillars() {
  return (
    <>
      <Section ariaLabelledby="pillars-title">
        <Container>
          <SectionHeader
            id="pillars-title"
            title="Notre mission"
            subtitle="Bien manger, solidarité et écologie — voilà ce qui nous anime au quotidien."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className={`rounded-2xl border-2 ${pillar.color} p-8 text-center card-hover shadow-sm`}
              >
                <span className="text-5xl mb-5 block" aria-hidden="true">{pillar.icon}</span>
                <h3 className="text-xl font-bold text-primary mb-3">{pillar.title}</h3>
                <p className="text-muted leading-relaxed">{pillar.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <WaveDivider fill="var(--light)" />
    </>
  )
}
