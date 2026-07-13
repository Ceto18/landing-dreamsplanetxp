'use client'

import { FadeUp } from '@/components/animations/fade-up'
import { HomeVisibleMissionTab } from '@/types/home'

type Props = {
    destinations: HomeVisibleMissionTab[]
    activeDestination: string
    onDestinationChange: (missionSlug: string) => void
}

export function TeamDestinationTabs({
    destinations,
    activeDestination,
    onDestinationChange,
}: Props) {
    if (destinations.length === 0) {
        return null
    }

    return (
        <FadeUp delay={0.15} className="mb-10 flex justify-center">
            <div className="flex max-w-5xl flex-wrap justify-center gap-3">
                {destinations.map((destination) => {
                    const isActive =
                        activeDestination === destination.slug

                    return (
                        <button
                            key={destination.slug}
                            type="button"
                            onClick={() =>
                                onDestinationChange(destination.slug)
                            }
                            className={`rounded-full border px-6 py-3 font-semibold capitalize whitespace-nowrap transition-all duration-300 ${
                                isActive
                                    ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                    : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                            }`}
                        >
                            {destination.country}
                        </button>
                    )
                })}
            </div>
        </FadeUp>
    )
}