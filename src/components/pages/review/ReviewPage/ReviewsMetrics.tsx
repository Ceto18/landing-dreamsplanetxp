'use client'

import { AnimatedCard } from '@/components/animations/animated-card'

type Metric = {
    label: string
    value: string | number
}

type Props = {
    metrics: Metric[]
}

export function ReviewsMetrics({ metrics }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {metrics.map((metric, idx) => (
                <AnimatedCard
                    key={metric.label}
                    delay={0.12 + idx * 0.06}
                    className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center glass-effect"
                >
                    <p className="text-3xl font-bold text-accent">
                        {metric.value}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {metric.label}
                    </p>
                </AnimatedCard>
            ))}
        </div>
    )
}