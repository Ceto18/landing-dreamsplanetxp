'use client'

import { useState } from 'react'
import { destinations } from './data'
import { momentosData } from '@/data/moments'
import { SectionHeader } from '@/components/animations/section-header'

import { DestinationTabs } from './components/DestinationTabs'
import { MomentsGrid } from './components/MomentsGrid'
import { MomentModal } from './components/MomentModal'
import { MoreMomentsButton } from './components/MoreMomentsButton'

export function Moment() {
    const [activeDestination, setActiveDestination] = useState(destinations[0])
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const photos = momentosData[activeDestination] || []

    return (
        <section
            id="momentos"
            className="relative py-24 bg-secondary/30 overflow-hidden"
        >
            {/* decor */}
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
                    onChange={setActiveDestination}
                />

                <MomentsGrid
                    photos={photos}
                    onSelect={(p) => {
                        setSelectedPhoto(p)
                        setCurrentImageIndex(0)
                    }}
                />

                {/* 🔘 BOTÓN RESTAURADO */}
                <MoreMomentsButton />

                <MomentModal
                    photo={selectedPhoto}
                    index={currentImageIndex}
                    onClose={() => setSelectedPhoto(null)}
                    onNext={() =>
                        setCurrentImageIndex(
                            (p) =>
                                (p + 1) %
                                (selectedPhoto?.gallery.length || 1)
                        )
                    }
                    onPrev={() =>
                        setCurrentImageIndex(
                            (p) =>
                                (p - 1 +
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