'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Star,
    ShieldCheck,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import type { MissionItem } from '@/services/missionService'

type MissionCardItem = MissionItem & {
    country: string
}

type Props = {
    mission: MissionCardItem
}

function formatDate(date?: string | null) {
    if (!date) return 'Próximamente'

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`))
}

function formatCurrency(value?: number | null) {
    if (!value) return 'Consultar'

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value)
}

export function MissionCard({ mission }: Props) {
    const firstExperience = mission.experiences?.[0]

    const detailSlug = firstExperience?.slug

    const image =
        mission.image_url ||
        firstExperience?.images?.[0]?.image_url ||
        '/mission-placeholder.jpg'

    const subtitle =
        firstExperience?.subtitle ||
        firstExperience?.short_description ||
        'Una experiencia diseñada para vivir una misión inolvidable.'

    const releaseDate = formatDate(firstExperience?.release_date)

    const group = firstExperience?.number_seats
        ? `${firstExperience.seats_used ?? 0}/${firstExperience.number_seats} cupos`
        : 'Cupos limitados'

    const duration =
        firstExperience?.days && firstExperience?.nights
            ? `${firstExperience.days} días / ${firstExperience.nights} noches`
            : 'Duración por confirmar'

    const rating = firstExperience?.raiting || 'Nuevo'

    const highlights = firstExperience?.features ?? []

    const price = formatCurrency(firstExperience?.investment)

    const detailHref = detailSlug ? `/mission/${detailSlug}` : '#'

    return (
        <AnimatedCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500">
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
                {detailSlug ? (
                    <Link href={detailHref}>
                        <Image
                            src={image}
                            alt={mission.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </Link>
                ) : (
                    <Image
                        src={image}
                        alt={mission.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* TITLE OVERLAY */}
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                        {mission.country}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {firstExperience?.name || mission.name}
                    </h3>

                    {firstExperience?.name && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                            {mission.name}
                        </p>
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {subtitle}
                </p>

                {/* INFO GRID */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-border/60 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <CalendarDays className="w-4 h-4" />
                            <span className="font-semibold">Salida</span>
                        </div>

                        <p className="text-muted-foreground text-xs">
                            {releaseDate}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border/60 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold">Grupo</span>
                        </div>

                        <p className="text-muted-foreground text-xs">
                            {group}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border/60 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-semibold">Duración</span>
                        </div>

                        <p className="text-muted-foreground text-xs">
                            {duration}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border/60 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <Star className="w-4 h-4 fill-accent" />
                            <span className="font-semibold">Rating</span>
                        </div>

                        <p className="text-muted-foreground text-xs">
                            {rating}
                        </p>
                    </div>
                </div>

                {/* HIGHLIGHTS */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Incluye
                    </p>

                    {highlights.length > 0 ? (
                        highlights.slice(0, 3).map((highlight) => (
                            <div
                                key={highlight}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="line-clamp-1">
                                    {highlight}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Información disponible pronto.
                        </p>
                    )}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            Inversión
                        </p>

                        <p className="text-lg font-bold text-accent">
                            {price}
                        </p>
                    </div>

                    {detailSlug ? (
                        <Link
                            href={detailHref}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent text-accent px-4 py-2 text-sm font-semibold hover:bg-accent/10 transition-all no-underline group/link"
                        >
                            Ver detalle
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border/60 text-muted-foreground px-4 py-2 text-sm font-semibold opacity-60"
                        >
                            Próximamente
                        </button>
                    )}
                </div>
            </div>
        </AnimatedCard>
    )
}