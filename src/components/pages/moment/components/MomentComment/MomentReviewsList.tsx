// src/components/ui/MomentComment/MomentReviewsList.tsx

'use client'

import { useCallback, useState } from 'react'
import {
    CirclePlay,
    LoaderCircle,
    Play,
    Star,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

import type { MomentReview } from '@/services/missionService'

import { ReviewVideoModal } from './ReviewVideoModal'

type Props = {
    reviews: MomentReview[]
    loading: boolean
    error: string | null
}

type SelectedVideo = {
    url: string
    reviewerName: string
}

const MAX_RATING = 5

export function MomentReviewsList({
    reviews,
    loading,
    error,
}: Props) {
    const [selectedVideo, setSelectedVideo] =
        useState<SelectedVideo | null>(null)

    const closeVideo = useCallback(() => {
        setSelectedVideo(null)
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-48 items-center justify-center rounded-3xl border border-border/60 bg-card/30">
                <LoaderCircle className="h-8 w-8 animate-spin text-accent" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 text-center text-sm text-red-500">
                {error}
            </div>
        )
    }

    if (reviews.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-border/70 bg-card/30 px-6 py-14 text-center">
                <Star className="mx-auto h-10 w-10 text-accent/60" />

                <p className="mt-4 font-semibold text-foreground">
                    Aún no hay comentarios
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Sé la primera persona en compartir su experiencia.
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-4">
                {reviews.map((review, index) => {
                    const reviewerInitial =
                        review.name?.trim().charAt(0).toUpperCase() ||
                        '?'

                    return (
                        <AnimatedCard
                            key={`${review.name}-${review.comment}-${index}`}
                            delay={index * 0.08}
                            className="overflow-hidden rounded-3xl border border-border/60 bg-card/50 transition-all hover:border-accent/30 hover:shadow-lg"
                        >
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-bold uppercase text-accent">
                                            {reviewerInitial}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {review.name}
                                            </p>

                                            <div className="mt-1 flex items-center gap-1">
                                                {Array.from({
                                                    length: MAX_RATING,
                                                }).map(
                                                    (_, starIndex) => {
                                                        const active =
                                                            starIndex <
                                                            review.rating

                                                        return (
                                                            <Star
                                                                key={
                                                                    starIndex
                                                                }
                                                                className={`h-4 w-4 ${
                                                                    active
                                                                        ? 'fill-accent text-accent'
                                                                        : 'text-muted-foreground/30'
                                                                }`}
                                                            />
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                        {review.rating}/5
                                    </span>
                                </div>

                                <p className="leading-relaxed text-muted-foreground">
                                    {review.comment}
                                </p>
                            </div>

                            {review.video_url && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedVideo({
                                            url: review.video_url!,
                                            reviewerName:
                                                review.name,
                                        })
                                    }
                                    className="group relative flex min-h-44 w-full items-center justify-center overflow-hidden border-t border-border/60 bg-gradient-to-br from-background via-card to-accent/10 px-6 py-8 text-left"
                                    aria-label={`Reproducir video de ${review.name}`}
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(177,127,64,0.16),transparent_65%)]" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-background">
                                            <Play className="ml-1 h-7 w-7 fill-current" />
                                        </div>

                                        <p className="mt-4 font-semibold text-foreground">
                                            Ver video de la experiencia
                                        </p>
                                    </div>
                                </button>
                            )}
                        </AnimatedCard>
                    )
                })}
            </div>

            <ReviewVideoModal
                videoUrl={selectedVideo?.url ?? null}
                reviewerName={selectedVideo?.reviewerName}
                onClose={closeVideo}
            />
        </>
    )
}