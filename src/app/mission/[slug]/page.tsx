import { notFound } from 'next/navigation'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { MissionHero } from '@/components/pages/mission/detail/MissionHero'
import { MissionSummary } from '@/components/pages/mission/detail/MissionSummary'
import { MissionMain } from '@/components/pages/mission/detail/MissionMain'
import { MissionCTA } from '@/components/pages/mission/detail/MissionCTA'

import { missionService } from '@/services/missionService'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    try {
        const response = await missionService.getAllMissions()

        const slugs = response.data.flatMap((countryGroup) =>
            countryGroup.mission_experiences.flatMap((mission) =>
                mission.experiences.map((experience) => ({
                    slug: experience.slug,
                }))
            )
        )

        return slugs
    } catch (error) {
        console.error('Error al generar rutas estáticas de experiencias:', error)
        return []
    }
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params

    try {
        const experience = await missionService.getExperienceBySlug(slug)

        return {
            title: `${experience.name} | DreamsPlanetXP`,
            description:
                experience.short_description ||
                experience.subtitle ||
                'Experiencia premium de DreamsPlanetXP',
        }
    } catch {
        return {
            title: 'Experiencia no encontrada | DreamsPlanetXP',
        }
    }
}

export default async function MissionDetailPage({ params }: Props) {
    const { slug } = await params

    let experience = null

    try {
        experience = await missionService.getExperienceBySlug(slug)
    } catch (error) {
        console.error('Error al obtener experiencia:', error)
        notFound()
    }

    if (!experience) {
        notFound()
    }

    return (
        <>
            <Header />

            <MissionHero mission={experience} />

            <MissionSummary mission={experience} />

            <MissionMain mission={experience} />

            <MissionCTA mission={experience} />

            <Footer />
        </>
    )
}