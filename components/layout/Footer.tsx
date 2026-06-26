import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { NAV_LINKS } from '@/lib/utils'
import type { SiteSettings } from '@/lib/types'

interface FooterProps {
  settings?: SiteSettings | null
}

/** Pied de page avec liens, horaires et réseaux sociaux */
export function Footer({ settings }: FooterProps) {
  const social = settings?.socialLinks

  return (
    <footer className="mt-auto bg-primary text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Présentation */}
          <div>
            <h2 className="text-lg font-bold mb-3">La Coco Cantine</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Restaurant associatif végétarien pour toustes à Place des fêtes, Paris 20ème.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-bold mb-3">Navigation</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos pratiques */}
          <div>
            <h2 className="text-lg font-bold mb-3">Infos pratiques</h2>
            <address className="not-italic text-white/80 text-sm space-y-2">
              <p>29 rue du soleil, 75020 Paris</p>
              {settings?.lunchHours && (
                <p>Déjeuner : {settings.lunchHours}</p>
              )}
              {settings?.eveningHours && (
                <p>Soirée : {settings.eveningHours}</p>
              )}
              {settings?.email && (
                <p>
                  <a href={`mailto:${settings.email}`} className="hover:text-white underline">
                    {settings.email}
                  </a>
                </p>
              )}
            </address>

            {/* Réseaux sociaux */}
            {(social?.instagram || social?.signal || social?.helloasso) && (
              <div className="mt-4 flex gap-3">
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white text-sm underline"
                    aria-label="Instagram de La Coco Cantine"
                  >
                    Instagram
                  </a>
                )}
                {social.signal && (
                  <a
                    href={social.signal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white text-sm underline"
                    aria-label="Groupe Signal"
                  >
                    Signal
                  </a>
                )}
                {social.helloasso && (
                  <a
                    href={social.helloasso}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white text-sm underline"
                    aria-label="Faire un don sur HelloAsso"
                  >
                    Faire un don
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} La Coco Cantine — Association loi 1901</p>
        </div>
      </Container>
    </footer>
  )
}
