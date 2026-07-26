import type { LucideIcon } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

type Props = {
    title: string
    value: string

    icon?: LucideIcon
    iconUrl?: string | null

    delay: number
    href?: string
    external?: boolean
    highlightValue?: boolean
}

export function ContactMethodCard({
    title,
    value,
    icon: Icon,
    iconUrl,
    delay,
    href,
    external = false,
    highlightValue = false,
}: Props) {
    const content = (
        <>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-all duration-300 group-hover:bg-accent">
                {iconUrl ? (
                    <img
                        src={iconUrl}
                        alt={title}
                        className="
                                    h-5 w-5
                                    object-contain
                                    transition-all
                                    duration-300
                                    [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(38%)_saturate(721%)_hue-rotate(358deg)_brightness(91%)_contrast(89%)]
                                    group-hover:[filter:brightness(0)_invert(1)]
                                "
                    />
                ) : Icon ? (
                    <Icon className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-background" />
                ) : null}
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                    {title}
                </p>

                <p
                    className={`mt-0.5 break-words text-sm ${highlightValue
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
                    target={
                        external
                            ? '_blank'
                            : undefined
                    }
                    rel={
                        external
                            ? 'noopener noreferrer'
                            : undefined
                    }
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