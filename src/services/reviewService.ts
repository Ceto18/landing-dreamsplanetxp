// src/services/reviewService.ts

import { api } from './api'

/* ======================================================
   HOME REVIEWS
   Endpoint:
   /api/v1/public/home/reviews
====================================================== */

export type HomeReview = {
    name: string
    comment: string
    rating: number
    video_url: string | null
    mission_name: string | null
}

export type HomeReviewsApiResponse = {
    success: boolean
    message: string
    data: HomeReview[]
}

export const reviewService = {
    async getHomeReviews(): Promise<HomeReview[]> {
        const response =
            await api.get<HomeReviewsApiResponse>(
                '/public/home/reviews'
            )

        const data = response.data?.data

        if (!Array.isArray(data)) {
            return []
        }

        return data.map(
            (review): HomeReview => ({
                name: review?.name ?? '',
                comment: review?.comment ?? '',
                rating:
                    typeof review?.rating === 'number'
                        ? review.rating
                        : Number(review?.rating) || 0,
                video_url:
                    review?.video_url ?? null,
                mission_name:
                    review?.mission_name ?? null,
            })
        )
    },
}