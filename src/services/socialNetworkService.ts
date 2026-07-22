// src/services/socialNetworkProfileService.ts

import { api } from './api'

export type PublicSocialNetworkProfile = {
    nickname: string
    label: string
    url: string
    social_network_name: string
    social_network_icon: string | null
}

export type PublicSocialNetworkProfilesResponse = {
    success: boolean
    message: string
    data: PublicSocialNetworkProfile[]
}

export const socialNetworkProfileService = {
    async getProfiles(): Promise<
        PublicSocialNetworkProfile[]
    > {
        const response =
            await api.get<PublicSocialNetworkProfilesResponse>(
                '/public/social-network-profiles'
            )

        return Array.isArray(response.data?.data)
            ? response.data.data
            : []
    },
}