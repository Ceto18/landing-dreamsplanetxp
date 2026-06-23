'use client'

import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    categories: string[]
    activeCategory: string
    onChange: (category: string) => void
}

function formatCategoryLabel(category: string) {
    if (!category) return ''

    if (category.toLowerCase() === 'todos') {
        return 'Todos'
    }

    return category.charAt(0).toUpperCase() + category.slice(1)
}

export function MissionsFilters({
    categories,
    activeCategory,
    onChange,
}: Props) {
    const safeCategories = categories.length > 0 ? categories : ['Todos']

    return (
        <section className="relative bg-secondary/30 py-8 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                    <div className="flex flex-wrap justify-center gap-3">
                        {safeCategories.map((category) => {
                            const isActive =
                                activeCategory.toLowerCase() === category.toLowerCase()

                            return (
                                <button
                                    key={category.toLowerCase()}
                                    type="button"
                                    onClick={() => onChange(category)}
                                    className={`
                                        relative px-5 py-2.5 rounded-full text-sm font-semibold
                                        transition-all duration-300 border
                                        ${isActive
                                            ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                            : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                                        }
                                    `}
                                >
                                    {formatCategoryLabel(category)}

                                    {isActive && (
                                        <span className="absolute inset-0 rounded-full bg-accent/10 blur-md -z-10" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}