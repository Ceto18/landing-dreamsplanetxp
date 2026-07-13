import { notFound } from 'next/navigation'

import { teamService } from '@/services/teamService'
import { InfluencerDetailContent } from '@/components/pages/team/InfluencerPageDetail/InfluencerDetailContent'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: Props) {
    const { slug } = await params

    try {
        const member = await teamService.getPersonBySlug(slug)

        return {
            title: `${member.fullname} | DreamsPlanetXP`,
            description:
                member.bio ||
                `Conoce la experiencia, especialidad y trayectoria de ${member.fullname}.`,
        }
    } catch (error) {
        console.error(
            `Error generando metadata del influencer ${slug}:`,
            error
        )

        return {
            title: 'Influencer no encontrado | DreamsPlanetXP',
            description:
                'No se pudo encontrar la información de este influencer.',
        }
    }
}

export default async function InfluencerDetailPage({
    params,
}: Props) {
    const { slug } = await params

    try {
        const member = await teamService.getPersonBySlug(slug)

        return <InfluencerDetailContent member={member} />
    } catch (error) {
        console.error(
            `Error obteniendo el influencer ${slug}:`,
            error
        )

        notFound()
    }
}
