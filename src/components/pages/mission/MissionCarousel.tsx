'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

import type { HomeMission } from '@/types/home'

type Props = {
    missions: HomeMission[]
}

export function MissionCarousel({ missions }: Props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [autoScroll, setAutoScroll] = useState(true)

    const mobileRef = useRef<HTMLDivElement>(null)

    const hasMissions = missions.length > 0

    // ================= DESKTOP AUTO =================
    useEffect(() => {
        if (!autoScroll || !hasMissions) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % missions.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [autoScroll, hasMissions, missions.length])

    useEffect(() => {
        if (!hasMissions) return

        if (activeIndex > missions.length - 1) {
            setActiveIndex(0)
        }
    }, [activeIndex, hasMissions, missions.length])

    const handlePrev = () => {
        if (!hasMissions) return

        setAutoScroll(false)
        setActiveIndex((prev) => (prev - 1 + missions.length) % missions.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    const handleNext = () => {
        if (!hasMissions) return

        setAutoScroll(false)
        setActiveIndex((prev) => (prev + 1) % missions.length)
        setTimeout(() => setAutoScroll(true), 5000)
    }

    // ================= MOBILE AUTO SCROLL =================
    useEffect(() => {
        const el = mobileRef.current

        if (!el || !hasMissions) return

        const interval = setInterval(() => {
            const maxScroll = el.scrollWidth - el.clientWidth

            if (el.scrollLeft >= maxScroll - 5) {
                el.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                el.scrollBy({
                    left: el.clientWidth * 0.8,
                    behavior: 'smooth',
                })
            }
        }, 3500)

        return () => clearInterval(interval)
    }, [hasMissions])

    if (!hasMissions) {
        return (
            <FadeUp delay={0.15} className="mb-10 sm:mb-16">
                <div className="rounded-xl border border-border/40 p-8 text-center">
                    <p className="text-muted-foreground">
                        No hay misiones disponibles por el momento.
                    </p>
                </div>
            </FadeUp>
        )
    }

    const getMissionHref = (mission: HomeMission) => {
        if (!mission.slug) return '#contacto'

        return `/mission/${mission.slug}`
    }

    const getMissionKey = (mission: HomeMission, index: number) => {
        return mission.uuid ?? mission.slug ?? `${mission.name}-${index}`
    }

    const getMissionImage = (mission: HomeMission) => {
        return mission.image_url || '/mission-morocco.jpg'
    }

    return (
        <>
            <FadeUp delay={0.15} className="mb-10 sm:mb-16">
                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:block relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-6 pb-6 transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(calc(50% - ${
                                    missions
                                        .slice(0, activeIndex)
                                        .reduce((total, _, i) => {
                                            const distance = Math.abs(
                                                i - activeIndex
                                            )

                                            const w =
                                                distance === 0
                                                    ? 384
                                                    : distance === 1
                                                      ? 192
                                                      : 160

                                            return total + w + 24
                                        }, 0) +
                                    384 / 2
                                }px))`,
                            }}
                        >
                            {missions.map((mission, idx) => {
                                const distance = Math.abs(idx - activeIndex)
                                const isActive = distance === 0
                                const isNear = distance === 1

                                const width = isActive
                                    ? 384
                                    : isNear
                                      ? 192
                                      : 160

                                const opacity = isActive
                                    ? 1
                                    : isNear
                                      ? 0.6
                                      : 0.3

                                return (
                                    <Link
                                        key={getMissionKey(mission, idx)}
                                        href={getMissionHref(mission)}
                                        className="flex-shrink-0 transition-all duration-700"
                                        style={{
                                            width: `${width}px`,
                                            height: '384px',
                                            opacity,
                                        }}
                                    >
                                        <div
                                            className={`relative w-full h-full rounded-xl overflow-hidden border border-border/40 group ${
                                                isActive ? 'glow-gold' : ''
                                            }`}
                                        >
                                            <Image
                                                src={getMissionImage(mission)}
                                                alt={mission.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="384px"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                            {!mission.slug && (
                                                <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold">
                                                    Sorpresa
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                                                <p className="text-accent text-xs font-semibold uppercase">
                                                    {mission.country ||
                                                        'MISIÓN'}
                                                </p>

                                                <h3 className="text-xl font-bold text-foreground">
                                                    {mission.name}
                                                </h3>

                                                <p className="text-muted-foreground text-sm">
                                                    {mission.label}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {missions.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                aria-label="Misión anterior"
                                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-background/80 text-accent shadow-lg backdrop-blur-md transition hover:bg-accent hover:text-background"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                aria-label="Siguiente misión"
                                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-background/80 text-accent shadow-lg backdrop-blur-md transition hover:bg-accent hover:text-background"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* ================= MOBILE ================= */}
                <div className="lg:hidden">
                    <div
                        ref={mobileRef}
                        className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scroll-smooth"
                    >
                        {missions.map((mission, index) => (
                            <Link
                                key={getMissionKey(mission, index)}
                                href={getMissionHref(mission)}
                                className="min-w-[80%] sm:min-w-[60%] snap-center flex-shrink-0"
                            >
                                <div className="relative h-[320px] rounded-xl overflow-hidden border border-border/40">
                                    <Image
                                        src={getMissionImage(mission)}
                                        alt={mission.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 80vw, 60vw"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                    {!mission.slug && (
                                        <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold">
                                            Sorpresa
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-accent text-xs font-semibold uppercase">
                                            {mission.country || 'MISIÓN'}
                                        </p>

                                        <h3 className="text-lg font-bold text-foreground">
                                            {mission.name}
                                        </h3>

                                        <p className="text-muted-foreground text-sm">
                                            {mission.label}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </FadeUp>

            {/* CTA */}
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