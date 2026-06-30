export const dynamic = 'force-dynamic'
export const revalidate = 0

import { MomentsPageContent } from '@/components/pages/moment/MomentsPageContent'

export const metadata = {
    title: 'Momentos | DreamsPlanetXP',
    description:
        'Explora los mejores momentos capturados en nuestras misiones premium alrededor del mundo.',
}

export default function MomentsPage() {
    return <MomentsPageContent />
}