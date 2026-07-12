import { api } from './api'

import type {
    MissionExperienceDetail,
    MissionExperienceDetailResponse,
    MissionExperiencesPagination,
    MissionExperiencesResponse,
    MissionMomentsPagination,
    MissionMomentsResponse,
    MomentDetail,
    MomentDetailResponse,
} from '@/types/home'

export const experienceService = {
    async getExperienceBySlug(slug: string): Promise<MissionExperienceDetail> {
        const response = await api.get<MissionExperienceDetailResponse>(
            `/public/missions/experiences/${slug}`
        )

        return response.data.data
    },

    async getMomentsByMissionSlug(
        missionSlug: string,
        page = 1
    ): Promise<MissionMomentsPagination> {
        const response = await api.get<MissionMomentsResponse>(
            `/public/missions/${missionSlug}/moments`,
            {
                params: {
                    page,
                },
            }
        )

        return response.data.data
    },

    async getMomentBySlug(slug: string): Promise<MomentDetail> {
        const response = await api.get<MomentDetailResponse>(
            `/public/moments/${slug}`
        )

        return response.data.data
    },
}