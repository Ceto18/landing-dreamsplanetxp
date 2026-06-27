'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'
import { getFeaturedReviews, reviewMetrics } from '@/data/reviews'
import { ReviewMainCard } from './components/ReviewMainCard'
import { ReviewNavigation } from './components/ReviewNavigation'
import { ReviewVideoMockup } from './components/ReviewVideoMockup'
import { ReviewMetrics } from './components/ReviewMetrics'

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

                        <ReviewMainCard
                            review={review}
                            activeIndex={activeIndex}
                            totalReviews={reviews.length}
                        />

                        <ReviewNavigation
                            reviews={reviews}
                            activeIndex={activeIndex}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onSelectReview={handleSelectReview}
                        />

                        {/* Button */}
                        {/* <FadeUp delay={0.32}>
                            <Link
                                href="/review"
                                className="inline-flex px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors no-underline"
                            >
                                Ver todas las reseñas
                            </Link>
                        </FadeUp> */}
                    </div>

                    {/* Right - Video Mockup & Metrics */}
                    <div className="space-y-8">
                        <ReviewVideoMockup />

                        <ReviewMetrics metrics={reviewMetrics} />
                    </div>
                </div>
            </div>
        </section>
    )
}