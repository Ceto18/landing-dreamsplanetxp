'use client'

import { ImageReveal } from '@/components/animations/image-reveal'
import { Photo } from '../types'

type MissionPhoto = Photo & {
    firstExperienceSlug?: string | null
}

export function MomentCard({
    photo,
    onClick,
}: {
    photo: MissionPhoto
    onClick: () => void
}) {
    const image = photo.image || '/images/placeholder.jpg'
    const hasExperience = Boolean(photo.firstExperienceSlug)

    return (
        <ImageReveal>
            <button
                type="button"
                onClick={onClick}
                className={`group relative aspect-square w-full rounded-lg overflow-hidden border border-border/50 bg-card/50 transition-all duration-300 ${hasExperience
                        ? 'cursor-pointer hover:border-accent/50'
                        : 'cursor-default opacity-90'
                    }`}
            >
                <img
                    src={image}
                    alt={photo.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hasExperience ? 'group-hover:scale-110' : ''
                        }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-foreground font-semibold text-sm line-clamp-2 text-left">
                        {photo.title}
                    </h3>

                    {photo.place && (
                        <p className="mt-1 text-xs capitalize text-foreground/70 line-clamp-1 text-left">
                            {photo.place}
                        </p>
                    )}

                    {!hasExperience && (
                        <span className="mt-2 w-fit rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium text-foreground/70 backdrop-blur-sm">
                            Sin experiencia activa
                        </span>
                    )}
                </div>

                {hasExperience && (
                    <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-background shadow-lg">
                        Ver experiencia
                    </div>
                )}

                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/50 rounded-lg transition-colors duration-300" />
            </button>
        </ImageReveal>
    )
}