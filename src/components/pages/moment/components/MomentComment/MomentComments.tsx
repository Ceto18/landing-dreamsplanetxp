// src/components/ui/MomentComment/MomentComments.tsx

'use client'

import { useCallback, useEffect, useState } from 'react'

import { FadeUp } from '@/components/animations/fade-up'

import {
    missionService,
    type MomentReview,
} from '@/services/missionService'

import { MomentReviewForm } from './MomentReviewForm'
import { MomentReviewsList } from './MomentReviewsList'

type Props = {
    slug: string
}

export function MomentComments({ slug }: Props) {
    const [reviews, setReviews] = useState<MomentReview[]>([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    const [reviewsError, setReviewsError] = useState<
        string | null
    >(null)

    const loadReviews = useCallback(async () => {
        if (!slug) {
            setReviews([])
            setLoadingReviews(false)
            return
        }

        setLoadingReviews(true)
        setReviewsError(null)

        try {
            const response =
                await missionService.getMomentReviews(slug, {
                    page: 1,
                    per_page: 10,
                })

            setReviews(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            )
        } catch (error) {
            console.error(
                `Error obteniendo reseñas del momento ${slug}:`,
                error
            )

            setReviews([])
            setReviewsError(
                'No se pudieron cargar los comentarios.'
            )
        } finally {
            setLoadingReviews(false)
        }
    }, [slug])

    useEffect(() => {
        void loadReviews()
    }, [loadReviews])

    return (
        <section className="mx-auto mt-12 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Experiencias de viajeros
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-foreground">
                        Comentarios
                    </h3>

                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Descubre lo que otros viajeros opinan sobre
                        esta experiencia.
                    </p>
                </div>
            </FadeUp>

            <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <MomentReviewsList
                    reviews={reviews}
                    loading={loadingReviews}
                    error={reviewsError}
                />

                <MomentReviewForm
                    slug={slug}
                    onSubmitted={loadReviews}
                />
            </div>
        </section>
    )
}