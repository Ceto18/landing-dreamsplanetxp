'use client'

import { MapPin, Quote, Star } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import type { HomeReview } from '@/services/reviewService'

type Props = {
    review: HomeReview
    delay: number
}

export function ReviewCard({ review, delay }: Props) {
    const rating = Math.max(
        0,
        Math.min(5, Number(review.rating) || 0)
    )

    return (
        <AnimatedCard
            delay={delay}
            className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all glass-effect hover:border-accent/60 hover:bg-card/70"
        >
            <div className="flex h-full flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                        <Quote className="h-5 w-5 text-accent" />
                    </div>

                    <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        Reseña
                    </div>
                </div>

                <div className="mb-5 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={`h-4 w-4 ${
                                index < rating
                                    ? 'fill-accent text-accent'
                                    : 'text-muted-foreground/20'
                            }`}
                        />
                    ))}

                    <span className="ml-2 text-sm font-semibold text-accent">
                        {rating}/5
                    </span>
                </div>

                <p className="mb-8 flex-1 text-lg italic leading-relaxed text-foreground">
                    &quot;{review.comment}&quot;
                </p>

                {review.video_url && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-border/60 bg-black">
                        <video
                            src={review.video_url}
                            controls
                            preload="metadata"
                            playsInline
                            className="max-h-64 w-full object-contain"
                        />
                    </div>
                )}

                <div className="border-t border-border/60 pt-5">
                    <p className="font-semibold text-foreground">
                        {review.name || 'Viajero'}
                    </p>

                    {review.mission_name && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-accent" />
                            {review.mission_name}
                        </div>
                    )}
                </div>
            </div>
        </AnimatedCard>
    )
}