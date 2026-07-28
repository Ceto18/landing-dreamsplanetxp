'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loadingReviews, setLoadingReviews] = useState(true)
    const [reviewsError, setReviewsError] = useState<string | null>(null)

    const loadReviews = useCallback(async () => {
        if (!slug) return

        try {
            setLoadingReviews(true)
            setReviewsError(null)

            const response =
                await missionService.getMomentReviews(slug, {
                    page,
                    per_page: 10,
                })

            setReviews(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            )

            setCurrentPage(response?.current_page ?? 1)
            setLastPage(response?.last_page ?? 1)
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
    }, [slug, page])

    useEffect(() => {
        void loadReviews()
    }, [loadReviews])

    const changePage = (newPage: number) => {
        if (
            loadingReviews ||
            newPage < 1 ||
            newPage > lastPage ||
            newPage === currentPage
        ) {
            return
        }

        setPage(newPage)
    }

    return (
        <section className="mx-auto mt-12 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Experiencias de viajeros
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-foreground">
                        Valoraciones
                    </h3>

                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Descubre lo que otros viajeros opinan sobre
                        esta experiencia.
                    </p>
                </div>
            </FadeUp>

            <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                    <MomentReviewsList
                        reviews={reviews}
                        loading={loadingReviews}
                        error={reviewsError}
                    />

                    {lastPage > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                disabled={
                                    currentPage === 1 ||
                                    loadingReviews
                                }
                                onClick={() =>
                                    changePage(currentPage - 1)
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Anterior
                            </button>

                            <span className="text-sm font-semibold text-accent">
                                Página {currentPage} de {lastPage}
                            </span>

                            <button
                                type="button"
                                disabled={
                                    currentPage === lastPage ||
                                    loadingReviews
                                }
                                onClick={() =>
                                    changePage(currentPage + 1)
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
                            >
                                Siguiente
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                <MomentReviewForm
                    slug={slug}
                    onSubmitted={loadReviews}
                />
            </div>
        </section>
    )
}