import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Montserrat, Geist_Mono } from 'next/font/google'

import './globals.css'

import { GlobalAtmosphere } from '@/components/ui/GlobalAtmosphere'

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
    default: 'DreamsPlanetXP | Experiencias de Viaje Premium',
    template: '%s | DreamsPlanetXP',
  },

  description:
    'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas, destinos extraordinarios y experiencias diseñadas para crear recuerdos inolvidables.',

  applicationName: 'DreamsPlanetXP',

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
    siteName: 'DreamsPlanetXP',
    title: 'DreamsPlanetXP | Experiencias de Viaje Premium',
    description:
      'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas en destinos extraordinarios.',
    images: [
      {
        url: '/logodreams.png',
        width: 1200,
        height: 630,
        alt: 'DreamsPlanetXP',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DreamsPlanetXP | Experiencias de Viaje Premium',
    description:
      'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP.',
    images: ['/logodreams.png'],
  },

  icons: {
    icon: '/logodreams.png',
    shortcut: '/logodreams.png',
    apple: '/logodreams.png',
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
        <GlobalAtmosphere />

        <div className="relative z-10">
          {children}
        </div>

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}