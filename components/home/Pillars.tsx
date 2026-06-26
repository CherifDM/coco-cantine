import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'

const PILLARS = [
  {
    icon: '🍽️',
    title: 'Se restaurer',
    description:
      'Des plats végétariens savoureux et accessibles, préparés avec des produits de qualité et beaucoup d\'amour.',
  },
  {
    icon: '🤝',
    title: 'Rencontrer du monde',
    description:
      'Un lieu convivial où se retrouver, échanger et tisser des liens dans le quartier de Place des fêtes.',
  },
  {
    icon: '🌱',
    title: 'Partager notre engagement',
    description:
      'Solidarité, écologie et alimentation responsable au cœur de notre projet associatif.',
  },
]

/** Les 3 piliers de l'association */
export function Pillars() {
  return (
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
              className="rounded-2xl bg-white p-8 shadow-md text-center"
            >
              <span className="text-4xl mb-4 block" aria-hidden="true">{pillar.icon}</span>
              <h3 className="text-xl font-bold text-primary mb-3">{pillar.title}</h3>
              <p className="text-text-light">{pillar.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
