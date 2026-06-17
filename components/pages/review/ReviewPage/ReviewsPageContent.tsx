'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { getAllReviews, reviewMetrics } from '@/data/reviews'

import { ReviewsHero } from './ReviewsHero'
import { ReviewsListSection } from './ReviewsListSection'

export function ReviewsPageContent() {
    const reviews = getAllReviews()

    return (
        <>
            {/* HEADER GLOBAL */}
            <Header />

            <main className="min-h-screen text-foreground">
                <ReviewsHero metrics={reviewMetrics} />

                <ReviewsListSection reviews={reviews} />
            </main>

            {/* FOOTER GLOBAL */}
            <Footer />
        </>
    )
}