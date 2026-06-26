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
            const country = countryGroup.country

            result[country] = []

            const countryMoments = countryGroup.moments ?? []

            countryMoments.forEach((moment) => {
                if (!moment.image) return

                result[country].push({
                    id: `${country}-${moment.slug}`,
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

    useEffect(() => {
        if (!activeDestination && destinations.length > 0) {
            setActiveDestination(destinations[0])
        }
    }, [activeDestination, destinations])

    const photos = (momentsData[activeDestination] || []).slice(0, 20)

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