'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { missions } from './data'
import { FadeUp } from '@/components/animations/fade-up'

export function MissionCarousel() {
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
        <>
            <FadeUp delay={0.15} className="mb-10 sm:mb-16">

                <div className="hidden lg:block relative overflow-hidden">

                    {/* ================= CAROUSEL (SIN CAMBIOS) ================= */}
                    <div
                        className="flex gap-6 pb-6 transition-transform duration-700 ease-out"
                        style={{
                            transform: `translateX(calc(50% - ${missions
                                .slice(0, activeIndex)
                                .reduce((total, _, i) => {
                                    const distance = Math.abs(i - activeIndex)
                                    const w = distance === 0 ? 384 : distance === 1 ? 192 : 160
                                    return total + w + 24
                                }, 0) + 384 / 2}px))`
                        }}
                    >
                        {missions.map((mission, idx) => {
                            const distance = Math.abs(idx - activeIndex)
                            const isActive = distance === 0
                            const isNear = distance === 1

                            const width = isActive ? 384 : isNear ? 192 : 160
                            const opacity = isActive ? 1 : isNear ? 0.6 : 0.3

                            return (
                                <Link
                                    key={mission.id}
                                    href={`/mission/${mission.slug}`}
                                    className="flex-shrink-0 transition-all duration-700"
                                    style={{ width: `${width}px`, height: '384px', opacity }}
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
                                            <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold">
                                                Sorpresa
                                            </div>
                                        )}

                                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                                            <p className="text-accent text-xs font-semibold uppercase">
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
                                </Link>
                            )
                        })}
                    </div>

                    {/* ================= FLECHAS (SIN CAMBIOS) ================= */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full border border-accent/50 hover:bg-accent/10"
                    >
                        <ChevronLeft className="w-6 h-6 text-accent" />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full border border-accent/50 hover:bg-accent/10"
                    >
                        <ChevronRight className="w-6 h-6 text-accent" />
                    </button>

                </div>

            </FadeUp>

            {/* ================= BOTÓN FUERA DEL CAROUSEL ================= */}
            <div className="flex justify-center mt-6">
                <Link
                    href="/mission"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:opacity-90 transition-all"
                >
                    Ver todas las misiones
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </>
    )
}