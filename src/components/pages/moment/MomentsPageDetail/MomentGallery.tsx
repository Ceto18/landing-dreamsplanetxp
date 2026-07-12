'use client'

import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import { MomentSidebar } from './MomentSidebar'

import type { MomentDetail } from '@/types/home'

export function MomentGallery({ moment }: { moment: MomentDetail }) {
    const galleryImages =
        moment.images?.length > 0
            ? moment.images
            : [
                  {
                      name: moment.title,
                      image_url: '/mission-morocco.jpg',
                  },
              ]

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-14">
                        <FadeUp>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold">
                                    Una experiencia que deja huella
                                </h2>

                                <p className="text-muted-foreground leading-relaxed">
                                    {moment.description}
                                </p>
                            </div>
                        </FadeUp>

                        {/* GALLERY */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {galleryImages.map((img, i) => (
                                <AnimatedCard
                                    key={`${img.image_url}-${i}`}
                                    className="h-72 rounded-2xl overflow-hidden border border-border/60"
                                >
                                    <img
                                        src={img.image_url}
                                        alt={img.name || moment.title}
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