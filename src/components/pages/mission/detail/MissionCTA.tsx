'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

function formatCountry(country?: string | null) {
    if (!country?.trim()) return 'esta experiencia'

    return country.charAt(0).toUpperCase() + country.slice(1)
}

export function MissionCTA({ mission }: Props) {
    const destination = formatCountry(mission.mission?.country)

    return (
        <section className="relative border-t border-border/50 bg-secondary/30 py-20">
            <div className="mx-auto max-w-5xl px-4 text-center">
                <FadeUp>
                    <div className="rounded-3xl border border-border/60 bg-card/50 p-8 shadow-2xl glass-effect sm:p-12">
                        <div className="mb-5 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                                <Sparkles className="h-8 w-8 text-accent" />
                            </div>
                        </div>

                        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                            ¿Listo para vivir {destination}?
                        </h2>

                        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                            Escríbenos y recibe asesoría personalizada para la
                            experiencia{' '}
                            <span className="font-semibold text-foreground">
                                {mission.name}
                            </span>
                            .
                        </p>

                        <Link
                            href="/#contact"
                            className="btn-gold inline-flex items-center gap-2 no-underline"
                        >
                            Solicitar información
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}