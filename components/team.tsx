'use client'

import { useState } from 'react'
import { FadeUp } from '@/components/animations/fade-up'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SectionHeader } from '@/components/animations/section-header'

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

const roles = ['Influencers', 'Coordinadores', 'Colaboradores'] as const

type RoleTab = (typeof roles)[number]

interface TeamMember {
    id: number
    name: string
    role: 'Coordinador' | 'Colaborador' | 'Influencer'
    experience: string
    languages: string[]
    specialty: string
    image: string
}

const teamMembers: Record<string, TeamMember[]> = {
    Marruecos: [
        {
            id: 1,
            name: 'Hassan Al-Mansouri',
            role: 'Coordinador',
            experience: '12 años',
            languages: ['Árabe', 'Francés', 'Inglés', 'Español'],
            specialty: 'Expediciones en desierto',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            id: 2,
            name: 'Fatima Zara',
            role: 'Coordinador',
            experience: '8 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Cultura Marroquí',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 3,
            name: 'Ali Boutchiche',
            role: 'Coordinador',
            experience: '15 años',
            languages: ['Árabe', 'Francés', 'Inglés', 'Italiano'],
            specialty: 'Trekking y montaña',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
        {
            id: 4,
            name: 'Noureddine Sif',
            role: 'Coordinador',
            experience: '10 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Viajes urbanos',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            id: 5,
            name: 'Leila Tazi',
            role: 'Colaborador',
            experience: '6 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Gastronomía local',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 6,
            name: 'Mohammed Aziz',
            role: 'Colaborador',
            experience: '7 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Fotografía',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
        {
            id: 7,
            name: 'Amira Ben',
            role: 'Colaborador',
            experience: '5 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Logística',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 8,
            name: 'Karim Osman',
            role: 'Colaborador',
            experience: '4 años',
            languages: ['Árabe', 'Francés', 'Inglés'],
            specialty: 'Seguridad',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            id: 9,
            name: 'Sofia Marchal',
            role: 'Influencer',
            experience: '8 años',
            languages: ['Francés', 'Inglés', 'Español'],
            specialty: 'Travel content',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 10,
            name: 'Marcus Rivera',
            role: 'Influencer',
            experience: '9 años',
            languages: ['Inglés', 'Español', 'Francés'],
            specialty: 'Adventure vlogging',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
        {
            id: 11,
            name: 'Elena Petra',
            role: 'Influencer',
            experience: '6 años',
            languages: ['Italiano', 'Inglés', 'Francés'],
            specialty: 'Lifestyle',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 12,
            name: 'Diego Santos',
            role: 'Influencer',
            experience: '7 años',
            languages: ['Español', 'Inglés', 'Portugués'],
            specialty: 'Fotografía de viaje',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
    ],

    Vietnam: [
        {
            id: 20,
            name: 'Linh Pham',
            role: 'Coordinador',
            experience: '11 años',
            languages: ['Vietnamita', 'Inglés', 'Francés'],
            specialty: 'Cultura vietnamita',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            id: 21,
            name: 'Hoa Nguyen',
            role: 'Coordinador',
            experience: '9 años',
            languages: ['Vietnamita', 'Inglés'],
            specialty: 'Cruceros',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 22,
            name: 'Hung Do',
            role: 'Coordinador',
            experience: '13 años',
            languages: ['Vietnamita', 'Inglés', 'Chino'],
            specialty: 'Trekking y naturaleza',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
        {
            id: 23,
            name: 'Trang Huynh',
            role: 'Coordinador',
            experience: '8 años',
            languages: ['Vietnamita', 'Inglés', 'Francés'],
            specialty: 'Viajes rurales',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            id: 24,
            name: 'Vy Tran',
            role: 'Colaborador',
            experience: '5 años',
            languages: ['Vietnamita', 'Inglés'],
            specialty: 'Comida local',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 25,
            name: 'Minh Le',
            role: 'Colaborador',
            experience: '6 años',
            languages: ['Vietnamita', 'Inglés'],
            specialty: 'Fotografía',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
        {
            id: 26,
            name: 'Nhu Pham',
            role: 'Colaborador',
            experience: '4 años',
            languages: ['Vietnamita', 'Inglés'],
            specialty: 'Traducción',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            id: 27,
            name: 'Khanh Dang',
            role: 'Colaborador',
            experience: '3 años',
            languages: ['Vietnamita', 'Inglés'],
            specialty: 'Eventos',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
    ],
}

destinations.forEach((destination) => {
    if (!teamMembers[destination]) {
        teamMembers[destination] = teamMembers.Marruecos.map((member, index) => ({
            ...member,
            id: member.id + (index + 1) * 100,
            name: `${member.name} - ${destination}`,
        }))
    }
})

function roleTabToRole(roleTab: RoleTab): TeamMember['role'] {
    if (roleTab === 'Coordinadores') return 'Coordinador'
    if (roleTab === 'Colaboradores') return 'Colaborador'

    return 'Influencer'
}

function TeamCard({
    member,
    delay = 0,
}: {
    member: TeamMember
    delay?: number
}) {
    return (
        <AnimatedCard
            delay={delay}
            className="group space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl"
        >
            {/* Image */}
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

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-lg font-bold text-foreground">
                        {member.name}
                    </h3>

                    <p className="text-sm font-semibold text-accent">
                        {member.specialty}
                    </p>
                </div>

                <div className="space-y-3 border-t border-border/60 pt-4 text-sm">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Experiencia
                        </p>

                        <p className="font-medium text-foreground">
                            {member.experience}
                        </p>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Idiomas
                        </p>

                        <p className="font-medium text-foreground">
                            {member.languages.join(', ')}
                        </p>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Especialidad
                        </p>

                        <p className="font-medium text-foreground">
                            {member.specialty}
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    )
}

export function Team() {
    const [activeDestination, setActiveDestination] = useState(destinations[0])
    const [activeRole, setActiveRole] = useState<RoleTab>('Coordinadores')

    const destinationTeam = teamMembers[activeDestination] || teamMembers.Marruecos
    const selectedRole = roleTabToRole(activeRole)

    const filteredMembers = destinationTeam.filter(
        (member) => member.role === selectedRole
    )

    return (
        <section id="equipo" className="relative overflow-hidden bg-background py-24">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl -mb-48 -mr-48" />
            <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl -ml-48" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Equipo"
                    description="Conoce a los expertos que harán tu viaje inolvidable. Profesionales dedicados con pasión por las aventuras."
                />

                {/* Destination Tabs */}
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

                {/* Role Tabs */}
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

                {/* Team Members Grid */}
                <div
                    key={`${activeDestination}-${activeRole}`}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {filteredMembers.map((member, idx) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            delay={idx * 0.08}
                        />
                    ))}
                </div>

                {filteredMembers.length === 0 && (
                    <FadeUp>
                        <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center">
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