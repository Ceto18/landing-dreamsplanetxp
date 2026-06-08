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
        <section id="review" className="py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Reviews */}
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">Lo que dicen nuestros viajeros</h2>

                        {/* Main Review */}
                        <div className="space-y-8 pt-4">
                            <p className="text-xl text-foreground leading-relaxed italic">
                                &quot;{review.quote}&quot;
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-accent text-accent"
                                    />
                                ))}
                            </div>

                            {/* Traveler Info */}
                            <div className="space-y-1">
                                <p className="font-semibold text-foreground">{review.traveler}</p>
                                <p className="text-sm text-foreground/60">{review.mission}</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-accent" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-accent" />
                            </button>
                            <div className="ml-auto flex gap-1">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setAutoScroll(false)
                                            setActiveIndex(idx)
                                            setTimeout(() => setAutoScroll(true), 5000)
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-accent w-8' : 'bg-accent/30'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <button className="px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors">
                            Ver todas las reseñas
                        </button>
                    </div>

                    {/* Right - Video Mockup & Metrics */}
                    <div className="space-y-8">
                        {/* Video Mockup */}
                        <div className="relative max-w-sm mx-auto">
                            {/* Phone Frame */}
                            <div className="relative bg-black rounded-3xl p-3 shadow-2xl mx-auto" style={{ width: '280px' }}>
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />

                                {/* Screen */}
                                <div className="relative bg-foreground/5 rounded-2xl h-96 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent" />
                                    <Play className="w-16 h-16 text-accent relative z-10" />
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {metrics.map((metric, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-lg border border-accent/30 bg-secondary/50 hover:border-accent transition-all"
                                >
                                    <p className="text-sm text-foreground/60 mb-2">{metric.label}</p>
                                    <p className="text-2xl font-bold text-accent">{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
