'use client'

import { SectionHeader } from '@/components/animations/section-header'
import { MissionCarousel } from './MissionCarousel'
import { MissionBenefits } from './MissionBenefits'

import type { HomeMission } from '@/types/home'

type Props = {
    missions: HomeMission[]
}

export function Mission({ missions }: Props) {
    return (
        <section id="misiones" className="relative py-20 sm:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Misiones"
                    description="Explora nuestras expediciones exclusivas diseñadas para viajeros que buscan experiencias transformadoras."
                />

                <MissionCarousel missions={missions} />

                <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-12" />

                <MissionBenefits />
            </div>
        </section>
    )
}