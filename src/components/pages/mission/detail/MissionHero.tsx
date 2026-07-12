'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import type { MissionExperienceDetail } from '@/services/missionService'

type Props = {
    mission: MissionExperienceDetail
}

function formatCountry(country?: string | null) {
    if (!country) return 'Experiencia'

    return country.charAt(0).toUpperCase() + country.slice(1)
}

export function MissionHero({ mission }: Props) {
    const heroImage =
        mission.images?.[0]?.image ||
        mission.mission?.image ||
        '/mission-placeholder.jpg'

    const destination = formatCountry(mission.mission?.country)

    const subtitle =
        mission.subtitle ||
        mission.short_description ||
        'Una experiencia diseñada para vivir una misión inolvidable.'

    return (
        <section className="relative flex min-h-[85vh] items-center overflow-hidden pb-20 pt-32">
            {/* BACKGROUND IMAGE */}
            <Image
                src={heroImage}
                alt={mission.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/0" />

            {/* CONTENT */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    {/* DESTINO */}
                    <FadeUp delay={0.08}>
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
                            {destination}
                        </p>
                    </FadeUp>

                    {/* TITULO */}
                    <FadeUp delay={0.16}>
                        <h1 className="mt-5 text-5xl font-bold leading-tight text-foreground sm:text-7xl">
                            {mission.name}
                        </h1>
                    </FadeUp>

                    {/* SUBTITULO */}
                    <FadeUp delay={0.24}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            {subtitle}
                        </p>
                    </FadeUp>

                    {/* BOTONES */}
                    <FadeUp delay={0.32}>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            <Link
                                href="/#contacto"
                                className="btn-gold inline-flex items-center gap-2 no-underline"
                            >
                                Solicitar información
                                <ArrowRight className="h-5 w-5" />
                            </Link>

                            <Link
                                href="/mission"
                                className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-6 py-2.5 font-semibold text-accent no-underline transition-all hover:bg-accent/10"
                            >
                                Ver otras misiones
                            </Link>

                            {mission.file && (
                                <Link
                                    href={mission.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-2.5 font-semibold text-accent no-underline transition-all hover:bg-accent/10"
                                >
                                    <Download className="h-5 w-5" />
                                    Descargar Itinerario
                                </Link>
                            )}
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    )
}