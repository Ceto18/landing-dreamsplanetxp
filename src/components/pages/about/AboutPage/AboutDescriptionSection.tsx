import type { ElementType } from 'react'

import { FadeUp } from '@/components/animations/fade-up'

import { AboutPillarsGrid } from './AboutPillarsGrid'

type Pillar = {
    title: string
    description: string
    icon: ElementType
}

type Props = {
    info: string
    pillars: Pillar[]
}

export function AboutDescriptionSection({
    info,
    pillars,
}: Props) {
    const paragraphs = info
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)

    return (
        <section className="relative overflow-hidden bg-secondary/30 py-16">
            <div className="absolute left-0 top-20 -ml-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-20 right-0 -mr-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
                    <FadeUp delay={0.1}>
                        <div className="space-y-6">
                            <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                Nuestra esencia
                            </div>

                            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                                Viajes diseñados para convertirse en recuerdos.
                            </h2>

                            <div className="space-y-5 leading-relaxed text-muted-foreground">
                                {paragraphs.map((paragraph, index) => (
                                    <p
                                        key={`${index}-${paragraph.slice(0, 30)}`}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    <AboutPillarsGrid pillars={pillars} />
                </div>
            </div>
        </section>
    )
}