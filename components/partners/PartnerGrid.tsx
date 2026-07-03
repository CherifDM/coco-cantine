import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PARTNER_CATEGORY_LABELS } from '@/lib/utils'
import type { Partner } from '@/lib/types'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const content = (
    <Card hover className="h-full flex flex-col items-center text-center p-8">
      <div className="relative h-20 w-full mb-5 flex items-center justify-center">
        <SanityImageComponent
          image={partner.logo}
          alt={partner.logo.alt || `Logo de ${partner.name}`}
          width={160}
          height={80}
          className="max-h-20 w-auto object-contain"
        />
      </div>
      <h3 className="font-bold text-primary">{partner.name}</h3>
      {partner.description && (
        <p className="mt-2 text-sm text-muted line-clamp-3">{partner.description}</p>
      )}
      {partner.isMainPartner && (
        <span className="mt-3 rounded-full bg-gold/50 px-3 py-0.5 text-xs font-bold text-dark">
          Partenaire principal
        </span>
      )}
    </Card>
  )

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visiter le site de ${partner.name}`}
        className="block h-full"
      >
        {content}
      </a>
    )
  }

  return content
}

interface PartnerGridProps {
  partners: Partner[]
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  const grouped = partners.reduce<Record<string, Partner[]>>((acc, partner) => {
    const cat = partner.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(partner)
    return acc
  }, {})

  const categoryOrder = ['public', 'private', 'association', 'eco', 'other']

  return (
    <div className="space-y-14">
      {categoryOrder.map((cat) => {
        const items = grouped[cat]
        if (!items || items.length === 0) return null
        return (
          <section key={cat} aria-labelledby={`partners-${cat}`}>
            <h2
              id={`partners-${cat}`}
              className="text-xl font-bold text-secondary mb-8 pb-2 border-b-2 border-light"
            >
              {PARTNER_CATEGORY_LABELS[cat]}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((partner) => (
                <PartnerCard key={partner._id} partner={partner} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
