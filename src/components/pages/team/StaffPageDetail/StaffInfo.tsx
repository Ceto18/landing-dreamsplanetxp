import {
    User,
    Globe,
    Briefcase,
    BookOpen,
    type LucideIcon,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

import type { TeamPersonDetail } from '@/services/teamService'

type Props = {
    member: TeamPersonDetail
    roleLabel: string
}

type InfoItem = {
    label: string
    value: string
    icon: LucideIcon
}

export function StaffInfo({
    member,
    roleLabel,
}: Props) {
    const infoItems: InfoItem[] = [
        {
            label: 'Rol',
            value: roleLabel,
            icon: User,
        },
        {
            label: 'Especialidad',
            value: member.specialty || 'No especificada',
            icon: Globe,
        },
        {
            label: 'Experiencia',
            value: member.experience || 'No especificada',
            icon: Briefcase,
        },
        {
            label: 'Idiomas',
            value:
                member.languages.length > 0
                    ? member.languages.join(', ')
                    : 'No especificados',
            icon: BookOpen,
        },
    ]

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {infoItems.map((item, index) => {
                    const Icon = item.icon

                    return (
                        <AnimatedCard
                            key={item.label}
                            delay={index * 0.08}
                            className="rounded-2xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                                    <Icon className="h-6 w-6 text-accent" />
                                </div>

                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    {item.label}
                                </p>
                            </div>

                            <p className="break-words text-base font-bold text-foreground">
                                {item.value}
                            </p>
                        </AnimatedCard>
                    )
                })}
            </div>
        </section>
    )
}