import { AnimatedCard } from '@/components/animations/animated-card'

type Value = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    value: Value
    delay: number
}

export function AboutValueCard({ value, delay }: Props) {
    const Icon = value.icon

    return (
        <AnimatedCard
            delay={delay}
            className="relative overflow-hidden p-7 rounded-2xl border border-border/60 bg-card/40 hover:border-accent/60 hover:bg-card/70 glass-effect transition-all duration-500 space-y-5 shadow-lg hover:shadow-xl group"
        >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                <Icon className="w-6 h-6 text-accent group-hover:text-background transition-colors duration-300" />
            </div>

            <div className="relative z-10 space-y-2">
                <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {value.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                </p>
            </div>
        </AnimatedCard>
    )
}