'use client'

import Image from 'next/image'
import type { Mission } from '@/data/missions'
import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

export function MissionGallery({ mission }: { mission: Mission }) {
    return (
        <div className="space-y-6">

            <FadeUp>
                <h3 className="text-3xl font-bold text-foreground">
                    Galería de la misión
                </h3>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {mission.gallery.map((image, idx) => (
                    <AnimatedCard
                        key={idx}
                        delay={idx * 0.08}
                        className="relative h-72 rounded-2xl overflow-hidden border border-border/60 group"
                    >

                        <Image
                            src={image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    </AnimatedCard>
                ))}

            </div>

        </div>
    )
}