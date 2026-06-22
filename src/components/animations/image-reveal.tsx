'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface ImageRevealProps {
    children: ReactNode
    delay?: number
    className?: string
}

export function ImageReveal({
    children,
    delay = 0,
    className = '',
}: ImageRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
                duration: 0.85,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}