'use client'

import Link from 'next/link'
import type { Mission } from '@/data/missions'
import { FadeUp } from '@/components/animations/fade-up'
import { Sparkles, ArrowRight } from 'lucide-react'

export function MissionCTA({ mission }: { mission: Mission }) {
    return (
        <section className="relative py-20 bg-secondary/30 border-t border-border/50">

            <div className="max-w-5xl mx-auto px-4 text-center">

                <FadeUp>

                    <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-12 shadow-2xl">

                        <div className="flex justify-center mb-5">
                            <div className="w-16 h-16 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-accent" />
                            </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            ¿Listo para vivir {mission.destination}?
                        </h2>

                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                            Escríbenos y recibe asesoría personalizada.
                        </p>

                        <Link
                            href="/#contacto"
                            className="btn-gold inline-flex items-center gap-2"
                        >
                            Solicitar información
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                    </div>

                </FadeUp>

            </div>

        </section>
    )
}