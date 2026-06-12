'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ChevronLeft,
    ChevronRight,
    Map,
    Hotel,
    Sparkles,
    ShieldCheck,
    Users,
    Camera,
    ArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'

const missions = [
    { id: 1, slug: 'vietnam', name: 'Vietnam', image: '/mission-morocco.jpg', description: 'Ha Long Bay' },
    { id: 2, slug: 'tailandia', name: 'Tailandia', image: '/mission-morocco.jpg', description: 'Playas Exóticas' },
    { id: 3, slug: 'marruecos', name: 'Marruecos', image: '/mission-morocco.jpg', description: 'Desierto Mágico' },
    { id: 4, slug: 'japon', name: 'Japón', image: '/mission-morocco.jpg', description: 'Tierra del Sol' },
    { id: 5, slug: 'nepal', name: 'Nepal', image: '/mission-morocco.jpg', description: 'Himalayás' },
    { id: 6, slug: 'sorpresa', name: 'Misión', image: '/mission-morocco.jpg', description: 'Sorpresa', isSurprise: true },
]

const benefits = [
    { title: 'Guías Especializados', description: 'Acompañamiento experto durante cada etapa del viaje.', icon: Map },
    { title: 'Hospedaje Premium', description: 'Estadías cómodas, seleccionadas por ubicación y calidad.', icon: Hotel },
    { title: 'Experiencias Auténticas', description: 'Actividades reales que conectan con la cultura local.', icon: Sparkles },
    { title: 'Seguridad Garantizada', description: 'Rutas planificadas y soporte constante durante la misión.', icon: ShieldCheck },
    { title: 'Grupos Reducidos', description: 'Viajes más cercanos, personalizados y mejor organizados.', icon: Users },
    { title: 'Memorias Inmortales', description: 'Momentos únicos diseñados para quedarse contigo.', icon: Camera },
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

    const handleSelectMission = (idx: number) => {
        setAutoScroll(false)
        setActiveIndex(idx)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    const activeMission = missions[activeIndex]

    return (
        <section id="misiones" className="relative py-20 sm:py-24 bg-background overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Misiones"
                    description="Explora nuestras expediciones exclusivas diseñadas para viajeros que buscan experiencias transformadoras."
                    className="mb-10 sm:mb-12"
                />

                {/* Ver todas */}
                {/* <FadeUp delay={0.1}>
                    <div className="mb-12 flex justify-center">
                        <Link
                            href="/mission"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-7 py-3 font-semibold text-accent transition-all duration-300 hover:bg-accent/10 no-underline group"
                        >
                            Ver todas las misiones
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </FadeUp> */}

                {/* Desktop Carousel */}
                <FadeUp delay={0.15} className="mb-14 sm:mb-16">
                    {/* Desktop Carousel */}
                    <div className="hidden lg:block relative overflow-hidden">
                        <div className="flex gap-6 pb-6 transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(calc(50% - ${missions.slice(0, activeIndex).reduce((total, _, i) => {
                                    const distance = Math.abs(i - activeIndex)
                                    const w = distance === 0 ? 384 : distance === 1 ? 192 : 160
                                    return total + w + 24 // gap
                                }, 0) + 384 / 2}px))`
                            }}>
                            {missions.map((mission, idx) => {
                                const distance = Math.abs(idx - activeIndex)
                                const isActive = distance === 0
                                const isNear = distance === 1

                                const width = isActive ? 384 : isNear ? 192 : 160
                                const opacity = isActive ? 1 : isNear ? 0.6 : 0.3

                                return (
                                    <div
                                        key={mission.id}
                                        className="flex-shrink-0 cursor-pointer transition-all duration-700"
                                        style={{ width: `${width}px`, height: '384px', opacity }}
                                        onClick={() => setActiveIndex(idx)}
                                    >
                                        <div className={`relative w-full h-full rounded-xl overflow-hidden border border-border/40 group ${isActive ? 'glow-gold' : ''}`}>
                                            <Image
                                                src={mission.image}
                                                alt={mission.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                                            {mission.isSurprise && (
                                                <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    Sorpresa
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                                                <p className="text-accent text-xs font-semibold uppercase tracking-widest">MISIÓN</p>
                                                <h3 className="text-xl font-bold text-foreground">{mission.name}</h3>
                                                <p className="text-muted-foreground text-sm">{mission.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Botón final: Ver todas las misiones */}
                            <div className="flex-shrink-0 flex items-center justify-center rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 cursor-pointer transition-all duration-500"
                                style={{ width: '384px', height: '384px' }}
                                onClick={() => window.location.href = '/mission'}>
                                <span className="text-accent font-semibold text-lg flex items-center gap-2">
                                    Ver todas las misiones
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </div>
                        </div>

                        {/* Flechas */}
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                        >
                            <ChevronLeft className="w-6 h-6 text-accent" />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 transition-all"
                        >
                            <ChevronRight className="w-6 h-6 text-accent" />
                        </button>
                    </div>
                </FadeUp>

                {/* Divider */}
                <FadeUp delay={0.1}>
                    <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-12 sm:my-16" />
                </FadeUp>

                {/* Benefits Section */}
                <div className="space-y-12 sm:space-y-14">
                    <div className="text-center space-y-5">
                        <FadeUp>
                            <p className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                                Lo que incluye cada misión
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.1}>
                            <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-foreground">
                                Experiencias que se quedan contigo
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <p className="text-base sm:text-lg text-muted-foreground italic max-w-2xl mx-auto">
                                &quot;No se trata de ver lugares, se trata de vivirlos.&quot;
                            </p>
                        </FadeUp>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {benefits.map((benefit, idx) => {
                            const Icon = benefit.icon

                            return (
                                <AnimatedCard
                                    key={benefit.title}
                                    delay={idx * 0.08}
                                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 shadow-lg transition-all duration-500 group hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl"
                                >
                                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20">
                                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent transition-colors duration-300 group-hover:text-background" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-base sm:text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                                                {benefit.title}
                                            </h3>

                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}