'use client'

import {
    MessageSquareText,
    Quote,
    Star,
} from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { MomentReviewForm } from '../../moment/components/MomentComment'

import type { PublicReview } from '@/services/reviewService'

type Props = {
    reviews: PublicReview[]
    total?: number
    onSubmitted?: () => Promise<void> | void
}

export function ReviewsListSection({
    reviews,
    total,
    onSubmitted,
}: Props) {
    const totalReviews = total ?? reviews.length

    return (
        <section
            id="comentarios"
            className="relative overflow-hidden py-20 sm:py-24"
        >
            <div className="absolute left-0 top-40 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="mb-12 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                            Opiniones reales
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                            Experiencias compartidas por nuestros viajeros
                        </h2>

                        <p className="mt-4 leading-relaxed text-muted-foreground">
                            Conoce las opiniones de otros viajeros y
                            comparte tu propia experiencia con la
                            comunidad.
                        </p>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    Reseñas de viajeros
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {totalReviews}{' '}
                                    {totalReviews === 1
                                        ? 'reseña publicada'
                                        : 'reseñas publicadas'}
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                <MessageSquareText className="h-4 w-4" />
                                Comunidad viajera
                            </div>
                        </div>

                        {reviews.length > 0 ? (
                            <div className="space-y-5">
                                {reviews.map((review, index) => (
                                    <FadeUp
                                        key={`${review.name}-${index}`}
                                        delay={index * 0.05}
                                    >
                                        <AnimatedCard className="rounded-3xl border border-border/60 bg-card/50 p-6 shadow-xl transition hover:border-accent/40 sm:p-7">
                                            <div className="flex items-start justify-between gap-5">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-lg font-bold uppercase text-accent">
                                                        {review.name
                                                            .trim()
                                                            .charAt(0) ||
                                                            '?'}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h4 className="truncate font-bold text-foreground">
                                                            {review.name ||
                                                                'Viajero'}
                                                        </h4>

                                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                                            {review.mission_name ||
                                                                'Experiencia DreamsPlanetXP'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Quote className="h-8 w-8 shrink-0 text-accent/30" />
                                            </div>

                                            <div className="mt-5 flex items-center gap-1">
                                                {Array.from({
                                                    length: 5,
                                                }).map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={`h-5 w-5 ${starIndex <
                                                                review.rating
                                                                ? 'fill-accent text-accent'
                                                                : 'text-muted-foreground/20'
                                                            }`}
                                                    />
                                                ))}

                                                <span className="ml-2 text-sm font-semibold text-accent">
                                                    {review.rating}/5
                                                </span>
                                            </div>

                                            <p className="mt-5 break-words leading-relaxed text-muted-foreground">
                                                “{review.comment}”
                                            </p>

                                            {review.video_url && (
                                                <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-black">
                                                    <video
                                                        src={
                                                            review.video_url
                                                        }
                                                        controls
                                                        preload="metadata"
                                                        playsInline
                                                        className="max-h-[500px] w-full object-contain"
                                                    >
                                                        Tu navegador no
                                                        puede reproducir
                                                        este video.
                                                    </video>
                                                </div>
                                            )}

                                            {(review.mission_name ||
                                                review.moment_title) && (
                                                    <div className="mt-6 border-t border-border/60 pt-5">
                                                        {review.mission_name && (
                                                            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                                                                {
                                                                    review.mission_name
                                                                }
                                                            </p>
                                                        )}

                                                        {review.moment_title && (
                                                            <p className="mt-1 font-semibold text-foreground">
                                                                {
                                                                    review.moment_title
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                        </AnimatedCard>
                                    </FadeUp>
                                ))}
                            </div>
                        ) : (
                            <AnimatedCard className="rounded-3xl border border-border/60 bg-card/50 p-10 text-center shadow-xl">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                                    <MessageSquareText className="h-6 w-6 text-accent" />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-foreground">
                                    Todavía no hay reseñas
                                </h3>

                                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                                    Sé la primera persona en compartir
                                    su experiencia.
                                </p>
                            </AnimatedCard>
                        )}
                    </div>

                    <div
                        id="dejar-resena"
                        className="lg:sticky lg:top-28"
                    >
                        <MomentReviewForm
                            onSubmitted={onSubmitted}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}