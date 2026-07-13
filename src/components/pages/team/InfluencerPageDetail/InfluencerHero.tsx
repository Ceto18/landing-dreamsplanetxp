import {
    User,
    Globe,
    Briefcase,
    BookOpen,
    type LucideIcon,
} from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'

import type { TeamPersonDetail } from '@/services/teamService'

type MemberProps = {
    member: TeamPersonDetail
}

type BiographyProps = {
    fullname: string
    bio: string | null
}

type InfoItem = {
    label: string
    value: string
    icon: LucideIcon
}

export function InfluencerHero({ member }: MemberProps) {
    return (
        <section className="relative pb-20 pt-36">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
                <FadeUp>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl" />

                        <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-2xl sm:h-80 sm:w-80">
                            {member.photo_url ? (
                                <img
                                    src={member.photo_url}
                                    alt={member.fullname}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                                    Sin fotografía disponible
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                        </div>
                    </div>
                </FadeUp>

                <FadeUp delay={0.08}>
                    <div className="max-w-2xl text-center lg:text-left">
                        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                            Influencer
                        </span>

                        <h1 className="mt-5 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {member.fullname}
                        </h1>

                        {member.specialty && (
                            <p className="mt-4 text-xl font-semibold text-accent">
                                {member.specialty}
                            </p>
                        )}

                        {member.bio && (
                            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                                {member.bio}
                            </p>
                        )}
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}

export function InfluencerInfo({ member }: MemberProps) {
    const infoItems: InfoItem[] = [
        {
            label: 'Rol',
            value: 'Influencer',
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

export function InfluencerBiography({
    fullname,
    bio,
}: BiographyProps) {
    return (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="rounded-3xl border border-border/60 bg-card/40 p-8 text-center shadow-lg sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Sobre mí
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Biografía
                    </h2>

                    <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                        {bio ||
                            `Estamos preparando más información sobre la trayectoria y experiencia de ${fullname}.`}
                    </p>
                </div>
            </FadeUp>
        </section>
    )
}