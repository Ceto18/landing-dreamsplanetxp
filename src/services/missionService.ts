// src/services/missionService.ts

import { api } from './api'

export type MissionTabItem = {
    country: string
    slug: string
    name: string
}

export type MissionDifficulty =
    | 'basic'
    | 'intermediate'
    | 'advanced'

export type MissionExperienceImage = {
    name: string
    image_url: string
}

export type MissionExperienceFirstImage = {
    name: string
    image_url: string
}

export type MissionExperienceCard = {
    name: string
    slug: string
    short_description: string | null
    release_date: string | null
    number_seats: number
    seats_used: number
    available_seats: number
    days: number
    nights: number
    raiting: number | string | null
    investment: number
    features: string[]
    first_image: MissionExperienceFirstImage | null
}

export type MissionExperiencesPaginatedResponse = {
    current_page: number
    data: MissionExperienceCard[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type MissionItinerary = {
    day: string
    order: number
    title: string
    description: string
}

export type MissionExperienceDetailImage = {
    name: string
    image: string
}

export type MissionExperienceDetailMission = {
    name: string
    country: string
    image: string | null
}

export type MissionExperienceDetail = {
    name: string
    slug: string
    subtitle: string | null
    short_description: string | null
    long_description: string | null
    release_date: string | null
    days: number
    nights: number
    raiting: number | string | null
    investment: number
    number_seats: number
    seats_used: number
    difficulty: MissionDifficulty
    file: string | null
    mission: MissionExperienceDetailMission
    images: MissionExperienceDetailImage[]
    features: string[]
    itineraries: MissionItinerary[]
}

export type MissionMomentImage = {
    name: string
    image_url: string
}

export type MissionMomentDetail = {
    title: string
    slug: string
    description: string | null
    proverb: string | null
    place: string | null
    experience: string | null
    ideal: string | null
    sensation: string | null
    mission: string | null
    mission_experience: string | null
    images: MissionMomentImage[]
}

/* ======================================================
   MOMENT REVIEWS
   Endpoint:
   GET /api/v1/public/moments/{slug}/reviews
   POST /api/v1/public/moments/{slug}/reviews
====================================================== */

export type MomentReview = {
    name: string
    comment: string
    rating: number
    video_url: string | null
}

export type MomentReviewPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type MomentReviewsPaginatedResponse = {
    current_page: number
    data: MomentReview[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: MomentReviewPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type GetMomentReviewsParams = {
    page?: number
    per_page?: number
}

export type CreateMomentReviewPayload = {
    name: string
    comment: string
    rating: number
    video?: File | null
}

export type CreateMomentReviewOptions = {
    onUploadProgress?: (progress: number) => void
    signal?: AbortSignal
}

export type CreateMomentReviewResponse = {
    success: boolean
    message: string
    data?: unknown
}

export const missionService = {
    async getMissionTabs(): Promise<MissionTabItem[]> {
        const response = await api.get(
            '/public/missions/tabs'
        )

        return Array.isArray(response.data?.data)
            ? response.data.data
            : []
    },

    async getExperiencesByMissionSlug(
        missionSlug: string,
        page = 1,
        perPage = 9
    ): Promise<MissionExperiencesPaginatedResponse> {
        const response = await api.get(
            `/public/missions/${missionSlug}/experiences`,
            {
                params: {
                    page,
                    per_page: perPage,
                },
            }
        )

        const data = response.data?.data

        return {
            current_page: data?.current_page ?? 1,
            data: Array.isArray(data?.data)
                ? data.data
                : [],
            first_page_url:
                data?.first_page_url ?? null,
            from: data?.from ?? null,
            last_page: data?.last_page ?? 1,
            last_page_url:
                data?.last_page_url ?? null,
            next_page_url:
                data?.next_page_url ?? null,
            path: data?.path ?? '',
            per_page: data?.per_page ?? perPage,
            prev_page_url:
                data?.prev_page_url ?? null,
            to: data?.to ?? null,
            total: data?.total ?? 0,
        }
    },

    async getExperienceBySlug(
        slug: string
    ): Promise<MissionExperienceDetail> {
        const response = await api.get(
            `/public/experiences/${slug}`
        )

        return response.data?.data
    },

    async getMomentBySlug(
        slug: string
    ): Promise<MissionMomentDetail> {
        const response = await api.get(
            `/public/moments/${slug}`
        )

        return response.data?.data
    },

    async getMomentReviews(
        slug: string,
        params: GetMomentReviewsParams = {}
    ): Promise<MomentReviewsPaginatedResponse> {
        const page = params.page ?? 1
        const perPage = params.per_page ?? 10

        const response = await api.get(
            `/public/moments/${slug}/reviews`,
            {
                params: {
                    page,
                    per_page: perPage,
                },
            }
        )

        const data = response.data?.data

        return {
            current_page:
                data?.current_page ?? page,
            data: Array.isArray(data?.data)
                ? data.data
                : [],
            first_page_url:
                data?.first_page_url ?? null,
            from: data?.from ?? null,
            last_page: data?.last_page ?? 1,
            last_page_url:
                data?.last_page_url ?? null,
            links: Array.isArray(data?.links)
                ? data.links
                : [],
            next_page_url:
                data?.next_page_url ?? null,
            path: data?.path ?? '',
            per_page:
                data?.per_page ?? perPage,
            prev_page_url:
                data?.prev_page_url ?? null,
            to: data?.to ?? null,
            total: data?.total ?? 0,
        }
    },

    async createMomentReview(
        slug: string,
        payload: CreateMomentReviewPayload,
        options: CreateMomentReviewOptions = {}
    ): Promise<CreateMomentReviewResponse> {
        const formData = new FormData()

        formData.append(
            'name',
            payload.name.trim()
        )

        formData.append(
            'comment',
            payload.comment.trim()
        )

        formData.append(
            'rating',
            String(payload.rating)
        )

        if (payload.video instanceof File) {
            formData.append(
                'video',
                payload.video
            )
        }

        const response =
            await api.post<CreateMomentReviewResponse>(
                `/public/moments/${slug}/reviews`,
                formData,
                {
                    signal: options.signal,

                    onUploadProgress: (
                        progressEvent
                    ) => {
                        /*
                         * Algunos navegadores o adaptadores pueden
                         * no proporcionar el tamaño total.
                         */
                        if (!progressEvent.total) {
                            return
                        }

                        const percentage =
                            Math.min(
                                100,
                                Math.round(
                                    (progressEvent.loaded *
                                        100) /
                                        progressEvent.total
                                )
                            )

                        options.onUploadProgress?.(
                            percentage
                        )
                    },
                }
            )

        return response.data
    },
}