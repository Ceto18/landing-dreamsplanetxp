import type { LucideIcon } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

type Props = {
    title: string
    value: string
    icon: LucideIcon
    delay: number
    href?: string
    external?: boolean
    highlightValue?: boolean
}

export function ContactMethodCard({
    title,
    value,
    icon: Icon,
    delay,
    href,
    external = false,
    highlightValue = false,
}: Props) {
    const content = (
        <>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 transition-colors duration-300 group-hover:bg-accent">
                <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-background" />
            </div>

            <div className="min-w-0">
                <p className="font-semibold text-foreground">
                    {title}
                </p>

                <p
                    className={`break-words text-sm ${
                        highlightValue
                            ? 'text-accent'
                            : 'text-muted-foreground'
                    }`}
                >
                    {value}
                </p>
            </div>
        </>
    )

    return (
        <AnimatedCard
            delay={delay}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect transition-all duration-300 hover:border-accent/60 hover:bg-card/70"
        >
            {href ? (
                <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 no-underline"
                >
                    {content}
                </a>
            ) : (
                <div className="flex items-center gap-4 p-4">
                    {content}
                </div>
            )}
        </AnimatedCard>
    )
}