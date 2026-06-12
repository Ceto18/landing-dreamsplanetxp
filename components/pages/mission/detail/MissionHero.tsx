'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import type { Mission } from '@/data/missions'
import { FadeUp } from '@/components/animations/fade-up'

export function MissionHero({ mission }: { mission: Mission }) {
    return (
        <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-20 flex items-center">

            {/* BACKGROUND IMAGE */}
            <Image
                src={mission.heroImage}
                alt={mission.name}
                fill
                priority
                className="object-cover"
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/0" />

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="max-w-3xl">

                    {/* DESTINO */}
                    <FadeUp delay={0.08}>
                        <p className="text-accent text-sm font-semibold uppercase tracking-[0.35em]">
                            {mission.destination}
                        </p>
                    </FadeUp>

                    {/* TITULO */}
                    <FadeUp delay={0.16}>
                        <h1 className="mt-5 text-5xl sm:text-7xl font-bold text-foreground leading-tight">
                            {mission.name}
                        </h1>
                    </FadeUp>

                    {/* SUBTITULO */}
                    <FadeUp delay={0.24}>
                        <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            {mission.subtitle}
                        </p>
                    </FadeUp>

                    {/* BOTONES */}
                    <FadeUp delay={0.32}>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">

                            {/* CTA PRINCIPAL */}
                            <Link
                                href="/#contacto"
                                className="btn-gold inline-flex items-center gap-2"
                            >
                                Solicitar información
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            {/* SECUNDARIO */}
                            <Link
                                href="/mission"
                                className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-6 py-2.5 text-accent font-semibold hover:bg-accent/10 transition-all"
                            >
                                Ver otras misiones
                            </Link>

                            {/* PDF DOWNLOAD (VISIBLE + PRO) */}
                            {mission.pdfUrl && (
                                <Link
                                    href={mission.pdfUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-2.5 text-accent font-semibold hover:bg-accent/10 transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Descargar PDF
                                </Link>
                            )}

                        </div>
                    </FadeUp>

                </div>
            </div>
        </section>
    )
}