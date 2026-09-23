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
    Tag,
    Sparkles,
} from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'
import type { MissionExperienceCard } from '@/services/missionService'

type Props = {
    experience: MissionExperienceCard
}

function formatDate(value?: string | null): string {
    if (!value) return 'Próximamente'

    const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? `${value}T00:00:00Z`
        : value

    const date = new Date(normalizedValue)

    if (Number.isNaN(date.getTime())) return 'Próximamente'

    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(date)
}

function formatCurrency(value?: number | null) {
    if (value === undefined || value === null) return 'Consultar'

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value)
}

export function MissionCard({ experience }: Props) {
    const detailHref = `/mission/${experience.slug}`

    const image =
        experience.first_image?.image_url ||
        '/mission-placeholder.jpg'

    const subtitle =
        experience.short_description ||
        'Una ruta diseñada para vivir una misión inolvidable.'

    const availableSeats =
        experience.available_seats ??
        Math.max(
            (experience.number_seats ?? 0) -
            (experience.seats_used ?? 0),
            0
        )

    const group = experience.number_seats
        ? `${availableSeats} cupos disponibles`
        : 'Cupos limitados'

    const duration =
        experience.days && experience.nights
            ? `${experience.days} días / ${experience.nights} noches`
            : 'Duración por confirmar'

    const investment = Number(experience.investment ?? 0)
    const discount = Number(experience.discount ?? 0)
    const investmentFinal = Number(
        experience.investment_final ?? investment
    )

    const hasDiscount =
        discount > 0 &&
        investmentFinal > 0 &&
        investmentFinal < investment

    const highlights = experience.features ?? []

    return (
        <AnimatedCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl">
            <div className="relative h-56 shrink-0 overflow-hidden">
                <Link href={detailHref}>
                    <Image
                        src={image}
                        alt={experience.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                {hasDiscount && (
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-lg backdrop-blur-md">
                        <Tag className="h-3.5 w-3.5" />
                        Ahorra {formatCurrency(discount)}
                    </div>
                )}

                {availableSeats > 0 && availableSeats <= 5 && (
                    <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md">
                        Solo {availableSeats} cupos
                    </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-accent">
                        <Sparkles className="h-3.5 w-3.5" />

                        <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                            Experiencia
                        </p>
                    </div>

                    <h3 className="mt-1 line-clamp-2 text-2xl font-bold text-foreground transition-colors group-hover:text-accent">
                        {experience.name}
                    </h3>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-5 p-5">
                <p className="min-h-[40px] line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {subtitle}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <InfoItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Salida"
                        value={formatDate(experience.release_date)}
                    />

                    <InfoItem
                        icon={<Users className="h-4 w-4" />}
                        label="Grupo"
                        value={group}
                    />

                    <InfoItem
                        icon={<MapPin className="h-4 w-4" />}
                        label="Duración"
                        value={duration}
                    />

                    <InfoItem
                        icon={<Star className="h-4 w-4 fill-accent" />}
                        label="Rating"
                        value={String(experience.raiting || 'Nuevo')}
                    />
                </div>

                <div className="min-h-[104px] space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Incluye
                    </p>

                    {highlights.length ? (
                        highlights.slice(0, 3).map((highlight) => (
                            <div
                                key={highlight}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />

                                <span className="line-clamp-1">
                                    {highlight}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Información disponible pronto.
                        </p>
                    )}
                </div>

                <div className="mt-auto flex min-h-[124px] items-end rounded-2xl border border-border/60 bg-background/20 p-4">
                    <div className="flex w-full items-end justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Inversión
                            </p>

                            <div className="mt-1 min-h-[66px]">
                                {hasDiscount && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground line-through decoration-2">
                                            {formatCurrency(investment)}
                                        </span>

                                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                                            OFERTA
                                        </span>
                                    </div>
                                )}

                                <p className="text-2xl font-black tracking-tight text-accent">
                                    {formatCurrency(
                                        hasDiscount
                                            ? investmentFinal
                                            : investment
                                    )}
                                </p>

                                <p className="min-h-[16px] text-xs font-medium text-muted-foreground">
                                    {hasDiscount
                                        ? `Ahorras ${formatCurrency(discount)}`
                                        : '\u00A0'}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={detailHref}
                            className="group/link inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-md transition-all hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] no-underline"
                        >
                            Ver detalle
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    )
}

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="min-h-[74px] rounded-xl border border-border/60 bg-background/20 p-3 transition-colors hover:border-accent/30">
            <div className="mb-1 flex items-center gap-2 text-accent">
                {icon}

                <span className="font-semibold">
                    {label}
                </span>
            </div>

            <p className="line-clamp-2 text-xs text-muted-foreground">
                {value}
            </p>
        </div>
    )
}