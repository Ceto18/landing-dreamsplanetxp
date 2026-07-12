import { notFound } from 'next/navigation'

import { MomentDetailContent } from '@/components/pages/moment/MomentsPageDetail/MomentDetailContent'
import { experienceService } from '@/services/experienceService'

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
        const moment = await experienceService.getMomentBySlug(slug)

        return {
            title: `${moment.title} | DreamsPlanetXP`,
            description: moment.description,
        }
    } catch (error) {
        return {
            title: 'Momento no encontrado | DreamsPlanetXP',
            description:
                'No se pudo encontrar la información de este momento.',
        }
    }
}

export default async function MomentDetailPage({ params }: Props) {
    const { slug } = await params

    try {
        const moment = await experienceService.getMomentBySlug(slug)

        return <MomentDetailContent moment={moment} />
    } catch (error) {
        notFound()
    }
}