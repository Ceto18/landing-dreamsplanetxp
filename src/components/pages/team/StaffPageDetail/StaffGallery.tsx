import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

import type { TeamPersonDetailImage } from '@/services/teamService'

type Props = {
    fullname: string
    images?: TeamPersonDetailImage[]
}

export function StaffGallery({
    fullname,
    images = [],
}: Props) {
    if (
        !Array.isArray(images) ||
        images.length === 0
    ) {
        return null
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Recuerdos
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Galería de fotos
                    </h2>
                </div>
            </FadeUp>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                    <AnimatedCard
                        key={`${image.image_url}-${index}`}
                        delay={index * 0.08}
                        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-0 transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                            {image.image_url ? (
                                <img
                                    src={image.image_url}
                                    alt={
                                        image.name ||
                                        `Fotografía de ${fullname}`
                                    }
                                    loading="lazy"
                                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                                    Sin imagen disponible
                                </div>
                            )}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </section>
    )
}