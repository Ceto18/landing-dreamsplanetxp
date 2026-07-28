'use client'

import Link from 'next/link'

import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'

import type { TeamPerson } from '@/services/teamService'

type Props = {
    member: TeamPerson
    delay?: number
}

function getTeamMemberHref(member: TeamPerson) {
    if (member.role === 'influencer') {
        return `/team/influencer/${member.slug}`
    }

    return `/team/staff/${member.slug}`
}

function getRoleLabel(role: string) {
    const labels: Record<string, string> = {
        influencer: 'Influencer',
        coordinator: 'Coordinador',
        contributor: 'Colaborador',
    }

    return labels[role] ?? role
}

export function TeamCard({
    member,
    delay = 0,
}: Props) {
    const roleLabel = getRoleLabel(member.role)

    return (
        <FadeUp delay={delay}>
            <Link
                href={getTeamMemberHref(member)}
                className="block h-full"
            >
                <AnimatedCard className="group h-full space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl">
                    {/* Imagen cuadrada para respetar el recorte */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border/50 bg-muted">
                        {member.photo_url ? (
                            <img
                                src={member.photo_url}
                                alt={member.fullname}
                                loading="lazy"
                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                                Sin fotografía
                            </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                        <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 bg-background/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                            {roleLabel}
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">
                                {member.fullname}
                            </h3>

                            {member.specialty && (
                                <p className="text-sm font-semibold text-accent">
                                    {member.specialty}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3 border-t border-border/60 pt-4 text-sm">
                            {member.experience && (
                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Experiencia
                                    </p>

                                    <p className="font-medium text-foreground">
                                        {member.experience}
                                    </p>
                                </div>
                            )}

                            {Array.isArray(member.languages) &&
                                member.languages.length > 0 && (
                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                            Idiomas
                                        </p>

                                        <p className="font-medium text-foreground">
                                            {member.languages.join(', ')}
                                        </p>
                                    </div>
                                )}

                            {member.specialty && (
                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Especialidad
                                    </p>

                                    <p className="font-medium text-foreground">
                                        {member.specialty}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedCard>
            </Link>
        </FadeUp>
    )
}