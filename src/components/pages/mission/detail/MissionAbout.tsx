'use client'

import { FadeUp } from '@/components/animations/fade-up'
import type { Mission } from '@/data/missions'

export function MissionAbout({ mission }: { mission: Mission }) {
    return (
        <FadeUp>

            <div className="space-y-5">

                <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                    Sobre esta misión
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                    Una experiencia diseñada para transformar tu forma de viajar
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    {mission.longDescription}
                </p>

            </div>

        </FadeUp>
    )
}