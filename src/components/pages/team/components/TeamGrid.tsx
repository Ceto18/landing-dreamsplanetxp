'use client'

import { TeamMember } from '@/data/team'
import { TeamCard } from './TeamCard'

type Props = {
    members: TeamMember[]
}

export function TeamGrid({ members }: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, idx) => (
                <TeamCard
                    key={member.slug}
                    member={member}
                    delay={idx * 0.08}
                />
            ))}
        </div>
    )
}