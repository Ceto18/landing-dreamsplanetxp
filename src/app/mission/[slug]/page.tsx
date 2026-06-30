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

const EXPERIENCES_PER_PAGE = 9

export async function generateStaticParams() {
    try {
        const tabs = await missionService.getMissionTabs()

        const slugs: { slug: string }[] = []

        for (const tab of tabs) {
            const firstPage =
                await missionService.getExperiencesByMissionSlug(
                    tab.slug,
                    1,
                    EXPERIENCES_PER_PAGE
                )

            firstPage.data.forEach((experience) => {
                slugs.push({
                    slug: experience.slug,
                })
            })

            const totalPages = firstPage.last_page ?? 1

            for (let page = 2; page <= totalPages; page += 1) {
                const response =
                    await missionService.getExperiencesByMissionSlug(
                        tab.slug,
                        page,
                        EXPERIENCES_PER_PAGE
                    )

                response.data.forEach((experience) => {
                    slugs.push({
                        slug: experience.slug,
                    })
                })
            }
        }

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

    try {
        const experience = await missionService.getExperienceBySlug(slug)

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
    } catch (error) {
        console.error('Error al obtener experiencia:', error)

        notFound()
    }
}