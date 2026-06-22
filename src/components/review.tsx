'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'
import { getFeaturedReviews, reviewMetrics } from '@/data/reviews'

const reviews = getFeaturedReviews(5)

export function Review() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (!autoScroll || reviews.length === 0) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [autoScroll])

    const pauseAutoScroll = () => {
        setAutoScroll(false)

        setTimeout(() => {
            setAutoScroll(true)
        }, 5000)
    }

    const handlePrev = () => {
        pauseAutoScroll()
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }

    const handleNext = () => {
        pauseAutoScroll()
        setActiveIndex((prev) => (prev + 1) % reviews.length)
    }

    const handleSelectReview = (idx: number) => {
        pauseAutoScroll()
        setActiveIndex(idx)
    }

    const review = reviews[activeIndex]

    if (!review) return null

    return (
        <section id="resenas" className="relative py-24 bg-secondary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Reseñas"
                    description="Historias reales de viajeros que vivieron experiencias únicas, auténticas e inolvidables."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Reviews */}
                    <div className="space-y-8">
                        <FadeUp delay={0.1}>
                            <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                Lo que dicen nuestros viajeros
                            </div>
                        </FadeUp>

                        {/* Main Review */}
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
                                                {activeIndex + 1}/{reviews.length}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </FadeUp>

                        {/* Navigation */}
                        <FadeUp delay={0.26}>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                                    aria-label="Reseña anterior"
                                >
                                    <ChevronLeft className="w-5 h-5 text-accent" />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNext}
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
                                            onClick={() => handleSelectReview(idx)}
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

                        {/* Button */}
                        <FadeUp delay={0.32}>
                            <Link
                                href="/review"
                                className="inline-flex px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors no-underline"
                            >
                                Ver todas las reseñas
                            </Link>
                        </FadeUp>
                    </div>

                    {/* Right - Video Mockup & Metrics */}
                    <div className="space-y-8">
                        {/* Video Mockup */}
                        <AnimatedCard delay={0.18} className="relative max-w-sm mx-auto">
                            <div
                                className="relative bg-black rounded-3xl p-3 shadow-2xl mx-auto border border-accent/20"
                                style={{ width: '280px' }}
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />

                                {/* Screen */}
                                <div className="relative bg-foreground/5 rounded-2xl h-96 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background/20 to-background/80" />

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="relative z-10 w-20 h-20 rounded-full border border-accent/40 bg-accent/15 flex items-center justify-center hover:bg-accent/25 transition-colors"
                                        aria-label="Reproducir video"
                                    >
                                        <Play className="w-10 h-10 text-accent fill-accent" />
                                    </motion.button>
                                </div>
                            </div>
                        </AnimatedCard>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {reviewMetrics.map((metric, idx) => (
                                <AnimatedCard
                                    key={metric.label}
                                    delay={0.28 + idx * 0.08}
                                    className="p-5 rounded-xl border border-border/60 bg-card/40 hover:border-accent/60 hover:bg-card/70 transition-all shadow-lg"
                                >
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {metric.label}
                                    </p>

                                    <p className="text-3xl font-bold text-accent">
                                        {metric.value}
                                    </p>
                                </AnimatedCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}