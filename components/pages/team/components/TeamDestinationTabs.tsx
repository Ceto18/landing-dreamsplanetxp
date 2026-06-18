'use client'

import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    destinations: string[]
    activeDestination: string
    onDestinationChange: (destination: string) => void
}

export function TeamDestinationTabs({
    destinations,
    activeDestination,
    onDestinationChange,
}: Props) {
    return (
        <FadeUp delay={0.15} className="mb-10 flex justify-center">
            <div className="flex max-w-5xl flex-wrap justify-center gap-3">
                {destinations.map((destination) => (
                    <button
                        key={destination}
                        type="button"
                        onClick={() => onDestinationChange(destination)}
                        className={`rounded-full border px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300 ${
                            activeDestination === destination
                                ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                        }`}
                    >
                        {destination}
                    </button>
                ))}
            </div>
        </FadeUp>
    )
}