'use client'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import type { MomentPhoto } from '@/data/moments'
import { MomentSidebar } from './MomentSidebar'

export function MomentGallery({ moment }: { moment: MomentPhoto }) {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-14">

                        <FadeUp>
                            <h2 className="text-4xl font-bold">
                                Una experiencia que deja huella
                            </h2>
                        </FadeUp>

                        {/* GALLERY */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {moment.gallery.map((img, i) => (
                                <AnimatedCard
                                    key={i}
                                    className="h-72 rounded-2xl overflow-hidden border border-border/60"
                                >
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatedCard>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <MomentSidebar moment={moment} />

                </div>

            </div>
        </section>
    )
}