import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

import type {
    TeamPersonDetailImage,
    TeamPersonDetailMission,
} from '@/services/teamService'

type MissionsProps = {
    missions?: TeamPersonDetailMission[]
}

type GalleryProps = {
    fullname: string
    images?: TeamPersonDetailImage[]
}

type CtaProps = {
    fullname: string
}

export function InfluencerMissions({
    missions = [],
}: MissionsProps) {
    if (!Array.isArray(missions) || missions.length === 0) {
        return null
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Experiencias compartidas
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Misiones realizadas
                    </h2>
                </div>
            </FadeUp>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {missions.map((mission, index) => (
                    <AnimatedCard
                        key={`${mission.name}-${mission.country}-${index}`}
                        delay={index * 0.08}
                        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-0 transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
                    >
                        <div className="relative h-56 overflow-hidden bg-muted">
                            {mission.image_url ? (
                                <img
                                    src={mission.image_url}
                                    alt={mission.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                                    Sin imagen disponible
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-foreground">
                                {mission.name}
                            </h3>

                            {mission.country && (
                                <div className="mt-2 flex items-center gap-2 text-sm capitalize text-muted-foreground">
                                    <MapPin className="h-4 w-4 shrink-0 text-accent" />

                                    <span>{mission.country}</span>
                                </div>
                            )}
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </section>
    )
}

export function InfluencerGallery({
    fullname,
    images = [],
}: GalleryProps) {
    if (!Array.isArray(images) || images.length === 0) {
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
                        key={`${image.image}-${index}`}
                        delay={index * 0.08}
                        className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-0 transition-all duration-500 hover:border-accent/40 hover:shadow-xl"
                    >
                        <div className="relative h-64 overflow-hidden bg-muted">
                            {image.image_url ? (
                                <img
                                    src={image.image_url}
                                    alt={
                                        image.name
                                            ? image.name
                                            : `Fotografía de ${fullname}`
                                    }
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
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

export function InfluencerCta({
    fullname,
}: CtaProps) {
    return (
        <section className="border-t border-border/50 bg-secondary/30 py-20">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="rounded-3xl border border-border/60 bg-card/50 p-8 shadow-2xl transition-all sm:p-12">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                            <Star className="h-8 w-8 text-accent" />
                        </div>

                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                            Vive una experiencia inolvidable
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
                            Descubre nuestras próximas misiones y comparte
                            nuevas experiencias junto a {fullname}.
                        </p>

                        <Link
                            href="/reservation"
                            className="btn-gold mt-8 inline-flex items-center justify-center gap-2 no-underline"
                        >
                            Reservar ahora
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}