'use client'

import {
    useEffect,
    useState,
} from 'react'
import {
    Clock,
    Mail,
    MapPin,
} from 'lucide-react'
import { Spin } from 'antd'

import {
    socialNetworkProfileService,
    type PublicSocialNetworkProfile,
} from '@/services/socialNetworkService'

import { ContactMethodCard } from './ContactMethodCard'

export function ContactMethods() {
    const [
        principalProfiles,
        setPrincipalProfiles,
    ] = useState<PublicSocialNetworkProfile[]>(
        []
    )

    const [
        loadingProfiles,
        setLoadingProfiles,
    ] = useState(true)

    useEffect(() => {
        let isMounted = true

        const loadProfiles = async () => {
            try {
                setLoadingProfiles(true)

                const profiles =
                    await socialNetworkProfileService.getProfiles()

                if (!isMounted) {
                    return
                }

                const principalProfiles =
                    profiles
                        .filter(
                            (profile) =>
                                profile.label ===
                                'principal'
                        )
                        .filter(
                            (
                                profile,
                                index,
                                array
                            ) =>
                                array.findIndex(
                                    (item) =>
                                        item.url ===
                                        profile.url
                                ) === index
                        )

                setPrincipalProfiles(
                    principalProfiles
                )
            } catch (error) {
                console.error(
                    'Error al cargar perfiles principales:',
                    error
                )

                if (isMounted) {
                    setPrincipalProfiles([])
                }
            } finally {
                if (isMounted) {
                    setLoadingProfiles(false)
                }
            }
        }

        void loadProfiles()

        return () => {
            isMounted = false
        }
    }, [])

    if (loadingProfiles) {
        return (
            <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-border/60 bg-card/40">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {principalProfiles.map(
                (profile, index) => (
                    <ContactMethodCard
                        key={`${profile.social_network_name}-${profile.url}`}
                        title={
                            profile.social_network_name
                        }
                        value={profile.nickname}
                        iconUrl={
                            profile.social_network_icon
                        }
                        delay={
                            0.22 +
                            index * 0.08
                        }
                        href={profile.url}
                        external
                        highlightValue
                    />
                )
            )}
        </div>
    )
}