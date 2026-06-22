'use client'

import { Plane } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'

export function MissionsHero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16">

            {/* ambient glow EXACTO del sistema original */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* TITLE SYSTEM */}
                <SectionHeader
                    title="Todas las Misiones"
                    description="Explora nuestras expediciones premium, diseñadas para viajeros que buscan experiencias auténticas, seguras y memorables."
                    className="mb-12"
                />

                {/* HERO CARD */}
                <FadeUp delay={0.2}>
                    <div className="max-w-3xl mx-auto rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-10 text-center shadow-2xl">

                        {/* icon container premium */}
                        <div className="flex justify-center mb-6">
                            <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                <Plane className="w-7 h-7 text-accent" />
                            </div>
                        </div>

                        {/* headline */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                            Elige tu próxima aventura
                        </h2>

                        {/* description */}
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Cada misión incluye acompañamiento, planificación, experiencias seleccionadas
                            y una ruta pensada para disfrutar el destino con comodidad y seguridad.
                        </p>

                    </div>
                </FadeUp>

            </div>
        </section>
    )
}