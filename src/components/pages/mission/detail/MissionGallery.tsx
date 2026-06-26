'use client'

import Image from 'next/image'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionGallery({ mission }: Props) {
    const images = mission.images ?? []

    return (
        <div className="space-y-6">
            <FadeUp>
                <h3 className="text-3xl font-bold text-foreground">
                    Galería de la experiencia
                </h3>
            </FadeUp>

            {images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {images.map((item, index) => (
                        <AnimatedCard
                            key={`${item.image}-${index}`}
                            delay={index * 0.08}
                            className="relative h-72 rounded-2xl overflow-hidden border border-border/60 group bg-card/40"
                        >
                            <Image
                                src={item.image}
                                alt={item.name || mission.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </AnimatedCard>
                    ))}
                </div>
            ) : (
                <AnimatedCard className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center">
                    <p className="text-muted-foreground">
                        Galería disponible pronto.
                    </p>
                </AnimatedCard>
            )}
        </div>
    )
}