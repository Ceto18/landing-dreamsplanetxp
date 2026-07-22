import type { ElementType } from 'react'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'

import { AboutValueCard } from './AboutValueCard'

type Value = {
    title: string
    description: string
    icon: ElementType
}

type Props = {
    values: Value[]
}

export function AboutValuesSection({
    values,
}: Props) {
    return (
        <section className="relative overflow-hidden bg-secondary/30 py-20">
            <div className="absolute bottom-20 left-0 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Nuestros Valores"
                    description="Principios que guían cada experiencia, cada destino y cada detalle del viaje."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((value, index) => (
                        <AboutValueCard
                            key={value.title}
                            value={value}
                            delay={0.12 + index * 0.06}
                        />
                    ))}
                </div>

                <FadeUp delay={0.22}>
                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/mission"
                            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3 font-semibold text-background no-underline transition-all duration-300 hover:bg-accent/90"
                        >
                            Ver nuestras misiones

                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}