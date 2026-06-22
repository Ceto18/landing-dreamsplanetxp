'use client'

import { FadeUp } from '@/components/animations/fade-up'
import { Review } from '@/data/reviews'

import { ReviewCard } from './ReviewCard'

type Props = {
    reviews: Review[]
}

export function ReviewsListSection({ reviews }: Props) {
    return (
        <section className="relative py-16 bg-secondary/30 overflow-hidden">
            <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="mb-10">
                        <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            Testimonios reales
                        </div>

                        <h2 className="mt-5 text-3xl md:text-4xl font-bold text-foreground">
                            Lo que dicen nuestros viajeros
                        </h2>

                        <p className="mt-4 max-w-2xl text-muted-foreground">
                            Cada reseña refleja una experiencia vivida con seguridad,
                            acompañamiento y momentos diseñados para recordar.
                        </p>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            delay={0.12 + idx * 0.06}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}