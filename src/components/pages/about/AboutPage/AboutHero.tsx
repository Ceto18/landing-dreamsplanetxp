import type { AboutStat } from './AboutPageStats'

import { SectionHeader } from '@/components/animations/section-header'
import { AboutPageStats } from './AboutPageStats'

type Props = {
    subtitle: string
    stats: AboutStat[]
}

export function AboutHero({
    subtitle,
    stats,
}: Props) {
    return (
        <section className="relative overflow-hidden pb-16 pt-28">
            <div className="absolute right-0 top-24 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Quiénes Somos"
                    description={subtitle}
                />

                <AboutPageStats stats={stats} />
            </div>
        </section>
    )
}