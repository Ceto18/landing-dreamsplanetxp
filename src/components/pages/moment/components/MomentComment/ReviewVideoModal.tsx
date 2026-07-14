// src/components/ui/MomentComment/ReviewVideoModal.tsx

'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    Clapperboard,
    Maximize2,
    Sparkles,
    X,
} from 'lucide-react'

type Props = {
    videoUrl: string | null
    reviewerName?: string
    onClose: () => void
}

const CLOSE_ANIMATION_DURATION = 350

export function ReviewVideoModal({
    videoUrl,
    reviewerName,
    onClose,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)

    const [isVisible, setIsVisible] = useState(false)
    const [videoReady, setVideoReady] = useState(false)

    useEffect(() => {
        if (!videoUrl) {
            setIsVisible(false)
            return
        }

        setVideoReady(false)

        const frame = window.requestAnimationFrame(() => {
            setIsVisible(true)
        })

        return () => {
            window.cancelAnimationFrame(frame)
        }
    }, [videoUrl])

    const handleClose = useCallback(() => {
        setIsVisible(false)

        if (videoRef.current) {
            videoRef.current.pause()
        }

        window.setTimeout(() => {
            onClose()
        }, CLOSE_ANIMATION_DURATION)
    }, [onClose])

    useEffect(() => {
        if (!videoUrl) {
            return
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener(
                'keydown',
                handleKeyDown
            )

            document.body.style.overflow = previousOverflow

            if (videoRef.current) {
                videoRef.current.pause()
                videoRef.current.removeAttribute('src')
                videoRef.current.load()
            }
        }
    }, [videoUrl, handleClose])

    if (!videoUrl) {
        return null
    }

    const handleBackdropClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }

    const handleFullscreen = async () => {
        const video = videoRef.current

        if (!video) {
            return
        }

        try {
            if (video.requestFullscreen) {
                await video.requestFullscreen()
            }
        } catch (error) {
            console.error(
                'No se pudo activar la pantalla completa:',
                error
            )
        }
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Video de ${reviewerName ?? 'viajero'}`}
            onClick={handleBackdropClick}
            className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4 py-6 transition-all duration-300 sm:px-6 ${isVisible
                    ? 'bg-black/85 backdrop-blur-xl'
                    : 'bg-black/0 backdrop-blur-none'
                }`}
        >
            {/* Fondo decorativo central */}
            <div
                className={`pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px] transition-all duration-700 ${isVisible
                        ? 'scale-100 opacity-100'
                        : 'scale-50 opacity-0'
                    }`}
            />

            {/* Resplandor izquierdo */}
            <div
                className={`pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[110px] transition-all delay-100 duration-700 ${isVisible
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-20 opacity-0'
                    }`}
            />

            {/* Resplandor derecho */}
            <div
                className={`pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-[110px] transition-all delay-150 duration-700 ${isVisible
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-20 opacity-0'
                    }`}
            />

            {/* Destello inicial */}
            <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-all duration-1000 ${isVisible
                        ? 'translate-x-full opacity-0'
                        : '-translate-x-full opacity-100'
                    }`}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-[0_40px_140px_rgba(0,0,0,0.85)] transition-all duration-[450ms] ease-out ${isVisible
                        ? 'translate-y-0 scale-100 rotate-0 opacity-100'
                        : 'translate-y-12 scale-[0.88] -rotate-1 opacity-0'
                    }`}
            >
                {/* Brillo superior */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

                <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-24 w-72 -translate-x-1/2 bg-accent/20 blur-3xl" />

                {/* Encabezado */}
                <div
                    className={`relative z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl transition-all delay-100 duration-500 sm:px-7 ${isVisible
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                        }`}
                >
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                            <Clapperboard className="h-6 w-6 text-accent" />

                            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-accent" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-xs">
                                Experiencia compartida
                            </p>

                            <h3 className="mt-1 truncate text-base font-semibold text-white sm:text-xl">
                                Video de {reviewerName ?? 'un viajero'}
                            </h3>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={handleFullscreen}
                            aria-label="Ver en pantalla completa"
                            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:scale-105 hover:border-accent/40 hover:bg-accent/10 hover:text-accent sm:flex"
                        >
                            <Maximize2 className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Cerrar video"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:rotate-90 hover:scale-105 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Reproductor */}
                <div
                    className={`relative flex min-h-[280px] items-center justify-center overflow-hidden bg-black transition-all delay-150 duration-700 sm:min-h-[420px] ${isVisible
                            ? 'scale-100 opacity-100'
                            : 'scale-105 opacity-0'
                        }`}
                >
                    {/* Video de fondo ampliado y desenfocado */}
                    <video
                        src={videoUrl}
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        tabIndex={-1}
                        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-3xl"
                    />

                    {/* Capa para oscurecer el fondo */}
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />

                    {/* Brillo central sobre el fondo */}
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

                    {/* Estado de carga */}
                    {!videoReady && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <div className="relative h-16 w-16">
                                    <div className="absolute inset-0 rounded-full border-2 border-accent/20" />

                                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />

                                    <div className="absolute inset-3 rounded-full bg-accent/10 blur-sm" />
                                </div>

                                <p className="mt-4 text-sm font-medium tracking-wide text-white/60">
                                    Preparando la experiencia...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Video principal */}
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        onCanPlay={() => setVideoReady(true)}
                        onLoadedData={() => setVideoReady(true)}
                        className={`relative z-10 max-h-[78vh] w-full object-contain transition-all duration-700 ${videoReady
                                ? 'scale-100 opacity-100'
                                : 'scale-[1.03] opacity-0'
                            }`}
                    >
                        Tu navegador no puede reproducir este video.
                    </video>

                    {/* Viñeta cinematográfica */}
                    <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

                    {/* Sombras superior e inferior */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-black/50 to-transparent" />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Pie del modal */}
                <div
                    className={`relative z-20 flex items-center justify-between gap-4 border-t border-white/10 bg-black/80 px-5 py-3 transition-all delay-200 duration-500 sm:px-7 ${isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-0'
                        }`}
                >
                    <p className="text-xs text-white/45 sm:text-sm">
                        Pulsa Escape o haz clic fuera para cerrar
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />

                        <span className="text-xs font-medium text-accent">
                            DreamsPlanetXP
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}