import { api } from './api'
import type { HomeData, HomeResponse } from '@/types/home'

export const homeService = {
    async getHome(): Promise<HomeData> {
        const response = await api.get<HomeResponse>('/public/home')

        return response.data.data
    },
}