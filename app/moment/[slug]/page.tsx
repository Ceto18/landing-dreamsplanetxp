import { notFound } from 'next/navigation'
import { MomentDetailContent } from '@/components/pages/moment/moment-detail-content'
import { getAllMoments, getMomentBySlug } from '@/data/moments'

interface Props {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return getAllMoments().map((moment) => ({
        slug: moment.slug,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const moment = getMomentBySlug(slug)

    if (!moment) {
        return {
            title: 'Momento no encontrado | DreamsPlanetXP',
        }
    }

    return {
        title: `${moment.title} | DreamsPlanetXP`,
        description: moment.description,
    }
}

export default async function MomentDetailPage({ params }: Props) {
    const { slug } = await params
    const moment = getMomentBySlug(slug)

    if (!moment) {
        notFound()
    }

    return <MomentDetailContent moment={moment} />
}