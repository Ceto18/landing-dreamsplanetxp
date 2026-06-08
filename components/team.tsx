'use client'

import { useState } from 'react'
import Image from 'next/image'

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal']

const teamData = {
    Marruecos: {
        Coordinadores: [
            {
                id: 1,
                name: 'Ahmed Hassan',
                role: 'Coordinador Principal',
                experience: '12 años',
                languages: 'Árabe, Francés, Inglés',
                specialty: 'Experiencias Auténticas',
            },
            {
                id: 2,
                name: 'Zahra Benali',
                role: 'Coordinadora Logística',
                experience: '8 años',
                languages: 'Árabe, Español, Inglés',
                specialty: 'Hospedaje Premium',
            },
            {
                id: 3,
                name: 'Hassan Al-Rashid',
                role: 'Guía Cultural',
                experience: '10 años',
                languages: 'Árabe, Inglés, Italiano',
                specialty: 'Historia y Cultura',
            },
            {
                id: 4,
                name: 'Fatima Moussaoui',
                role: 'Especialista de Seguridad',
                experience: '9 años',
                languages: 'Árabe, Francés, Inglés',
                specialty: 'Protección del Viajero',
            },
        ],
        Colaboradores: [
            {
                id: 5,
                name: 'Karim El-Mansouri',
                role: 'Chef Culinario',
                experience: '15 años',
                languages: 'Árabe, Francés, Inglés',
                specialty: 'Gastronomía Marroquí',
            },
            {
                id: 6,
                name: 'Nadia Benaziz',
                role: 'Especialista en Artesanía',
                experience: '7 años',
                languages: 'Árabe, Inglés',
                specialty: 'Arte Tradicional',
            },
            {
                id: 7,
                name: 'Omar Bennani',
                role: 'Guía de Trekking',
                experience: '11 años',
                languages: 'Árabe, Inglés',
                specialty: 'Desierto y Montaña',
            },
            {
                id: 8,
                name: 'Leila Haddad',
                role: 'Fotógrafa Profesional',
                experience: '8 años',
                languages: 'Árabe, Francés, Inglés',
                specialty: 'Fotografía de Viajes',
            },
        ],
        Influencers: [
            {
                id: 9,
                name: '@viajero_nomada',
                role: 'Influencer de Viajes',
                experience: '6 años',
                languages: 'Español, Inglés',
                specialty: 'Contenido Viral',
            },
            {
                id: 10,
                name: '@aventurero_global',
                role: 'Content Creator',
                experience: '5 años',
                languages: 'Español, Inglés',
                specialty: 'Aventura Extrema',
            },
            {
                id: 11,
                name: '@luxe_traveler',
                role: 'Influencer Lujo',
                experience: '7 años',
                languages: 'Inglés, Francés',
                specialty: 'Experiencias Premium',
            },
            {
                id: 12,
                name: '@cultura_viajera',
                role: 'Especialista Cultural',
                experience: '4 años',
                languages: 'Español, Inglés',
                specialty: 'Inmersión Cultural',
            },
        ],
    },
    Vietnam: {
        Coordinadores: [
            { id: 13, name: 'Nguyen Van Hai', role: 'Coordinador Principal', experience: '10 años', languages: 'Vietnamita, Inglés, Chino', specialty: 'Experiencias en Ha Long' },
            { id: 14, name: 'Tran Thuy An', role: 'Coordinadora Logística', experience: '8 años', languages: 'Vietnamita, Inglés, Francés', specialty: 'Transporte Premium' },
            { id: 15, name: 'Pham Hoa', role: 'Guía Cultural', experience: '9 años', languages: 'Vietnamita, Inglés', specialty: 'Historia Antigua' },
            { id: 16, name: 'Hoang Minh', role: 'Especialista de Seguridad', experience: '7 años', languages: 'Vietnamita, Inglés', specialty: 'Seguridad Viajera' },
        ],
        Colaboradores: [
            { id: 17, name: 'Chef Linh', role: 'Chef Culinario', experience: '12 años', languages: 'Vietnamita, Inglés, Francés', specialty: 'Cocina Vietnamita' },
            { id: 18, name: 'Dao Nhat', role: 'Artesano Tradicional', experience: '15 años', languages: 'Vietnamita, Inglés', specialty: 'Cerámica' },
            { id: 19, name: 'Ly Son', role: 'Capitán de Barco', experience: '18 años', languages: 'Vietnamita, Inglés, Chino', specialty: 'Navegación' },
            { id: 20, name: 'Trang Huong', role: 'Fotógrafa Profesional', experience: '7 años', languages: 'Vietnamita, Inglés', specialty: 'Fotografía Submarina' },
        ],
        Influencers: [
            { id: 21, name: '@asia_explorer', role: 'Influencer de Viajes', experience: '5 años', languages: 'Inglés', specialty: 'Aventura en Asia' },
            { id: 22, name: '@wandering_soul', role: 'Content Creator', experience: '4 años', languages: 'Inglés', specialty: 'Viajes Sostenibles' },
            { id: 23, name: '@luxury_wanderer', role: 'Influencer Lujo', experience: '6 años', languages: 'Inglés, Francés', specialty: 'Lujo Responsable' },
            { id: 24, name: '@culinary_traveler', role: 'Especialista Gastronómico', experience: '3 años', languages: 'Inglés', specialty: 'Gastronomía Local' },
        ],
    },
}

