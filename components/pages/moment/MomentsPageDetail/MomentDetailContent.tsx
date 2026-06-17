'use client'

import type { MomentPhoto } from '@/data/moments'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { MomentHero } from './MomentHero'
import { MomentDetailsGrid } from './MomentDetailsGrid'
import { MomentGallery } from './MomentGallery'
import { MomentCTA } from './MomentCTA'

import { MomentComments } from '@/components/ui/MomentComment'

interface Props {
    moment: MomentPhoto
}

export function MomentDetailContent({ moment }: Props) {
    return (
        <>
            {/* HEADER GLOBAL */}
            <Header />

            <main className="min-h-screen text-foreground">

                {/* HERO */}
                <MomentHero moment={moment} />

                {/* DETAILS GRID */}
                <MomentDetailsGrid moment={moment} />

                {/* CONTENT + GALLERY + SIDEBAR */}
                <MomentGallery moment={moment} />

                {/* COMMENTS */}
                <section className="mt-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <MomentComments />
                    </div>
                </section>

                {/* CTA */}
                <MomentCTA />

            </main>

            {/* FOOTER GLOBAL */}
            <Footer />
        </>
    )
}