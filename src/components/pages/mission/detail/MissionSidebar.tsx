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
} from 'lucide-react'

type Props = {
    mission: MissionExperienceDetail
}

function formatCurrency(value?: number | null) {
    if (!value) return 'Consultar'

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

    const parsedDate = new Date(normalizedValue)

    if (Number.isNaN(parsedDate.getTime())) {
        console.warn('MissionSidebar recibió una fecha inválida:', value)
        return 'Próximamente'
    }

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(parsedDate)
}
function formatCountry(country?: string | null) {
    if (!country) return 'Destino por confirmar'

    return country.charAt(0).toUpperCase() + country.slice(1)
}

export function MissionSidebar({ mission }: Props) {
    const price = formatCurrency(mission.investment)

    const destination = formatCountry(mission.mission?.country)

    const duration =
        mission.days && mission.nights
            ? `${mission.days} días / ${mission.nights} noches`
            : 'Duración por confirmar'

    const seats =
        mission.number_seats
            ? `${mission.seats_used ?? 0}/${mission.number_seats} cupos`
            : 'Cupos limitados'

    const releaseDate = formatDate(mission.release_date)

    const rating = mission.raiting || 'Nuevo'

    const features = mission.features ?? []

    return (
        <aside className="space-y-6">
            <AnimatedCard className="sticky top-28 rounded-2xl border border-border/60 bg-card/50 p-6 glass-effect shadow-2xl space-y-6">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Inversión
                    </p>

                    <p className="text-3xl font-bold text-accent">
                        {price}
                    </p>
                </div>

                <div className="h-px bg-border/70" />

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">
                            {destination}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">
                            Salida: {releaseDate}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mountain className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">
                            Duración: {duration}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">
                            {seats}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-accent" />
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

                    {features.length > 0 ? (
                        features.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
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
                    href="/#contacto"
                    className="btn-gold w-full inline-flex items-center justify-center gap-2 no-underline"
                >
                    Reservar experiencia
                </Link>
            </AnimatedCard>
        </aside>
    )
}