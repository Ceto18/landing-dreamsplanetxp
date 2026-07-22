import {
    CalendarDays,
    Compass,
    Star,
    Users,
    type LucideIcon,
} from 'lucide-react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import {
    aboutPillars,
    aboutValues,
} from '@/data/about'

import { companyService } from '@/services/companyService'

import { AboutHero } from './AboutHero'
import { AboutDescriptionSection } from './AboutDescriptionSection'
import { AboutTimelineSection } from './AboutTimelineSection'
import { AboutValuesSection } from './AboutValuesSection'

type Stat = {
    label: string
    value: string | number
    icon: LucideIcon
}

export async function AboutPageContent() {
    const company = await companyService.getCompanyHistory()

    const stats: Stat[] = [
        {
            label: 'Viajeros satisfechos',
            value: `+${company.satisfied_travelers}`,
            icon: Users,
        },
        {
            label: 'Destinos explorados',
            value: `+${company.destinations_explored}`,
            icon: Compass,
        },
        {
            label: 'Valoración promedio',
            value: company.average_rating.toFixed(1),
            icon: Star,
        },
        {
            label: 'Años de experiencia',
            value: `+${company.years_of_experience}`,
            icon: CalendarDays,
        },
    ]

    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <AboutHero
                    subtitle={company.subtitle}
                    stats={stats}
                />

                <AboutDescriptionSection
                    info={company.info}
                    pillars={aboutPillars}
                />

                <AboutTimelineSection
                    timeline={company.timelines}
                />

                <AboutValuesSection values={aboutValues} />
            </main>

            <Footer />
        </>
    )
}