import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    paragraphs: string[]
}

export function AboutMainContent({
    paragraphs,
}: Props) {
    return (
        <div className="space-y-8">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
                {paragraphs.map((paragraph, index) => (
                    <FadeUp
                        key={index}
                        delay={0.1 + index * 0.08}
                    >
                        <p className="text-lg">
                            {paragraph}
                        </p>
                    </FadeUp>
                ))}
            </div>

            <FadeUp
                delay={0.1 + paragraphs.length * 0.08}
            >
                <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300 no-underline group"
                >
                    Conocer más

                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </FadeUp>
        </div>
    )
}