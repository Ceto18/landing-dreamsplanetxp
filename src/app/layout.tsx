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
  title: 'DreamsPlanetXP - Experiencias de Viaje Premium',
  description:
    'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Misiones exclusivas en destinos extraordinarios.',
  icons: {
    icon: '/logodreams.png',
    shortcut: '/logodreams.png',
    apple: '/logodreams.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${geistMono.variable} dark`}
    >

      <body className="font-sans antialiased bg-black text-foreground relative">

        <GlobalAtmosphere />

        <div className="relative z-10">
          {children}
        </div>

        {process.env.NODE_ENV === 'production' && <Analytics />}

      </body>
    </html>
  )
}