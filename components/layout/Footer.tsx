import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { NAV_LINKS } from '@/lib/utils'
import type { SiteSettings } from '@/lib/types'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const social = settings?.socialLinks

  return (
    <footer className="mt-auto bg-dark text-white">
      <WaveDivider fill="var(--dark)" flip className="-mt-px" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold mb-3 text-highlight">La Coco Cantine</h2>
            <p className="text-white/75 text-sm leading-relaxed">
              Restaurant associatif végétarien, bio et local pour toustes à Place des fêtes, Paris 20ème.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-accent">Navigation</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/75 hover:text-highlight text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-accent">Infos pratiques</h2>
            <address className="not-italic text-white/75 text-sm space-y-2">
              <p>29 rue du soleil, 75020 Paris</p>
              {settings?.lunchHours && <p>Déjeuner : {settings.lunchHours}</p>}
              {settings?.eveningHours && <p>Soirée : {settings.eveningHours}</p>}
              {settings?.email && (
                <p>
                  <a href={`mailto:${settings.email}`} className="hover:text-highlight underline underline-offset-2">
                    {settings.email}
                  </a>
                </p>
              )}
            </address>

            {(social?.instagram || social?.signal || social?.helloasso) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-highlight hover:text-dark transition-colors"
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
                    className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-highlight hover:text-dark transition-colors"
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
                    className="rounded-full bg-gold/90 px-4 py-1.5 text-sm text-dark font-semibold hover:bg-gold transition-colors"
                    aria-label="Faire un don sur HelloAsso"
                  >
                    Faire un don
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} La Coco Cantine — Association loi 1901</p>
        </div>
      </Container>
    </footer>
  )
}
