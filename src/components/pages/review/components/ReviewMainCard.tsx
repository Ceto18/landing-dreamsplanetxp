'use client'

import { Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { FadeUp } from '@/components/animations/fade-up'
import type { HomeReview } from '@/services/reviewService'

interface Props {
    review: HomeReview
    activeIndex: number
    totalReviews: number
}

export function ReviewMainCard({
    review,
    activeIndex,
    totalReviews,
}: Props) {
    const safeRating = Math.min(
        5,
        Math.max(0, review.rating)
    )

    const animationKey = [
        review.name,
        review.comment,
        review.mission_name ?? 'sin-mision',
        activeIndex,
    ].join('-')

    return (
        <FadeUp delay={0.18}>
            <div className="glass-effect space-y-8 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-7 shadow-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={animationKey}
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -18,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                                Experiencia del viajero
                            </p>

                            <p className="text-xl italic leading-relaxed text-foreground sm:text-2xl">
                                &quot;{review.comment}&quot;
                            </p>
                        </div>

                        {/* Rating */}
                        <div
                            className="flex items-center gap-2"
                            aria-label={`${safeRating} de 5 estrellas`}
                        >
                            {Array.from({ length: 5 }).map(
                                (_, index) => {
                                    const isActive =
                                        index < safeRating

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.6,
                                                rotate: -12,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                                delay:
                                                    index *
                                                    0.04,
                                            }}
                                        >
                                            <Star
                                                className={`h-5 w-5 ${isActive
                                                        ? 'fill-accent text-accent'
                                                        : 'fill-transparent text-muted-foreground/30'
                                                    }`}
                                            />
                                        </motion.div>
                                    )
                                }
                            )}
                        </div>

                        {/* Traveler Info */}
                        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5">
                            <div className="space-y-1">
                                <p className="font-semibold text-foreground">
                                    {review.name}
                                </p>

                                {review.mission_name && (
                                    <p className="text-sm text-muted-foreground">
                                        {review.mission_name}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                {activeIndex + 1}/
                                {totalReviews}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </FadeUp>
    )
}