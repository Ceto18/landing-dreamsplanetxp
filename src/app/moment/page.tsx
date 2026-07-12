export const dynamic = 'force-dynamic'
export const revalidate = 0

import { MomentsPageContent } from '@/components/pages/moment/MomentsPageContent/MomentsPageContent'

export const metadata = {
    title: 'Experiencias de la misión | DreamsPlanetXP',
    description:
        'Explora las experiencias disponibles para esta misión, con fechas de salida, cupos, duración e inversión.',
}

export default function MomentsPage() {
    return <MomentsPageContent />
}