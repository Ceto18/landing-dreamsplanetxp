'use client'

import { AnimatedCard } from '@/components/animations/animated-card'

type Stat = {
    label: string
    value: string | number
}

type Props = {
    stats: Stat[]
}

export function AboutPageStats({ stats }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {stats.map((stat, idx) => (
                <AnimatedCard
                    key={stat.label}
                    delay={0.12 + idx * 0.06}
                    className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center glass-effect"
                >
                    <p className="text-3xl font-bold text-accent">
                        {stat.value}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {stat.label}
                    </p>
                </AnimatedCard>
            ))}
        </div>
    )
}