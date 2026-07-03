import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { WaveDivider } from '@/components/ui/WaveDivider'
import type { SiteSettings } from '@/lib/types'

interface HoursSectionProps {
  settings?: SiteSettings | null
}

export function HoursSection({ settings }: HoursSectionProps) {
  const lunchHours = settings?.lunchHours || 'Lundi au jeudi, 12h30 – 14h30'
  const eveningHours = settings?.eveningHours || 'Vendredi et samedi, 18h30 – minuit'

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
      <WaveDivider fill="var(--background)" />
    </>
  )
}
