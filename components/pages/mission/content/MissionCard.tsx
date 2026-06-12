'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Star,
    ShieldCheck,
} from 'lucide-react'
import { AnimatedCard } from '@/components/animations/animated-card'

type Props = {
    mission: any
}

export function MissionCard({ mission }: Props) {
    return (
        <AnimatedCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500">

            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">

                <Link href={`/mission/${mission.slug}`}>
                    <Image
                        src={mission.image}
                        alt={mission.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* overlay EXACTO */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* badge sorpresa */}
                {mission.isSurprise && (
                    <div className="absolute top-4 left-4 rounded-full bg-accent text-background px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        Sorpresa
                    </div>
                )}

                {/* title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                        {mission.destination}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {mission.name}
                    </h3>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-5">

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {mission.subtitle}
                </p>

                {/* INFO GRID EXACTO */}
                <div className="grid grid-cols-2 gap-3 text-sm">

                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <CalendarDays className="w-4 h-4" />
                            <span className="font-semibold">Salida</span>
                        </div>
                        <p className="text-muted-foreground text-xs">{mission.date}</p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold">Grupo</span>
                        </div>
                        <p className="text-muted-foreground text-xs">{mission.group}</p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-semibold">Duración</span>
                        </div>
                        <p className="text-muted-foreground text-xs">{mission.duration}</p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <Star className="w-4 h-4 fill-accent" />
                            <span className="font-semibold">Rating</span>
                        </div>
                        <p className="text-muted-foreground text-xs">{mission.rating}</p>
                    </div>

                </div>

                {/* HIGHLIGHTS */}
                <div className="space-y-2">

                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Incluye
                    </p>

                    {mission.highlights?.slice(0, 3).map((h: string) => (
                        <div
                            key={h}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                            <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                        </div>
                    ))}

                </div>

                {/* FOOTER EXACTO */}
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
    )
}