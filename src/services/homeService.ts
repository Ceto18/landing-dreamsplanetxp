import { api } from './api'
import type { HomeData, HomeResponse } from '@/types/home'

export const homeService = {
    async getHome(): Promise<HomeData> {
        const response = await api.get<HomeResponse>('/public/home')

        // console.log('🟢 [homeService] response completa:', response.data)
        // console.log('🟢 [homeService] response.data.data:', response.data.data)
        // console.log('🟢 [homeService] moments:', response.data.data?.moments)


        return response.data.data
    },
}