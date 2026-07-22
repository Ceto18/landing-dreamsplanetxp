import { FadeUp } from '@/components/animations/fade-up'

export function ContactIntro() {
    return (
        <div className="space-y-4">
            <FadeUp delay={0.1}>
                <h3 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Reserva tu{' '}
                    <span className="text-accent">
                        aventura
                    </span>
                </h3>
            </FadeUp>

            <FadeUp delay={0.18}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                    Escríbenos para resolver tus dudas, separar tu cupo o
                    recibir asesoría personalizada.
                </p>
            </FadeUp>
        </div>
    )
}