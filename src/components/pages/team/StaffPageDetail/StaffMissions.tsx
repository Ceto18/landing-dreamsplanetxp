import { MapPin } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

import type { TeamPersonDetailMission } from '@/services/teamService'

type Props = {
    missions: TeamPersonDetailMission[]
}

export function StaffMissions({ missions }: Props) {
    if (missions.length === 0) {
        return null
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Experiencias compartidas
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Misiones y proyectos
                    </h2>
                </div>
            </FadeUp>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {missions.map((mission, index) => (
                    <AnimatedCard
                        key={`${mission.name}-${mission.country}-${index}`}
                        delay={index * 0.08}
                        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-0 transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
                    >
                        <div className="relative h-56 overflow-hidden bg-muted">
                            {mission.image_url ? (
                                <img
                                    src={mission.image_url}
                                    alt={mission.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                                    Sin imagen disponible
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-foreground">
                                {mission.name}
                            </h3>

                            {mission.country && (
                                <div className="mt-2 flex items-center gap-2 text-sm capitalize text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-accent" />

                                    <span>{mission.country}</span>
                                </div>
                            )}
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </section>
    )
}