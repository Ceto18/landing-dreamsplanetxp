'use client'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionItinerary({ mission }: Props) {
    const itineraries = mission.itineraries ?? []

    return (
        <div className="space-y-6">
            <FadeUp>
                <h3 className="text-3xl font-bold text-foreground">
                    Itinerario destacado
                </h3>
            </FadeUp>

            {itineraries.length > 0 ? (
                <div className="space-y-4">
                    {itineraries
                        .slice()
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .map((item, index) => (
                            <AnimatedCard
                                key={`${item.day}-${item.order}-${index}`}
                                delay={index * 0.08}
                                className="rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect"
                            >
                                <div className="flex gap-5">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                                        <span className="font-bold text-accent">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                                            {item.day || `Día ${index + 1}`}
                                        </p>

                                        <h4 className="text-xl font-bold text-foreground">
                                            {item.title ||
                                                'Actividad por confirmar'}
                                        </h4>

                                        <p className="leading-relaxed text-muted-foreground">
                                            {item.description ||
                                                'La descripción de esta actividad estará disponible pronto.'}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                </div>
            ) : (
                <AnimatedCard className="rounded-2xl border border-border/60 bg-card/40 p-6 text-center glass-effect">
                    <p className="text-muted-foreground">
                        Itinerario disponible pronto.
                    </p>
                </AnimatedCard>
            )}
        </div>
    )
}