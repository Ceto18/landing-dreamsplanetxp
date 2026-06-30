import { FadeUp } from '@/components/animations/fade-up'

type DestinationTabsProps = {
    destinations: string[]
    active: string
    onChange: (destination: string) => void
}

export function DestinationTabs({
    destinations,
    active,
    onChange,
}: DestinationTabsProps) {
    const cleanDestinations = Array.from(
        new Set(destinations.map((destination) => destination.trim()).filter(Boolean))
    )

    if (!cleanDestinations.length) return null

    const currentActive = active || cleanDestinations[0]

    return (
        <FadeUp delay={0.15} className="mb-12 flex justify-center">
            <div className="flex max-w-4xl flex-wrap justify-center gap-3">
                {cleanDestinations.map((destination, idx) => {
                    const isActive = currentActive === destination

                    return (
                        <button
                            key={`${destination}-${idx}`}
                            type="button"
                            onClick={() => onChange(destination)}
                            className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap border capitalize transition-all duration-300 ${
                                isActive
                                    ? 'bg-accent text-background border-accent shadow-lg shadow-accent/20'
                                    : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                            }`}
                            style={{
                                transitionDelay: `${idx * 20}ms`,
                            }}
                        >
                            {destination}
                        </button>
                    )
                })}
            </div>
        </FadeUp>
    )
}