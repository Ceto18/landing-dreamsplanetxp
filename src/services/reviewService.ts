import { api } from './api'

export type HomeReview = {
    name: string
    comment: string
    rating: number
    video_url: string | null
    mission_name: string | null
}

export type PublicReview = {
    name: string
    comment: string
    rating: number
    video_url: string | null
    moment_title: string | null
    mission_name: string | null
}

export type ReviewPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type PublicReviewsPagination = {
    current_page: number
    data: PublicReview[]
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: ReviewPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type CreateReviewPayload = {
    name: string
    comment: string
    rating: number
    video?: File | null
}

export type CreateReviewResponse = {
    success: boolean
    message: string
    data?: unknown
}

export type GetAllReviewsParams = {
    page?: number
    per_page?: number
}

type HomeReviewsApiResponse = {
    success: boolean
    message: string
    data: HomeReview[]
}

type PublicReviewsApiResponse = {
    success: boolean
    message: string
    data: PublicReviewsPagination
}

type UploadOptions = {
    signal?: AbortSignal
    onUploadProgress?: (progress: number) => void
}

export const reviewService = {
    async getHomeReviews(): Promise<HomeReview[]> {
        const response = await api.get<HomeReviewsApiResponse>(
            '/public/home/reviews'
        )

        const data = response.data?.data

        if (!Array.isArray(data)) return []

        return data.map((review) => ({
            name: review?.name ?? '',
            comment: review?.comment ?? '',
            rating: Number(review?.rating) || 0,
            video_url: review?.video_url ?? null,
            mission_name: review?.mission_name ?? null,
        }))
    },

    async getAllReviews(
        params: GetAllReviewsParams = {}
    ): Promise<PublicReviewsPagination> {
        const response = await api.get<PublicReviewsApiResponse>(
            '/public/reviews',
            {
                params: {
                    page: params.page ?? 1,
                    per_page: params.per_page ?? 10,
                },
            }
        )

        const pagination = response.data?.data

        return {
            current_page: pagination?.current_page ?? 1,
            data: Array.isArray(pagination?.data)
                ? pagination.data.map((review) => ({
                      name: review?.name ?? '',
                      comment: review?.comment ?? '',
                      rating: Number(review?.rating) || 0,
                      video_url: review?.video_url ?? null,
                      moment_title: review?.moment_title ?? null,
                      mission_name: review?.mission_name ?? null,
                  }))
                : [],
            first_page_url: pagination?.first_page_url ?? '',
            from: pagination?.from ?? null,
            last_page: pagination?.last_page ?? 1,
            last_page_url: pagination?.last_page_url ?? '',
            links: Array.isArray(pagination?.links)
                ? pagination.links
                : [],
            next_page_url: pagination?.next_page_url ?? null,
            path: pagination?.path ?? '',
            per_page: pagination?.per_page ?? 10,
            prev_page_url: pagination?.prev_page_url ?? null,
            to: pagination?.to ?? null,
            total: pagination?.total ?? 0,
        }
    },

    async createReview(
        payload: CreateReviewPayload,
        options: UploadOptions = {}
    ): Promise<CreateReviewResponse> {
        const formData = new FormData()

        formData.append('name', payload.name)
        formData.append('comment', payload.comment)
        formData.append('rating', String(payload.rating))

        if (payload.video) {
            formData.append('video', payload.video)
        }

        const response = await api.post<CreateReviewResponse>(
            '/public/reviews',
            formData,
            {
                signal: options.signal,
                onUploadProgress: (event) => {
                    if (!event.total) return

                    const progress = Math.round(
                        (event.loaded * 100) / event.total
                    )

                    options.onUploadProgress?.(progress)
                },
            }
        )

        return response.data
    },
}