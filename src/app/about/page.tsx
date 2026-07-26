import { AboutPageContent } from '@/components/pages/about/AboutPage/AboutPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
    title: 'Quiénes Somos | DreamsPlanetXP',
    description:
        'Conoce DreamsPlanetXP, nuestra historia, filosofía y pasión por crear experiencias premium alrededor del mundo.',
}

export default function AboutPage() {
    return <AboutPageContent />
}