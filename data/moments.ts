export interface Photo {
    id: number
    destination: string
    title: string
    image: string
    description: string
    place: string
    experience: string
    moment: string
    emotion: string
    recommendation: string
    gallery: string[]
}

export interface MomentPhoto extends Photo {
    slug: string
    destinationSlug: string
}

export const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

const destinationSlugMap: Record<string, string> = {
    Marruecos: 'morocco',
    Vietnam: 'vietnam',
    Tailandia: 'thailand',
    Japón: 'japan',
    Nepal: 'nepal',
    Sorpresa: 'surprise',
}

function createPhotos(
    destination: string,
    baseTitle: string,
    image: string,
    description: string,
    place: string,
    experience: string,
    emotion: string,
    recommendation: string,
    gallery: string[]
): Photo[] {
    return Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        destination,
        title: `${baseTitle} ${i + 1}`,
        image,
        description,
        place,
        experience,
        moment: 'Cualquier hora',
        emotion,
        recommendation,
        gallery,
    }))
}

export const momentosData: Record<string, Photo[]> = {
    Marruecos: [
        {
            id: 1,
            destination: 'Marruecos',
            title: 'Atardecer en el desierto',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            description:
                'Un instante entre dunas, silencio y cielo dorado. Una experiencia pensada para viajeros que buscan conectar con el destino más allá de lo turístico.',
            place: 'Desierto de Marruecos',
            experience: 'Atardecer y campamento',
            moment: 'Últimas horas del día',
            emotion: 'Calma, asombro y conexión',
            recommendation:
                'Permite que el silencio del desierto toque tu alma. Este es un momento para desconectar del ruido del mundo.',
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 2,
            destination: 'Marruecos',
            title: 'Mercados de Marrakech',
            image: 'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
            description:
                'La esencia de Marruecos vibra en sus mercados. Colores, aromas y voces que te transportan a siglos de historia.',
            place: 'Medina de Marrakech',
            experience: 'Exploración de zocos tradicionales',
            moment: 'Mañana temprana',
            emotion: 'Fascinación, energía y curiosidad',
            recommendation:
                'Sumérgete en los sentidos, prueba cada aroma y sabor que encuentres.',
            gallery: [
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 3,
            destination: 'Marruecos',
            title: 'Kasbah azul',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            description:
                'Chefchaouen, la ciudad azul que parece sacada de un sueño. Calles pintadas en tonos de azul que crean una atmósfera mágica.',
            place: 'Chefchaouen',
            experience: 'Recorrido por la medina',
            moment: 'Atardecer',
            emotion: 'Magia, serenidad y asombro',
            recommendation:
                'Camina sin rumbo, deja que las calles azules te guíen hacia descubrimientos inesperados.',
            gallery: [
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 4,
            destination: 'Marruecos',
            title: 'Montañas del Atlas',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            description:
                'Cumbres nevadas, pueblos bereberes y vistas infinitas. Las montañas majestuosas que guardan secretos ancestrales.',
            place: 'Atlas Central',
            experience: 'Trekking y encuentros culturales',
            moment: 'Madrugada',
            emotion: 'Grandiosidad y humildad',
            recommendation:
                'Respira el aire puro de las montañas y reflexiona sobre tu lugar en el mundo.',
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 5,
            destination: 'Marruecos',
            title: 'Playa de Essaouira',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
            description:
                'Costas salvajes bañadas por vientos atlánticos. Un contraste perfecto entre el descanso y la aventura.',
            place: 'Puerto de Essaouira',
            experience: 'Paseo costero y gastronomía',
            moment: 'Medio día',
            emotion: 'Libertad y paz',
            recommendation:
                'Prueba el pescado fresco en el puerto y deja que el mar renueve tu espíritu.',
            gallery: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 6,
            destination: 'Marruecos',
            title: 'Riad tradicional',
            image: 'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
            description:
                'Interior de lujo en armonía con la tradición. Un refugio secreto detrás de puertas azules.',
            place: 'Medina de Fez',
            experience: 'Hospedaje de lujo',
            moment: 'Noche',
            emotion: 'Comodidad y autenticidad',
            recommendation:
                'Recarga tus energías en un lugar donde la arquitectura cuenta historias milenarias.',
            gallery: [
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 7,
            destination: 'Marruecos',
            title: 'Oasis de Ait Benhaddou',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            description:
                'Un pueblo de adobe que se eleva como una fortaleza dorada. Patrimonio de la humanidad congelado en el tiempo.',
            place: 'Ait Benhaddou',
            experience: 'Recorrido histórico',
            moment: 'Puesta de sol',
            emotion: 'Nostalgia e inspiración',
            recommendation:
                'Imagina las historias que estas paredes podrían contar si pudieran hablar.',
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            ],
        },
        {
            id: 8,
            destination: 'Marruecos',
            title: 'Noche estrellada',
            image: 'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            description:
                'Bajo un cielo infinito de estrellas. Un momento de conexión cósmica en el corazón del Sahara.',
            place: 'Desierto profundo',
            experience: 'Noche bajo las estrellas',
            moment: 'Noche profunda',
            emotion: 'Asombro y trascendencia',
            recommendation:
                'Apaga tu teléfono y mira hacia arriba. Aquí descubrirás tu verdadero tamaño en el universo.',
            gallery: [
                'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
            ],
        },
    ],
    Vietnam: createPhotos(
        'Vietnam',
        'Momento en Vietnam',
        'https://images.unsplash.com/photo-1528127269029-c4b9e67ad96f?w=600&h=600&fit=crop',
        'Una experiencia mágica en tierras vietnamitas que transformará tu perspectiva.',
        'Vietnam',
        'Exploración cultural',
        'Fascinación',
        'Vive cada momento plenamente.',
        [
            'https://images.unsplash.com/photo-1528127269029-c4b9e67ad96f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
        ]
    ),
    Tailandia: createPhotos(
        'Tailandia',
        'Momento en Tailandia',
        'https://images.unsplash.com/photo-1506457925148-2affa5f27f70?w=600&h=600&fit=crop',
        'La magia de Tailandia espera en cada esquina para sorprenderte.',
        'Tailandia',
        'Aventura tailandesa',
        'Aventura',
        'Atrévete a descubrir lo desconocido.',
        [
            'https://images.unsplash.com/photo-1506457925148-2affa5f27f70?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
        ]
    ),
    Japón: createPhotos(
        'Japón',
        'Momento en Japón',
        'https://images.unsplash.com/photo-1522383150241-6c85cf17422b?w=600&h=600&fit=crop',
        'Japón, donde la tradición y modernidad conviven en perfecta armonía.',
        'Japón',
        'Inmersión japonesa',
        'Armonía',
        'Aprende la filosofía del equilibrio.',
        [
            'https://images.unsplash.com/photo-1522383150241-6c85cf17422b?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
        ]
    ),
    Nepal: createPhotos(
        'Nepal',
        'Momento en Nepal',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
        'Nepal, donde las montañas sagradas hablan a tu alma.',
        'Nepal',
        'Conexión espiritual',
        'Espiritualidad',
        'Escucha tu corazón en silencio.',
        [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
        ]
    ),
    Sorpresa: createPhotos(
        'Sorpresa',
        'Momento Sorpresa',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
        'Un destino misterioso que desafiará tus expectativas y redefinirá tus límites.',
        'Destino Secreto',
        'Lo inesperado',
        'Intriga y emoción',
        'Confía en el proceso y prepárate para lo extraordinario.',
        [
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494391828871-e56bde99b51b?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1495368143848-9f21ffa880ce?w=600&h=600&fit=crop',
        ]
    ),
}

export function getAllMoments(): MomentPhoto[] {
    return Object.values(momentosData).flatMap((photos) =>
        photos.map((photo) => {
            const destinationSlug = destinationSlugMap[photo.destination] || photo.destination.toLowerCase()

            return {
                ...photo,
                destinationSlug,
                slug: `${destinationSlug}-${photo.id}`,
            }
        })
    )
}

export function getMomentBySlug(slug: string) {
    return getAllMoments().find((moment) => moment.slug === slug)
}