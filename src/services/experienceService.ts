import { api } from './api'

import type {
    MissionExperienceDetail,
    MissionExperienceDetailResponse,
} from '@/types/home'

export const experienceService = {
    async getExperienceBySlug(slug: string): Promise<MissionExperienceDetail> {
        const response = await api.get<MissionExperienceDetailResponse>(
            `/public/missions/experiences/${slug}`
        )

        return response.data.data
    },
}