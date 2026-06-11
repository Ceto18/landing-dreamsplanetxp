import { notFound } from 'next/navigation'
import { MissionDetailContent } from '@/components/pages/mission/mission-detail-content'
import { getMissionBySlug, missions } from '@/data/missions'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return missions.map((mission) => ({
        slug: mission.slug,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const mission = getMissionBySlug(slug)

    if (!mission) {
        return {
            title: 'Misión no encontrada | DreamsPlanetXP',
        }
    }

    return {
        title: `${mission.name} | DreamsPlanetXP`,
        description: mission.description,
    }
}

export default async function MissionDetailPage({ params }: Props) {
    const { slug } = await params
    const mission = getMissionBySlug(slug)

    if (!mission) {
        notFound()
    }

    return <MissionDetailContent mission={mission} />
}