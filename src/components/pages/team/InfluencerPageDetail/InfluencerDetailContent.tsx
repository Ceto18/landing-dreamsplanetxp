import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import type { TeamPersonDetail } from '@/services/teamService'

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

type Props = {
    member: TeamPersonDetail
}

export function InfluencerDetailContent({ member }: Props) {
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

                <InfluencerMissions missions={member.missions} />

                <InfluencerGallery
                    fullname={member.fullname}
                    images={member.images}
                />

                <InfluencerCta fullname={member.fullname} />
            </main>

            <Footer />
        </>
    )
}