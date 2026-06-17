'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatedCard } from '@/components/animations/animated-card'
import { Photo } from '../types'

export function MomentModal({
    photo,
    index,
    onClose,
    onNext,
    onPrev,
    onSelectImage,
}: {
    photo: Photo | null
    index: number
    onClose: () => void
    onNext: () => void
    onPrev: () => void
    onSelectImage: (i: number) => void
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!photo || !mounted) return null

    const modalContent = (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                {/* overlay */}
                <div
                    className="absolute inset-0 bg-black/70"
                    onClick={onClose}
                />

                {/* MODAL CONTAINER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 30 }}
                    transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        relative bg-card border border-border/60 rounded-2xl
                        w-full max-w-5xl
                        max-h-[90dvh] overflow-y-auto
                        p-6 md:p-8
                        space-y-6 shadow-2xl
                    "
                >
                    {/* CLOSE */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute top-5 right-5
                            w-10 h-10 rounded-full
                            bg-accent/20 hover:bg-accent/30
                            text-accent flex items-center justify-center
                            z-10
                        "
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* IMAGE */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="relative h-80 sm:h-96 lg:h-[420px] rounded-xl overflow-hidden border border-border/50">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={photo.gallery[index]}
                                        src={photo.gallery[index]}
                                        alt={photo.title}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.35 }}
                                    />
                                </AnimatePresence>

                                {photo.gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={onPrev}
                                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-accent/30 text-accent hover:bg-accent/20"
                                        >
                                            <ChevronLeft />
                                        </button>

                                        <button
                                            onClick={onNext}
                                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-accent/30 text-accent hover:bg-accent/20"
                                        >
                                            <ChevronRight />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* THUMBNAILS */}
                            {photo.gallery.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {photo.gallery.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onSelectImage(i)}
                                            className={`
                                                w-20 h-20 flex-shrink-0
                                                rounded-lg overflow-hidden
                                                border-2
                                                transition-all
                                                ${
                                                    i === index
                                                        ? 'border-accent ring-2 ring-accent/50'
                                                        : 'border-border'
                                                }
                                            `}
                                        >
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-accent text-sm uppercase tracking-widest font-semibold">
                                    {photo.destination}
                                </p>

                                <h3 className="text-3xl font-bold text-foreground">
                                    {photo.title}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {photo.description}
                                </p>
                            </div>

                            <div className="space-y-3 border-t border-accent/20 pt-6">
                                <div className="space-y-2">
                                    <p className="text-accent text-xs uppercase tracking-widest font-semibold">
                                        Detalles
                                    </p>

                                    <div className="space-y-2">
                                        <p>
                                            <span className="text-muted-foreground">Lugar:</span>{' '}
                                            {photo.place}
                                        </p>
                                        <p>
                                            <span className="text-muted-foreground">Experiencia:</span>{' '}
                                            {photo.experience}
                                        </p>
                                        <p>
                                            <span className="text-muted-foreground">Momento ideal:</span>{' '}
                                            {photo.moment}
                                        </p>
                                        <p>
                                            <span className="text-muted-foreground">Sensación:</span>{' '}
                                            {photo.emotion}
                                        </p>
                                    </div>
                                </div>

                                <AnimatedCard className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                                    <p className="italic text-foreground">
                                        "{photo.recommendation}"
                                    </p>
                                </AnimatedCard>
                            </div>

                            <a
                                href="#misiones"
                                onClick={onClose}
                                className="
                                    block w-full text-center
                                    bg-accent text-background
                                    font-semibold py-3
                                    rounded-lg hover:bg-accent/90
                                "
                            >
                                Explorar misión
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )

    return createPortal(modalContent, document.body)
}