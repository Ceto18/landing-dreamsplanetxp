// src/services/missionService.ts

import { api } from './api'

export type MissionExperienceImage = {
    name: string
    image_url: string
}

export type MissionItinerary = {
    day: string
    order: number
    title: string
    description: string
}

export type MissionExperience = {
    name: string
    slug: string
    short_description: string | null
    release_date: string | null
    number_seats: number
    seats_used: number
    days: number
    nights: number
    raiting: string | null
    subtitle: string | null
    investment: number
    images: MissionExperienceImage[]
    features: string[]
    itineraries: MissionItinerary[]
}

export type MissionItem = {
    name: string
    slug: string
    image_url: string | null
    experiences: MissionExperience[]
}

export type MissionCountryGroup = {
    country: string
    mission_experiences: MissionItem[]
}

export type PublicMissionsAllResponse = {
    countries: string[]
    data: MissionCountryGroup[]
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
    raiting: string | null
    investment: number
    number_seats: number
    seats_used: number
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
    async getAllMissions(): Promise<PublicMissionsAllResponse> {
        const response = await api.get('/public/missions/all')

        return {
            countries: response.data?.data?.countries ?? [],
            data: response.data?.data?.data ?? [],
        }
    },

    async getExperienceBySlug(slug: string): Promise<MissionExperienceDetail> {
        const response = await api.get(`/public/missions/experiences/${slug}`)

        return response.data?.data
    },

    async getMomentBySlug(slug: string): Promise<MissionMomentDetail> {
        const response = await api.get(
            `/public/missions/experiences/moments/${slug}`
        )

        return response.data?.data
    },
}