import { Fredoka } from 'next/font/google'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { fetchSanity } from '@/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/lib/types'
import './globals.css'

const displayFont = Fredoka({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'La Coco Cantine — Cantine associative végétarienne',
    template: '%s | La Coco Cantine',
  },
  description:
    'La Coco Cantine, cantine associative végétarienne, bio et locale à Place des fêtes, Paris 20ème.',
  openGraph: {
    locale: 'fr_FR',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery)

  return (
    <html lang="fr" className={`${displayFont.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased font-sans text-foreground bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
