'use client'

import { AnimatedCard } from '@/components/animations/animated-card'
import { MapPin, Compass, Clock, Heart } from 'lucide-react'
import type { MomentPhoto } from '@/data/moments'

export function MomentDetailsGrid({ moment }: { moment: MomentPhoto }) {
    const items = [
        { label: 'Lugar', value: moment.place, icon: MapPin },
        { label: 'Experiencia', value: moment.experience, icon: Compass },
        { label: 'Momento', value: moment.moment, icon: Clock },
        { label: 'Sensación', value: moment.emotion, icon: Heart },
    ]

    return (
        <section className="py-14 bg-secondary/30 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {items.map((item, idx) => {
                        const Icon = item.icon

                        return (
                            <AnimatedCard
                                key={item.label}
                                delay={idx * 0.08}
                                className="p-6 rounded-2xl border border-border/60 bg-card/50"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Icon className="w-6 h-6 text-accent" />
                                    <p className="text-xs uppercase text-muted-foreground">
                                        {item.label}
                                    </p>
                                </div>

                                <p className="font-bold">{item.value}</p>
                            </AnimatedCard>
                        )
                    })}

                </div>

            </div>
        </section>
    )
}