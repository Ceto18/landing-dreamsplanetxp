import { FadeUp } from '@/components/animations/fade-up'

export function MoreMomentsButton() {
    return (
        <FadeUp delay={0.15}>
            <div className="text-center">
                <a
                    href="/moment"
                    className="inline-flex px-8 py-3 rounded-lg border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors no-underline"
                >
                    Ver más momentos
                </a>
            </div>
        </FadeUp>
    )
}