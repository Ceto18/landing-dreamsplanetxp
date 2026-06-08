'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const missions = [
    {
        id: 1,
        name: 'Vietnam',
        image: '/mission-vietnam.png',
        description: 'Ha Long Bay',
    },
    {
        id: 2,
        name: 'Tailandia',
        image: '/mission-thailand.png',
        description: 'Playas Exóticas',
    },
    {
        id: 3,
        name: 'Marruecos',
        image: '/mission-morocco.png',
        description: 'Desierto Mágico',
    },
    {
        id: 4,
        name: 'Japón',
        image: '/mission-japan.png',
        description: 'Tierra del Sol',
    },
    {
        id: 5,
        name: 'Nepal',
        image: '/mission-nepal.png',
        description: 'Himalayás',
    },
    {
        id: 6,
        name: 'Misión',
        image: '/mission-vietnam.png',
        description: 'Sorpresa',
        isSurprise: true,
    },
]

const benefits = [
    'Guías Especializados',
    'Hospedaje Premium',
    'Experiencias Auténticas',
    'Seguridad Garantizada',
    'Grupos Reducidos',
    'Memorias Inmortales',
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
        <section id="mission" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                            className={`flex-shrink-0 transition-all duration-500 cursor-pointer ${isActive ? 'w-96 h-96' : isNear ? 'w-48 h-96 opacity-60' : 'w-40 h-96 opacity-30'
                                                }`}
                                            onClick={() => setActiveIndex(idx)}
                                        >
                                            <div className={`relative w-full h-full rounded-xl overflow-hidden ${isActive ? 'glow-gold' : ''}`}>
                                                <Image
                                                    src={mission.image}
                                                    alt={mission.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                                                    <p className="text-accent text-xs font-semibold">MISIÓN</p>
                                                    <h3 className="text-xl font-bold text-foreground">{mission.name}</h3>
                                                    <p className="text-foreground/60 text-sm">{mission.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6 text-accent" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                        >
                            <ChevronRight className="w-6 h-6 text-accent" />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-16" />

                {/* Benefits Section */}
                <div className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">EXPERIENCIAS QUE SE QUEDAN CONTIGO</h2>
                        <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                            &quot;No se trata de ver lugares, se trata de vivirlos.&quot;
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="p-7 rounded-xl border border-border bg-card/50 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all duration-500 group shadow-lg hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-all duration-300">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                    </div>
                                    <p className="font-semibold text-foreground leading-snug">{benefit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
