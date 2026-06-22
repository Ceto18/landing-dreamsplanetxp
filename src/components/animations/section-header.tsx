'use client'

import { FadeUp } from './fade-up'

interface SectionHeaderProps {
    title: string
    description: string
    className?: string
}

export function SectionHeader({
    title,
    description,
    className = '',
}: SectionHeaderProps) {
    return (
        <div className={`mb-16 space-y-6 text-center ${className}`}>
            <FadeUp>
                <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
                    {title}
                </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
                <div className="flex justify-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </div>
            </FadeUp>

            <FadeUp delay={0.2}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
            </FadeUp>
        </div>
    )
}