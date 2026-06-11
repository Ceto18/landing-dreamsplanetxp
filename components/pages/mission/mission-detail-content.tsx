import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Star,
    ShieldCheck,
    Clock,
    Mountain,
    Sparkles,
    CheckCircle,
} from 'lucide-react'
import type { Mission } from '@/data/missions'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'

interface MissionDetailContentProps {
    mission: Mission
}

export function MissionDetailContent({ mission }: MissionDetailContentProps) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-20 flex items-center">
                <Image
                    src={mission.heroImage}
                    alt={mission.name}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <FadeUp>
                        <Link
                            href="/mission"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors no-underline mb-10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a misiones
                        </Link>
                    </FadeUp>

                    <div className="max-w-3xl">
                        <FadeUp delay={0.08}>
                            <p className="text-accent text-sm font-semibold uppercase tracking-[0.35em]">
                                {mission.destination}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.16}>
                            <h1 className="mt-5 text-5xl sm:text-7xl font-bold text-foreground leading-tight">
                                {mission.name}
                            </h1>
                        </FadeUp>

                        <FadeUp delay={0.24}>
                            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {mission.subtitle}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.32}>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#contacto"
                                    className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                                >
                                    Solicitar información
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <Link
                                    href="/mission"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/50 px-6 py-2.5 text-accent font-semibold hover:bg-accent/10 transition-all no-underline"
                                >
                                    Ver otras misiones
                                </Link>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="relative py-14 bg-secondary/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: 'Salida',
                                value: mission.date,
                                icon: CalendarDays,
                            },
                            {
                                label: 'Duración',
                                value: mission.duration,
                                icon: Clock,
                            },
                            {
                                label: 'Grupo',
                                value: mission.group,
                                icon: Users,
                            },
                            {
                                label: 'Rating',
                                value: mission.rating,
                                icon: Star,
                            },
                        ].map((item, idx) => {
                            const Icon = item.icon

                            return (
                                <AnimatedCard
                                    key={item.label}
                                    delay={idx * 0.08}
                                    className="rounded-2xl border border-border/60 bg-card/40 p-5 glass-effect"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-accent" />
                                        </div>

                                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                                            {item.label}
                                        </p>
                                    </div>

                                    <p className="text-lg font-bold text-foreground">
                                        {item.value}
                                    </p>
                                </AnimatedCard>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="relative py-24 bg-background overflow-hidden">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left content */}
                        <div className="lg:col-span-2 space-y-14">
                            <FadeUp>
                                <div className="space-y-5">
                                    <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                                        Sobre esta misión
                                    </p>

                                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                                        Una experiencia diseñada para transformar tu forma de viajar
                                    </h2>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {mission.longDescription}
                                    </p>
                                </div>
                            </FadeUp>

                            {/* Gallery */}
                            <div className="space-y-6">
                                <FadeUp>
                                    <h3 className="text-3xl font-bold text-foreground">
                                        Galería de la misión
                                    </h3>
                                </FadeUp>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {mission.gallery.map((image, idx) => (
                                        <AnimatedCard
                                            key={idx}
                                            delay={idx * 0.08}
                                            className="relative h-72 rounded-2xl overflow-hidden border border-border/60 group"
                                        >
                                            <Image
                                                src={image}
                                                alt={`${mission.name} imagen ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="space-y-6">
                                <FadeUp>
                                    <h3 className="text-3xl font-bold text-foreground">
                                        Itinerario destacado
                                    </h3>
                                </FadeUp>

                                <div className="space-y-4">
                                    {mission.itinerary.map((item, idx) => (
                                        <AnimatedCard
                                            key={item.day}
                                            delay={idx * 0.08}
                                            className="rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect"
                                        >
                                            <div className="flex gap-5">
                                                <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-accent font-bold">
                                                        {idx + 1}
                                                    </span>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-accent text-xs font-semibold uppercase tracking-widest">
                                                        {item.day}
                                                    </p>

                                                    <h4 className="text-xl font-bold text-foreground">
                                                        {item.title}
                                                    </h4>

                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            <AnimatedCard className="sticky top-28 rounded-2xl border border-border/60 bg-card/50 p-6 glass-effect shadow-2xl space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Inversión
                                    </p>

                                    <p className="text-3xl font-bold text-accent">
                                        {mission.price}
                                    </p>
                                </div>

                                <div className="h-px bg-border/70" />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-accent" />
                                        <span className="text-muted-foreground">
                                            {mission.destination}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mountain className="w-5 h-5 text-accent" />
                                        <span className="text-muted-foreground">
                                            Nivel: {mission.level}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-accent" />
                                        <span className="text-muted-foreground">
                                            {mission.group}
                                        </span>
                                    </div>
                                </div>

                                <div className="h-px bg-border/70" />

                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-foreground">
                                        Incluye:
                                    </p>

                                    {mission.includes.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/#contacto"
                                    className="btn-gold w-full inline-flex items-center justify-center gap-2 no-underline"
                                >
                                    Reservar misión
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </AnimatedCard>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 bg-secondary/30 border-t border-border/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp>
                        <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-12 shadow-2xl">
                            <div className="flex justify-center mb-5">
                                <div className="w-16 h-16 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 text-accent" />
                                </div>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                ¿Listo para vivir {mission.destination}?
                            </h2>

                            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                                Escríbenos y recibe asesoría para separar tu cupo, resolver dudas
                                o conocer más detalles de esta misión.
                            </p>

                            <Link
                                href="/#contacto"
                                className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                            >
                                Solicitar información
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </main>
    )
}