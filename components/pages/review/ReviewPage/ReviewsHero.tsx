'use client'

import { SectionHeader } from '@/components/animations/section-header'
import { ReviewsMetrics } from './ReviewsMetrics'

type Metric = {
    label: string
    value: string | number
}

type Props = {
    metrics: Metric[]
}

export function ReviewsHero({ metrics }: Props) {
    return (
        <section className="relative overflow-hidden pt-28 pb-16">
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Reseñas de Viajeros"
                    description="Historias reales de personas que confiaron en Dreams Planet XP para vivir experiencias únicas alrededor del mundo."
                />

                <ReviewsMetrics metrics={metrics} />
            </div>
        </section>
    )
}