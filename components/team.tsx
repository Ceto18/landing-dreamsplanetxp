'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'
import { teamData, TeamMember } from '@/data/team'

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']
const roles = ['Influencers', 'Coordinadores', 'Colaboradores'] as const
type RoleTab = (typeof roles)[number]

function roleTabToRole(roleTab: RoleTab): TeamMember['role'] {
  if (roleTab === 'Coordinadores') return 'Coordinador'
  if (roleTab === 'Colaboradores') return 'Colaborador'
  return 'Influencer'
}

export function Team() {
  const [activeDestination, setActiveDestination] = useState(destinations[0])
  const [activeRole, setActiveRole] = useState<RoleTab>('Coordinadores')

  const filteredMembers = teamData.filter(
    (member) =>
      member.destination === activeDestination &&
      member.role === roleTabToRole(activeRole)
  )

  const TeamCard = ({ member, delay = 0 }: { member: TeamMember; delay?: number }) => (
    <FadeUp delay={delay}>
      <Link
        href={
          member.role === 'Influencer'
            ? `/team/influencer/${member.slug}`
            : `/team/staff/${member.slug}`
        }
      >
        <AnimatedCard className="group space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl">
          {/* Imagen */}
          <div className="relative h-48 overflow-hidden rounded-xl border border-border/50">
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
              {member.role}
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              {member.specialty && (
                <p className="text-sm font-semibold text-accent">{member.specialty}</p>
              )}
            </div>
            <div className="space-y-3 border-t border-border/60 pt-4 text-sm">
              {member.experience && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Experiencia
                  </p>
                  <p className="font-medium text-foreground">{member.experience}</p>
                </div>
              )}
              {member.languages && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Idiomas
                  </p>
                  <p className="font-medium text-foreground">{member.languages.join(', ')}</p>
                </div>
              )}
              {member.specialty && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Especialidad
                  </p>
                  <p className="font-medium text-foreground">{member.specialty}</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </Link>
    </FadeUp>
  )

  return (
    <section id="equipo" className="relative overflow-hidden bg-background py-24">
      {/* Fondo decorativo */}
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl -mb-48 -mr-48" />
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl -ml-48" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Equipo"
          description="Conoce a los expertos que harán tu viaje inolvidable. Profesionales dedicados con pasión por las aventuras."
        />

        {/* Tabs Destino */}
        <FadeUp delay={0.15} className="mb-10 flex justify-center">
          <div className="flex max-w-5xl flex-wrap justify-center gap-3">
            {destinations.map((destination) => (
              <button
                key={destination}
                type="button"
                onClick={() => {
                  setActiveDestination(destination)
                  setActiveRole('Coordinadores')
                }}
                className={`rounded-full border px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeDestination === destination
                    ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                    : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                }`}
              >
                {destination}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Tabs Roles */}
        <FadeUp delay={0.22} className="mb-14 flex justify-center">
          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeRole === role
                    ? 'border-accent/60 bg-accent/15 text-accent'
                    : 'border-border/60 bg-card/40 text-muted-foreground hover:border-accent/50 hover:text-foreground hover:bg-accent/10'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Grid miembros */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMembers.map((member, idx) => (
            <TeamCard key={member.slug} member={member} delay={idx * 0.08} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <FadeUp>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center mt-10">
              <p className="text-muted-foreground">
                No hay miembros disponibles para esta categoría.
              </p>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}