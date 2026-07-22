'use client'

import { Play } from 'lucide-react'
import {
    useEffect,
    useRef,
    useState,
} from 'react'
import { motion } from 'motion/react'

import { AnimatedCard } from '@/components/animations/animated-card'

interface ReviewVideoMockupProps {
    videoUrl?: string | null
    reviewerName: string
    missionName?: string | null
    onVideoPlay?: () => void
    onVideoPause?: () => void
    onVideoEnded?: () => void
}

export function ReviewVideoMockup({
    videoUrl,
    reviewerName,
    missionName,
    onVideoPlay,
    onVideoPause,
    onVideoEnded,
}: ReviewVideoMockupProps) {
    const videoRef =
        useRef<HTMLVideoElement | null>(null)

    const [hasStarted, setHasStarted] =
        useState(false)

    /**
     * Cada vez que cambia la reseña,
     * reiniciamos el estado del video.
     */
    useEffect(() => {
        setHasStarted(false)
    }, [videoUrl])

    const handlePlayButton = async () => {
        const video = videoRef.current

        if (!video) return

        try {
            await video.play()
        } catch (error) {
            console.error(
                'No se pudo reproducir el video:',
                error
            )
        }
    }

    const handlePlay = () => {
        setHasStarted(true)
        onVideoPlay?.()
    }

    const handlePause = () => {
        /**
         * Evitamos ejecutar onVideoPause cuando
         * el video ya terminó, porque onEnded
         * se encargará de reactivar el carrusel.
         */
        if (videoRef.current?.ended) {
            return
        }

        onVideoPause?.()
    }

    const handleEnded = () => {
        setHasStarted(false)
        onVideoEnded?.()
    }

    if (!videoUrl) {
        return (
            <AnimatedCard
                delay={0.18}
                className="relative mx-auto max-w-sm"
            >
                <div
                    className="relative mx-auto border border-accent/20 bg-black p-3 shadow-2xl"
                    style={{
                        width: '280px',
                        borderRadius: '1.5rem',
                    }}
                >
                    {/* Notch */}
                    <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-black" />

                    {/* Screen */}
                    <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-foreground/5">
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background/20 to-background/80" />

                        <div className="relative z-10 px-6 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                                <Play className="h-7 w-7 text-accent" />
                            </div>

                            <p className="text-sm font-semibold text-foreground">
                                Video no disponible
                            </p>

                            <p className="mt-2 text-xs text-muted-foreground">
                                {reviewerName}
                            </p>

                            {missionName && (
                                <p className="mt-1 text-xs text-accent">
                                    {missionName}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </AnimatedCard>
        )
    }

    return (
        <AnimatedCard
            delay={0.18}
            className="relative mx-auto max-w-sm"
        >
            <div
                className="relative mx-auto border border-accent/20 bg-black p-3 shadow-2xl"
                style={{
                    width: '280px',
                    borderRadius: '1.5rem',
                }}
            >
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-black" />

                {/* Screen */}
                <div className="relative h-96 overflow-hidden rounded-2xl bg-black">
                    <video
                        ref={videoRef}
                        key={videoUrl}
                        src={videoUrl}
                        controls={hasStarted}
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover"
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onEnded={handleEnded}
                    />

                    {!hasStarted && (
                        <>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

                            <motion.button
                                type="button"
                                aria-label={`Reproducir video de ${reviewerName}`}
                                whileHover={{
                                    scale: 1.08,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                onClick={
                                    handlePlayButton
                                }
                                className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-xl backdrop-blur-sm"
                            >
                                <Play
                                    className="ml-1 h-7 w-7"
                                    fill="currentColor"
                                />
                            </motion.button>

                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-5">
                                <p className="font-semibold text-white">
                                    {reviewerName}
                                </p>

                                {missionName && (
                                    <p className="mt-1 text-sm text-white/70">
                                        {missionName}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AnimatedCard>
    )
}