interface TeamMember {
    id: number
    name: string
    role: string
    experience: string
    languages: string
    specialty: string
}

interface TeamByRole {
    [key: string]: TeamMember[]
}

export function Team() {
    const [activeTab, setActiveTab] = useState('Marruecos')
    const [activeRole, setActiveRole] = useState('Coordinadores')

    const currentTeam = teamData[activeTab as keyof typeof teamData] as TeamByRole
    const currentMembers = currentTeam[activeRole] || []

    const roles = Object.keys(currentTeam)

    return (
        <section id="team" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">NUESTRO EQUIPO</h2>
                    <p className="text-lg text-muted-foreground">Profesionales dedicados a crear experiencias inolvidables</p>
                </div>

                {/* Destination Tabs */}
                <div className="flex flex-wrap gap-3 mb-10 justify-center">
                    {Object.keys(teamData).map((dest) => (
                        <button
                            key={dest}
                            onClick={() => {
                                setActiveTab(dest)
                                setActiveRole('Coordinadores')
                            }}
                            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === dest
                                    ? 'bg-accent text-primary-foreground shadow-lg'
                                    : 'bg-card/50 text-foreground hover:bg-card border border-border hover:border-accent/50'
                                }`}
                        >
                            {dest}
                        </button>
                    ))}
                </div>

                {/* Role Tabs */}
                <div className="flex flex-wrap gap-3 mb-14 justify-center">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => setActiveRole(role)}
                            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm ${activeRole === role
                                    ? 'bg-accent/15 text-accent border border-accent/60'
                                    : 'bg-card/50 text-foreground hover:bg-card border border-border'
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentMembers.map((member) => (
                        <div
                            key={member.id}
                            className="group p-7 rounded-xl border border-border bg-card/50 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all duration-500 space-y-5 shadow-lg hover:shadow-xl"
                        >
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/40 to-accent/15 flex items-center justify-center group-hover:from-accent/50 group-hover:to-accent/25 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-accent/15 group-hover:bg-accent/25 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                                <p className="text-sm text-accent font-semibold">{member.role}</p>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 text-sm border-t border-border pt-4">
                                <div>
                                    <p className="text-muted-foreground text-xs font-medium mb-1">Experiencia</p>
                                    <p className="text-foreground font-medium">{member.experience}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-medium mb-1">Idiomas</p>
                                    <p className="text-foreground font-medium">{member.languages}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs font-medium mb-1">Especialidad</p>
                                    <p className="text-foreground font-medium">{member.specialty}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
