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
        <section className="relative overflow-hidden py-24">
            {/* DECORACIÓN */}
            <div className="absolute right-0 top-24 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="space-y-14 lg:col-span-2">
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