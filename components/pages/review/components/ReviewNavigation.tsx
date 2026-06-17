'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

interface ReviewItem {
    id: string | number
}

interface Props {
    reviews: ReviewItem[]
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
    return (
        <FadeUp delay={0.26}>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                    aria-label="Reseña anterior"
                >
                    <ChevronLeft className="w-5 h-5 text-accent" />
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                    aria-label="Siguiente reseña"
                >
                    <ChevronRight className="w-5 h-5 text-accent" />
                </button>

                <div className="ml-auto flex gap-1">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectReview(idx)}
                            className={`h-2 rounded-full transition-all ${
                                idx === activeIndex
                                    ? 'bg-accent w-8'
                                    : 'bg-accent/30 w-2'
                            }`}
                            aria-label={`Ver reseña ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </FadeUp>
    )
}