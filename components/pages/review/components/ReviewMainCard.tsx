'use client'

import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp } from '@/components/animations/fade-up'

interface ReviewItem {
    id: string | number
    title: string
    quote: string
    rating: number
    traveler: string
    mission: string
}

interface Props {
    review: ReviewItem
    activeIndex: number
    totalReviews: number
}

export function ReviewMainCard({ review, activeIndex, totalReviews }: Props) {
    return (
        <FadeUp delay={0.18}>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-7 shadow-lg glass-effect space-y-8 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <p className="text-accent text-sm font-semibold uppercase tracking-[0.25em]">
                                {review.title}
                            </p>

                            <p className="text-xl sm:text-2xl text-foreground leading-relaxed italic">
                                &quot;{review.quote}&quot;
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        delay: i * 0.04,
                                    }}
                                >
                                    <Star className="w-5 h-5 fill-accent text-accent" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Traveler Info */}
                        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5">
                            <div className="space-y-1">
                                <p className="font-semibold text-foreground">
                                    {review.traveler}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Misión {review.mission}
                                </p>
                            </div>

                            <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                {activeIndex + 1}/{totalReviews}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </FadeUp>
    )
}