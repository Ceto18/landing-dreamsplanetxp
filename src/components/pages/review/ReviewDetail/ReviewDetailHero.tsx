'use client'

import { Calendar, MapPin, Star } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { Review } from '@/data/reviews'

type Props = {
    review: Review
}

export function ReviewDetailHero({ review }: Props) {
    return (
        <section className="relative overflow-hidden pt-32 pb-16">
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp delay={0.08}>
                    <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-6">
                        Reseña de viajero
                    </div>
                </FadeUp>

                <FadeUp delay={0.14}>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {review.title}
                    </h1>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
                        &quot;{review.quote}&quot;
                    </p>
                </FadeUp>

                <FadeUp delay={0.26}>
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            Misión {review.mission}
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            {review.date}
                        </div>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-4 h-4 fill-accent text-accent"
                                />
                            ))}
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}