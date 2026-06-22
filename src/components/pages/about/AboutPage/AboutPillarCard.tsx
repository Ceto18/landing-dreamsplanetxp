'use client'

import { AnimatedCard } from '@/components/animations/animated-card'

type Pillar = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    pillar: Pillar
    delay: number
}

export function AboutPillarCard({ pillar, delay }: Props) {
    const Icon = pillar.icon

    return (
        <AnimatedCard
            delay={delay}
            className="rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all"
        >
            <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-accent" />
            </div>

            <h3 className="font-bold text-foreground mb-2">
                {pillar.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
            </p>
        </AnimatedCard>
    )
}