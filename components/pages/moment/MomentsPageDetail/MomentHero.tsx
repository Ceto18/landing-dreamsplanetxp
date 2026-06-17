'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import type { MomentPhoto } from '@/data/moments'

interface Props {
    moment: MomentPhoto
}

export function MomentHero({ moment }: Props) {
    return (
        <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-20 flex items-center">

            <img
                src={moment.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt={moment.title}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">

                <FadeUp>
                    <Link
                        href="/moment"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-10 no-underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a momentos
                    </Link>
                </FadeUp>

                <div className="max-w-3xl">

                    <FadeUp delay={0.1}>
                        <p className="text-accent text-sm uppercase tracking-[0.35em]">
                            {moment.destination}
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <h1 className="mt-5 text-5xl sm:text-7xl font-extrabold">
                            {moment.title}
                        </h1>
                    </FadeUp>

                    <FadeUp delay={0.3}>
                        <p className="mt-6 text-lg text-muted-foreground">
                            {moment.description}
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.4}>
                        <div className="mt-8 flex gap-4 flex-col sm:flex-row">

                            <Link
                                href="/mission"
                                className="btn-gold inline-flex items-center gap-2 no-underline"
                            >
                                Explorar misiones
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/moment"
                                className="border border-accent/50 px-6 py-2.5 rounded-lg text-accent font-semibold hover:bg-accent/10 no-underline"
                            >
                                Ver otros momentos
                            </Link>

                        </div>
                    </FadeUp>

                </div>
            </div>
        </section>
    )
}