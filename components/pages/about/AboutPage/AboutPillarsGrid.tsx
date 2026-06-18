'use client'

import { AboutPillarCard } from './AboutPillarCard'

type Pillar = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    pillars: Pillar[]
}

export function AboutPillarsGrid({ pillars }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
                <AboutPillarCard
                    key={pillar.title}
                    pillar={pillar}
                    delay={0.16 + idx * 0.06}
                />
            ))}
        </div>
    )
}