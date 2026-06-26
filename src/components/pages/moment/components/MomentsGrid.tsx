import { Photo } from '../types'
import { MomentCard } from './MomentCard'

export function MomentsGrid({
    photos,
    onSelect,
}: {
    photos: Photo[]
    onSelect: (photo: Photo) => void
}) {
    if (!photos.length) {
        return (
            <div className="mb-12 text-center">
                <p className="text-muted-foreground">
                    No hay momentos disponibles para este destino.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {photos.map((photo, idx) => (
                <MomentCard
                    key={`${photo.destination}-${photo.title}-${idx}`}
                    photo={photo}
                    onClick={() => onSelect(photo)}
                />
            ))}
        </div>
    )
}