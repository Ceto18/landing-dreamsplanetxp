'use client'

import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionAbout({ mission }: Props) {
    const description =
        mission.long_description?.trim() ||
        mission.short_description?.trim() ||
        'Información disponible pronto.'

    const title =
        mission.subtitle?.trim() ||
        'Una experiencia diseñada para transformar tu forma de viajar'

    return (
        <FadeUp>
            <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    Sobre esta experiencia
                </p>

                <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
                    {title}
                </h2>

                <p className="text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </div>
        </FadeUp>
    )
}