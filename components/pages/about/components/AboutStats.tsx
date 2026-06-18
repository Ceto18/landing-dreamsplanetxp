import { AnimatedCard } from '@/components/animations/animated-card'

type Stat = {
    label: string
    value: string | number
}

type Props = {
    stats: Stat[]
}

export function AboutStats({ stats }: Props) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
                <AnimatedCard
                    key={stat.label}
                    delay={idx * 0.08}
                    className="relative overflow-hidden p-8 rounded-2xl border border-border/60 bg-card/50 glass-effect space-y-3 shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-xl transition-all duration-500 group"
                >
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <p className="relative z-10 text-4xl font-bold text-accent">
                        {stat.value}
                    </p>

                    <p className="relative z-10 text-sm font-medium text-muted-foreground">
                        {stat.label}
                    </p>
                </AnimatedCard>
            ))}
        </div>
    )
}