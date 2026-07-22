import type { ElementType } from 'react'

import { AnimatedCard } from '@/components/animations/animated-card'

type Value = {
    title: string
    description: string
    icon: ElementType
}

type Props = {
    value: Value
    delay: number
}

export function AboutValueCard({
    value,
    delay,
}: Props) {
    const Icon = value.icon

    return (
        <AnimatedCard
            delay={delay}
            className="group relative space-y-5 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-7 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:bg-card/70 hover:shadow-xl glass-effect"
        >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-background" />
            </div>

            <div className="relative z-10 space-y-2">
                <h4 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                    {value.title}
                </h4>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                </p>
            </div>
        </AnimatedCard>
    )
}