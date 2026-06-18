'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'

import { AboutValueCard } from './AboutValueCard'

type Value = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    values: Value[]
}

export function AboutValuesSection({ values }: Props) {
    return (
        <section className="relative py-20 bg-secondary/30 overflow-hidden">
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Nuestros Valores"
                    description="Principios que guían cada experiencia, cada destino y cada detalle del viaje."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, idx) => (
                        <AboutValueCard
                            key={value.title}
                            value={value}
                            delay={0.12 + idx * 0.06}
                        />
                    ))}
                </div>

                <FadeUp delay={0.22}>
                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/mission"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300 no-underline group"
                        >
                            Ver nuestras misiones
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}