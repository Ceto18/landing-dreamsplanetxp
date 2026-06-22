'use client'

import { FadeUp } from '@/components/animations/fade-up'

export function MissionsEmpty() {
    return (
        <FadeUp>
            <div className="rounded-2xl border p-10 text-center text-muted-foreground">
                No hay misiones disponibles para esta categoría.
            </div>
        </FadeUp>
    )
}