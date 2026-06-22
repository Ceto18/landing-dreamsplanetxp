'use client'

import { useState } from 'react'
import { teamData } from '@/data/team'
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
        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {roles.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={selectedDestination}
          onChange={e => setSelectedDestination(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {destinations.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map(member => (
          <AnimatedCard key={member.id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">

              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="text-lg font-semibold mt-3">
                {member.name}
              </h3>

              <p className="text-sm text-gray-500">
                {member.role}
              </p>

              {member.experience && (
                <p className="text-xs text-gray-400">
                  {member.experience}
                </p>
              )}

              {member.languages && (
                <p className="text-xs text-gray-400">
                  {member.languages.join(', ')}
                </p>
              )}

              {member.specialty && (
                <p className="text-xs text-gray-600">
                  {member.specialty}
                </p>
              )}

              <a
                href={
                  member.role === 'Influencer'
                    ? `/team/influencer/${member.slug}`
                    : `/team/staff/${member.slug}`
                }
                className="inline-block mt-3 text-blue-600 text-sm hover:underline"
              >
                Ver perfil →
              </a>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </main>
  )
}