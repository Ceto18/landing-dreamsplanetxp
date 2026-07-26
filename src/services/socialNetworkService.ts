// src/services/socialNetworkProfileService.ts

import { api } from './api'

export type PublicSocialNetworkProfileLabel =
    | 'principal'
    | 'secundario'

export type PublicSocialNetworkProfile = {
    nickname: string
    label: PublicSocialNetworkProfileLabel
    url: string
    social_network_name: string
    social_network_icon: string | null
}

export type PublicSocialNetworkProfilesResponse = {
    success: boolean
    message: string
    data: Array<{
        nickname: string
        label: string
        url: string
        social_network_name: string
        social_network_icon: string | null
    }>
}

export const socialNetworkProfileService = {
    async getProfiles(): Promise<
        PublicSocialNetworkProfile[]
    > {
        const response =
            await api.get<PublicSocialNetworkProfilesResponse>(
                '/public/social-network-profiles'
            )

        const profiles = Array.isArray(
            response.data?.data
        )
            ? response.data.data
            : []

        return profiles
            .map((profile) => ({
                ...profile,
                label: profile.label
                    .trim()
                    .toLowerCase(),
            }))
            .filter(
                (
                    profile
                ): profile is PublicSocialNetworkProfile =>
                    profile.label === 'principal' ||
                    profile.label === 'secundario'
            )
    },
}