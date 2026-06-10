'use client'

import { useState, useEffect } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Map,
    Hotel,
    Sparkles,
    ShieldCheck,
    Users,
    Camera,
} from 'lucide-react'
import Image from 'next/image'

const missions = [
    {
        id: 1,
        name: 'Vietnam',
        image: '/mission-morocco.jpg',
        description: 'Ha Long Bay',
    },
    {
        id: 2,
        name: 'Tailandia',
        image: '/mission-morocco.jpg',
        description: 'Playas Exóticas',
    },
    {
        id: 3,
        name: 'Marruecos',
        image: '/mission-morocco.jpg',
        description: 'Desierto Mágico',
    },
    {
        id: 4,
        name: 'Japón',
        image: '/mission-morocco.jpg',
        description: 'Tierra del Sol',
    },
    {
        id: 5,
        name: 'Nepal',
        image: '/mission-morocco.jpg',
        description: 'Himalayás',
    },
    {
        id: 6,
        name: 'Misión',
        image: '/mission-morocco.jpg',
        description: 'Sorpresa',
        isSurprise: true,
    },
]

const benefits = [
    {
        title: 'Guías Especializados',
        icon: Map,
    },
    {
        title: 'Hospedaje Premium',
        icon: Hotel,
    },
    {
        title: 'Experiencias Auténticas',
        icon: Sparkles,
    },
    {
        title: 'Seguridad Garantizada',
        icon: ShieldCheck,
    },
    {
        title: 'Grupos Reducidos',
        icon: Users,
    },
    {
        title: 'Memorias Inmortales',
        icon: Camera,
    },
]

export function Mission() {
    const [activeIndex, setActiveIndex] = useState(2)
    const [autoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (!autoScroll) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % missions.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [autoScroll])

    const handlePrev = () => {
        setAutoScroll(false)
        setActiveIndex((prev) => (prev - 1 + missions.length) % missions.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    const handleNext = () => {
        setAutoScroll(false)
        setActiveIndex((prev) => (prev + 1) % missions.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    return (
        <section id="misiones" className="relative py-24 bg-background overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 space-y-6 text-center">
                    <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
                        Misiones
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    </div>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Explora nuestras expediciones exclusivas diseñadas para viajeros que buscan experiencias transformadoras.
                    </p>
                </div>

                {/* Carousel */}
                <div className="mb-16">
                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="overflow-hidden">
                            <div className="flex gap-6 pb-6">
                                {missions.map((mission, idx) => {
                                    const distance = Math.abs(idx - activeIndex)
                                    const isActive = idx === activeIndex
                                    const isNear = distance === 1

                                    return (
                                        <div
                                            key={mission.id}
                                            className={`flex-shrink-0 transition-all duration-500 cursor-pointer ${isActive
                                                    ? 'w-96 h-96'
                                                    : isNear
                                                        ? 'w-48 h-96 opacity-60'
                                                        : 'w-40 h-96 opacity-30'
                                                }`}
                                            onClick={() => setActiveIndex(idx)}
                                        >
                                            <div
                                                className={`relative w-full h-full rounded-xl overflow-hidden border border-border/40 ${isActive ? 'glow-gold' : ''
                                                    }`}
                                            >
                                                <Image
                                                    src={mission.image}
                                                    alt={mission.name}
                                                    fill
                                                    className="object-cover"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                                {mission.isSurprise && (
                                                    <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        Sorpresa
                                                    </div>
                                                )}

                                                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                                                    <p className="text-accent text-xs font-semibold uppercase tracking-widest">
                                                        MISIÓN
                                                    </p>

                                                    <h3 className="text-xl font-bold text-foreground">
                                                        {mission.name}
                                                    </h3>

                                                    <p className="text-muted-foreground text-sm">
                                                        {mission.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Navigation Arrows Desktop */}
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                            aria-label="Misión anterior"
                        >
                            <ChevronLeft className="w-6 h-6 text-accent" />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                            aria-label="Siguiente misión"
                        >
                            <ChevronRight className="w-6 h-6 text-accent" />
                        </button>

                        {/* Navigation Arrows Mobile */}
                        <div className="flex lg:hidden justify-center gap-4 mt-6">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Misión anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-accent" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Siguiente misión"
                            >
                                <ChevronRight className="w-6 h-6 text-accent" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-16" />

                {/* Benefits Section */}
                <div className="space-y-14">
                    <div className="text-center space-y-5">
                        <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                            Lo que incluye cada misión
                        </p>

                        <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-foreground">
                            Experiencias que se quedan contigo
                        </h2>

                        <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                            &quot;No se trata de ver lugares, se trata de vivirlos.&quot;
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, idx) => {
                            const Icon = benefit.icon

                            return (
                                <div
                                    key={idx}
                                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all duration-500 group hover:-translate-y-1 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl"
                                >
                                    {/* Glow decoration */}
                                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative z-10 flex items-start gap-5">
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20">
                                            <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-background" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                                                {benefit.title}
                                            </h3>

                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                Vive cada detalle con una experiencia pensada para viajar cómodo, seguro y con momentos auténticos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}