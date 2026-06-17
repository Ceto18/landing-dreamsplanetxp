import { FadeUp } from '@/components/animations/fade-up'

export function MomentsFilters({
    active,
    onChange,
}: {
    active: string
    onChange: (v: string) => void
}) {
    const categories = ['Todos', 'Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

    return (
        <section className="py-8 bg-secondary/30 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4">

                <FadeUp>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onChange(cat)}
                                className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                                    active === cat
                                        ? 'bg-accent text-background border-accent'
                                        : 'border-accent/50 hover:bg-accent/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </FadeUp>

            </div>
        </section>
    )
}