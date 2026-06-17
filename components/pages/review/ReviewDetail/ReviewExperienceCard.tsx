'use client'

import { CheckCircle2, Quote } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { Review } from '@/data/reviews'

type Props = {
    review: Review
}

export function ReviewExperienceCard({ review }: Props) {
    return (
        <FadeUp delay={0.1}>
            <article className="rounded-2xl border border-border/60 bg-card/40 p-7 md:p-10 shadow-lg glass-effect">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-8">
                    <Quote className="w-6 h-6 text-accent" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">
                    Experiencia del viajero
                </h2>

                <p className="text-muted-foreground leading-relaxed text-lg">
                    {review.experience}
                </p>

                <div className="mt-10 border-t border-border/60 pt-8">
                    <h3 className="text-xl font-bold text-foreground mb-5">
                        Lo más destacado
                    </h3>

                    <div className="space-y-4">
                        {review.highlights.map((highlight) => (
                            <div
                                key={highlight}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />

                                <p className="text-muted-foreground">
                                    {highlight}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </FadeUp>
    )
}