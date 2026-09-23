export interface Mission {
    id: number
    slug: string
    name: string
    destination: string
    subtitle: string
    image: string
    heroImage: string
    duration: string
    date: string
    group: string
    rating: string
    level: string
    price: string
    description: string
    pdfUrl?: string
    longDescription: string
    highlights: string[]
    includes: string[]
    itinerary: {
        day: string
        title: string
        description: string
    }[]
    gallery: string[]
    isSurprise?: boolean
}

export const missions: Mission[] = [
    {
        id: 1,
        slug: 'marruecos',
        name: 'Misión Marruecos',
        destination: 'Marruecos',
        subtitle: 'Desierto mágico, cultura viva y noches bajo las estrellas.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: '8 días / 7 noches',
        date: '15 Julio 2026',
        group: '12/18 plazas',
        rating: '4.9',
        level: 'Intermedio',
        price: 'Desde $1,490',
        pdfUrl: '/pdf/morocco.pdf',
        description:
            'Una expedición diseñada para vivir el desierto, los zocos, la arquitectura tradicional y la magia de Marruecos.',
        longDescription:
            'Marruecos es una misión pensada para viajeros que buscan una ruta intensa, cultural y visualmente inolvidable. Desde los mercados llenos de vida hasta las noches bajo el cielo del desierto, cada momento está diseñado para conectar con el destino de forma auténtica, segura y memorable.',
        highlights: [
            'Campamento premium en el desierto',
            'Recorrido por Marrakech',
            'Ruta cultural local',
            'Guías especializados',
        ],
        includes: [
            'Hospedaje seleccionado',
            'Acompañamiento de coordinadores',
            'Traslados internos',
            'Rutas culturales',
            'Asistencia durante la misión',
            'Actividades grupales',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Llegada y bienvenida',
                description:
                    'Recepción del grupo, presentación del equipo y primera inmersión en la cultura local.',
            },
            {
                day: 'Día 2',
                title: 'Marrakech y sus zocos',
                description:
                    'Recorrido por mercados tradicionales, plazas históricas y rincones llenos de color.',
            },
            {
                day: 'Día 3',
                title: 'Ruta hacia el desierto',
                description:
                    'Viaje por paisajes únicos hasta llegar al inicio de la ruta en dunas.',
            },
            {
                day: 'Día 4',
                title: 'Noche bajo las estrellas',
                description:
                    'Campamento, atardecer, cena especial y ruta nocturna en el desierto.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
    },
    {
        id: 2,
        slug: 'vietnam',
        name: 'Misión Vietnam',
        destination: 'Vietnam',
        subtitle: 'Bahías, templos, cultura local y paisajes inolvidables.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: '10 días / 9 noches',
        date: '20 Agosto 2026',
        group: '10/16 plazas',
        rating: '4.8',
        level: 'Fácil',
        price: 'Desde $1,690',
        pdfUrl: '/pdf/vietnam.pdf',
        description:
            'Una ruta pensada para descubrir la esencia de Vietnam entre ciudades vibrantes, naturaleza y gastronomía.',
        longDescription:
            'Vietnam combina paisajes naturales impresionantes, cultura milenaria y una gastronomía reconocida mundialmente. Esta misión está diseñada para quienes buscan una ruta equilibrada entre exploración, descanso, conexión cultural y momentos memorables.',
        highlights: [
            'Ha Long Bay',
            'Mercados tradicionales',
            'Gastronomía vietnamita',
            'Rutas culturales',
        ],
        includes: [
            'Hospedaje seleccionado',
            'Coordinadores de misión',
            'Traslados internos',
            'Actividades culturales',
            'Asistencia en ruta',
            'Rutas gastronómicas',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Llegada a Vietnam',
                description:
                    'Recepción del grupo, introducción al destino y briefing de la misión.',
            },
            {
                day: 'Día 2',
                title: 'Exploración cultural',
                description:
                    'Recorrido por zonas tradicionales, templos y mercados locales.',
            },
            {
                day: 'Día 3',
                title: 'Naturaleza y bahía',
                description:
                    'Ruta escénica en paisajes naturales y navegación.',
            },
            {
                day: 'Día 4',
                title: 'Gastronomía local',
                description:
                    'Ruta de sabores vietnamitas y rutas culinarias seleccionadas.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
    },
    {
        id: 3,
        slug: 'tailandia',
        name: 'Misión Tailandia',
        destination: 'Tailandia',
        subtitle: 'Playas exóticas, templos sagrados y aventura tropical.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: '9 días / 8 noches',
        date: '12 Septiembre 2026',
        group: '14/20 plazas',
        rating: '4.9',
        level: 'Fácil',
        price: 'Desde $1,590',
        pdfUrl: '/pdf/thailand.pdf',
        description:
            'Una ruta vibrante entre playas, cultura, templos y actividades tropicales.',
        longDescription:
            'Tailandia es una misión para quienes desean combinar aventura, descanso, cultura y paisajes paradisíacos. El recorrido está pensado para vivir momentos auténticos sin perder comodidad, seguridad ni acompañamiento.',
        highlights: [
            'Playas paradisíacas',
            'Templos emblemáticos',
            'Ruta gastronómica',
            'Actividades grupales',
        ],
        includes: [
            'Hospedaje seleccionado',
            'Actividades guiadas',
            'Traslados internos',
            'Rutas en playa',
            'Acompañamiento del equipo',
            'Asistencia durante la ruta',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Bienvenida tropical',
                description:
                    'Llegada, recepción y primera conexión con el ambiente tailandés.',
            },
            {
                day: 'Día 2',
                title: 'Templos y cultura',
                description:
                    'Recorrido por espacios culturales y espirituales representativos.',
            },
            {
                day: 'Día 3',
                title: 'Playas y descanso',
                description:
                    'Día dedicado a disfrutar paisajes costeros y actividades relajadas.',
            },
            {
                day: 'Día 4',
                title: 'Ruta gastronómica',
                description:
                    'Sabores tailandeses y momentos de integración grupal.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
    },
    {
        id: 4,
        slug: 'japon',
        name: 'Misión Japón',
        destination: 'Japón',
        subtitle: 'Tradición, modernidad y una cultura que sorprende.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: '11 días / 10 noches',
        date: '18 Octubre 2026',
        group: '8/14 plazas',
        rating: '5.0',
        level: 'Intermedio',
        price: 'Desde $2,290',
        pdfUrl: '/pdf/japan.pdf',
        description:
            'Un viaje premium para descubrir Japón entre templos, ciudades modernas y paisajes únicos.',
        longDescription:
            'Japón es una misión pensada para viajeros que desean vivir una mezcla única entre tradición, tecnología, orden, gastronomía y belleza visual. Cada etapa está diseñada para experimentar el destino con profundidad y comodidad.',
        highlights: [
            'Tokio y Kioto',
            'Ruta cultural japonesa',
            'Templos y jardines',
            'Ruta gastronómica',
        ],
        includes: [
            'Hospedaje seleccionado',
            'Coordinación de ruta',
            'Traslados internos',
            'Rutas culturales',
            'Acompañamiento del equipo',
            'Asistencia durante el viaje',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Llegada a Japón',
                description:
                    'Recepción, adaptación inicial y presentación de la misión.',
            },
            {
                day: 'Día 2',
                title: 'Tokio moderno',
                description:
                    'Exploración de zonas urbanas, cultura pop y vida local.',
            },
            {
                day: 'Día 3',
                title: 'Tradición y templos',
                description:
                    'Recorrido por espacios históricos y culturales.',
            },
            {
                day: 'Día 4',
                title: 'Ruta gastronómica',
                description:
                    'Ruta culinaria japonesa en puntos seleccionados.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
    },
    {
        id: 5,
        slug: 'nepal',
        name: 'Misión Nepal',
        destination: 'Nepal',
        subtitle: 'Montañas, espiritualidad y conexión interior.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: '12 días / 11 noches',
        date: '10 Noviembre 2026',
        group: '9/15 plazas',
        rating: '4.9',
        level: 'Avanzado',
        price: 'Desde $1,990',
        pdfUrl: '/pdf/nepal.pdf',
        description:
            'Una misión para quienes buscan naturaleza, montaña, cultura espiritual y transformación personal.',
        longDescription:
            'Nepal es una misión de conexión. Montañas, templos, comunidades locales y paisajes imponentes forman parte de una ruta diseñada para quienes buscan algo más que un viaje: una pausa profunda y significativa.',
        highlights: [
            'Paisajes del Himalaya',
            'Ruta espiritual',
            'Trekking guiado',
            'Cultura local',
        ],
        includes: [
            'Hospedaje seleccionado',
            'Guías especializados',
            'Actividades de montaña',
            'Asistencia en ruta',
            'Rutas culturales',
            'Coordinación del grupo',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Llegada y adaptación',
                description:
                    'Recepción del grupo y primera introducción al destino.',
            },
            {
                day: 'Día 2',
                title: 'Cultura local',
                description:
                    'Recorrido por espacios culturales y comunidades locales.',
            },
            {
                day: 'Día 3',
                title: 'Ruta de montaña',
                description:
                    'Inicio de ruta natural con acompañamiento especializado.',
            },
            {
                day: 'Día 4',
                title: 'Conexión espiritual',
                description:
                    'Momento de calma, reflexión y contacto con el entorno.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
    },
    {
        id: 6,
        slug: 'sorpresa',
        name: 'Misión Sorpresa',
        destination: 'Sorpresa',
        subtitle: 'Un destino secreto preparado para viajeros atrevidos.',
        image: '/mission-morocco.jpg',
        heroImage: '/mission-morocco.jpg',
        duration: 'Por revelar',
        date: 'Próximamente',
        group: 'Cupos limitados',
        rating: '5.0',
        level: 'Sorpresa',
        price: 'Por anunciar',
        pdfUrl: '/pdf/sorpresa.pdf',
        description:
            'Una ruta misteriosa diseñada para quienes quieren dejarse sorprender.',
        longDescription:
            'La Misión Sorpresa está pensada para viajeros que quieren salir de lo esperado. El destino, la ruta y varias rutas se revelan progresivamente para mantener la emoción hasta el final.',
        highlights: [
            'Destino secreto',
            'Ruta exclusiva',
            'Grupo reducido',
            'Aventura inesperada',
        ],
        includes: [
            'Ruta secreta',
            'Acompañamiento completo',
            'Rutas seleccionadas',
            'Soporte del equipo',
            'Actividades sorpresa',
            'Coordinación premium',
        ],
        itinerary: [
            {
                day: 'Día 1',
                title: 'Inicio de la sorpresa',
                description:
                    'Primer contacto con la misión y revelación inicial del concepto.',
            },
            {
                day: 'Día 2',
                title: 'Primera ruta',
                description:
                    'Actividad principal preparada para iniciar la aventura.',
            },
            {
                day: 'Día 3',
                title: 'Destino revelado',
                description:
                    'Momento especial donde se descubre una parte importante de la misión.',
            },
            {
                day: 'Día 4',
                title: 'Cierre memorable',
                description:
                    'Ruta final diseñada para cerrar la misión con impacto.',
            },
        ],
        gallery: [
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
            '/mission-morocco.jpg',
        ],
        isSurprise: true,
    },
]

export function getMissionBySlug(slug: string) {
    return missions.find((mission) => mission.slug === slug)
}