'use client'

import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

export function MissionAbout({ mission }: Props) {
    const description =
        mission.long_description ||
        mission.short_description ||
        'Información disponible pronto.'

    return (
        <FadeUp>
            <div className="space-y-5">
                <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                    Sobre esta experiencia
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                    {mission.subtitle ||
                        'Una experiencia diseñada para transformar tu forma de viajar'}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </FadeUp>
    )
}