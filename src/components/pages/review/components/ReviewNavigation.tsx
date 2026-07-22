'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import type { HomeReview } from '@/services/reviewService'

interface Props {
    reviews: HomeReview[]
    activeIndex: number
    onPrev: () => void
    onNext: () => void
    onSelectReview: (idx: number) => void
}

export function ReviewNavigation({
    reviews,
    activeIndex,
    onPrev,
    onNext,
    onSelectReview,
}: Props) {
    if (reviews.length <= 1) {
        return null
    }

    return (
        <FadeUp delay={0.26}>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="rounded-full border border-accent/50 p-3 transition-all hover:border-accent hover:bg-accent/10"
                    aria-label="Reseña anterior"
                >
                    <ChevronLeft className="h-5 w-5 text-accent" />
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="rounded-full border border-accent/50 p-3 transition-all hover:border-accent hover:bg-accent/10"
                    aria-label="Siguiente reseña"
                >
                    <ChevronRight className="h-5 w-5 text-accent" />
                </button>

                <div className="ml-auto flex gap-1">
                    {reviews.map((review, idx) => (
                        <button
                            key={`${review.name}-${review.mission_name ?? 'sin-mision'}-${idx}`}
                            type="button"
                            onClick={() => onSelectReview(idx)}
                            className={`h-2 rounded-full transition-all ${
                                idx === activeIndex
                                    ? 'w-8 bg-accent'
                                    : 'w-2 bg-accent/30'
                            }`}
                            aria-label={`Ver reseña ${idx + 1}`}
                            aria-current={
                                idx === activeIndex
                                    ? 'true'
                                    : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </FadeUp>
    )
}