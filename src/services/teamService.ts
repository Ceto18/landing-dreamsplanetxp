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

export type TeamPersonDetailImage = {
    name: string
    image_url: string
}

export type TeamPersonDetailMission = {
    name: string
    country: string
    image_url: string | null
}

export type TeamPersonDetail = {
    fullname: string
    experience: string | null
    specialty: string | null
    bio: string | null
    photo_url: string | null
    languages: string[]
    images: TeamPersonDetailImage[]
    missions: TeamPersonDetailMission[]
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

        return response.data?.data
    },

    async getPersonBySlug(
        personSlug: string
    ): Promise<TeamPersonDetail> {
        const response = await api.get(
            `/public/people/${personSlug}`
        )

        return response.data?.data
    },
}