import { api } from './api'

import type {
    SocialNetworkProfile,
    SocialNetworkProfilesResponse,
} from '@/types/home'

export const socialNetworkService = {
    async getSocialNetworkProfiles(): Promise<
        SocialNetworkProfile[]
    > {
        const response =
            await api.get<SocialNetworkProfilesResponse>(
                '/public/social-network-profiles'
            )

        return response.data.data
    },
}