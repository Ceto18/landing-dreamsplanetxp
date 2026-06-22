import { FadeUp } from '@/components/animations/fade-up'
import { AboutValueCard } from './AboutValueCard'

type Value = {
    title: string
    description: string
    icon: React.ElementType
}

type Props = {
    values: Value[]
}

export function AboutValues({ values }: Props) {
    return (
        <div className="space-y-12">
            {/* Values Header */}
            <div className="mb-12 space-y-6 text-center">
                <FadeUp>
                    <h3 className="text-5xl sm:text-6xl font-bold text-foreground">
                        Nuestros Valores
                    </h3>
                </FadeUp>

                <FadeUp delay={0.1}>
                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    </div>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Principios que guían cada experiencia, cada destino y cada detalle del viaje.
                    </p>
                </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, idx) => (
                    <AboutValueCard
                        key={value.title}
                        value={value}
                        delay={idx * 0.08}
                    />
                ))}
            </div>
        </div>
    )
}