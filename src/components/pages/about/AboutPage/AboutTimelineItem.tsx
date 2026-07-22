import Image from 'next/image'

import { AnimatedCard } from '@/components/animations/animated-card'

import type { CompanyTimeline } from '@/types/home'

type Props = {
    item: CompanyTimeline
    index: number
}

function formatTimelineDate(date: string) {
    const parsedDate = new Date(`${date}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime())) {
        return date
    }

    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(parsedDate)
}

export function AboutTimelineItem({
    item,
    index,
}: Props) {
    const isLeft = index % 2 === 0
    const formattedDate = formatTimelineDate(item.event_date)

    return (
        <AnimatedCard
            delay={0.12 + index * 0.08}
            className="relative"
        >
            {/* Punto central desktop */}
            <div className="absolute left-1/2 top-10 z-20 hidden -translate-x-1/2 lg:flex">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-background shadow-xl">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />

                    <div className="relative h-5 w-5 rounded-full bg-accent" />
                </div>
            </div>

            {/* Punto móvil */}
            <div className="absolute left-0 top-8 z-20 lg:hidden">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-background shadow-xl">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />

                    <div className="relative h-4 w-4 rounded-full bg-accent" />
                </div>
            </div>

            <div
                className={`grid grid-cols-1 items-center gap-8 pl-14 lg:grid-cols-2 lg:gap-20 lg:pl-0 ${
                    isLeft
                        ? ''
                        : 'lg:[&>*:first-child]:order-2'
                }`}
            >
                {/* Imagen */}
                <div
                    className={
                        isLeft
                            ? 'lg:pr-12'
                            : 'lg:pl-12'
                    }
                >
                    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-xl glass-effect">
                        <div className="relative h-64 sm:h-80">
                            {item.image_url ? (
                                <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-card to-background">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Imagen no disponible
                                    </span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

                            <div className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-accent/30 bg-background/50 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-md">
                                    {item.stage}
                                </span>

                                <time
                                    dateTime={item.event_date}
                                    className="rounded-full border border-border/60 bg-background/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-md"
                                >
                                    {formattedDate}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Texto */}
                <div
                    className={
                        isLeft
                            ? 'lg:pl-12'
                            : 'lg:pr-12'
                    }
                >
                    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-7 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-xl md:p-8 glass-effect">
                        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

                        {/* Conector desktop */}
                        <div
                            className={`absolute top-14 hidden h-px w-14 bg-gradient-to-r lg:block ${
                                isLeft
                                    ? '-left-14 from-accent/70 to-transparent'
                                    : '-right-14 from-transparent to-accent/70'
                            }`}
                        />

                        <div className="relative z-10">
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                    {item.stage}
                                </span>

                                <time
                                    dateTime={item.event_date}
                                    className="text-sm font-medium capitalize text-muted-foreground"
                                >
                                    {formattedDate}
                                </time>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
                                {item.title}
                            </h3>

                            <p className="mt-4 leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    )
}