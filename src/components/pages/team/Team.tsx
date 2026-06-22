'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/animations/section-header'
import { teamData, TeamMember } from '@/data/team'

import { TeamDestinationTabs } from './components/TeamDestinationTabs'
import { TeamRoleTabs } from './components/TeamRoleTabs'
import { TeamGrid } from './components/TeamGrid'
import { TeamEmptyState } from './components/TeamEmptyState'

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']
const roles = ['Influencers', 'Coordinadores', 'Colaboradores'] as const

export type RoleTab = (typeof roles)[number]

function roleTabToRole(roleTab: RoleTab): TeamMember['role'] {
    if (roleTab === 'Coordinadores') return 'Coordinador'
    if (roleTab === 'Colaboradores') return 'Colaborador'
    return 'Influencer'
}

export function Team() {
    const [activeDestination, setActiveDestination] = useState(destinations[0])
    const [activeRole, setActiveRole] = useState<RoleTab>('Influencers')

    const filteredMembers = teamData.filter(
        (member) =>
            member.destination === activeDestination &&
            member.role === roleTabToRole(activeRole)
    )

    const handleDestinationChange = (destination: string) => {
        setActiveDestination(destination)
        setActiveRole('Influencers')
    }

    return (
        <section id="equipo" className="relative overflow-hidden py-24">
            {/* Fondo decorativo */}
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl -mb-48 -mr-48" />
            <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl -ml-48" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Equipo"
                    description="Conoce a los expertos que harán tu viaje inolvidable. Profesionales dedicados con pasión por las aventuras."
                />

                <TeamDestinationTabs
                    destinations={destinations}
                    activeDestination={activeDestination}
                    onDestinationChange={handleDestinationChange}
                />

                <TeamRoleTabs
                    roles={roles}
                    activeRole={activeRole}
                    onRoleChange={setActiveRole}
                />

                <TeamGrid members={filteredMembers} />

                {filteredMembers.length === 0 && <TeamEmptyState />}
            </div>
        </section>
    )
}