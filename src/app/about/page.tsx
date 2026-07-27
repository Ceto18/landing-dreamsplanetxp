import type { Metadata } from 'next'

import { AboutPageContent } from '@/components/pages/about/AboutPage/AboutPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
    title: 'Quiénes Somos',

    description:
        'Conoce DreamsPlanetXP, nuestra historia, filosofía y pasión por crear experiencias premium alrededor del mundo.',

    alternates: {
        canonical: '/about',
    },

    openGraph: {
        title: 'Quiénes Somos | DreamsPlanetXP',
        description:
            'Conoce DreamsPlanetXP, nuestra historia, filosofía y pasión por crear experiencias premium alrededor del mundo.',
        url: '/about',
        type: 'website',
    },
}

export default function AboutPage() {
    return <AboutPageContent />
}