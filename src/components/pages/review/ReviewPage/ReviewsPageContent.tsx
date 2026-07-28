'use client'

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from 'lucide-react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import {
    reviewService,
    type PublicReview,
} from '@/services/reviewService'

import { ReviewsHero } from './ReviewsHero'
import { ReviewsListSection } from './ReviewsListSection'

const PER_PAGE = 10

export function ReviewsPageContent() {
    const [reviews, setReviews] = useState<PublicReview[]>([])
    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const loadReviews = useCallback(async () => {
        try {
            setLoading(true)
            setError(false)

            const response =
                await reviewService.getAllReviews({
                    page,
                    per_page: PER_PAGE,
                })

            setReviews(response.data)
            setCurrentPage(response.current_page)
            setLastPage(response.last_page)
            setTotal(response.total)
        } catch (error) {
            console.error(
                'Error cargando las reseñas:',
                error
            )

            setReviews([])
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [page])

    useEffect(() => {
        void loadReviews()
    }, [loadReviews])

    const metrics = useMemo(() => {
        const visibleReviews = reviews.length

        const averageRating =
            visibleReviews > 0
                ? reviews.reduce(
                      (sum, review) =>
                          sum + review.rating,
                      0
                  ) / visibleReviews
                : 0

        const fiveStarReviews = reviews.filter(
            (review) => review.rating === 5
        ).length

        const satisfaction =
            visibleReviews > 0
                ? Math.round(
                      (fiveStarReviews /
                          visibleReviews) *
                          100
                  )
                : 0

        return [
            // {
            //     label: 'Reseñas publicadas',
            //     value: total,
            // },
            // {
            //     label: 'Valoración de esta página',
            //     value: `${averageRating.toFixed(1)}/5`,
            // },
            // {
            //     label: 'Reseñas de 5 estrellas',
            //     value: fiveStarReviews,
            // },
            // {
            //     label: 'Satisfacción',
            //     value: `${satisfaction}%`,
            // },
        ]
    }, [reviews, total])

    const changePage = (newPage: number) => {
        if (
            loading ||
            newPage < 1 ||
            newPage > lastPage ||
            newPage === currentPage
        ) {
            return
        }

        setPage(newPage)

        window.requestAnimationFrame(() => {
            document
                .getElementById('comentarios')
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
        })
    }

    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <ReviewsHero metrics={metrics} />

                {loading ? (
                    <ReviewsLoading />
                ) : error ? (
                    <ReviewsError
                        onRetry={() =>
                            void loadReviews()
                        }
                    />
                ) : (
                    <>
                        <ReviewsListSection
                            reviews={reviews}
                            total={total}
                            onSubmitted={loadReviews}
                        />

                        <ReviewsPagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            loading={loading}
                            onChange={changePage}
                        />
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

type PaginationProps = {
    currentPage: number
    lastPage: number
    loading: boolean
    onChange: (page: number) => void
}

function ReviewsPagination({
    currentPage,
    lastPage,
    loading,
    onChange,
}: PaginationProps) {
    if (lastPage <= 1) {
        return null
    }

    return (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 pb-20 sm:px-6 lg:px-8">
            <button
                type="button"
                disabled={currentPage === 1 || loading}
                onClick={() =>
                    onChange(currentPage - 1)
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card/50 px-4 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </button>

            <span className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent">
                Página {currentPage} de {lastPage}
            </span>

            <button
                type="button"
                disabled={
                    currentPage === lastPage ||
                    loading
                }
                onClick={() =>
                    onChange(currentPage + 1)
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card/50 px-4 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    )
}

function ReviewsError({
    onRetry,
}: {
    onRetry: () => void
}) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-lg font-semibold text-foreground">
                No se pudieron cargar las reseñas
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
                Inténtalo nuevamente.
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-foreground"
            >
                <RefreshCw className="h-4 w-4" />
                Reintentar
            </button>
        </section>
    )
}

function ReviewsLoading() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
                <div className="space-y-5">
                    <div className="h-8 w-56 animate-pulse rounded-lg bg-muted" />

                    {Array.from({ length: 3 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-border/60 bg-card/50 p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                                        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>

                                <div className="mt-5 h-5 w-32 animate-pulse rounded bg-muted" />
                                <div className="mt-5 h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-muted" />
                                <div className="mt-6 h-20 animate-pulse rounded-2xl bg-muted" />
                            </div>
                        )
                    )}
                </div>

                <div className="h-[650px] animate-pulse rounded-3xl bg-muted" />
            </div>
        </section>
    )
}