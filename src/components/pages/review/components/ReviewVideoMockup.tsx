'use client'

import { Play } from 'lucide-react'
import { motion } from 'motion/react'
import { AnimatedCard } from '@/components/animations/animated-card'

export function ReviewVideoMockup() {
    return (
        <AnimatedCard delay={0.18} className="relative max-w-sm mx-auto">
            <div
                className="relative bg-black rounded-3xl p-3 shadow-2xl mx-auto border border-accent/20"
                style={{ width: '280px' }}
            >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />

                {/* Screen */}
                <div className="relative bg-foreground/5 rounded-2xl h-96 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background/20 to-background/80" />

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative z-10 w-20 h-20 rounded-full border border-accent/40 bg-accent/15 flex items-center justify-center hover:bg-accent/25 transition-colors"
                        aria-label="Reproducir video"
                    >
                        <Play className="w-10 h-10 text-accent fill-accent" />
                    </motion.button>
                </div>
            </div>
        </AnimatedCard>
    )
}