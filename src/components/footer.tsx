'use client'

import {
    useEffect,
    useMemo,
    useState,
} from 'react'

import { Skeleton } from 'antd'
import { motion } from 'motion/react'

import { FadeUp } from '@/components/animations/fade-up'

import {
    socialNetworkProfileService,
    type PublicSocialNetworkProfile,
} from '@/services/socialNetworkService'

function normalizeText(value: string) {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function getContactLabel(
    socialNetworkName: string
) {
    const name = normalizeText(
        socialNetworkName
    )

    const labels: Record<string, string> = {
        whatsapp: 'WhatsApp',

        email: 'Correo',
        mail: 'Correo',
        correo: 'Correo',

        ubication: 'Ubicación',
        ubicacion: 'Ubicación',
        location: 'Ubicación',

        phone: 'Teléfono',
        telefono: 'Teléfono',

        contact: 'Contacto',
        contacto: 'Contacto',
    }

    return labels[name] ?? socialNetworkName
}

function isContactProfile(
    profile: PublicSocialNetworkProfile
) {
    const name = normalizeText(
        profile.social_network_name
    )

    return [
        'whatsapp',

        'email',
        'correo',
        'mail',

        'ubication',
        'ubicacion',
        'location',

        'phone',
        'telefono',

        'contact',
        'contacto',
    ].includes(name)
}

function getDisplayUrl(
    profile: PublicSocialNetworkProfile
) {
    const type = normalizeText(
        profile.social_network_name
    )

    const url = profile.url?.trim() ?? ''

    const isEmail =
        type === 'email' ||
        type === 'mail' ||
        type === 'correo'

    if (isEmail) {
        return url.replace(
            /^mailto:/i,
            ''
        )
    }

    return url
}

/* =========================================================
   SKELETON REDES SOCIALES
========================================================= */
function SocialProfilesSkeleton() {
    return (
        <>
            {Array.from({ length: 4 }).map(
                (_, index) => (
                    <Skeleton.Button
                        key={index}
                        active
                        shape="circle"
                        className="!h-9 !w-9 !min-w-9"
                    />
                )
            )}
        </>
    )
}

/* =========================================================
   SKELETON CONTACTOS
========================================================= */
function ContactProfilesSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map(
                (_, index) => (
                    <div
                        key={index}
                        className="space-y-2"
                    >
                        <Skeleton.Input
                            active
                            size="small"
                            className="!h-4 !w-20"
                        />

                        <Skeleton.Input
                            active
                            size="small"
                            className="!h-4 !w-full max-w-[190px]"
                        />
                    </div>
                )
            )}
        </div>
    )
}

export function Footer() {
    const [
        profiles,
        setProfiles,
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

                const data =
                    await socialNetworkProfileService.getProfiles()

                if (!isMounted) {
                    return
                }

                const uniqueProfiles =
                    data.filter(
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

                setProfiles(uniqueProfiles)
            } catch (error) {
                console.error(
                    'Error al cargar perfiles sociales del footer:',
                    error
                )

                if (isMounted) {
                    setProfiles([])
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

    const principalProfiles = useMemo(
        () =>
            profiles.filter(
                (profile) =>
                    profile.label
                        .trim()
                        .toLowerCase() ===
                    'principal'
            ),
        [profiles]
    )

    const socialProfiles = useMemo(
        () =>
            principalProfiles.filter(
                (profile) =>
                    !isContactProfile(
                        profile
                    )
            ),
        [principalProfiles]
    )

    const contactProfiles = useMemo(
        () =>
            principalProfiles.filter(
                isContactProfile
            ),
        [principalProfiles]
    )

    return (
        <footer className="border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">

                    {/* ================= BRAND ================= */}
                    <FadeUp delay={0.05}>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">
                                <span className="text-accent">
                                    Dreams
                                </span>

                                <span className="text-foreground">
                                    PlanetXP
                                </span>
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Transformando viajes en
                                experiencias memorables.
                            </p>

                            <div className="flex min-h-9 items-center gap-3 pt-2">
                                {loadingProfiles ? (
                                    <SocialProfilesSkeleton />
                                ) : (
                                    socialProfiles.map(
                                        (social) => (
                                            <motion.div
                                                key={`${social.social_network_name}-${social.url}`}
                                                title={
                                                    social.social_network_name
                                                }
                                                whileHover={{
                                                    y: -4,
                                                    scale: 1.06,
                                                }}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10"
                                            >
                                                {social.social_network_icon ? (
                                                    <img
                                                        src={
                                                            social.social_network_icon
                                                        }
                                                        alt={
                                                            social.social_network_name
                                                        }
                                                        className="h-5 w-5 object-contain"
                                                        style={{
                                                            filter:
                                                                'brightness(0) saturate(100%) invert(55%) sepia(38%) saturate(721%) hue-rotate(358deg) brightness(91%) contrast(89%)',
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-xs font-semibold text-accent">
                                                        {social.social_network_name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </motion.div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </FadeUp>

                    {/* ================= ENLACES RÁPIDOS ================= */}
                    <FadeUp delay={0.12}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Enlaces Rápidos
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#missions"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Misiones
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#moments"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Momentos
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#team"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Equipo
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#contact"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </FadeUp>

                    {/* ================= EMPRESA ================= */}
                    <FadeUp delay={0.19}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Empresa
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="/about"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Sobre Nosotros
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/aviso-legal"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Aviso Legal
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/politica-de-privacidad"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Política de
                                        Privacidad
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/condiciones-generales"
                                        className="text-muted-foreground transition-colors hover:text-accent"
                                    >
                                        Condiciones
                                        Generales
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </FadeUp>

                    {/* ================= CONTACTOS ================= */}
                    <FadeUp delay={0.26}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Contactos
                            </h4>

                            {loadingProfiles ? (
                                <ContactProfilesSkeleton />
                            ) : contactProfiles.length > 0 ? (
                                <div className="space-y-4 text-sm">
                                    {contactProfiles.map((profile) => {
                                        return (
                                            <div
                                                key={`${profile.social_network_name}-${profile.url}`}
                                                className="space-y-1"
                                            >
                                                <p className="font-medium text-foreground">
                                                    {getContactLabel(
                                                        profile.social_network_name
                                                    )}
                                                </p>

                                                <p className="break-all text-muted-foreground">
                                                    {profile.nickname}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No hay contactos registrados.
                                </p>
                            )}
                        </div>
                    </FadeUp>
                </div>

                {/* ================= DIVIDER ================= */}
                <FadeUp delay={0.32}>
                    <div className="my-8 h-px bg-accent/20" />
                </FadeUp>

                {/* ================= BOTTOM ================= */}
                <FadeUp delay={0.38}>
                    <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
                        <p>
                            &copy; 2026 DreamsPlanetXP.
                            Todos los derechos reservados.
                        </p>
                    </div>
                </FadeUp>
            </div>
        </footer>
    )
}