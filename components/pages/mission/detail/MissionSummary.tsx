'use client'

import { CalendarDays, Clock, Users, Star } from 'lucide-react'
import type { Mission } from '@/data/missions'
import { AnimatedCard } from '@/components/animations/animated-card'

export function MissionSummary({ mission }: { mission: Mission }) {
    const items = [
        { label: 'Salida', value: mission.date, icon: CalendarDays },
        { label: 'Duración', value: mission.duration, icon: Clock },
        { label: 'Grupo', value: mission.group, icon: Users },
        { label: 'Rating', value: mission.rating, icon: Star },
    ]

    return (
        <section className="relative py-14 bg-secondary/30 border-y border-border/50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    {items.map((item, idx) => {
                        const Icon = item.icon

                        return (
                            <AnimatedCard
                                key={item.label}
                                delay={idx * 0.08}
                                className="rounded-2xl border border-border/60 bg-card/40 p-5 glass-effect"
                            >

                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-accent" />
                                    </div>

                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                                        {item.label}
                                    </p>
                                </div>

                                <p className="text-lg font-bold text-foreground">
                                    {item.value}
                                </p>

                            </AnimatedCard>
                        )
                    })}

                </div>

            </div>
        </section>
    )
}