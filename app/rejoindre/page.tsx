import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/Button'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { VolunteerRoleCard, TestimonialCard } from '@/components/volunteer/VolunteerCards'
import { fetchSanity } from '@/lib/fetch'
import { volunteerPageQuery } from '@/sanity/lib/queries'
import type { VolunteerPage, VolunteerRole } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Rejoindre les continuer-es',
  description:
    'Rejoignez l\'équipe bénévole de La Coco Cantine : cuisine, service, buvette, récupération d\'invendus et plus encore.',
}

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
      <header className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
        {page?.heroImage?.asset && (
          <div className="absolute inset-0">
            <SanityImageComponent
              image={page.heroImage}
              alt={page.heroImage.alt || 'Bénévoles de La Coco Cantine'}
              fill
              className="object-cover opacity-25"
            />
          </div>
        )}
        <div className="absolute inset-0 opacity-10 pattern-dots" aria-hidden="true" />
        <Container className="relative">
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <li><a href="/" className="hover:text-white">Accueil</a></li>
              <li><span aria-hidden="true">/</span></li>
              <li><span className="font-semibold text-highlight">Rejoindre</span></li>
            </ol>
          </nav>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-5">
              {page?.title || 'Rejoindre les continuer-es'}
            </h1>
            {page?.introText ? (
              <div className="text-white/90 text-lg prose-coco">
                <PortableTextRenderer value={page.introText} />
              </div>
            ) : (
              <p className="text-white/90 text-lg">
                La Coco Cantine, c&apos;est avant tout une aventure collective portée par des bénévoles
                passionné·es. Que vous ayez une heure ou une journée à donner, votre énergie compte !
              </p>
            )}

            {page?.signalGroupLink && (
              <div className="mt-8">
                <Button href={page.signalGroupLink} variant="gold" size="lg" external>
                  {page.signalGroupText || '✨ Rejoindre le groupe Signal ✨'}
                </Button>
              </div>
            )}
          </div>
        </Container>
      </header>

      {page?.summary && page.summary.length > 0 && (
        <Section className="bg-light py-8">
          <Container>
            <nav aria-label="Sommaire de la page">
              <ul className="flex flex-wrap gap-3 justify-center">
                {page.summary.map((item) => (
                  <li key={item.anchor || item.label}>
                    <a
                      href={`#${item.anchor}`}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
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

      {page?.whoWeAre && page.whoWeAre.length > 0 && (
        <Section id="qui-sommes-nous" ariaLabelledby="who-title">
          <Container className="max-w-3xl">
            <SectionHeader id="who-title" title="Qui sommes-nous ?" />
            <PortableTextRenderer value={page.whoWeAre} />
          </Container>
        </Section>
      )}

      <Section id="roles" className="bg-light" ariaLabelledby="roles-title">
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

      <Section className="bg-dark text-white text-center" ariaLabelledby="contact-title">
        <Container>
          <h2 id="contact-title" className="text-2xl md:text-3xl font-bold mb-4 text-highlight">
            Envie de nous rejoindre ?
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto text-lg">
            Écrivez-nous ou rejoignez notre groupe Signal pour en savoir plus
            sur les prochaines sessions d&apos;accueil bénévole.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={`mailto:${contactEmail}`} variant="gold" size="lg">
              {contactEmail}
            </Button>
            {page?.signalGroupLink && (
              <Button
                href={page.signalGroupLink}
                variant="outline"
                size="lg"
                external
                className="border-white text-white hover:bg-white hover:text-dark"
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
