'use client'

import Image from 'next/image'

import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionContent({ mission }: Props) {
    const description =
        mission.long_description ||
        mission.short_description ||
        'Información disponible pronto.'

    const images = mission.images ?? []
    const itineraries = mission.itineraries ?? []

    return (
        <div className="lg:col-span-2 space-y-14">
            <FadeUp>
                <div className="space-y-4">
                    <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                        Sobre esta experiencia
                    </p>

                    <h2 className="text-4xl font-bold text-foreground">
                        {mission.subtitle || 'Una experiencia diseñada para viajar diferente'}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </FadeUp>

            {/* GALLERY */}
            <div className="grid sm:grid-cols-2 gap-5">
                {images.length > 0 ? (
                    images.map((img, index) => (
                        <AnimatedCard
                            key={`${img.image}-${index}`}
                            className="relative h-72 overflow-hidden rounded-2xl border border-border/60 bg-card/40"
                        >
                            <Image
                                src={img.image}
                                alt={img.name || mission.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </AnimatedCard>
                    ))
                ) : (
                    <AnimatedCard className="sm:col-span-2 rounded-2xl border border-border/60 bg-card/40 p-8 text-center">
                        <p className="text-muted-foreground">
                            Galería disponible pronto.
                        </p>
                    </AnimatedCard>
                )}
            </div>

            {/* ITINERARY */}
            <div className="space-y-5">
                <FadeUp>
                    <h3 className="text-3xl font-bold text-foreground">
                        Itinerario
                    </h3>
                </FadeUp>

                {itineraries.length > 0 ? (
                    itineraries
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((item) => (
                            <AnimatedCard
                                key={`${item.day}-${item.order}`}
                                className="rounded-2xl border border-border/60 bg-card/40 p-6"
                            >
                                <p className="text-accent text-sm font-semibold">
                                    {item.day}
                                </p>

                                <h4 className="mt-2 text-xl font-bold text-foreground">
                                    {item.title}
                                </h4>

                                <p className="mt-3 text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </AnimatedCard>
                        ))
                ) : (
                    <AnimatedCard className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center">
                        <p className="text-muted-foreground">
                            Itinerario disponible pronto.
                        </p>
                    </AnimatedCard>
                )}
            </div>
        </div>
    )
}