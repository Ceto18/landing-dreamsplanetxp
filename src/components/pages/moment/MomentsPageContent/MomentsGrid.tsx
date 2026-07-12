import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { ImageReveal } from '@/components/animations/image-reveal'

export type MomentCardItem = {
    title: string
    slug: string
    image: string
    destination: string
    place: string
    description: string
}

export function MomentsGrid({ moments }: { moments: MomentCardItem[] }) {
    return (
        <section id="moments-gallery" className="py-16 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {moments.map((m, i) => (
                        <ImageReveal key={m.slug} delay={i * 0.03}>
                            <Link
                                href={`/moment/${m.slug}`}
                                className="group block rounded-2xl overflow-hidden border bg-card/40 hover:border-accent/60 transition-all no-underline"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={m.image}
                                        alt={m.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                    <div className="absolute bottom-0 p-5">
                                        <p className="text-xs text-accent uppercase">
                                            {m.destination}
                                        </p>

                                        <h3 className="font-bold text-white">
                                            {m.title}
                                        </h3>

                                        <div className="flex items-center gap-1 text-xs text-white/70">
                                            <MapPin className="w-3 h-3" />
                                            {m.place}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {m.description}
                                    </p>

                                    <div className="mt-3 text-accent text-sm font-semibold flex items-center gap-1">
                                        Ver experiencia
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </ImageReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}