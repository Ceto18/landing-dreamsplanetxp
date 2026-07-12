'use client'

import type { MomentDetail } from '@/types/home'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { MomentHero } from './MomentHero'
import { MomentDetailsGrid } from './MomentDetailsGrid'
import { MomentGallery } from './MomentGallery'
import { MomentCTA } from './MomentCTA'

import { MomentComments } from '@/components/ui/MomentComment'

interface Props {
    moment: MomentDetail
}

export function MomentDetailContent({ moment }: Props) {
    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <MomentHero moment={moment} />

                <MomentDetailsGrid moment={moment} />

                <MomentGallery moment={moment} />

                <section className="mt-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <MomentComments />
                    </div>
                </section>

                <MomentCTA />
            </main>

            <Footer />
        </>
    )
}