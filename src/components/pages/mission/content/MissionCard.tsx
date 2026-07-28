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
import type { MissionExperienceCard } from '@/services/missionService'

type Props = {
    experience: MissionExperienceCard
}

function formatDate(value?: string | null): string {
    if (!value) return 'Próximamente'

    const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/

    const normalizedValue = dateOnlyPattern.test(value)
        ? `${value}T00:00:00Z`
        : value

    const parsedDate = new Date(normalizedValue)

    if (Number.isNaN(parsedDate.getTime())) {
        console.warn('MissionCard recibió una fecha inválida:', value)
        return 'Próximamente'
    }

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(parsedDate)
}

function formatCurrency(value?: number | null) {
    if (!value) return 'Consultar'

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value)
}

export function MissionCard({ experience }: Props) {
    const detailSlug = experience.slug

    const image =
        experience.first_image?.image_url || '/mission-placeholder.jpg'

    const subtitle =
        experience.short_description ||
        'Una experiencia diseñada para vivir una misión inolvidable.'

    const releaseDate = formatDate(experience.release_date)

    const group = experience.number_seats
        ? `${experience.seats_used ?? 0}/${experience.number_seats} cupos`
        : 'Cupos limitados'

    const duration =
        experience.days && experience.nights
            ? `${experience.days} días / ${experience.nights} noches`
            : 'Duración por confirmar'

    const rating = experience.raiting || 'Nuevo'

    const highlights = experience.features ?? []

    const price = formatCurrency(experience.investment)

    const detailHref = `/mission/${detailSlug}`

    return (
        <AnimatedCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500">
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
                <Link href={detailHref}>
                    <Image
                        src={image}
                        alt={experience.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* TITLE OVERLAY */}
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                        Experiencia
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {experience.name}
                    </h3>
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

                    <Link
                        href={detailHref}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent text-accent px-4 py-2 text-sm font-semibold hover:bg-accent/10 transition-all no-underline group/link"
                    >
                        Ver detalle
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </div>
        </AnimatedCard>
    )
}