import type { Metadata } from 'next'

import MissionsPageClient from '@/components/pages/mission/content/MissionsPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
    title: 'Misiones',

    description:
        'Explora nuestras misiones y experiencias premium alrededor del mundo con DreamsPlanetXP.',

    alternates: {
        canonical: '/mission',
    },

    openGraph: {
        title: 'Misiones | DreamsPlanetXP',
        description:
            'Explora nuestras misiones y experiencias premium alrededor del mundo con DreamsPlanetXP.',
        url: '/mission',
        type: 'website',
    },
}

export default function MissionsPage() {
    return <MissionsPageClient />
}