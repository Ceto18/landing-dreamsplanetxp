import Link from 'next/link'
import { ArrowLeft, Camera } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'

export function MomentsHero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16">
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <FadeUp>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-10 no-underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al inicio
                    </Link>
                </FadeUp>

                <SectionHeader
                    title="Todos los Momentos"
                    description="Una galería de experiencias reales, destinos memorables y recuerdos capturados durante nuestras misiones."
                />

                <FadeUp delay={0.2}>
                    <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/40 glass-effect p-6 text-center shadow-xl">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                            <Camera className="w-6 h-6 text-accent" />
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            Recuerdos que cuentan historias
                        </h2>

                        <p className="text-muted-foreground">
                            Cada imagen representa una experiencia y emoción única.
                        </p>
                    </div>
                </FadeUp>

            </div>
        </section>
    )
}