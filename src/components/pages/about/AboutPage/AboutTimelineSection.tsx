'use client'

import { SectionHeader } from '@/components/animations/section-header'
import { AboutTimelineItem } from './AboutTimelineItem'

type TimelineItem = {
    id: string | number
    year: string
    title: string
    description: string
    image: string
}

type Props = {
    timeline: TimelineItem[]
}

export function AboutTimelineSection({ timeline }: Props) {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Nuestra Cronología"
                    description="Un camino de experiencias, aprendizajes y momentos que han construido la esencia de DreamsPlanetXP."
                />

                <div className="relative mt-20">
                    {/* Línea central desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />

                    {/* Línea móvil */}
                    <div className="lg:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" />

                    <div className="space-y-16 lg:space-y-24">
                        {timeline.map((item, idx) => (
                            <AboutTimelineItem
                                key={item.id}
                                item={item}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}