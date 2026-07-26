// src/services/teamService.ts

import { api } from './api'

export type TeamRole =
    | 'influencer'
    | 'coordinator'
    | 'contributor'

/* ======================================================
   TEAM LIST
   Endpoint:
   /api/v1/public/missions/{missionSlug}/people/{role}
====================================================== */

export type TeamPerson = {
    first_name: string
    last_name: string
    fullname: string
    slug: string
    experience: string | null
    specialty: string | null
    photo_url: string | null
    role: string
    languages: string[]
}

export type TeamPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type TeamPaginatedResponse = {
    current_page: number
    data: TeamPerson[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: TeamPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

/* ======================================================
   PERSON DETAIL
   Endpoint:
   /api/v1/public/people/{personSlug}
====================================================== */

export type TeamPersonDetailMission = {
    name: string
    country: string
    image_url: string | null
    first_experience_slug: string | null
}

export type TeamPersonDetail = {
    fullname: string
    experience: string | null
    specialty: string | null
    bio: string | null
    photo_url: string | null
    languages: string[]
    missions: TeamPersonDetailMission[]
}

/* ======================================================
   PERSON IMAGES
   Endpoint:
   /api/v1/public/people/{personSlug}/images
====================================================== */

export type TeamPersonDetailImage = {
    name: string
    image: string
    image_url: string
}

export type TeamPersonImagesPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type TeamPersonImagesPaginatedResponse = {
    current_page: number
    data: TeamPersonDetailImage[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: TeamPersonImagesPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export const teamService = {
    async getPeopleByMissionAndRole(
        missionSlug: string,
        role: TeamRole,
        page = 1,
        perPage = 12
    ): Promise<TeamPaginatedResponse> {
        const response = await api.get(
            `/public/missions/${missionSlug}/people/${role}`,
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
            data: Array.isArray(data?.data) ? data.data : [],
            first_page_url: data?.first_page_url ?? null,
            from: data?.from ?? null,
            last_page: data?.last_page ?? 1,
            last_page_url: data?.last_page_url ?? null,
            links: Array.isArray(data?.links) ? data.links : [],
            next_page_url: data?.next_page_url ?? null,
            path: data?.path ?? '',
            per_page: data?.per_page ?? perPage,
            prev_page_url: data?.prev_page_url ?? null,
            to: data?.to ?? null,
            total: data?.total ?? 0,
        }
    },

    async getPersonBySlug(
        personSlug: string
    ): Promise<TeamPersonDetail> {
        const response = await api.get(
            `/public/people/${personSlug}`
        )

        const data = response.data?.data

        return {
            fullname: data?.fullname ?? '',
            experience: data?.experience ?? null,
            specialty: data?.specialty ?? null,
            bio: data?.bio ?? null,
            photo_url: data?.photo_url ?? null,
            languages: Array.isArray(data?.languages)
                ? data.languages
                : [],
            missions: Array.isArray(data?.missions)
                ? data.missions
                : [],
        }
    },

    async getPersonImages(
        personSlug: string,
        page = 1,
        perPage = 10
    ): Promise<TeamPersonImagesPaginatedResponse> {
        const response = await api.get(
            `/public/people/${personSlug}/images`,
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
            data: Array.isArray(data?.data) ? data.data : [],
            first_page_url: data?.first_page_url ?? null,
            from: data?.from ?? null,
            last_page: data?.last_page ?? 1,
            last_page_url: data?.last_page_url ?? null,
            links: Array.isArray(data?.links) ? data.links : [],
            next_page_url: data?.next_page_url ?? null,
            path: data?.path ?? '',
            per_page: data?.per_page ?? perPage,
            prev_page_url: data?.prev_page_url ?? null,
            to: data?.to ?? null,
            total: data?.total ?? 0,
        }
    },
}