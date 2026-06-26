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

    const rating = mission.raiting || 'Nuevo'

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
        <section className="relative py-14 bg-secondary/30 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <AnimatedCard
                                key={item.label}
                                delay={index * 0.08}
                                className="rounded-2xl border border-border/60 bg-card/40 p-5 glass-effect"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-accent" />
                                    </div>

                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
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