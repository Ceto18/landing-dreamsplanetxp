'use client'

import Link from 'next/link'
import { MapPin, Quote, Star } from 'lucide-react'
import { AnimatedCard } from '@/components/animations/animated-card'
import { Review } from '@/data/reviews'

type Props = {
    review: Review
    delay: number
}

export function ReviewCard({ review, delay }: Props) {
    return (
        <AnimatedCard
            delay={delay}
            className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg glass-effect hover:border-accent/60 hover:bg-card/70 transition-all"
        >
            <Link
                href={`/review/${review.slug}`}
                className="block h-full no-underline"
            >
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-accent" />
                    </div>

                    <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {review.title}
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                        />
                    ))}
                </div>

                <p className="text-lg text-foreground leading-relaxed italic mb-8">
                    &quot;{review.quote}&quot;
                </p>

                <div className="mt-auto border-t border-border/60 pt-5">
                    <p className="font-semibold text-foreground">
                        {review.traveler}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        Misión {review.mission}
                    </div>
                </div>
            </Link>
        </AnimatedCard>
    )
}