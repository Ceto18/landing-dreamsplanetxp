'use client'

import type { Mission } from '@/data/missions'

import { MissionAbout } from './MissionAbout'
import { MissionGallery } from './MissionGallery'
import { MissionItinerary } from './MissionItinerary'
import { MissionSidebar } from './MissionSidebar'

export function MissionMain({ mission }: { mission: Mission }) {
    return (
        <section className="relative py-24 bg-background overflow-hidden">

            {/* decoración EXACTA del original */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* GRID ORIGINAL (NO TOCAR) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-14">

                        <MissionAbout mission={mission} />
                        <MissionGallery mission={mission} />
                        <MissionItinerary mission={mission} />

                    </div>

                    {/* RIGHT */}
                    <MissionSidebar mission={mission} />

                </div>

            </div>

        </section>
    )
}