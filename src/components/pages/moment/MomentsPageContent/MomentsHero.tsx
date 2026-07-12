'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Camera } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'

export function MomentsHero() {
    const params = useParams()

    const routeMissionSlug = params?.missionSlug ?? params?.slug

    const missionSlug = Array.isArray(routeMissionSlug)
        ? routeMissionSlug[0]
        : routeMissionSlug

    const backHref = missionSlug ? `/mission/${missionSlug}` : '/mission'

    return (
        <section className="relative overflow-hidden pt-32 pb-16">
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionHeader
                    title="Momentos de la misión"
                    description="Explora los momentos especiales de esta misión, sus lugares, sensaciones y experiencias memorables."
                />

                <FadeUp delay={0.2}>
                    <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/40 glass-effect p-6 text-center shadow-xl">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                            <Camera className="w-6 h-6 text-accent" />
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            Descubre los momentos que puedes vivir
                        </h2>

                        <p className="text-muted-foreground">
                            Cada momento representa una escena única del viaje:
                            lugares, emociones y recuerdos diseñados para
                            conectar con el destino.
                        </p>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}