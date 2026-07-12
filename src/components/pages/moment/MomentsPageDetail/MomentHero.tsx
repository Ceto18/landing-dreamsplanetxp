'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

import type { MomentDetail } from '@/types/home'

interface Props {
    moment: MomentDetail
}

export function MomentHero({ moment }: Props) {
    const mainImage = moment.images?.[0]?.image_url || '/mission-morocco.jpg'

    return (
        <section className="relative min-h-[85vh] overflow-hidden pt-32 pb-20 flex items-center">
            <img
                src={mainImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt={moment.images?.[0]?.name || moment.title}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">   

                <div className="max-w-3xl">
                    <FadeUp delay={0.1}>
                        <p className="text-accent text-sm uppercase tracking-[0.35em]">
                            {moment.mission}
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
                                href="/moment"
                                className="btn-gold inline-flex items-center gap-2 no-underline"
                            >
                                Explorar momentos
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