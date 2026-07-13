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

export const missionService = {
    async getMissionTabs(): Promise<MissionTabItem[]> {
        const response = await api.get('/public/missions/tabs')

        return response.data?.data ?? []
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

        return response.data?.data
    },

    async getExperienceBySlug(slug: string): Promise<MissionExperienceDetail> {
        const response = await api.get(`/public/experiences/${slug}`)

        return response.data?.data
    },

    async getMomentBySlug(slug: string): Promise<MissionMomentDetail> {
        const response = await api.get(`/public/moments/${slug}`)

        return response.data?.data
    },
}