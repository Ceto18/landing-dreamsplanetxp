'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import {
    aboutPillars,
    aboutStats,
    aboutTimeline,
    aboutValues,
} from '@/data/about'

import { AboutHero } from './AboutHero'
import { AboutDescriptionSection } from './AboutDescriptionSection'
import { AboutTimelineSection } from './AboutTimelineSection'
import { AboutValuesSection } from './AboutValuesSection'

export function AboutPageContent() {
    return (
        <>
            {/* HEADER GLOBAL */}
            <Header />

            <main className="min-h-screen text-foreground">
                <AboutHero stats={aboutStats} />

                <AboutDescriptionSection pillars={aboutPillars} />

                <AboutTimelineSection timeline={aboutTimeline} />

                <AboutValuesSection values={aboutValues} />
            </main>

            {/* FOOTER GLOBAL */}
            <Footer />
        </>
    )
}