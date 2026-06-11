'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FadeUpProps {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}