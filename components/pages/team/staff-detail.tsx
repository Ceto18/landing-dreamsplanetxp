'use client'

import { useState, useEffect } from 'react'
import { FadeUp } from '@/components/animations/fade-up'
import { SectionHeader } from '@/components/animations/section-header'
import { teamData, TeamMember } from '@/data/team'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export default function StaffDetail({ params }: Props) {
  const [staff, setStaff] = useState<TeamMember | null>(null)

  useEffect(() => {
    const data = teamData.find((s) => s.slug === params.slug && s.role !== 'Influencer')
    setStaff(data || null)
  }, [params.slug])

  if (!staff) return <p className="p-6 text-center">No se encontró el miembro del staff</p>

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <FadeUp>
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors no-underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al equipo
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={staff.image}
            alt={staff.name}
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">{staff.name}</h1>
            <p className="text-muted-foreground mt-2">{staff.role}</p>
            <p className="mt-4">{staff.bio || staff.specialty}</p>
            {staff.experience && <p className="mt-2">Experiencia: {staff.experience}</p>}
            {staff.languages && <p>Idiomas: {staff.languages.join(', ')}</p>}
          </div>
        </div>
      </FadeUp>
    </main>
  )
}