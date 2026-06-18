import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

export function AboutMainContent() {
    return (
        <div className="space-y-8">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
                <FadeUp delay={0.1}>
                    <p className="text-lg">
                        DreamsPlanetXP es más que una agencia de viajes. Somos artesanos de experiencias,
                        creadores de recuerdos que perduran para toda la vida.
                    </p>
                </FadeUp>

                <FadeUp delay={0.18}>
                    <p className="text-lg">
                        Nacimos con la visión de transformar la forma en que las personas viajan,
                        enfocándonos en la calidad, la autenticidad y la conexión humana.
                    </p>
                </FadeUp>

                <FadeUp delay={0.26}>
                    <p className="text-lg">
                        Cada misión es cuidadosamente diseñada por nuestro equipo de expertos,
                        considerando cada detalle para garantizar una experiencia inolvidable.
                    </p>
                </FadeUp>
            </div>

            <FadeUp delay={0.34}>
                <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300 no-underline group"
                >
                    Conocer más
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </FadeUp>
        </div>
    )
}