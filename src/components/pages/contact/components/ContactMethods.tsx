'use client'

import {
    useEffect,
    useState,
} from 'react'
import {
    Clock,
    LoaderCircle,
    Mail,
    MapPin,
    Share2,
} from 'lucide-react'

import {
    socialNetworkProfileService,
    type PublicSocialNetworkProfile,
} from '@/services/socialNetworkService'

import { ContactMethodCard } from './ContactMethodCard'

const allowedSocialNetworks = [
    'instagram',
    'youtube',
    'facebook',
    'tiktok',
    'twitter',
    'x',
    'discord',
    'linkedin',
    'twitch',
]

export function ContactMethods() {
    const [
        principalProfiles,
        setPrincipalProfiles,
    ] = useState<
        PublicSocialNetworkProfile[]
    >([])

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

                const principal = profiles
                    .filter(
                        (profile) =>
                            profile.label
                                .trim()
                                .toLowerCase() ===
                            'principal'
                    )
                    .filter((profile) =>
                        allowedSocialNetworks.includes(
                            profile.social_network_name
                                .trim()
                                .toLowerCase()
                        )
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
                    principal
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

    return (
        <div className="space-y-4">
            {loadingProfiles && (
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4 text-muted-foreground">
                    <LoaderCircle className="h-5 w-5 animate-spin text-accent" />

                    <span className="text-sm">
                        Cargando medios de contacto...
                    </span>
                </div>
            )}

            {!loadingProfiles &&
                principalProfiles.map(
                    (profile, index) => (
                        <ContactMethodCard
                            key={`${profile.social_network_name}-${profile.url}`}
                            title={
                                profile.social_network_name
                            }
                            value={
                                profile.nickname
                            }
                            icon={Share2}
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

            <ContactMethodCard
                title="Email"
                value="info@dreamsplanetxp.com"
                icon={Mail}
                delay={
                    0.22 +
                    principalProfiles.length *
                        0.08
                }
                href="mailto:info@dreamsplanetxp.com"
                highlightValue
            />

            <ContactMethodCard
                title="Ubicación"
                value="Atención desde Lima, Perú"
                icon={MapPin}
                delay={
                    0.3 +
                    principalProfiles.length *
                        0.08
                }
            />

            <ContactMethodCard
                title="Tiempo de respuesta"
                value="Menos de 24 horas"
                icon={Clock}
                delay={
                    0.38 +
                    principalProfiles.length *
                        0.08
                }
            />
        </div>
    )
}