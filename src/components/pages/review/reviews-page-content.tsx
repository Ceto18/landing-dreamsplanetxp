'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Quote, Star } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'
import { getAllReviews, reviewMetrics } from '@/data/reviews'

export function ReviewsPageContent() {
    const reviews = getAllReviews()

    return (
        <main className="min-h-screen text-foreground">
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 no-underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio
                        </Link>
                    </FadeUp>

                    <SectionHeader
                        title="Reseñas de Viajeros"
                        description="Historias reales de personas que confiaron en Dreams Planet XP para vivir experiencias únicas alrededor del mundo."
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        {reviewMetrics.map((metric, idx) => (
                            <AnimatedCard
                                key={metric.label}
                                delay={0.12 + idx * 0.06}
                                className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center glass-effect"
                            >
                                <p className="text-3xl font-bold text-accent">
                                    {metric.value}
                                </p>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {metric.label}
                                </p>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>

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
                            <AnimatedCard
                                key={review.id}
                                delay={0.12 + idx * 0.06}
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
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}