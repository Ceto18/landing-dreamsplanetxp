import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import type {
    TeamPersonDetail,
    TeamPersonDetailImage,
} from '@/services/teamService'

import {
    InfluencerBiography,
    InfluencerHero,
    InfluencerInfo,
} from './InfluencerHero'

import {
    InfluencerCta,
    InfluencerGallery,
    InfluencerMissions,
} from './InfluencerMissions'
import { InfluencerVideo } from './InfluencerVideo'

type Props = {
    member: TeamPersonDetail
    images: TeamPersonDetailImage[]
}

export function InfluencerDetailContent({
    member,
    images,
}: Props) {
    return (
        <>
            <Header />

            <main className="min-h-screen overflow-hidden bg-background">
                <InfluencerHero member={member} />

                <InfluencerInfo member={member} />

                <InfluencerBiography
                    fullname={member.fullname}
                    bio={member.bio}
                />

                <InfluencerMissions
                    missions={member.missions ?? []}
                />

                <InfluencerVideo
                    fullname={member.fullname}
                    videoUrl={member.video_url}
                />

                <InfluencerGallery
                    fullname={member.fullname}
                    images={images ?? []}
                />

                <InfluencerCta
                    fullname={member.fullname}
                />
            </main>

            <Footer />
        </>
    )
}