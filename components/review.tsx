'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'

const reviews = [
    {
        id: 1,
        quote: 'Una experiencia que transformó mi forma de viajar. Cada detalle fue perfecto.',
        traveler: 'María González',
        mission: 'Marruecos',
        rating: 5,
        title: 'Increíble',
    },
    {
        id: 2,
        quote: 'Los guías fueron excepcionales, la comida deliciosa, y los momentos inolvidables.',
        traveler: 'Carlos Rodríguez',
        mission: 'Vietnam',
        rating: 5,
        title: 'Recomendado',
    },
    {
        id: 3,
        quote: 'Superó todas mis expectativas. Volvería en un segundo.',
        traveler: 'Ana Martínez',
        mission: 'Tailandia',
        rating: 5,
        title: 'Perfecto',
    },
    {
        id: 4,
        quote: 'La mejor inversión que he hecho en mi vida. Gracias por todo.',
        traveler: 'Juan Pérez',
        mission: 'Japón',
        rating: 5,
        title: 'Vida Cambiada',
    },
    {
        id: 5,
        quote: 'Profesionalismo, seguridad y diversión garantizados en cada paso del camino.',
        traveler: 'Isabel Sánchez',
        mission: 'Nepal',
        rating: 5,
        title: 'Excelencia',
    },
]

const metrics = [
    { label: 'Viajeros Satisfechos', value: '500+' },
    { label: 'Destinos Explorados', value: '6' },
    { label: 'Calificación Promedio', value: '4.9★' },
    { label: 'Años de Experiencia', value: '5' },
]

export function Review() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (!autoScroll) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [autoScroll])

    const handlePrev = () => {
        setAutoScroll(false)
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    const handleNext = () => {
        setAutoScroll(false)
        setActiveIndex((prev) => (prev + 1) % reviews.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    const review = reviews[activeIndex]

    return (
        <section id="resenas" className="relative py-24 bg-secondary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 space-y-6 text-center">
                    <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
                        Reseñas
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    </div>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Historias reales de viajeros que vivieron experiencias únicas, auténticas e inolvidables.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Reviews */}
                    <div className="space-y-8">
                        <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            Lo que dicen nuestros viajeros
                        </div>

                        {/* Main Review */}
                        <div className="rounded-2xl border border-border/60 bg-card/40 p-7 shadow-lg glass-effect space-y-8">
                            <div className="space-y-3">
                                <p className="text-accent text-sm font-semibold uppercase tracking-[0.25em]">
                                    {review.title}
                                </p>

                                <p className="text-xl sm:text-2xl text-foreground leading-relaxed italic">
                                    &quot;{review.quote}&quot;
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-accent text-accent"
                                    />
                                ))}
                            </div>

                            {/* Traveler Info */}
                            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5">
                                <div className="space-y-1">
                                    <p className="font-semibold text-foreground">
                                        {review.traveler}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Misión {review.mission}
                                    </p>
                                </div>

                                <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                    {activeIndex + 1}/{reviews.length}
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Reseña anterior"
                            >
                                <ChevronLeft className="w-5 h-5 text-accent" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Siguiente reseña"
                            >
                                <ChevronRight className="w-5 h-5 text-accent" />
                            </button>

                            <div className="ml-auto flex gap-1">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setAutoScroll(false)
                                            setActiveIndex(idx)
                                            setTimeout(() => setAutoScroll(true), 5000)
                                        }}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === activeIndex
                                                ? 'bg-accent w-8'
                                                : 'bg-accent/30 w-2'
                                        }`}
                                        aria-label={`Ver reseña ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="button"
                            className="px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
                        >
                            Ver todas las reseñas
                        </button>
                    </div>

                    {/* Right - Video Mockup & Metrics */}
                    <div className="space-y-8">
                        {/* Video Mockup */}
                        <div className="relative max-w-sm mx-auto">
                            <div
                                className="relative bg-black rounded-3xl p-3 shadow-2xl mx-auto border border-accent/20"
                                style={{ width: '280px' }}
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />

                                {/* Screen */}
                                <div className="relative bg-foreground/5 rounded-2xl h-96 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background/20 to-background/80" />

                                    <button
                                        type="button"
                                        className="relative z-10 w-20 h-20 rounded-full border border-accent/40 bg-accent/15 flex items-center justify-center hover:bg-accent/25 transition-colors"
                                        aria-label="Reproducir video"
                                    >
                                        <Play className="w-10 h-10 text-accent fill-accent" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {metrics.map((metric, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-xl border border-border/60 bg-card/40 hover:border-accent/60 hover:bg-card/70 transition-all shadow-lg"
                                >
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {metric.label}
                                    </p>
                                    <p className="text-3xl font-bold text-accent">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}