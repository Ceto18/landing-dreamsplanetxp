'use client'

import { useState } from 'react'
import { missions } from '@/data/missions'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import {
    MissionsHero,
    MissionsFilters,
    MissionsGrid,
    MissionsCTA
} from '@/components/pages/mission/content/index'

const categories = [
    'Todas',
    'Marruecos',
    'Vietnam',
    'Tailandia',
    'Japón',
    'Nepal',
    'Sorpresa'
]

export default function MissionsPage() {
    const [activeCategory, setActiveCategory] = useState('Todas')

    const filteredMissions =
        activeCategory === 'Todas'
            ? missions
            : missions.filter((m) => m.destination === activeCategory)

    return (
        <>
            {/* HEADER */}
            <Header />

            <main className="min-h-screen text-foreground">

                {/* HERO */}
                <MissionsHero />

                {/* FILTERS */}
                <MissionsFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {/* GRID */}
                <MissionsGrid missions={filteredMissions} />

                {/* CTA */}
                <MissionsCTA />

            </main>

            {/* FOOTER */}
            <Footer />
        </>
    )
}