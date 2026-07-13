'use client'

import { UsersRound } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

export function TeamEmptyState() {
    return (
        <FadeUp>
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-16 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                    <UsersRound className="h-8 w-8" />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                    Próximamente conocerás a este equipo
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Estamos preparando la información de las personas que
                    formarán parte de esta misión. Explora otra categoría o
                    destino para descubrir más integrantes.
                </p>
            </div>
        </FadeUp>
    )
}
