import { FadeUp } from '@/components/animations/fade-up'

export function DestinationTabs({
    destinations,
    active,
    onChange,
}: {
    destinations: string[]
    active: string
    onChange: (d: string) => void
}) {
    return (
        <FadeUp delay={0.15} className="mb-12 flex justify-center">
            <div className="flex max-w-4xl flex-wrap justify-center gap-3">
                {destinations.map((destination, idx) => (
                    <button
                        key={destination}
                        type="button"
                        onClick={() => onChange(destination)}
                        className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap border transition-all duration-300 ${
                            active === destination
                                ? 'bg-accent text-background border-accent shadow-lg shadow-accent/20'
                                : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                        }`}
                        style={{
                            transitionDelay: `${idx * 20}ms`,
                        }}
                    >
                        {destination}
                    </button>
                ))}
            </div>
        </FadeUp>
    )
}