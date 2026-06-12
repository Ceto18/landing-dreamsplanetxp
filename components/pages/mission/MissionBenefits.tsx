'use client'

import { AnimatedCard } from '@/components/animations/animated-card'
import { benefits } from './data'

export function MissionBenefits() {
    return (
        <div className="space-y-12 sm:space-y-14">

            <div className="text-center space-y-5">
                <p className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">
                    Lo que incluye cada misión
                </p>

                <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
                    Experiencias que se quedan contigo
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground italic">
                    "No se trata de ver lugares, se trata de vivirlos."
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon

                    return (
                        <AnimatedCard
                            key={benefit.title}
                            delay={idx * 0.08}
                            className="rounded-2xl border border-border/60 bg-card/40 p-6"
                        >
                            <div className="flex items-start gap-4">

                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-accent/10">
                                    <Icon className="w-5 h-5 text-accent" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-foreground">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </div>

                            </div>
                        </AnimatedCard>
                    )
                })}
            </div>

        </div>
    )
}