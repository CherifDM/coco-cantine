import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { PartnerGrid } from '@/components/partners/PartnerGrid'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { fetchSanity } from '@/lib/fetch'
import { partnersQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { Partner, SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Nos partenaires',
  description:
    'Découvrez les institutions, entreprises et associations qui soutiennent La Coco Cantine.',
}

export default async function PartenairesPage() {
  const [partners, settings] = await Promise.all([
    fetchSanity<Partner[]>(partnersQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
  ])

  return (
    <Section ariaLabelledby="partners-title">
      <Container>
        <SectionHeader
          id="partners-title"
          title="Nos partenaires"
          subtitle="Nos partenaires dans cette grande aventure cantinesque."
        />

        {settings?.partnersIntroText && settings.partnersIntroText.length > 0 ? (
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <PortableTextRenderer value={settings.partnersIntroText} />
          </div>
        ) : (
          <p className="max-w-3xl mx-auto mb-12 text-center text-text-light text-lg">
            La Coco Cantine existe grâce au soutien de nombreux partenaires
            — institutions, entreprises et associations engagées.
          </p>
        )}

        {partners && partners.length > 0 ? (
          <PartnerGrid partners={partners} />
        ) : (
          <p className="text-center text-text-light py-12">
            La liste de nos partenaires sera bientôt disponible.
          </p>
        )}
      </Container>
    </Section>
  )
}
