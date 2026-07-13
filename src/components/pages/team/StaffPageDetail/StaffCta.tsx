import Link from 'next/link'
import { Star } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

export function StaffCta() {
    return (
        <section className="border-t border-border/50 bg-secondary/30 py-20">
            <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="rounded-3xl border border-border/60 bg-card/50 p-8 shadow-2xl transition-all sm:p-12">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                            <Star className="h-8 w-8 text-accent" />
                        </div>

                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                            Conoce a todo nuestro equipo
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                            Explora nuestras misiones y descubre a las
                            personas que hacen posible cada experiencia.
                        </p>

                        <Link
                            href="/team"
                            className="btn-gold mt-8 inline-flex items-center justify-center gap-2 no-underline"
                        >
                            Ver todo el equipo
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}