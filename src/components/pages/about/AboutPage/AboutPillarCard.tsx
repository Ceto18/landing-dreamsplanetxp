import type { ElementType } from 'react'

import { AnimatedCard } from '@/components/animations/animated-card'

type Pillar = {
    title: string
    description: string
    icon: ElementType
}

type Props = {
    pillar: Pillar
    delay: number
}

export function AboutPillarCard({
    pillar,
    delay,
}: Props) {
    const Icon = pillar.icon

    return (
        <AnimatedCard
            delay={delay}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:bg-card/70 hover:shadow-xl"
        >
            {/* Decoración de fondo */}
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

            <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                    <Icon className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-background" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                    {pillar.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                </p>
            </div>
        </AnimatedCard>
    )
}