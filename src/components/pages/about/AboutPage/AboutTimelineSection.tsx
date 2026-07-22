import { SectionHeader } from '@/components/animations/section-header'

import type { CompanyTimeline } from '@/types/home'

import { AboutTimelineItem } from './AboutTimelineItem'

type Props = {
    timeline: CompanyTimeline[]
}

export function AboutTimelineSection({
    timeline,
}: Props) {
    if (timeline.length === 0) {
        return null
    }

    return (
        <section className="relative overflow-hidden py-20">
            <div className="absolute right-0 top-20 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-20 left-0 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Nuestra Cronología"
                    description="Un camino de experiencias, aprendizajes y momentos que han construido la esencia de DreamsPlanetXP."
                />

                <div className="relative mt-20">
                    {/* Línea central desktop */}
                    <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent lg:block" />

                    {/* Línea móvil */}
                    <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent lg:hidden" />

                    <div className="space-y-16 lg:space-y-24">
                        {timeline.map((item, index) => (
                            <AboutTimelineItem
                                key={`${item.stage}-${item.event_date}-${item.title}`}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}