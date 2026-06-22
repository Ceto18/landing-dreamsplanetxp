'use client'

import Link from 'next/link'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { TeamMember } from '@/data/team'

type Props = {
    member: TeamMember
    delay?: number
}

export function TeamCard({ member, delay = 0 }: Props) {
    return (
        <FadeUp delay={delay}>
            <Link
                href={
                    member.role === 'Influencer'
                        ? `/team/influencer/${member.slug}`
                        : `/team/staff/${member.slug}`
                }
            >
                <AnimatedCard className="group space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl">
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden rounded-xl border border-border/50">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                            {member.role}
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">
                                {member.name}
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

                            {member.languages && (
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