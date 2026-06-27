'use client'

import { useEffect, useMemo, useState } from 'react'

import { SectionHeader } from '@/components/animations/section-header'

import { DestinationTabs } from './components/DestinationTabs'
import { MomentsGrid } from './components/MomentsGrid'
import { MomentModal } from './components/MomentModal'
import { MoreMomentsButton } from './components/MoreMomentsButton'

import { missionService } from '@/services/missionService'

import { HomeMoments } from '@/types/home'
import { Photo } from './types'

type Props = {
    moments?: HomeMoments
}

export function Moment({ moments }: Props) {
    const destinations = useMemo(() => {
        return moments?.countries ?? []
    }, [moments])

    const momentsData = useMemo<Record<string, Photo[]>>(() => {
        const result: Record<string, Photo[]> = {}

        const groups = moments?.data ?? []

        groups.forEach((countryGroup) => {
            const country = countryGroup.country

            result[country] = []

            const countryMoments = countryGroup.moments ?? []

            countryMoments.forEach((moment) => {
                if (!moment.image) return

                result[country].push({
                    id: `${country}-${moment.slug}`,
                    slug: moment.slug,
                    destination: country,
                    title: moment.title,
                    image: moment.image,
                    description:
                        'Una experiencia creada para conectar con nuevos destinos, culturas y momentos memorables.',
                    place: country,
                    experience: moment.title,
                    moment: moment.title,
                    emotion: 'Aventura y conexión',
                    recommendation:
                        'Explora este momento y descubre una nueva forma de viajar.',
                    gallery: [moment.image],
                })
            })
        })

        return result
    }, [moments])

    const [activeDestination, setActiveDestination] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLoadingMoment, setIsLoadingMoment] = useState(false)

    useEffect(() => {
        if (!activeDestination && destinations.length > 0) {
            setActiveDestination(destinations[0])
        }
    }, [activeDestination, destinations])

    const photos = (momentsData[activeDestination] || []).slice(0, 20)

    const handleSelectMoment = async (photo: Photo) => {
        if (!photo.slug) {
            setSelectedPhoto(photo)
            setCurrentImageIndex(0)
            return
        }

        try {
            setIsLoadingMoment(true)

            const detail = await missionService.getMomentBySlug(photo.slug)

            const gallery =
                detail.images
                    ?.map((image) => image.image_url)
                    .filter(Boolean) ?? []

            const formattedPhoto: Photo = {
                ...photo,
                id: detail.slug,
                slug: detail.slug,
                destination: detail.mission ?? photo.destination,
                title: detail.title,
                image: gallery[0] ?? photo.image,
                description: detail.description ?? photo.description,
                place: detail.place ?? photo.place,
                experience:
                    detail.mission_experience ??
                    detail.experience ??
                    photo.experience,
                moment: detail.ideal ?? photo.moment,
                emotion: detail.sensation ?? photo.emotion,
                recommendation:
                    detail.proverb ??
                    'Explora este momento y descubre una nueva forma de viajar.',
                gallery: gallery.length > 0 ? gallery : photo.gallery,
            }

            setSelectedPhoto(formattedPhoto)
            setCurrentImageIndex(0)
        } catch (error) {
            console.error('Error obteniendo detalle del momento:', error)

            setSelectedPhoto(photo)
            setCurrentImageIndex(0)
        } finally {
            setIsLoadingMoment(false)
        }
    }

    if (!moments) return null

    return (
        <section
            id="momentos"
            className="relative py-24 bg-secondary/30 overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mt-48" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <SectionHeader
                    title="Momentos"
                    description="Cada foto es un recuerdo eterno. Cada imagen cuenta la historia de una transformación personal."
                />

                <DestinationTabs
                    destinations={destinations}
                    active={activeDestination}
                    onChange={(destination) => {
                        setActiveDestination(destination)
                        setSelectedPhoto(null)
                        setCurrentImageIndex(0)
                    }}
                />

                <MomentsGrid
                    photos={photos}
                    onSelect={handleSelectMoment}
                />

                <MoreMomentsButton />

                {isLoadingMoment && (
                    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="rounded-2xl bg-white px-6 py-4 text-sm font-medium text-gray-700 shadow-xl">
                            Cargando momento...
                        </div>
                    </div>
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
                                (selectedPhoto?.gallery.length || 1)
                        )
                    }
                    onPrev={() =>
                        setCurrentImageIndex(
                            (prev) =>
                                (prev -
                                    1 +
                                    (selectedPhoto?.gallery.length || 1)) %
                                (selectedPhoto?.gallery.length || 1)
                        )
                    }
                    onSelectImage={setCurrentImageIndex}
                />
            </div>
        </section>
    )
}