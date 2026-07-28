'use client'

import { useEffect, useMemo, useState } from 'react'
import { Skeleton } from 'antd'

import { SectionHeader } from '@/components/animations/section-header'

import { DestinationTabs } from './components/DestinationTabs'
import { MomentsGrid } from './components/MomentsGrid'
import { MomentModal } from './components/MomentModal'
import { MoreMomentsButton } from './components/MoreMomentsButton'

import { homeService } from '@/services/homeService'
import { missionService } from '@/services/missionService'

import { HomeMission, HomeVisibleMissionTab } from '@/types/home'
import { Photo } from './types'

type Props = {
    visibleMissionsTabs?: HomeVisibleMissionTab[]
    missions?: HomeMission[]
}

function MomentsTabsSkeleton() {
    return (
        <div className="mb-10 flex justify-center">
            <div className="flex max-w-5xl flex-wrap justify-center gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton.Button
                        key={index}
                        active
                        shape="round"
                        style={{
                            width: 120,
                            height: 44,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

function MomentsGridSkeleton() {
    return (
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="aspect-square w-full overflow-hidden rounded-lg border border-border/50 bg-card/50"
                >
                    <Skeleton.Image
                        active
                        className="!h-full !w-full"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

function MomentDetailSkeleton() {
    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-[320px] rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                <Skeleton
                    active
                    title={{
                        width: '65%',
                    }}
                    paragraph={{
                        rows: 4,
                        width: ['100%', '90%', '85%', '70%'],
                    }}
                />
            </div>
        </div>
    )
}

export function Moment({
    visibleMissionsTabs = [],
    missions = [],
}: Props) {
    const destinations = useMemo(() => {
        if (visibleMissionsTabs.length > 0) {
            return Array.from(
                new Set(
                    visibleMissionsTabs
                        .map((tab) => tab.country?.trim())
                        .filter(Boolean) as string[]
                )
            )
        }

        return Array.from(
            new Set(
                missions
                    .map((mission) => mission.country?.trim())
                    .filter(Boolean) as string[]
            )
        )
    }, [visibleMissionsTabs, missions])

    const missionsByCountry = useMemo(() => {
        return missions.reduce<Record<string, HomeMission[]>>(
            (acc, mission) => {
                const country = mission.country?.trim()

                if (!country) return acc

                if (!acc[country]) {
                    acc[country] = []
                }

                acc[country].push(mission)

                return acc
            },
            {}
        )
    }, [missions])

    const [activeDestination, setActiveDestination] = useState('')

    const [photos, setPhotos] = useState<Photo[]>([])

    const [selectedPhoto, setSelectedPhoto] =
        useState<Photo | null>(null)

    const [currentImageIndex, setCurrentImageIndex] =
        useState(0)

    const [isLoadingMoment, setIsLoadingMoment] =
        useState(false)

    const [isLoadingMomentDetail, setIsLoadingMomentDetail] =
        useState(false)

    useEffect(() => {
        if (!activeDestination && destinations.length > 0) {
            setActiveDestination(destinations[0])
        }
    }, [activeDestination, destinations])

    useEffect(() => {
        const loadMomentsByDestination = async () => {
            if (!activeDestination) return

            const countryMissions =
                missionsByCountry[activeDestination] ?? []

            if (!countryMissions.length) {
                setPhotos([])
                return
            }

            try {
                setIsLoadingMoment(true)

                const responses = await Promise.all(
                    countryMissions.map(async (mission) => {
                        try {
                            const detail =
                                await homeService.getMissionMoments(
                                    mission.slug
                                )

                            return {
                                mission,
                                detail,
                            }
                        } catch (error) {
                            console.error(
                                `Error obteniendo momentos de ${mission.slug}:`,
                                error
                            )

                            return {
                                mission,
                                detail: null,
                            }
                        }
                    })
                )

                const formattedPhotos: Photo[] =
                    responses.flatMap(
                        ({ mission, detail }) => {
                            const moments =
                                detail?.moments ?? []

                            return moments
                                .filter((moment) =>
                                    Boolean(moment.image_url)
                                )
                                .map((moment) => ({
                                    id: `${mission.slug}-${moment.slug}`,
                                    slug: moment.slug,
                                    missionSlug:
                                        mission.slug,
                                    firstExperienceSlug:
                                        mission.first_experience_slug,
                                    destination:
                                        detail?.country ??
                                        mission.country,
                                    title: moment.title,
                                    image:
                                        moment.image_url,
                                    description:
                                        mission.label ||
                                        'Una experiencia creada para conectar con nuevos destinos, culturas y momentos memorables.',
                                    place:
                                        detail?.country ??
                                        mission.country,
                                    experience:
                                        detail?.name ??
                                        mission.name,
                                    moment:
                                        moment.title,
                                    emotion:
                                        'Aventura y conexión',
                                    recommendation:
                                        'Explora este momento y descubre una nueva forma de viajar.',
                                    gallery: [
                                        moment.image_url,
                                    ],
                                }))
                        }
                    )

                setPhotos(formattedPhotos)
            } catch (error) {
                console.error(
                    'Error cargando momentos:',
                    error
                )

                setPhotos([])
            } finally {
                setIsLoadingMoment(false)
            }
        }

        loadMomentsByDestination()
    }, [activeDestination, missionsByCountry])

    const handleSelectMoment = async (
        photo: Photo
    ) => {
        if (!photo.slug) {
            setSelectedPhoto(photo)
            setCurrentImageIndex(0)
            return
        }

        try {
            setIsLoadingMomentDetail(true)

            const detail =
                await missionService.getMomentBySlug(
                    photo.slug
                )

            const gallery =
                detail.images
                    ?.map(
                        (image) =>
                            image.image_url
                    )
                    .filter(Boolean) ?? []

            const formattedPhoto: Photo = {
                ...photo,
                id: detail.slug,
                slug: detail.slug,
                destination:
                    detail.mission ??
                    photo.destination,
                title: detail.title,
                image:
                    gallery[0] ??
                    photo.image,
                description:
                    detail.description ??
                    photo.description,
                place:
                    detail.place ??
                    photo.place,
                experience:
                    detail.mission_experience ??
                    detail.experience ??
                    photo.experience,
                moment:
                    detail.ideal ??
                    photo.moment,
                emotion:
                    detail.sensation ??
                    photo.emotion,
                recommendation:
                    detail.proverb ??
                    'Explora este momento y descubre una nueva forma de viajar.',
                gallery:
                    gallery.length > 0
                        ? gallery
                        : photo.gallery,
            }

            setSelectedPhoto(formattedPhoto)
            setCurrentImageIndex(0)
        } catch (error) {
            console.error(
                'Error obteniendo detalle del momento:',
                error
            )

            setSelectedPhoto(photo)
            setCurrentImageIndex(0)
        } finally {
            setIsLoadingMomentDetail(false)
        }
    }

    if (!missions.length) return null

    return (
        <section
            id="moments"
            className="relative overflow-hidden bg-secondary/30 py-24"
        >
            <div className="absolute left-0 top-0 -ml-48 -mt-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-20 right-0 -mr-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <SectionHeader
                    title="Momentos"
                    description="Cada foto es un recuerdo eterno. Cada imagen cuenta la historia de una transformación personal."
                />

                {isLoadingMoment && !photos.length ? (
                    <MomentsTabsSkeleton />
                ) : (
                    <DestinationTabs
                        destinations={destinations}
                        active={activeDestination}
                        onChange={(
                            destination: string
                        ) => {
                            setActiveDestination(
                                destination
                            )

                            setSelectedPhoto(null)

                            setCurrentImageIndex(0)
                        }}
                    />
                )}

                {isLoadingMoment ? (
                    <MomentsGridSkeleton />
                ) : (
                    <MomentsGrid
                        photos={photos.slice(
                            0,
                            20
                        )}
                        onSelect={
                            handleSelectMoment
                        }
                    />
                )}

                {!isLoadingMoment && (
                    <MoreMomentsButton />
                )}

                {isLoadingMomentDetail && (
                    <MomentDetailSkeleton />
                )}

                <MomentModal
                    photo={selectedPhoto}
                    index={currentImageIndex}
                    onClose={() => {
                        setSelectedPhoto(null)
                        setCurrentImageIndex(0)
                    }}
                    onNext={() =>
                        setCurrentImageIndex(
                            (prev) =>
                                (prev + 1) %
                                (selectedPhoto
                                    ?.gallery
                                    .length || 1)
                        )
                    }
                    onPrev={() =>
                        setCurrentImageIndex(
                            (prev) =>
                                (prev -
                                    1 +
                                    (selectedPhoto
                                        ?.gallery
                                        .length ||
                                        1)) %
                                (selectedPhoto
                                    ?.gallery
                                    .length || 1)
                        )
                    }
                    onSelectImage={
                        setCurrentImageIndex
                    }
                />
            </div>
        </section>
    )
}