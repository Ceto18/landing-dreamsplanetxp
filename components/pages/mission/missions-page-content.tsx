'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Star,
    Plane,
    ShieldCheck,
    Sparkles,
} from 'lucide-react'
import { missions } from '@/data/missions'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'

const categories = [
    'Todas',
    'Marruecos',
    'Vietnam',
    'Tailandia',
    'Japón',
    'Nepal',
    'Sorpresa',
]

export function MissionsPageContent() {
    const [activeCategory, setActiveCategory] = useState('Todas')

    const filteredMissions =
        activeCategory === 'Todas'
            ? missions
            : missions.filter((mission) => mission.destination === activeCategory)

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-16 bg-background">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors no-underline mb-10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio
                        </Link>
                    </FadeUp>

                    <SectionHeader
                        title="Todas las Misiones"
                        description="Explora nuestras expediciones premium, diseñadas para viajeros que buscan experiencias auténticas, seguras y memorables."
                        className="mb-10"
                    />

                    <FadeUp delay={0.2}>
                        <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/40 glass-effect p-5 sm:p-6 text-center shadow-xl">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                    <Plane className="w-6 h-6 text-accent" />
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                Elige tu próxima aventura
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                Cada misión incluye acompañamiento, planificación, experiencias seleccionadas
                                y una ruta pensada para disfrutar el destino con comodidad y seguridad.
                            </p>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Filters */}
            <section className="relative bg-secondary/30 py-8 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                                        activeCategory === category
                                            ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                            : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Missions Grid */}
            <section className="relative py-16 bg-background overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredMissions.map((mission, idx) => (
                            <AnimatedCard
                                key={mission.id}
                                delay={idx * 0.08}
                                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={mission.image}
                                        alt={mission.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                                    {mission.isSurprise && (
                                        <div className="absolute top-4 left-4 rounded-full bg-accent text-background px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                            Sorpresa
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                                            {mission.destination}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                                            {mission.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-5">
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {mission.subtitle}
                                    </p>

                                    {/* Info compact */}
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                                            <div className="flex items-center gap-2 text-accent mb-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span className="font-semibold">Salida</span>
                                            </div>

                                            <p className="text-muted-foreground text-xs">
                                                {mission.date}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                                            <div className="flex items-center gap-2 text-accent mb-1">
                                                <Users className="w-4 h-4" />
                                                <span className="font-semibold">Grupo</span>
                                            </div>

                                            <p className="text-muted-foreground text-xs">
                                                {mission.group}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                                            <div className="flex items-center gap-2 text-accent mb-1">
                                                <MapPin className="w-4 h-4" />
                                                <span className="font-semibold">Duración</span>
                                            </div>

                                            <p className="text-muted-foreground text-xs">
                                                {mission.duration}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                                            <div className="flex items-center gap-2 text-accent mb-1">
                                                <Star className="w-4 h-4 fill-accent" />
                                                <span className="font-semibold">Rating</span>
                                            </div>

                                            <p className="text-muted-foreground text-xs">
                                                {mission.rating}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Highlights compact */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                            Incluye
                                        </p>

                                        <div className="space-y-2">
                                            {mission.highlights.slice(0, 3).map((highlight) => (
                                                <div
                                                    key={highlight}
                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                    <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                                                    <span className="line-clamp-1">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                                Inversión
                                            </p>

                                            <p className="text-lg font-bold text-accent">
                                                {mission.price}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/mission/${mission.slug}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent text-accent px-4 py-2 text-sm font-semibold hover:bg-accent/10 transition-all no-underline group/link"
                                        >
                                            Ver detalle
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>

                    {filteredMissions.length === 0 && (
                        <FadeUp>
                            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center">
                                <p className="text-muted-foreground">
                                    No hay misiones disponibles para esta categoría.
                                </p>
                            </div>
                        </FadeUp>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-16 bg-secondary/30 border-t border-border/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp>
                        <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-10 shadow-2xl">
                            <div className="flex justify-center mb-5">
                                <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                    <Sparkles className="w-7 h-7 text-accent" />
                                </div>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                ¿No sabes qué misión elegir?
                            </h2>

                            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                                Nuestro equipo puede ayudarte a elegir la experiencia ideal según tu estilo,
                                fechas, presupuesto y expectativas de viaje.
                            </p>

                            <Link
                                href="/#contacto"
                                className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                            >
                                Solicitar asesoría
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </main>
    )
}