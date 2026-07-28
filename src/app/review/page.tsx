import type { Metadata } from 'next'

import { ReviewsPageContent } from '@/components/pages/review/ReviewPage/ReviewsPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
    title: 'Reseñas',

    description:
        'Descubre las experiencias y opiniones de viajeros que han vivido momentos únicos con DreamsPlanetXP.',

    alternates: {
        canonical: '/review',
    },

    openGraph: {
        title: 'Reseñas | DreamsPlanetXP',
        description:
            'Descubre las experiencias y opiniones de viajeros que han vivido momentos únicos con DreamsPlanetXP.',
        url: '/review',
        type: 'website',
    },
}

export default function ReviewsPage() {
    return <ReviewsPageContent />
}