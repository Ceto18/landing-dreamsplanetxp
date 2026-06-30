import { useState } from 'react'
import { Photo } from '../types'

type MissionPhoto = Photo & {
    missionSlug?: string
    firstExperienceSlug?: string | null
}

export function useMomentGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<MissionPhoto | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const openPhoto = (photo: MissionPhoto) => {
        setSelectedPhoto(photo)
        setCurrentImageIndex(0)
    }

    const closePhoto = () => {
        setSelectedPhoto(null)
        setCurrentImageIndex(0)
    }

    const nextImage = () => {
        if (!selectedPhoto) return

        const totalImages = selectedPhoto.gallery?.length ?? 0

        if (totalImages <= 1) return

        setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    }

    const prevImage = () => {
        if (!selectedPhoto) return

        const totalImages = selectedPhoto.gallery?.length ?? 0

        if (totalImages <= 1) return

        setCurrentImageIndex(
            (prev) => (prev - 1 + totalImages) % totalImages
        )
    }

    const setImage = (index: number) => {
        if (!selectedPhoto) return

        const totalImages = selectedPhoto.gallery?.length ?? 0

        if (index < 0 || index >= totalImages) return

        setCurrentImageIndex(index)
    }

    return {
        selectedPhoto,
        currentImageIndex,
        openPhoto,
        closePhoto,
        nextImage,
        prevImage,
        setImage,
    }
}