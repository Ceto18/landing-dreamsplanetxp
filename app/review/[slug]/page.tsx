import { notFound } from 'next/navigation'
import { ReviewDetailContent } from '@/components/pages/review/ReviewDetail/ReviewDetailContent'
import { getAllReviews, getReviewBySlug } from '@/data/reviews'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return getAllReviews().map((review) => ({
        slug: review.slug,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const review = getReviewBySlug(slug)

    if (!review) {
        return {
            title: 'Reseña no encontrada',
        }
    }

    return {
        title: `${review.title} | Dreams Planet XP`,
        description: review.quote,
    }
}

export default async function ReviewDetailPage({ params }: Props) {
    const { slug } = await params
    const review = getReviewBySlug(slug)

    if (!review) {
        notFound()
    }

    return <ReviewDetailContent review={review} />
}