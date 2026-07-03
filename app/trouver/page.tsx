import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageHero } from '@/components/layout/PageHero'
import { fetchSanity } from '@/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Où nous trouver ?',
  description:
    'Adresse, horaires, accessibilité et plan d\'accès de La Coco Cantine, 29 rue du soleil, 75020 Paris.',
}

const PRACTICAL_INFO = {
  address: '29 rue du soleil, 75020 Paris',
  metro: 'Place des fêtes (lignes 7 bis et 11)',
  accessibility: {
    title: 'Accessibilité PMR',
    items: [
      'Accès de plain-pied depuis la rue',
      'Toilettes adaptées disponibles sur demande',
      'Menu disponible en gros caractères sur demande',
      'Personnel formé à l\'accueil de toutes et tous',
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=29+rue+du+soleil+75020+Paris&output=embed',
}

export default async function TrouverPage() {
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery)

  const lunchHours = settings?.lunchHours || 'Lundi au jeudi, 12h30 – 14h30'
  const eveningHours = settings?.eveningHours || 'Vendredi et samedi, 18h30 – minuit'

  return (
    <>
      <PageHero
        title="Où nous trouver ?"
        subtitle="La Coco Cantine vous accueille Place des fêtes, au cœur du 20ème arrondissement."
        breadcrumbs={[{ label: 'Où nous trouver ?' }]}
        variant="secondary"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <article className="rounded-2xl bg-white p-8 shadow-md border-2 border-primary/10 card-hover">
                <h2 className="text-xl font-bold text-primary mb-4">Adresse</h2>
                <address className="not-italic text-lg text-dark">
                  {settings?.address || PRACTICAL_INFO.address}
                </address>
                <p className="mt-4 text-muted">
                  <span className="font-semibold text-dark">Métro : </span>
                  {PRACTICAL_INFO.metro}
                </p>
              </article>

              <article className="rounded-2xl bg-light p-8 border-2 border-secondary/10 card-hover">
                <h2 className="text-xl font-bold text-primary mb-4">Horaires</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-bold text-secondary">Déjeuner</dt>
                    <dd className="text-muted mt-1">{lunchHours}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-secondary">Soirée buvette</dt>
                    <dd className="text-muted mt-1">{eveningHours}</dd>
                  </div>
                </dl>
              </article>

              <article className="rounded-2xl bg-white p-8 shadow-md border-2 border-accent/10 card-hover">
                <h2 className="text-xl font-bold text-primary mb-4">
                  {PRACTICAL_INFO.accessibility.title}
                </h2>
                <ul className="space-y-3">
                  {PRACTICAL_INFO.accessibility.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted">
                      <span className="text-secondary font-bold mt-0.5" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              {settings?.email && (
                <p className="text-muted">
                  Une question ? Écrivez-nous à{' '}
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-primary font-semibold underline hover:text-accent underline-offset-2"
                  >
                    {settings.email}
                  </a>
                </p>
              )}
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-light h-96 lg:h-auto lg:min-h-[520px]">
              <iframe
                src={PRACTICAL_INFO.mapEmbedUrl}
                title="Carte Google Maps — La Coco Cantine, 29 rue du soleil, 75020 Paris"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
