import Link from 'next/link'
import {
    ArrowLeft,
    ArrowRight,
    Camera,
    Heart,
    MapPin,
    Sparkles,
    Compass,
    Clock,
} from 'lucide-react'
import type { MomentPhoto } from '@/data/moments'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'

interface MomentDetailContentProps {
    moment: MomentPhoto
}

export function MomentDetailContent({ moment }: MomentDetailContentProps) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-20 flex items-center">
                <img
                    src={moment.image}
                    alt={moment.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <FadeUp>
                        <Link
                            href="/moment"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors no-underline mb-10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a momentos
                        </Link>
                    </FadeUp>

                    <div className="max-w-3xl">
                        <FadeUp delay={0.08}>
                            <p className="text-accent text-sm font-semibold uppercase tracking-[0.35em]">
                                {moment.destination}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.16}>
                            <h1 className="mt-5 text-5xl sm:text-7xl font-bold text-foreground leading-tight">
                                {moment.title}
                            </h1>
                        </FadeUp>

                        <FadeUp delay={0.24}>
                            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {moment.description}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.32}>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/mission"
                                    className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                                >
                                    Explorar misiones
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <Link
                                    href="/moment"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/50 px-6 py-2.5 text-accent font-semibold hover:bg-accent/10 transition-all no-underline"
                                >
                                    Ver otros momentos
                                </Link>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="relative py-14 bg-secondary/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: 'Lugar',
                                value: moment.place,
                                icon: MapPin,
                            },
                            {
                                label: 'Experiencia',
                                value: moment.experience,
                                icon: Compass,
                            },
                            {
                                label: 'Momento',
                                value: moment.moment,
                                icon: Clock,
                            },
                            {
                                label: 'Sensación',
                                value: moment.emotion,
                                icon: Heart,
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

                                    <p className="text-base font-bold text-foreground">
                                        {item.value}
                                    </p>
                                </AnimatedCard>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="relative py-24 bg-background overflow-hidden">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-14">
                            <FadeUp>
                                <div className="space-y-5">
                                    <p className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
                                        Historia del momento
                                    </p>

                                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                                        Una imagen que guarda una experiencia
                                    </h2>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {moment.description}
                                    </p>
                                </div>
                            </FadeUp>

                            {/* Gallery */}
                            <div className="space-y-6">
                                <FadeUp>
                                    <h3 className="text-3xl font-bold text-foreground">
                                        Galería relacionada
                                    </h3>
                                </FadeUp>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {moment.gallery.map((image, idx) => (
                                        <AnimatedCard
                                            key={idx}
                                            delay={idx * 0.08}
                                            className="relative h-72 rounded-2xl overflow-hidden border border-border/60 group"
                                        >
                                            <img
                                                src={image}
                                                alt={`${moment.title} imagen ${idx + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            <AnimatedCard className="sticky top-28 rounded-2xl border border-border/60 bg-card/50 p-6 glass-effect shadow-2xl space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-accent" />
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                            Momento
                                        </p>
                                        <p className="font-bold text-foreground">
                                            {moment.destination}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-border/70" />

                                <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
                                    <p className="text-foreground italic leading-relaxed">
                                        &quot;{moment.recommendation}&quot;
                                    </p>
                                </div>

                                <Link
                                    href="/mission"
                                    className="btn-gold w-full inline-flex items-center justify-center gap-2 no-underline"
                                >
                                    Ver misiones
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
                                ¿Quieres vivir algo similar?
                            </h2>

                            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                                Explora nuestras misiones y descubre el destino ideal para crear
                                tus propios recuerdos.
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