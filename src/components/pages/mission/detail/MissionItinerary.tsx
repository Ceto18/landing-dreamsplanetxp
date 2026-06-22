'use client'

import type { Mission } from '@/data/missions'
import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

export function MissionItinerary({ mission }: { mission: Mission }) {
    return (
        <div className="space-y-6">

            <FadeUp>
                <h3 className="text-3xl font-bold text-foreground">
                    Itinerario destacado
                </h3>
            </FadeUp>

            <div className="space-y-4">

                {mission.itinerary.map((item, idx) => (
                    <AnimatedCard
                        key={item.day}
                        delay={idx * 0.08}
                        className="rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect"
                    >

                        <div className="flex gap-5">

                            <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-accent font-bold">
                                    {idx + 1}
                                </span>
                            </div>

                            <div className="space-y-2">

                                <p className="text-accent text-xs font-semibold uppercase tracking-widest">
                                    {item.day}
                                </p>

                                <h4 className="text-xl font-bold text-foreground">
                                    {item.title}
                                </h4>

                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>

                            </div>

                        </div>

                    </AnimatedCard>
                ))}

            </div>

        </div>
    )
}