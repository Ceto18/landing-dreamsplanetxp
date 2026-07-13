import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    fullname: string
    bio: string | null
}

export function StaffBiography({
    fullname,
    bio,
}: Props) {
    return (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="rounded-3xl border border-border/60 bg-card/40 p-8 text-center shadow-lg sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Sobre mí
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Biografía
                    </h2>

                    <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                        {bio ||
                            `Estamos preparando más información sobre la trayectoria de ${fullname}.`}
                    </p>
                </div>
            </FadeUp>
        </section>
    )
}