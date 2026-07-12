'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
    categories: string[]
    activeCategory: string
    onChange: (category: string) => void
}

export function MomentsFilters({
    categories,
    activeCategory,
    onChange,
}: Props) {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    if (categories.length === 0) return null

    const handleScrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -260,
            behavior: 'smooth',
        })
    }

    const handleScrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 260,
            behavior: 'smooth',
        })
    }

    return (
        <section className="relative z-20 border-y border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
                <div className="relative flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleScrollLeft}
                        aria-label="Desplazar tabs a la izquierda"
                        className="z-20 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm transition hover:border-accent hover:text-accent md:inline-flex"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="relative min-w-0 flex-1">
                        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
                        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />

                        <div
                            ref={scrollRef}
                            className="scrollbar-hide flex w-full flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth px-1"
                        >
                            {categories.map((category) => {
                                const isActive = category === activeCategory

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => onChange(category)}
                                        className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                            isActive
                                                ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                                : 'border-border/70 bg-card/40 text-muted-foreground hover:border-accent/70 hover:text-accent'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleScrollRight}
                        aria-label="Desplazar tabs a la derecha"
                        className="z-20 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm transition hover:border-accent hover:text-accent md:inline-flex"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}