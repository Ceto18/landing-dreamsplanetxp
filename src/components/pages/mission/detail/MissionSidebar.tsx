'use client'

import Link from 'next/link'
import type { Mission } from '@/data/missions'
import { AnimatedCard } from '@/components/animations/animated-card'
import { MapPin, Mountain, Users, CheckCircle } from 'lucide-react'

export function MissionSidebar({ mission }: { mission: Mission }) {
    return (
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
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}

                </div>

                <Link
                    href="/#contacto"
                    className="btn-gold w-full inline-flex items-center justify-center gap-2"
                >
                    Reservar misión
                </Link>

            </AnimatedCard>

        </aside>
    )
}