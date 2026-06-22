import { Photo } from '../types'
import { MomentCard } from './MomentCard'

export function MomentsGrid({
    photos,
    onSelect,
}: {
    photos: Photo[]
    onSelect: (photo: Photo) => void
}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {photos.map((photo, idx) => (
                <MomentCard
                    key={`${photo.destination}-${photo.id}`}
                    photo={photo}
                    onClick={() => onSelect(photo)}
                />
            ))}
        </div>
    )
}