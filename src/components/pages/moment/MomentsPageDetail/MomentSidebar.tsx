'use client'

import { ReservationForm } from '@/components/ui/ReservationForm'
import type { MomentPhoto } from '@/data/moments'

export function MomentSidebar({ moment }: { moment: MomentPhoto }) {
    return (
        <aside className="space-y-6">
            <div className="sticky top-28">
                <ReservationForm momentTitle={moment.title} />
            </div>
        </aside>
    )
}