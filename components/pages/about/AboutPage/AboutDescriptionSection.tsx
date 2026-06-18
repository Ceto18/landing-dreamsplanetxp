'use client'

import { FadeUp } from '@/components/animations/fade-up'
import { AboutPillarsGrid } from './AboutPillarsGrid'

type Pillar = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    pillars: Pillar[]
}

export function AboutDescriptionSection({ pillars }: Props) {
    return (
        <section className="relative py-16 bg-secondary/30 overflow-hidden">
            <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <FadeUp delay={0.1}>
                        <div className="space-y-6">
                            <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                Nuestra esencia
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Viajes diseñados para convertirse en recuerdos.
                            </h2>

                            <div className="space-y-5 text-muted-foreground leading-relaxed">
                                <p>
                                    DreamsPlanetXP es más que una agencia de viajes.
                                    Somos creadores de experiencias pensadas para conectar
                                    con culturas, personas y destinos de una forma más auténtica.
                                </p>

                                <p>
                                    Cada misión nace desde una planificación cuidadosa:
                                    seleccionamos destinos, momentos, rutas y actividades que
                                    permitan vivir el viaje con tranquilidad, emoción y seguridad.
                                </p>

                                <p>
                                    Nuestro propósito es que cada viajero regrese con algo más
                                    que fotografías: historias, aprendizajes y recuerdos que
                                    permanezcan en el tiempo.
                                </p>
                            </div>
                        </div>
                    </FadeUp>

                    <AboutPillarsGrid pillars={pillars} />
                </div>
            </div>
        </section>
    )
}