'use client'

import { AnimatedCard } from '@/components/animations/animated-card'

interface MetricItem {
    label: string
    value: string | number
}

interface Props {
    metrics: MetricItem[]
}

export function ReviewMetrics({ metrics }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
                <AnimatedCard
                    key={metric.label}
                    delay={0.28 + idx * 0.08}
                    className="p-5 rounded-xl border border-border/60 bg-card/40 hover:border-accent/60 hover:bg-card/70 transition-all shadow-lg"
                >
                    <p className="text-sm text-muted-foreground mb-2">
                        {metric.label}
                    </p>

                    <p className="text-3xl font-bold text-accent">
                        {metric.value}
                    </p>
                </AnimatedCard>
            ))}
        </div>
    )
}