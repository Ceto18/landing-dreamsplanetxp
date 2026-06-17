import { useState } from 'react'
import { Photo } from '../types'

export function useMomentGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const openPhoto = (photo: Photo) => {
        setSelectedPhoto(photo)
        setCurrentImageIndex(0)
    }

    const closePhoto = () => {
        setSelectedPhoto(null)
        setCurrentImageIndex(0)
    }

    const nextImage = () => {
        if (!selectedPhoto) return
        setCurrentImageIndex(
            (prev) => (prev + 1) % selectedPhoto.gallery.length
        )
    }

    const prevImage = () => {
        if (!selectedPhoto) return
        setCurrentImageIndex(
            (prev) =>
                (prev - 1 + selectedPhoto.gallery.length) %
                selectedPhoto.gallery.length
        )
    }

    const setImage = (index: number) => setCurrentImageIndex(index)

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