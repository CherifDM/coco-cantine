import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { fetchSanity } from '@/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/lib/types'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'La Coco Cantine — Restaurant associatif végétarien',
    template: '%s | La Coco Cantine',
  },
  description:
    'La Coco Cantine, restaurant associatif végétarien pour toustes à Place des fêtes, Paris 20ème. Pour que tout le monde puisse bien manger !',
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
    <html lang="fr" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
