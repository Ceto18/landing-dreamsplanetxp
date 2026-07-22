import type { ElementType } from 'react'

import { AboutPillarCard } from './AboutPillarCard'

type Pillar = {
    title: string
    description: string
    icon: ElementType
}

type Props = {
    pillars: Pillar[]
}

export function AboutPillarsGrid({ pillars }: Props) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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