export type Review = {
    id: number
    name: string
    location: string
    comment: string
    rating: number
    missionName: string
    momentName: string
    momentSlug: string
    videoUrl?: string | null
    imageUrl?: string | null
    createdAt: string
}

export type ReviewMomentOption = {
    title: string
    slug: string
}

const reviews: Review[] = [
    {
        id: 1,
        name: 'María Fernández',
        location: 'Madrid, España',
        comment:
            'Una experiencia inolvidable. La organización y el acompañamiento superaron mis expectativas.',
        rating: 5,
        missionName: 'Misión Islandia',
        momentName: 'Auroras boreales',
        momentSlug: 'auroras-boreales',
        imageUrl: '/reviews/review-1.jpg',
        videoUrl: null,
        createdAt: '2026-06-18',
    },
    {
        id: 2,
        name: 'Carlos Mendoza',
        location: 'Lima, Perú',
        comment:
            'Cada momento estuvo cuidadosamente preparado. Fue una experiencia distinta y muy especial.',
        rating: 5,
        missionName: 'Misión Australia',
        momentName: 'Australian Camp',
        momentSlug: 'australian-camp',
        imageUrl: '/reviews/review-2.jpg',
        videoUrl: null,
        createdAt: '2026-05-12',
    },
    {
        id: 3,
        name: 'Lucía Romero',
        location: 'Barcelona, España',
        comment:
            'Me llevo recuerdos increíbles, nuevas amistades y muchas ganas de volver a viajar con ellos.',
        rating: 4,
        missionName: 'Misión Marruecos',
        momentName: 'Atardecer en el desierto',
        momentSlug: 'atardecer-en-el-desierto',
        imageUrl: '/reviews/review-3.jpg',
        videoUrl: '/reviews/videos/australian-camp.mp4',
        createdAt: '2026-04-25',
    },
]

export const reviewMomentOptions: ReviewMomentOption[] = [
    {
        title: 'Auroras boreales',
        slug: 'auroras-boreales',
    },
    {
        title: 'Australian Camp',
        slug: 'australian-camp',
    },
    {
        title: 'Atardecer en el desierto',
        slug: 'atardecer-en-el-desierto',
    },
]

export function getAllReviews(): Review[] {
    return reviews
}

const totalReviews = reviews.length

const averageRating =
    totalReviews > 0
        ? reviews.reduce(
              (total, review) => total + review.rating,
              0
          ) / totalReviews
        : 0

const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5
).length

const satisfactionPercentage =
    totalReviews > 0
        ? Math.round(
              (fiveStarReviews / totalReviews) * 100
          )
        : 0

const uniqueMoments = new Set(
    reviews.map((review) => review.momentSlug)
).size

export const reviewMetrics = [
    {
        label: 'Reseñas publicadas',
        value: totalReviews,
    },
    {
        label: 'Valoración promedio',
        value: `${averageRating.toFixed(1)}/5`,
    },
    {
        label: 'Momentos valorados',
        value: uniqueMoments,
    },
    {
        label: 'Satisfacción',
        value: `${satisfactionPercentage}%`,
    },
]