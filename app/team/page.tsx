'use client'

import { useState } from 'react'
import { teamData, TeamMember } from '@/data/team'
import { AnimatedCard } from '@/components/animations/animated-card'

const roles = ['All', 'Influencer', 'Coordinador', 'Colaborador', 'Guía']
const destinations = ['All', ...Array.from(new Set(teamData.map(t => t.destination)))]

export default function TeamPage() {
  const [selectedRole, setSelectedRole] = useState<string>('All')
  const [selectedDestination, setSelectedDestination] = useState<string>('All')

  const filteredTeam = teamData.filter(member => {
    const roleMatch = selectedRole === 'All' || member.role === selectedRole
    const destMatch = selectedDestination === 'All' || member.destination === selectedDestination
    return roleMatch && destMatch
  })

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nuestro Equipo</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)}>
          {destinations.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map(member => (
          <AnimatedCard
            key={member.id}
            image={member.image}
            name={member.name}
            role={member.role}
            experience={member.experience}
            languages={member.languages}
            specialty={member.specialty}
            href={member.role === 'Influencer' ? `/team/influencer/${member.slug}` : `/team/staff/${member.slug}`}
          />
        ))}
      </div>
    </main>
  )
}