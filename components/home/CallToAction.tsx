import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import type { SiteSettings } from '@/lib/types'

interface CallToActionProps {
  settings?: SiteSettings | null
}

/** Appels à l'action en bas de page d'accueil */
export function CallToAction({ settings }: CallToActionProps) {
  const social = settings?.socialLinks

  return (
    <Section className="bg-primary text-white" ariaLabelledby="cta-title">
      <Container className="text-center">
        <h2 id="cta-title" className="text-2xl md:text-3xl font-bold mb-4">
          Rejoignez l&apos;aventure !
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Que vous souhaitiez manger, bénévoler, faire un don ou simplement nous suivre,
          il y a mille façons de participer à La Coco Cantine.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/rejoindre" variant="secondary" size="lg">
            Devenir bénévole
          </Button>
          {social?.helloasso && (
            <Button href={social.helloasso} variant="outline" size="lg" external className="border-white text-white hover:bg-white hover:text-primary">
              Faire un don
            </Button>
          )}
          {social?.instagram && (
            <Button href={social.instagram} variant="ghost" size="lg" external className="text-white hover:bg-white/10">
              Suivre sur Instagram
            </Button>
          )}
          {social?.signal && (
            <Button href={social.signal} variant="ghost" size="lg" external className="text-white hover:bg-white/10">
              Groupe Signal
            </Button>
          )}
        </div>
      </Container>
    </Section>
  )
}
