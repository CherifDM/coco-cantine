import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { WaveDivider } from '@/components/ui/WaveDivider'
import type { SiteSettings } from '@/lib/types'

interface UsefulLinksProps {
  settings?: SiteSettings | null
}

export function UsefulLinks({ settings }: UsefulLinksProps) {
  console.log("settings", settings);
  console.log("usefulLinksIntro", settings?.usefulLinksIntro);
  console.log("usefulLinksText", settings?.usefulLinksText);
  const intro =
    settings?.usefulLinksIntro ||
    'En attendant de nous rendre visite, vous pouvez :'

  const hasLinks =
    settings?.usefulLinksText && settings.usefulLinksText.length > 0

  if (!hasLinks && !intro) return null

  return (
    <>
      <Section className="bg-light" ariaLabelledby="useful-links-title">
        <Container>
          <SectionHeader id="useful-links-title" title="Liens utiles" />
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-dark mb-4">{intro}</p>
            {hasLinks && (
              <PortableTextRenderer value={settings.usefulLinksText} />
            )}
          </div>
        </Container>
      </Section>
      <WaveDivider fill="var(--background)" />
    </>
  )
}
