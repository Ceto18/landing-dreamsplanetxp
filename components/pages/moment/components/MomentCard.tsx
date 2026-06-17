'use client'

import { ImageReveal } from '@/components/animations/image-reveal'
import { Photo } from '../types'

export function MomentCard({
    photo,
    onClick,
}: {
    photo: Photo
    onClick: () => void
}) {
    return (
        <ImageReveal>
            <button
                type="button"
                onClick={onClick}
                className="group relative aspect-square w-full rounded-lg overflow-hidden border border-border/50 bg-card/50 hover:border-accent/50 transition-all duration-300 cursor-pointer"
            >
                <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-foreground font-semibold text-sm line-clamp-2 text-left">
                        {photo.title}
                    </h3>
                </div>

                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/50 rounded-lg transition-colors duration-300" />
            </button>
        </ImageReveal>
    )
}