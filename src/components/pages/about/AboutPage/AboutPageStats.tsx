import type { LucideIcon } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

export type AboutStat = {
    label: string
    value: string | number
    icon: LucideIcon
}

type Props = {
    stats: AboutStat[]
}

export function AboutPageStats({ stats }: Props) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon

                return (
                    <AnimatedCard
                        key={stat.label}
                        delay={0.12 + index * 0.06}
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-card/70 hover:shadow-xl glass-effect"
                    >
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />

                        <div className="relative z-10 flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 transition-colors duration-300 group-hover:bg-accent">
                                <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-background" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-3xl font-bold tracking-tight text-accent">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>
                )
            })}
        </div>
    )
}