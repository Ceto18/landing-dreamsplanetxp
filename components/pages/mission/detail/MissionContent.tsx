'use client'

import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import Image from 'next/image'
import type { Mission } from '@/data/missions'

export function MissionContent({ mission }: { mission: Mission }) {
    return (
        <div className="lg:col-span-2 space-y-14">

            <FadeUp>
                <h2 className="text-4xl font-bold">
                    Sobre esta misión
                </h2>
                <p className="text-muted-foreground">
                    {mission.longDescription}
                </p>
            </FadeUp>

            {/* Gallery */}
            <div className="grid sm:grid-cols-2 gap-5">
                {mission.gallery.map((img, i) => (
                    <AnimatedCard key={i}>
                        <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </AnimatedCard>
                ))}
            </div>

            {/* Itinerary */}
            <div>
                {mission.itinerary.map((item, i) => (
                    <AnimatedCard key={i}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </AnimatedCard>
                ))}
            </div>

        </div>
    )
}