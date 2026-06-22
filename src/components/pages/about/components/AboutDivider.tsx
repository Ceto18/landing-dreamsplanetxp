import { FadeUp } from '@/components/animations/fade-up'

export function AboutDivider() {
    return (
        <FadeUp delay={0.1}>
            <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-16" />
        </FadeUp>
    )
}