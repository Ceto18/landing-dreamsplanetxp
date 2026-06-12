'use client'

import { MissionCard } from './MissionCard'
import { MissionsEmpty } from './MissionsEmpty'
import { AnimatedCard } from '@/components/animations/animated-card'

export function MissionsGrid({ missions }: { missions: any[] }) {
    return (
        <section className="relative py-16 bg-background overflow-hidden">

            {/* glow decorativo como en el diseño original */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {missions.map((m, i) => (
                        <div
                            key={m.id}
                            className="animate-fade-up"
                            style={{
                                animationDelay: `${i * 80}ms`,
                            }}
                        >
                            <MissionCard mission={m} />
                        </div>
                    ))}

                </div>

                {/* EMPTY STATE */}
                {missions.length === 0 && (
                    <div className="mt-10">
                        <MissionsEmpty />
                    </div>
                )}

            </div>
        </section>
    )
}