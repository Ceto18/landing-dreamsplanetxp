export type Review = {
    id: number
    slug: string
    quote: string
    traveler: string
    mission: string
    rating: number
    title: string
    date: string
    location: string
    experience: string
    highlights: string[]
}

export type ReviewMetric = {
    label: string
    value: string
}

export const reviews: Review[] = [
    {
        id: 1,
        slug: 'maria-gonzalez-marruecos',
        quote: 'Una experiencia que transformó mi forma de viajar. Cada detalle fue perfecto.',
        traveler: 'María González',
        mission: 'Marruecos',
        rating: 5,
        title: 'Increíble',
        date: 'Abril 2025',
        location: 'Marruecos',
        experience:
            'Desde el primer día sentí que todo estaba organizado con mucho cuidado. Los paisajes, la cultura, la comida y el acompañamiento hicieron que el viaje fuera una experiencia muy especial.',
        highlights: [
            'Acompañamiento constante durante la misión',
            'Itinerario bien organizado',
            'Experiencias culturales auténticas',
            'Guías atentos y profesionales',
        ],
    },
    {
        id: 2,
        slug: 'carlos-rodriguez-vietnam',
        quote: 'Los guías fueron excepcionales, la comida deliciosa, y los momentos inolvidables.',
        traveler: 'Carlos Rodríguez',
        mission: 'Vietnam',
        rating: 5,
        title: 'Recomendado',
        date: 'Julio 2025',
        location: 'Vietnam',
        experience:
            'Vietnam fue una misión llena de aprendizajes y momentos únicos. Cada actividad estuvo pensada para conectar con la cultura local y disfrutar el destino con tranquilidad.',
        highlights: [
            'Excelente atención de los guías',
            'Gastronomía local memorable',
            'Actividades bien planificadas',
            'Ambiente seguro y organizado',
        ],
    },
    {
        id: 3,
        slug: 'ana-martinez-tailandia',
        quote: 'Superó todas mis expectativas. Volvería en un segundo.',
        traveler: 'Ana Martínez',
        mission: 'Tailandia',
        rating: 5,
        title: 'Perfecto',
        date: 'Agosto 2025',
        location: 'Tailandia',
        experience:
            'La misión combinó aventura, descanso y cultura de una manera increíble. Me sentí acompañada en todo momento y pude disfrutar sin preocuparme por la organización.',
        highlights: [
            'Destino lleno de energía y cultura',
            'Buena coordinación del equipo',
            'Experiencias visualmente increíbles',
            'Momentos ideales para conectar con otros viajeros',
        ],
    },
    {
        id: 4,
        slug: 'juan-perez-japon',
        quote: 'La mejor inversión que he hecho en mi vida. Gracias por todo.',
        traveler: 'Juan Pérez',
        mission: 'Japón',
        rating: 5,
        title: 'Vida Cambiada',
        date: 'Octubre 2025',
        location: 'Japón',
        experience:
            'Japón fue una experiencia que me marcó. La mezcla entre tradición, tecnología, orden y cultura hizo que cada día se sintiera diferente e inolvidable.',
        highlights: [
            'Experiencia cultural profunda',
            'Itinerario variado y ordenado',
            'Excelente manejo de tiempos',
            'Acompañamiento profesional',
        ],
    },
    {
        id: 5,
        slug: 'isabel-sanchez-nepal',
        quote: 'Profesionalismo, seguridad y diversión garantizados en cada paso del camino.',
        traveler: 'Isabel Sánchez',
        mission: 'Nepal',
        rating: 5,
        title: 'Excelencia',
        date: 'Noviembre 2025',
        location: 'Nepal',
        experience:
            'Nepal fue una misión llena de paisajes, aprendizaje y conexión personal. La organización permitió vivir la aventura con confianza y seguridad.',
        highlights: [
            'Paisajes impresionantes',
            'Sensación de seguridad durante el viaje',
            'Equipo humano muy atento',
            'Experiencia espiritual y cultural',
        ],
    },
]

export const reviewMetrics: ReviewMetric[] = [
    { label: 'Viajeros Satisfechos', value: '500+' },
    { label: 'Destinos Explorados', value: '6' },
    { label: 'Calificación Promedio', value: '4.9★' },
    { label: 'Años de Experiencia', value: '5' },
]

export function getAllReviews() {
    return reviews
}

export function getFeaturedReviews(limit = 5) {
    return reviews.slice(0, limit)
}

export function getReviewBySlug(slug: string) {
    return reviews.find((review) => review.slug === slug)
}

export function getRelatedReviews(currentSlug: string, limit = 3) {
    return reviews
        .filter((review) => review.slug !== currentSlug)
        .slice(0, limit)
}