import { api } from './api'
import type {
    HomeData,
    HomeResponse,
    HomeMissionMomentsData,
    HomeMissionMomentsResponse,
} from '@/types/home'

export const homeService = {
    async getHome(): Promise<HomeData> {
        const response = await api.get<HomeResponse>('/public/home')

        // console.log('🟢 [homeService] response completa:', response.data)
        // console.log('🟢 [homeService] response.data.data:', response.data.data)
        // console.log('🟢 [homeService] moments:', response.data.data?.moments)

        return response.data.data
    },

    async getMissionMoments(
        missionSlug: string
    ): Promise<HomeMissionMomentsData> {
        const response = await api.get<HomeMissionMomentsResponse>(
            `/public/home/missions/${missionSlug}/moments`
        )

        return response.data.data
    },
}