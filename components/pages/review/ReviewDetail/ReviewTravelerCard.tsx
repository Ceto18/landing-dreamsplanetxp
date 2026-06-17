'use client'

import { Star } from 'lucide-react'
import { AnimatedCard } from '@/components/animations/animated-card'
import { Review } from '@/data/reviews'

type Props = {
    review: Review
}

export function ReviewTravelerCard({ review }: Props) {
    return (
        <AnimatedCard
            delay={0.18}
            className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg glass-effect"
        >
            <p className="text-sm text-muted-foreground mb-1">
                Viajero
            </p>

            <h3 className="text-2xl font-bold text-foreground">
                {review.traveler}
            </h3>

            <div className="mt-6 space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Destino
                    </p>
                    <p className="font-semibold text-foreground">
                        {review.location}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Misión
                    </p>
                    <p className="font-semibold text-foreground">
                        {review.mission}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Calificación
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                                key={i}
                                className="w-4 h-4 fill-accent text-accent"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedCard>
    )
}