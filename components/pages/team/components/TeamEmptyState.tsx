'use client'

import { FadeUp } from '@/components/animations/fade-up'

export function TeamEmptyState() {
    return (
        <FadeUp>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center mt-10">
                <p className="text-muted-foreground">
                    No hay miembros disponibles para esta categoría.
                </p>
            </div>
        </FadeUp>
    )
}