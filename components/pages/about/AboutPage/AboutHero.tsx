'use client'

import { SectionHeader } from '@/components/animations/section-header'
import { AboutPageStats } from './AboutPageStats'

type Stat = {
    label: string
    value: string | number
}

type Props = {
    stats: Stat[]
}

export function AboutHero({ stats }: Props) {
    return (
        <section className="relative overflow-hidden pt-28 pb-16">
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Quiénes Somos"
                    description="Creamos experiencias de viaje premium para personas que buscan descubrir el mundo con seguridad, autenticidad y propósito."
                />

                <AboutPageStats stats={stats} />
            </div>
        </section>
    )
}