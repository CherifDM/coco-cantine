import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { WaveDivider } from '@/components/ui/WaveDivider'
import type { SiteSettings } from '@/lib/types'

interface CallToActionProps {
  settings?: SiteSettings | null
}

export function CallToAction({ settings }: CallToActionProps) {
  const social = settings?.socialLinks

  return (
    <>
      <WaveDivider fill="var(--primary)" />
      <Section className="bg-primary text-white relative overflow-hidden" ariaLabelledby="cta-title">
        <div className="absolute inset-0 opacity-10 pattern-dots" aria-hidden="true" />
        <Container className="relative text-center">
          <h2 id="cta-title" className="text-2xl md:text-4xl font-bold mb-5">
            Rejoignez l&apos;aventure !
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-2xl mx-auto">
            Que vous souhaitiez manger, bénévoler, faire un don ou simplement nous suivre,
            il y a mille façons de participer à La Coco Cantine.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/rejoindre" variant="gold" size="lg">
              Devenir bénévole
            </Button>
            {social?.helloasso && (
              <Button
                href={social.helloasso}
                variant="outline"
                size="lg"
                external
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Faire un don
              </Button>
            )}
            {social?.instagram && (
              <Button
                href={social.instagram}
                variant="ghost"
                size="lg"
                external
                className="text-white hover:bg-white/15"
              >
                Suivre sur Instagram
              </Button>
            )}
            {social?.signal && (
              <Button
                href={social.signal}
                variant="ghost"
                size="lg"
                external
                className="text-white hover:bg-white/15"
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
