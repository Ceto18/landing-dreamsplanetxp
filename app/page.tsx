import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Mission } from '@/components/pages/mission/mission'
import { Moment } from '@/components/pages/moment/Moment'
//import { Moment } from '@/components/moment'
import { Team } from '@/components/team'
//import { Review } from '@/components/review'
import { Review } from '@/components/pages/review/Review'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className=" text-foreground">
      <Header />
      <Hero />
      <Mission />
      <Moment />
      <Team />
      <Review />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
