import {
    CalendarDays,
    Compass,
    Star,
    Users,
    type LucideIcon,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import { companyService } from '@/services/companyService'

type Stat = {
    label: string
    value: string
    icon: LucideIcon
}

export async function AboutStats() {
    const company = await companyService.getCompanyHome()

    const stats: Stat[] = [
        {
            label: 'Viajeros satisfechos',
            value: `+${company.satisfied_travelers}`,
            icon: Users,
        },
        {
            label: 'Destinos explorados',
            value: `+${company.destinations_explored}`,
            icon: Compass,
        },
        {
            label: 'Valoración promedio',
            value: company.average_rating.toFixed(1),
            icon: Star,
        },
        {
            label: 'Años de experiencia',
            value: `+${company.years_of_experience}`,
            icon: CalendarDays,
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((stat, index) => {
                const Icon = stat.icon

                return (
                    <AnimatedCard
                        key={stat.label}
                        delay={index * 0.08}
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:bg-card/70 hover:shadow-xl"
                    >
                        {/* Fondo decorativo */}
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-accent/20" />

                        <div className="relative z-10 flex items-center gap-4">
                            {/* Icono */}
                            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                                <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-background" />
                            </div>

                            {/* Información */}
                            <div className="min-w-0">
                                <p className="text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-sm font-medium leading-snug text-muted-foreground">
                                    {stat.label}
                                </p>
                            </div>
                        </div>

                        {/* Línea decorativa */}
                        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </AnimatedCard>
                )
            })}
        </div>
    )
}