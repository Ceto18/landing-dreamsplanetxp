'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

export function MomentsCTA() {
    return (
        <section className="py-16 bg-secondary/30 border-t border-border/50">

            <div className="max-w-5xl mx-auto px-4 text-center">

                <FadeUp>
                    <div className="p-10 rounded-3xl border bg-card/40">

                        <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />

                        <h2 className="text-3xl font-bold mb-4">
                            ¿Quieres vivir tu propio momento?
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            Explora misiones y crea recuerdos únicos.
                        </p>

                        <Link
                            href="/mission"
                            className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-lg"
                        >
                            Ver misiones
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                    </div>
                </FadeUp>

            </div>
        </section>
    )
}