'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

export function MomentCTA() {
    return (
        <section className="py-20 bg-secondary/30 border-t border-border/50">

            <div className="max-w-5xl mx-auto px-4 text-center">

                <FadeUp>
                    <div className="p-10 rounded-3xl border border-border/60 bg-card/50">

                        <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />

                        <h2 className="text-3xl font-bold mb-4">
                            ¿Quieres vivir algo similar?
                        </h2>

                        <p className="text-muted-foreground mb-8">
                            Explora nuestras misiones y crea tus propios recuerdos.
                        </p>

                        <Link
                            href="/#contacto"
                            className="btn-gold inline-flex items-center gap-2 no-underline"
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