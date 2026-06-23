'use client'

import { MissionCard } from './MissionCard'
import { MissionsEmpty } from './MissionsEmpty'
import type { MissionItem } from '@/services/missionService'

type MissionGridItem = MissionItem & {
    country: string
}

type Props = {
    missions: MissionGridItem[]
}

export function MissionsGrid({ missions }: Props) {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* GLOW DECORATIVO */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                {/* EMPTY STATE */}
                {missions.length === 0 ? (
                    <MissionsEmpty />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {missions.map((mission, index) => (
                            <div
                                key={`${mission.country}-${mission.slug}`}
                                className="animate-fade-up"
                                style={{
                                    animationDelay: `${index * 80}ms`,
                                }}
                            >
                                <MissionCard mission={mission} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}