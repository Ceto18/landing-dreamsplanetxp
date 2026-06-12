import { notFound } from 'next/navigation'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { MissionHero } from '@/components/pages/mission/detail/MissionHero'
import { MissionSummary } from '@/components/pages/mission/detail/MissionSummary'
import { MissionMain } from '@/components/pages/mission/detail/MissionMain'
import { MissionCTA } from '@/components/pages/mission/detail/MissionCTA'

import { getMissionBySlug, missions } from '@/data/missions'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return missions.map((m) => ({
        slug: m.slug,
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

    return (
        <>
            <Header />

            <MissionHero mission={mission} />
            <MissionSummary mission={mission} />

            <MissionMain mission={mission} />

            <MissionCTA mission={mission} />

            <Footer />
        </>
    )
}