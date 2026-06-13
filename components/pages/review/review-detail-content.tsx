'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, CheckCircle2, MapPin, Quote, Star } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'
import { Review, getRelatedReviews } from '@/data/reviews'

type Props = {
    review: Review
}

export function ReviewDetailContent({ review }: Props) {
    const relatedReviews = getRelatedReviews(review.slug)

    return (
        <main className="min-h-screen text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <Link
                            href="/review"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 no-underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a reseñas
                        </Link>
                    </FadeUp>

                    <FadeUp delay={0.08}>
                        <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-6">
                            Reseña de viajero
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.14}>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                            {review.title}
                        </h1>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
                            &quot;{review.quote}&quot;
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.26}>
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-accent" />
                                Misión {review.mission}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent" />
                                {review.date}
                            </div>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-accent text-accent"
                                    />
                                ))}
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Detail */}
            <section className="relative py-16 bg-secondary/30 overflow-hidden">
                <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
                        <FadeUp delay={0.1}>
                            <article className="rounded-2xl border border-border/60 bg-card/40 p-7 md:p-10 shadow-lg glass-effect">
                                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-8">
                                    <Quote className="w-6 h-6 text-accent" />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">
                                    Experiencia del viajero
                                </h2>

                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {review.experience}
                                </p>

                                <div className="mt-10 border-t border-border/60 pt-8">
                                    <h3 className="text-xl font-bold text-foreground mb-5">
                                        Lo más destacado
                                    </h3>

                                    <div className="space-y-4">
                                        {review.highlights.map((highlight) => (
                                            <div
                                                key={highlight}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />

                                                <p className="text-muted-foreground">
                                                    {highlight}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </FadeUp>

                        <AnimatedCard
                            delay={0.18}
                            className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg glass-effect"
                        >
                            <p className="text-sm text-muted-foreground mb-1">
                                Viajero
                            </p>

                            <h3 className="text-2xl font-bold text-foreground">
                                {review.traveler}
                            </h3>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Destino
                                    </p>
                                    <p className="font-semibold text-foreground">
                                        {review.location}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Misión
                                    </p>
                                    <p className="font-semibold text-foreground">
                                        {review.mission}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Calificación
                                    </p>

                                    <div className="mt-1 flex items-center gap-1">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-accent text-accent"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* Related */}
            <section className="relative py-16 overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="Más reseñas"
                        description="Conoce otras experiencias de viajeros que fueron parte de nuestras misiones."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedReviews.map((item, idx) => (
                            <AnimatedCard
                                key={item.id}
                                delay={0.12 + idx * 0.06}
                                className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg glass-effect hover:border-accent/60 hover:bg-card/70 transition-all"
                            >
                                <Link
                                    href={`/review/${item.slug}`}
                                    className="block h-full no-underline"
                                >
                                    <div className="flex items-center gap-1 mb-5">
                                        {Array.from({ length: item.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-accent text-accent"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-lg text-foreground leading-relaxed italic mb-6">
                                        &quot;{item.quote}&quot;
                                    </p>

                                    <div className="border-t border-border/60 pt-5">
                                        <p className="font-semibold text-foreground">
                                            {item.traveler}
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Misión {item.mission}
                                        </p>
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