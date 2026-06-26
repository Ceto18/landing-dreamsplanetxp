'use client'

import type { MissionExperienceDetail } from '@/services/missionService'

import { MissionAbout } from './MissionAbout'
import { MissionGallery } from './MissionGallery'
import { MissionItinerary } from './MissionItinerary'
import { MissionSidebar } from './MissionSidebar'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionMain({ mission }: Props) {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* DECORACIÓN */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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