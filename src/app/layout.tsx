import type { Metadata } from 'next'
import { Montserrat, Geist_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'

import { GlobalAtmosphere } from '@/components/ui/GlobalAtmosphere'
import { WebsiteSchema } from '@/components/seo/WebsiteSchema'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamsplanetxp.es'),

  title: {
    default: 'DREAMSPLANETXP | Experiencias de Viaje Premium',
    template: '%s | DREAMSPLANETXP',
  },

  description:
    'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas, destinos extraordinarios y experiencias diseñadas para crear recuerdos inolvidables.',

  applicationName: 'DREAMSPLANETXP',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'DREAMSPLANETXP',
    title: 'DREAMSPLANETXP | Experiencias de Viaje Premium',
    description:
      'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas en destinos extraordinarios.',
    images: [
      {
        url: '/logodreams.png',
        width: 1200,
        height: 630,
        alt: 'DREAMSPLANETXP',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DREAMSPLANETXP | Experiencias de Viaje Premium',
    description:
      'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP.',
    images: ['/logodreams.png'],
  },

  category: 'travel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${geistMono.variable} dark`}
    >
      <body className="relative bg-black font-sans text-foreground antialiased">
        <WebsiteSchema />
        <OrganizationSchema />

        <GlobalAtmosphere />

        <div className="relative z-10">
          {children}
        </div>

        <GoogleAnalytics gaId="G-PQYWJQ09G5" />
      </body>
    </html>
  )
}