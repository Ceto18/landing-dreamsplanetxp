// app/team/influencer/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { FadeUp } from '@/components/animations/fade-up'
import { ImageReveal } from '@/components/animations/image-reveal'
import { SectionHeader } from '@/components/animations/section-header'
import { ReservationForm } from '@/components/ui/ReservationForm'
import { teamData, TeamMember } from '@/data/team'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export default function InfluencerDetail({ params }: Props) {
  const [influencer, setInfluencer] = useState<TeamMember | null>(null)

  useEffect(() => {
    const data = teamData.find(
      (member) => member.slug === params.slug && member.role === 'Influencer'
    )
    setInfluencer(data || null)
  }, [params.slug])

  if (!influencer) return <p className="p-6 text-center">No se encontró el influencer</p>

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      {/* Header */}
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
            src={influencer.image}
            alt={influencer.name}
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">{influencer.name}</h1>
            <p className="text-muted-foreground mt-2">{influencer.role}</p>
            <p className="mt-4">{influencer.bio || influencer.specialty}</p>
          </div>
        </div>
      </FadeUp>

      {/* Misiones realizadas */}
      {influencer.missions?.length > 0 && (
        <>
          <SectionHeader title="Misiones realizadas" className="mt-12" description="" />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencer.missions.map((mission) => (
              <ImageReveal key={mission.title}>
                <div className="bg-card glass-effect rounded-xl overflow-hidden shadow-lg">
                  <img src={mission.image} alt={mission.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{mission.title}</h3>
                  </div>
                </div>
              </ImageReveal>
            ))}
          </div>
        </>
      )}

      {/* Componente de reservas */}
      <div className="mt-12">
        <SectionHeader title="Reserva tu experiencia" description={''} />
        <FadeUp>
          <ReservationForm momentTitle={influencer.name} />
        </FadeUp>
      </div>
    </main>
  )
}