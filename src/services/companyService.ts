import { api } from './api'

import type {
    CompanyHistory,
    CompanyHistoryResponse,
    CompanyHome,
    CompanyHomeResponse,
} from '@/types/home'

export const companyService = {
    async getCompanyHome(): Promise<CompanyHome> {
        const response = await api.get<CompanyHomeResponse>(
            '/public/company/home'
        )

        return response.data.data
    },

    async getCompanyHistory(): Promise<CompanyHistory> {
        const response = await api.get<CompanyHistoryResponse>(
            '/public/company/history'
        )

        return response.data.data
    },
}