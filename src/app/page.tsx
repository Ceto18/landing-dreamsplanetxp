export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Mission } from '@/components/pages/mission/mission'
import { Moment } from '@/components/pages/moment/Moment'
import { Team } from '@/components/pages/team/Team'
import { Review } from '@/components/pages/review/Review'
import { About } from '@/components/pages/about/About'
import { Contact } from '@/components/pages/contact/contact'
import { Footer } from '@/components/footer'

import { homeService } from '@/services/homeService'

export const metadata: Metadata = {
  title: {
    absolute: 'DreamsPlanetXP | Experiencias de Viaje Premium',
  },

  description:
    'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas, destinos extraordinarios y momentos inolvidables.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'DreamsPlanetXP | Experiencias de Viaje Premium',
    description:
      'Vive experiencias de viaje únicas y memorables con DreamsPlanetXP. Descubre misiones exclusivas en destinos extraordinarios.',
    url: '/',
    type: 'website',
  },
}

export default async function Page() {
  const home = await homeService.getHome()

  return (
    <main className="text-foreground">
      <Header />

      <Hero
        hero={home.hero}
        nextDeparture={home.next_departure}
      />

      <Mission missions={home.missions} />

      <Moment
        visibleMissionsTabs={home.visible_missions_tabs}
        missions={home.missions}
      />

      <Team />
      <Review />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}