'use client'

import { useState } from 'react'
import { PlayCircle } from 'lucide-react'

import { FadeUp } from '@/components/animations/fade-up'

import type { MomentDetailVideo } from '@/types/home'

interface Props {
    videos: MomentDetailVideo[]
}

export function MomentVideos({
    videos,
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (!videos.length) return null

    const selectedVideo = videos[selectedIndex]

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <FadeUp>
                <div className="mb-10 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                            <PlayCircle className="h-6 w-6 text-accent" />
                        </div>
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                        Vive el momento
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                        Videos
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Descubre este momento desde una perspectiva más cercana.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-2 shadow-2xl sm:p-3">
                        <video
                            key={selectedVideo.video_url}
                            src={selectedVideo.video_url}
                            controls
                            playsInline
                            preload="metadata"
                            className="aspect-video w-full rounded-2xl bg-black object-contain"
                        >
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>

                    {videos.length > 1 && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {videos.map((video, index) => {
                                const active =
                                    selectedIndex === index

                                return (
                                    <button
                                        key={video.video_url}
                                        type="button"
                                        onClick={() =>
                                            setSelectedIndex(index)
                                        }
                                        className={`group flex min-w-[110px] items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                                            active
                                                ? 'border-accent bg-accent/10 shadow-lg shadow-accent/5'
                                                : 'border-border/60 bg-card/40 hover:border-accent/40 hover:bg-card/70'
                                        }`}
                                    >
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                                                active
                                                    ? 'bg-accent text-background'
                                                    : 'bg-accent/10 text-accent'
                                            }`}
                                        >
                                            <PlayCircle className="h-4 w-4" />
                                        </div>

                                        <div className="text-left">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Video
                                            </p>

                                            <p
                                                className={`text-sm font-bold ${
                                                    active
                                                        ? 'text-accent'
                                                        : 'text-foreground'
                                                }`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0'
                                                )}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </FadeUp>
        </section>
    )
}