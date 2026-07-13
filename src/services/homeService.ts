import { api } from './api'

import type {
    HomeData,
    HomeResponse,
    HomeMissionMomentsData,
    HomeMissionMomentsResponse,
} from '@/types/home'

export type {
    HomeVisibleMissionTab,
} from '@/types/home'

export const homeService = {
    async getHome(): Promise<HomeData> {
        const response =
            await api.get<HomeResponse>('/public/home')

        const data = response.data.data

        return {
            ...data,
            visible_missions_tabs: Array.isArray(
                data?.visible_missions_tabs
            )
                ? data.visible_missions_tabs
                : [],
            missions: Array.isArray(data?.missions)
                ? data.missions
                : [],
        }
    },

    async getMissionMoments(
        missionSlug: string
    ): Promise<HomeMissionMomentsData> {
        const response =
            await api.get<HomeMissionMomentsResponse>(
                `/public/home/missions/${missionSlug}/moments`
            )

        return response.data.data
    },
}