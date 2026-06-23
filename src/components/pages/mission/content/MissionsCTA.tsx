'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

export function MissionsCTA() {
    return (
        <section className="relative py-16 bg-secondary/30 border-t border-border/50 overflow-hidden">
            {/* GLOW DECORATIVO */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <FadeUp>
                    <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-10 sm:p-12 shadow-2xl">
                        {/* ICONO */}
                        <div className="flex justify-center mb-6">
                            <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                <Sparkles className="w-7 h-7 text-accent" />
                            </div>
                        </div>

                        {/* TITLE */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            ¿No sabes qué misión elegir?
                        </h2>

                        {/* SUBTITLE */}
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                            Te ayudamos a elegir la experiencia ideal según tu estilo, fechas y presupuesto.
                        </p>

                        {/* CTA BUTTON */}
                        <Link
                            href="/#contacto"
                            className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                        >
                            Solicitar asesoría
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}