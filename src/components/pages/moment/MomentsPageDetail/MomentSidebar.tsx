'use client'

import { ReservationForm } from '@/components/ui/ReservationForm'

import type { MomentDetail } from '@/types/home'

export function MomentSidebar({ moment }: { moment: MomentDetail }) {
    return (
        <aside className="space-y-6">
            <div className="sticky top-28">
                <ReservationForm momentTitle={moment.title} />
            </div>
        </aside>
    )
}