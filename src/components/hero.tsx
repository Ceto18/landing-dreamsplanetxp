'use client'

import { ArrowRight, Users } from 'lucide-react'
import { Countdown } from './countdown'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'

export function Hero() {
    const stats = [
        { label: 'Destinos', value: '25+' },
        { label: 'Viajeros', value: '1.2k' },
        { label: 'Experiencias', value: '80+' },
        { label: 'Continentes', value: '5' },
    ]

    return (
        <section
            className="relative min-h-screen pt-20 overflow-hidden"
            style={{
                backgroundImage:
                    "linear-gradient(135deg, rgba(5, 5, 5, 0.85) 0%, rgba(11, 11, 10, 0.75) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
                    {/* Left side - Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <FadeUp>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                                    Pon tu vida en modo{' '}
                                    <span className="text-accent">avión</span>
                                </h1>
                            </FadeUp>

                            <FadeUp delay={0.12}>
                                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                                    Expediciones exclusivas diseñadas para quienes quieren vivir algo diferente.
                                    Destinos extraordinarios, coordinadores expertos y momentos que cambiarán tu
                                    perspectiva del mundo.
                                </p>
                            </FadeUp>
                        </div>

                        {/* CTA Buttons */}
                        <FadeUp delay={0.22}>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a
                                    href="#misiones"
                                    className="btn-gold flex items-center justify-center gap-2 no-underline group"
                                >
                                    <span>Descubrir misiones</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="#momentos"
                                    className="px-6 py-2.5 rounded-lg font-medium text-sm bg-transparent text-foreground border border-accent/40 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 flex items-center justify-center gap-2 no-underline group"
                                >
                                    <span>Ver momentos</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </FadeUp>

                        {/* Mobile Departure Card */}
                        <div className="lg:hidden">
                            <AnimatedCard
                                delay={0.28}
                                className="rounded-2xl border border-border/40 backdrop-blur-md p-5 shadow-xl"
                            >
                                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                                    Próxima Salida
                                </p>

                                <h3 className="text-2xl font-bold text-foreground mt-2">
                                    Misión Marruecos
                                </h3>

                                <Countdown departureDate="2026-07-15" />

                                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-accent" />
                                        <span className="text-foreground font-medium">
                                            Plazas disponibles:{' '}
                                            <span className="text-accent">12/18</span>
                                        </span>
                                    </div>
                                </div>

                                <a
                                    href="#contacto"
                                    className="block w-full btn-gold py-3 text-center no-underline mt-5"
                                >
                                    Solicitar información
                                </a>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Confirmación en 24 horas
                                </p>
                            </AnimatedCard>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-accent/20">
                            {stats.map((stat, idx) => (
                                <FadeUp key={stat.label} delay={0.32 + idx * 0.08}>
                                    <div className="space-y-1">
                                        <div className="text-2xl sm:text-3xl font-bold text-accent">
                                            {stat.value}
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Next Departure Card */}
                    <div className="hidden lg:flex justify-end">
                        <AnimatedCard
                            delay={0.25}
                            className="w-full max-w-sm relative overflow-hidden rounded-2xl border border-border/40 backdrop-blur-md p-8 space-y-6 shadow-2xl glow-gold"
                        >
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full -mr-16 -mt-16" />

                            <div className="relative z-10">
                                <p className="text-muted-foreground text-sm uppercase tracking-widest">
                                    Próxima Salida
                                </p>

                                <h3 className="text-3xl font-bold text-foreground mt-2">
                                    Misión Marruecos
                                </h3>

                                {/* Countdown */}
                                <Countdown departureDate="2026-07-15" />

                                {/* Available spots */}
                                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-6">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-accent" />
                                        <span className="text-foreground font-medium">
                                            Plazas disponibles:{' '}
                                            <span className="text-accent">12/18</span>
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href="#contacto"
                                    className="block w-full btn-gold py-3 text-center no-underline"
                                >
                                    Solicitar información
                                </a>

                                {/* Small text */}
                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Confirmación en 24 horas
                                </p>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </div>
        </section>
    )
}