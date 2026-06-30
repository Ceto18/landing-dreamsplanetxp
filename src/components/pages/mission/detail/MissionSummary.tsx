'use client'

import { CalendarDays, Clock, Users, Star } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

function formatDate(date?: string | null) {
    if (!date) return 'Próximamente'

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`))
}

export function MissionSummary({ mission }: Props) {
    const releaseDate = formatDate(mission.release_date)

    const duration =
        mission.days && mission.nights
            ? `${mission.days} días / ${mission.nights} noches`
            : 'Duración por confirmar'

    const group = mission.number_seats
        ? `${mission.seats_used ?? 0}/${mission.number_seats} cupos`
        : 'Cupos limitados'

    const rating = mission.raiting ? String(mission.raiting) : 'Nuevo'

    const items = [
        {
            label: 'Salida',
            value: releaseDate,
            icon: CalendarDays,
        },
        {
            label: 'Duración',
            value: duration,
            icon: Clock,
        },
        {
            label: 'Grupo',
            value: group,
            icon: Users,
        },
        {
            label: 'Rating',
            value: rating,
            icon: Star,
        },
    ]

    return (
        <section className="relative border-y border-border/50 bg-secondary/30 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {items.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <AnimatedCard
                                key={item.label}
                                delay={index * 0.08}
                                className="rounded-2xl border border-border/60 bg-card/40 p-5 glass-effect"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                                        <Icon className="h-5 w-5 text-accent" />
                                    </div>

                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        {item.label}
                                    </p>
                                </div>

                                <p className="text-lg font-bold text-foreground">
                                    {item.value}
                                </p>
                            </AnimatedCard>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}