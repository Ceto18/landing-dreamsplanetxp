'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp } from '@/components/animations/fade-up'
import { ImageReveal } from '@/components/animations/image-reveal'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'

interface Photo {
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

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

const createPhotos = (
    destination: string,
    baseTitle: string,
    image: string,
    description: string,
    place: string,
    experience: string,
    emotion: string,
    recommendation: string,
    gallery: string[]
): Photo[] =>
    Array.from({ length: 8 }, (_, i) => ({
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

const momentosData: Record<string, Photo[]> = {
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

export function Moment() {
    const [activeDestination, setActiveDestination] = useState<string>(destinations[0])
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const filteredPhotos = momentosData[activeDestination] || []

    const handleNextImage = () => {
        if (!selectedPhoto?.gallery) return

        setCurrentImageIndex((prev) => (prev + 1) % selectedPhoto.gallery.length)
    }

    const handlePrevImage = () => {
        if (!selectedPhoto?.gallery) return

        setCurrentImageIndex(
            (prev) => (prev - 1 + selectedPhoto.gallery.length) % selectedPhoto.gallery.length
        )
    }

    const handleChangeDestination = (destination: string) => {
        setActiveDestination(destination)
        setCurrentImageIndex(0)
        setSelectedPhoto(null)
    }

    return (
        <section id="momentos" className="relative py-24 bg-secondary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mt-48" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Momentos"
                    description="Cada foto es un recuerdo eterno. Cada imagen cuenta la historia de una transformación personal."
                />

                {/* Destination Tabs */}
                <FadeUp delay={0.15} className="mb-12 flex justify-center">
                    <div className="flex max-w-4xl flex-wrap justify-center gap-3">
                        {destinations.map((destination, idx) => (
                            <button
                                key={destination}
                                type="button"
                                onClick={() => handleChangeDestination(destination)}
                                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap border transition-all duration-300 ${
                                    activeDestination === destination
                                        ? 'bg-accent text-background border-accent shadow-lg shadow-accent/20'
                                        : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                                }`}
                                style={{
                                    transitionDelay: `${idx * 20}ms`,
                                }}
                            >
                                {destination}
                            </button>
                        ))}
                    </div>
                </FadeUp>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {filteredPhotos.map((photo, idx) => (
                        <ImageReveal
                            key={`${photo.destination}-${photo.id}`}
                            delay={idx * 0.04}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedPhoto(photo)
                                    setCurrentImageIndex(0)
                                }}
                                className="group relative aspect-square w-full rounded-lg overflow-hidden border border-border/50 bg-card/50 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                            >
                                <img
                                    src={photo.image}
                                    alt={photo.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <h3 className="text-foreground font-semibold text-sm line-clamp-2 text-left">
                                        {photo.title}
                                    </h3>
                                </div>

                                <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/50 rounded-lg transition-colors duration-300" />
                            </button>
                        </ImageReveal>
                    ))}
                </div>

                {/* Ver más Button */}
                <FadeUp delay={0.15}>
                    <div className="text-center">
                        <a
                            href="/moment"
                            className="inline-flex px-8 py-3 rounded-lg border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors no-underline"
                        >
                            Ver más momentos
                        </a>
                    </div>
                </FadeUp>
            </div>

            {/* Premium Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 30 }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative bg-card border border-border/60 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/30 text-accent transition-colors flex items-center justify-center z-10"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Image Carousel */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="relative h-80 sm:h-96 lg:h-[420px] rounded-xl overflow-hidden border border-border/50">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={selectedPhoto.gallery[currentImageIndex]}
                                                src={selectedPhoto.gallery[currentImageIndex]}
                                                alt={selectedPhoto.title}
                                                className="w-full h-full object-cover"
                                                initial={{ opacity: 0, scale: 1.04 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.35 }}
                                            />
                                        </AnimatePresence>

                                        {selectedPhoto.gallery.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={handlePrevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-accent/20 text-accent p-2 rounded-full transition-colors z-10 border border-accent/30"
                                                    aria-label="Imagen anterior"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleNextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-accent/20 text-accent p-2 rounded-full transition-colors z-10 border border-accent/30"
                                                    aria-label="Imagen siguiente"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {selectedPhoto.gallery.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {selectedPhoto.gallery.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                                                        idx === currentImageIndex
                                                            ? 'border-accent ring-2 ring-accent/50'
                                                            : 'border-border hover:border-accent/50'
                                                    }`}
                                                    aria-label={`Ver imagen ${idx + 1}`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Miniatura ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-accent text-sm uppercase tracking-widest font-semibold">
                                            {selectedPhoto.destination}
                                        </p>

                                        <h3 className="text-3xl font-bold text-foreground">
                                            {selectedPhoto.title}
                                        </h3>

                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {selectedPhoto.description}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 border-t border-accent/20 pt-6">
                                        <div className="space-y-2">
                                            <p className="text-accent text-xs uppercase tracking-widest font-semibold">
                                                Detalles
                                            </p>

                                            <div className="space-y-2">
                                                <p className="text-foreground">
                                                    <span className="text-muted-foreground">Lugar:</span>{' '}
                                                    {selectedPhoto.place}
                                                </p>

                                                <p className="text-foreground">
                                                    <span className="text-muted-foreground">Experiencia:</span>{' '}
                                                    {selectedPhoto.experience}
                                                </p>

                                                <p className="text-foreground">
                                                    <span className="text-muted-foreground">Momento ideal:</span>{' '}
                                                    {selectedPhoto.moment}
                                                </p>

                                                <p className="text-foreground">
                                                    <span className="text-muted-foreground">Sensación:</span>{' '}
                                                    {selectedPhoto.emotion}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Recommendation */}
                                        <AnimatedCard className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                                            <p className="text-foreground italic">
                                                &quot;{selectedPhoto.recommendation}&quot;
                                            </p>
                                        </AnimatedCard>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href="#misiones"
                                        className="block w-full text-center bg-accent text-background font-semibold rounded-lg py-3 hover:bg-accent/90 transition-colors no-underline"
                                        onClick={() => setSelectedPhoto(null)}
                                    >
                                        Explorar misión
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}