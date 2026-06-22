'use client'

import Image from 'next/image'
import { AnimatedCard } from '@/components/animations/animated-card'

type TimelineItem = {
    id: string | number
    year: string
    title: string
    description: string
    image: string
}

type Props = {
    item: TimelineItem
    index: number
}

export function AboutTimelineItem({ item, index }: Props) {
    const isLeft = index % 2 === 0

    return (
        <AnimatedCard
            delay={0.12 + index * 0.08}
            className="relative"
        >
            {/* Punto central desktop */}
            <div className="hidden lg:flex absolute left-1/2 top-10 z-20 -translate-x-1/2">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 shadow-xl">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
                    <div className="relative h-5 w-5 rounded-full bg-accent" />
                </div>
            </div>

            {/* Punto móvil */}
            <div className="lg:hidden absolute left-0 top-8 z-20">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 shadow-xl">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
                    <div className="relative h-4 w-4 rounded-full bg-accent" />
                </div>
            </div>

            <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center pl-14 lg:pl-0 ${
                    isLeft ? '' : 'lg:[&>*:first-child]:order-2'
                }`}
            >
                {/* Imagen */}
                <div className={isLeft ? 'lg:pr-12' : 'lg:pl-12'}>
                    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-xl glass-effect">
                        <div className="relative h-64 sm:h-80">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                            <div className="absolute bottom-5 left-5 rounded-full border border-accent/30 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-md">
                                {item.year}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Texto */}
                <div className={isLeft ? 'lg:pl-12' : 'lg:pr-12'}>
                    <div className="relative rounded-3xl border border-border/60 bg-card/40 p-7 md:p-8 shadow-lg glass-effect hover:border-accent/60 hover:bg-card/70 transition-all">
                        {/* Conector desktop */}
                        <div
                            className={`hidden lg:block absolute top-14 h-px w-14 bg-gradient-to-r ${
                                isLeft
                                    ? 'left-[-3.5rem] from-accent/70 to-transparent'
                                    : 'right-[-3.5rem] from-transparent to-accent/70'
                            }`}
                        />

                        <div className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                            {item.year}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            {item.title}
                        </h3>

                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    )
}