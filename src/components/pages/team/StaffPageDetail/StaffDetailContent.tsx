import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import type {
    TeamPersonDetail,
    TeamPersonDetailImage,
} from '@/services/teamService'

import { StaffHero } from './StaffHero'
import { StaffInfo } from './StaffInfo'
import { StaffBiography } from './StaffBiography'
import { StaffMissions } from './StaffMissions'
import { StaffGallery } from './StaffGallery'
import { StaffCta } from './StaffCta'

type Props = {
    member: TeamPersonDetail
    images: TeamPersonDetailImage[]
    role?: string
}

function getRoleLabel(role?: string) {
    const labels: Record<string, string> = {
        coordinator: 'Coordinador',
        contributor: 'Colaborador',
    }

    if (!role) {
        return 'Miembro del equipo'
    }

    return labels[role] ?? 'Miembro del equipo'
}

export function StaffDetailContent({
    member,
    images,
    role,
}: Props) {
    const roleLabel = getRoleLabel(role)

    return (
        <>
            <Header />

            <main className="min-h-screen overflow-hidden bg-background">
                <StaffHero
                    member={member}
                    roleLabel={roleLabel}
                />

                <StaffInfo
                    member={member}
                    roleLabel={roleLabel}
                />

                <StaffBiography
                    fullname={member.fullname}
                    bio={member.bio}
                />

                <StaffMissions missions={member.missions} />

                <StaffGallery
                    fullname={member.fullname}
                    images={images}
                />

                <StaffCta />
            </main>

            <Footer />
        </>
    )
}