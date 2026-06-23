'use client'

import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    title?: string
    description?: string
}

export function MissionsEmpty({
    title = 'No hay misiones disponibles',
    description = 'No encontramos misiones disponibles para esta categoría.',
}: Props) {
    return (
        <FadeUp>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="rounded-2xl border border-border/60 bg-card/40 glass-effect p-10 text-center shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground">
                        {title}
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </section>
        </FadeUp>
    )
}