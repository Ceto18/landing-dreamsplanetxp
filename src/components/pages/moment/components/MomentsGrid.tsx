import { Photo } from '../types'
import { MomentCard } from './MomentCard'

type MissionPhoto = Photo & {
    missionSlug?: string
    firstExperienceSlug?: string | null
}

export function MomentsGrid({
    photos,
    onSelect,
}: {
    photos: MissionPhoto[]
    onSelect: (photo: MissionPhoto) => void
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
                    key={
                        photo.id ||
                        `${photo.missionSlug ?? 'mission'}-${photo.slug ?? 'moment'}-${idx}`
                    }
                    photo={photo}
                    onClick={() => onSelect(photo)}
                />
            ))}
        </div>
    )
}