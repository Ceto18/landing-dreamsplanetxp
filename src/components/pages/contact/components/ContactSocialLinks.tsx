'use client'

import {
    useEffect,
    useState,
} from 'react'

import { Spin } from 'antd'
import { motion } from 'motion/react'

import { FadeUp } from '@/components/animations/fade-up'

import {
    socialNetworkProfileService,
    type PublicSocialNetworkProfile,
} from '@/services/socialNetworkService'

export function ContactSocialLinks() {
    const [
        secondaryProfiles,
        setSecondaryProfiles,
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

                const secondary =
                    profiles
                        .filter(
                            (profile) =>
                                profile.label ===
                                'secundario'
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

                setSecondaryProfiles(
                    secondary
                )
            } catch (error) {
                console.error(
                    'Error al cargar perfiles secundarios:',
                    error
                )

                if (isMounted) {
                    setSecondaryProfiles([])
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
            <FadeUp delay={0.5}>
                <div className="flex min-h-12 items-center">
                    <Spin size="small" />
                </div>
            </FadeUp>
        )
    }

    if (secondaryProfiles.length === 0) {
        return null
    }

    return (
        <FadeUp delay={0.5}>
            <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Síguenos
                </p>

                <div className="flex flex-wrap gap-3">
                    {secondaryProfiles.map(
                        (profile) => (
                            <motion.a
                                key={`${profile.social_network_name}-${profile.url}`}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                aria-label={
                                    profile.social_network_name
                                }
                                title={
                                    profile.social_network_name
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10"
                            >
                                {profile.social_network_icon ? (
                                    <img
                                        src={
                                            profile.social_network_icon
                                        }
                                        alt={
                                            profile.social_network_name
                                        }
                                        className="h-5 w-5 object-contain transition-all duration-300"
                                        style={{
                                            filter:
                                                'brightness(0) saturate(100%) invert(55%) sepia(38%) saturate(721%) hue-rotate(358deg) brightness(91%) contrast(89%)',
                                        }}
                                    />
                                ) : (
                                    <span className="text-xs font-semibold text-accent">
                                        {profile.social_network_name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span>
                                )}
                            </motion.a>
                        )
                    )}
                </div>
            </div>
        </FadeUp>
    )
}