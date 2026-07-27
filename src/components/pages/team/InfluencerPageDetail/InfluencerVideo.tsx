import { PlayCircle } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

type Props = {
    fullname: string
    videoUrl: string | null
}

export function InfluencerVideo({
    fullname,
    videoUrl,
}: Props) {
    if (!videoUrl) return null

    return (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                            <PlayCircle className="h-6 w-6 text-accent" />
                        </div>
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Conóceme
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Video de presentación
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Conoce un poco más sobre {fullname}, su experiencia y su
                        forma de vivir cada aventura.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-2 shadow-2xl sm:p-3">
                    <video
                        src={videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full rounded-2xl bg-black object-contain"
                    >
                        Tu navegador no soporta la reproducción de video.
                    </video>
                </div>
            </FadeUp>
        </section>
    )
}