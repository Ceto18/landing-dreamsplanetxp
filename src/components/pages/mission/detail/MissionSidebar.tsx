'use client'

import Link from 'next/link'
import type { MissionExperienceDetail } from '@/services/missionService'
import { AnimatedCard } from '@/components/animations/animated-card'
import {
    MapPin,
    Mountain,
    Users,
    CheckCircle,
    CalendarDays,
    Star,
    Tag,
} from 'lucide-react'

type Props = {
    mission: MissionExperienceDetail
}

function formatCurrency(value?: number | null) {
    if (value === undefined || value === null) return 'Consultar'

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value)
}

function formatDate(value?: string | null): string {
    if (!value) return 'Próximamente'

    const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? `${value}T00:00:00Z`
        : value

    const date = new Date(normalizedValue)

    if (Number.isNaN(date.getTime())) return 'Próximamente'

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(date)
}

function formatCountry(country?: string | null) {
    if (!country) return 'Destino por confirmar'

    return country.charAt(0).toUpperCase() + country.slice(1)
}

export function MissionSidebar({ mission }: Props) {
    const investment = Number(mission.investment ?? 0)
    const discount = Number(mission.discount ?? 0)
    const investmentFinal = Number(
        mission.investment_final ?? investment
    )

    const hasDiscount =
        discount > 0 &&
        investmentFinal > 0 &&
        investmentFinal < investment

    const destination = formatCountry(mission.mission?.country)

    const duration =
        mission.days && mission.nights
            ? `${mission.days} días / ${mission.nights} noches`
            : 'Duración por confirmar'

    const availableSeats = Math.max(
        (mission.number_seats ?? 0) -
            (mission.seats_used ?? 0),
        0
    )

    const seats = mission.number_seats
        ? `${availableSeats} cupos disponibles`
        : 'Cupos limitados'

    const releaseDate = formatDate(mission.release_date)
    const rating = mission.raiting || 'Nuevo'
    const features = [...new Set(mission.features ?? [])]

    return (
        <aside className="space-y-6">
            <AnimatedCard className="sticky top-28 space-y-6 rounded-2xl border border-border/60 bg-card/50 p-6 glass-effect shadow-2xl">
                <div
                    className={`rounded-2xl border p-4 ${
                        hasDiscount
                            ? 'border-accent/30 bg-accent/5'
                            : 'border-border/60 bg-background/20'
                    }`}
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Inversión
                    </p>

                    {hasDiscount ? (
                        <div className="mt-2 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground line-through decoration-2">
                                    {formatCurrency(investment)}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                                    <Tag className="h-3 w-3" />
                                    Oferta
                                </span>
                            </div>

                            <p className="text-3xl font-black tracking-tight text-accent">
                                {formatCurrency(investmentFinal)}
                            </p>

                            <p className="text-sm font-medium text-muted-foreground">
                                Ahorras {formatCurrency(discount)}
                            </p>
                        </div>
                    ) : (
                        <p className="mt-2 text-3xl font-black tracking-tight text-accent">
                            {formatCurrency(investment)}
                        </p>
                    )}
                </div>

                <div className="h-px bg-border/70" />

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">
                            {destination}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">
                            Salida: {releaseDate}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mountain className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">
                            Duración: {duration}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-muted-foreground">
                            {seats}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 shrink-0 fill-accent text-accent" />
                        <span className="text-muted-foreground">
                            Rating: {rating}
                        </span>
                    </div>
                </div>

                <div className="h-px bg-border/70" />

                <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                        Incluye:
                    </p>

                    {features.length ? (
                        features.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                                <span>{item}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Información disponible pronto.
                        </p>
                    )}
                </div>

                <Link
                    href="/#contact"
                    className="btn-gold inline-flex w-full items-center justify-center gap-2 no-underline"
                >
                    Reservar ruta
                </Link>
            </AnimatedCard>
        </aside>
    )
}