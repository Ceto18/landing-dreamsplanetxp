'use client'

import { useEffect, useMemo, useState } from 'react'

import { SectionHeader } from '@/components/animations/section-header'

import { DestinationTabs } from './components/DestinationTabs'
import { MomentsGrid } from './components/MomentsGrid'
import { MomentModal } from './components/MomentModal'
import { MoreMomentsButton } from './components/MoreMomentsButton'

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
            result[countryGroup.country] = []

            countryGroup.mission_experiences.forEach((mission) => {
                if (mission.experiences.length > 0) {
                    mission.experiences.forEach((experience) => {
                        const gallery = experience.images
                            .map((image) => image.image_url)
                            .filter(Boolean)

                        const mainImage = gallery[0] || mission.image_url || ''

                        if (!mainImage) return

                        result[countryGroup.country].push({
                            id: `${countryGroup.country}-${mission.slug}-${experience.slug}`,
                            destination: countryGroup.country,
                            title: experience.name,
                            image: mainImage,
                            description:
                                'Una experiencia creada para conectar con nuevos destinos, culturas y momentos memorables.',
                            place: mission.name,
                            experience: experience.name,
                            moment: 'Durante la misión',
                            emotion: 'Aventura y conexión',
                            recommendation:
                                'Explora esta experiencia y descubre una nueva forma de viajar.',
                            gallery:
                                gallery.length > 0
                                    ? gallery
                                    : mission.image_url
                                      ? [mission.image_url]
                                      : [],
                        })
                    })

                    return
                }

                if (mission.image_url) {
                    result[countryGroup.country].push({
                        id: `${countryGroup.country}-${mission.slug}`,
                        destination: countryGroup.country,
                        title: mission.name,
                        image: mission.image_url,
                        description:
                            'Muy pronto tendremos nuevos momentos disponibles para esta misión.',
                        place: mission.name,
                        experience: mission.name,
                        moment: 'Próximamente',
                        emotion: 'Aventura y conexión',
                        recommendation:
                            'Explora esta misión y descubre una nueva forma de viajar.',
                        gallery: [mission.image_url],
                    })
                }
            })
        })

        return result
    }, [moments])

    const [activeDestination, setActiveDestination] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        if (!activeDestination && destinations.length > 0) {
            setActiveDestination(destinations[0])
        }
    }, [activeDestination, destinations])

    const photos = (momentsData[activeDestination] || []).slice(0, 8)

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
                    onSelect={(photo) => {
                        setSelectedPhoto(photo)
                        setCurrentImageIndex(0)
                    }}
                />

                <MoreMomentsButton />

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