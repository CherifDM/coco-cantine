import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { VolunteerRoleCard, TestimonialCard } from '@/components/volunteer/VolunteerCards'
import { fetchSanity } from '@/lib/fetch'
import { volunteerPageQuery } from '@/sanity/lib/queries'
import type { VolunteerPage } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Rejoindre les continuer-es',
  description:
    'Rejoignez l\'équipe bénévole de La Coco Cantine : cuisine, service, buvette, récupération d\'invendus et plus encore.',
}

import type { VolunteerRole } from '@/lib/types'

/** Contenu par défaut si le CMS n'est pas encore configuré */
const DEFAULT_ROLES: VolunteerRole[] = [
  { _id: 'cuisine', title: 'Cuisine', icon: '👨‍🍳', description: 'Préparer les plats végétariens pour le déjeuner et la soirée.', schedule: 'Déjeuner et soirée' },
  { _id: 'service-dejeuner', title: 'Service déjeuner', icon: '🍽️', description: 'Accueillir et servir les convives du midi.', schedule: 'Lundi au jeudi, 12h – 14h30' },
  { _id: 'service-buvette', title: 'Service buvette', icon: '🍺', description: 'Tenir la buvette lors des soirées conviviales.', schedule: 'Jeudi au samedi soir' },
  { _id: 'invendus', title: 'Récupération d\'invendus', icon: '🥕', description: 'Récupérer les invendus auprès de nos partenaires.', schedule: 'Variable' },
  { _id: 'groupe', title: 'Bénévolat en groupe', icon: '👥', description: 'Venez en groupe pour une action ponctuelle ou régulière.', schedule: 'Sur mesure' },
]

export default async function RejoindrePage() {
  const page = await fetchSanity<VolunteerPage>(volunteerPageQuery)

  const roles = page?.roles && page.roles.length > 0 ? page.roles : DEFAULT_ROLES
  const contactEmail = page?.contactEmail || 'contact@lacococantine.org'

  return (
    <>
      {/* En-tête */}
      <header className="relative bg-primary text-white py-16">
        {page?.heroImage?.asset && (
          <div className="absolute inset-0">
            <SanityImageComponent
              image={page.heroImage}
              alt={page.heroImage.alt || 'Bénévoles de La Coco Cantine'}
              fill
              className="object-cover opacity-30"
            />
          </div>
        )}
        <Container className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {page?.title || 'Rejoindre les continuer-es'}
          </h1>
          {page?.introText ? (
            <div className="max-w-2xl mx-auto text-white/90 text-lg">
              <PortableTextRenderer value={page.introText} />
            </div>
          ) : (
            <p className="max-w-2xl mx-auto text-white/90 text-lg">
              La Coco Cantine, c&apos;est avant tout une aventure collective portée par des bénévoles
              passionné·es. Que vous ayez une heure ou une journée à donner, votre énergie compte !
            </p>
          )}

          {page?.signalGroupLink && (
            <div className="mt-8">
              <Button
                href={page.signalGroupLink}
                variant="secondary"
                size="lg"
                external
              >
                {page.signalGroupText || '✨ Rejoindre le groupe Signal ✨'}
              </Button>
            </div>
          )}
        </Container>
      </header>

      {/* Sommaire */}
      {page?.summary && page.summary.length > 0 && (
        <Section className="bg-white py-8">
          <Container>
            <nav aria-label="Sommaire de la page">
              <ul className="flex flex-wrap gap-3 justify-center">
                {page.summary.map((item) => (
                  <li key={item.anchor || item.label}>
                    <a
                      href={`#${item.anchor}`}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </Section>
      )}

      {/* Qui sommes-nous */}
      {page?.whoWeAre && page.whoWeAre.length > 0 && (
        <Section id="qui-sommes-nous" ariaLabelledby="who-title">
          <Container className="max-w-3xl">
            <SectionHeader id="who-title" title="Qui sommes-nous ?" />
            <PortableTextRenderer value={page.whoWeAre} />
          </Container>
        </Section>
      )}

      {/* Rôles bénévoles */}
      <Section id="roles" className="bg-white" ariaLabelledby="roles-title">
        <Container>
          <SectionHeader
            id="roles-title"
            title="Les rôles bénévoles"
            subtitle="Cinq façons de participer à l'aventure cantinesque."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role) => (
              <VolunteerRoleCard key={role._id} role={role} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Témoignages */}
      {page?.testimonials && page.testimonials.length > 0 && (
        <Section id="temoignages" ariaLabelledby="testimonials-title">
          <Container>
            <SectionHeader
              id="testimonials-title"
              title="Témoignages"
              subtitle="Ce que le bénévolat apporte à celles et ceux qui nous rejoignent."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {page.testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Contact */}
      <Section className="bg-primary text-white text-center" ariaLabelledby="contact-title">
        <Container>
          <h2 id="contact-title" className="text-2xl font-bold mb-4">
            Envie de nous rejoindre ?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Écrivez-nous ou rejoignez notre groupe Signal pour en savoir plus
            sur les prochaines sessions d&apos;accueil bénévole.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={`mailto:${contactEmail}`}
              variant="secondary"
              size="lg"
            >
              {contactEmail}
            </Button>
            {page?.signalGroupLink && (
              <Button
                href={page.signalGroupLink}
                variant="outline"
                size="lg"
                external
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Groupe Signal
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}
