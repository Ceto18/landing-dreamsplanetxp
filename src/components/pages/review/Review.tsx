'use client'

import {
    useEffect,
    useRef,
    useState,
} from 'react'

import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'
import {
    reviewService,
    type HomeReview,
} from '@/services/reviewService'

import { ReviewMainCard } from './components/ReviewMainCard'
import { ReviewNavigation } from './components/ReviewNavigation'
import { ReviewVideoMockup } from './components/ReviewVideoMockup'

export function Review() {
    const [reviews, setReviews] = useState<HomeReview[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [autoScroll, setAutoScroll] = useState(true)
    const [loading, setLoading] = useState(true)

    const resumeTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadReviews = async () => {
            try {
                setLoading(true)

                const data =
                    await reviewService.getHomeReviews()

                if (!isMounted) return

                setReviews(data)
                setActiveIndex(0)
            } catch (error) {
                console.error(
                    'Error al cargar las reseñas:',
                    error
                )

                if (isMounted) {
                    setReviews([])
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        void loadReviews()

        return () => {
            isMounted = false
        }
    }, [])

    /**
     * Cambio automático de reseña.
     *
     * El intervalo solamente funciona cuando:
     * - autoScroll está activo.
     * - Hay más de una reseña.
     *
     * Cuando comienza la reproducción de un video,
     * autoScroll pasa a false y este intervalo se elimina.
     */
    useEffect(() => {
        if (
            !autoScroll ||
            reviews.length <= 1
        ) {
            return
        }

        const interval = setInterval(() => {
            setActiveIndex(
                (previousIndex) =>
                    (previousIndex + 1) %
                    reviews.length
            )
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [autoScroll, reviews.length])

    /**
     * Limpia cualquier timeout pendiente cuando
     * el componente se desmonta.
     */
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(
                    resumeTimeoutRef.current
                )
            }
        }
    }, [])

    /**
     * Pausa temporalmente el carrusel cuando
     * el usuario navega manualmente.
     *
     * Después de 5 segundos vuelve a activar
     * el desplazamiento automático.
     */
    const pauseAutoScroll = () => {
        setAutoScroll(false)

        if (resumeTimeoutRef.current) {
            clearTimeout(
                resumeTimeoutRef.current
            )
        }

        resumeTimeoutRef.current = setTimeout(
            () => {
                setAutoScroll(true)
                resumeTimeoutRef.current = null
            },
            5000
        )
    }

    const handlePrev = () => {
        if (reviews.length === 0) return

        pauseAutoScroll()

        setActiveIndex(
            (previousIndex) =>
                (
                    previousIndex -
                    1 +
                    reviews.length
                ) % reviews.length
        )
    }

    const handleNext = () => {
        if (reviews.length === 0) return

        pauseAutoScroll()

        setActiveIndex(
            (previousIndex) =>
                (previousIndex + 1) %
                reviews.length
        )
    }

    const handleSelectReview = (
        index: number
    ) => {
        if (
            index < 0 ||
            index >= reviews.length
        ) {
            return
        }

        pauseAutoScroll()
        setActiveIndex(index)
    }

    /**
     * Detiene completamente el carrusel cuando
     * el usuario comienza a reproducir el video.
     */
    const handleVideoPlay = () => {
        setAutoScroll(false)

        if (resumeTimeoutRef.current) {
            clearTimeout(
                resumeTimeoutRef.current
            )

            resumeTimeoutRef.current = null
        }
    }

    /**
     * Cuando el usuario pausa el video,
     * se vuelve a activar el carrusel.
     *
     * El siguiente comentario aparecerá después
     * de 5 segundos, no inmediatamente.
     */
    const handleVideoPause = () => {
        setAutoScroll(true)
    }

    /**
     * Cuando el video termina, se reactiva
     * el cambio automático de reseñas.
     */
    const handleVideoEnded = () => {
        setAutoScroll(true)
    }

    const review = reviews[activeIndex]

    if (loading || !review) {
        return null
    }

    return (
        <section
            id="resenas"
            className="relative overflow-hidden bg-secondary/30 py-24"
        >
            {/* Background decoration */}
            <div className="absolute right-0 top-24 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-20 left-0 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Reseñas"
                    description="Historias reales de viajeros que vivieron experiencias únicas, auténticas e inolvidables."
                />

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left - Reviews */}
                    <div className="space-y-8">
                        <FadeUp delay={0.1}>
                            <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                Lo que dicen nuestros viajeros
                            </div>
                        </FadeUp>

                        <ReviewMainCard
                            review={review}
                            activeIndex={activeIndex}
                            totalReviews={
                                reviews.length
                            }
                        />

                        <ReviewNavigation
                            reviews={reviews}
                            activeIndex={activeIndex}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onSelectReview={
                                handleSelectReview
                            }
                        />
                    </div>

                    {/* Right - Video Mockup */}
                    <div className="space-y-8">
                        <ReviewVideoMockup
                            videoUrl={
                                review.video_url
                            }
                            reviewerName={
                                review.name
                            }
                            missionName={
                                review.mission_name
                            }
                            onVideoPlay={
                                handleVideoPlay
                            }
                            onVideoPause={
                                handleVideoPause
                            }
                            onVideoEnded={
                                handleVideoEnded
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}