'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { UsersRound } from 'lucide-react'

import { AnimatedCard } from '@/components/animations/animated-card'

import {
    missionService,
    type MissionTabItem,
} from '@/services/missionService'

import {
    teamService,
    type TeamPerson,
    type TeamRole,
} from '@/services/teamService'

const roleOptions: Array<{
    label: string
    value: TeamRole
}> = [
    {
        label: 'Influencers',
        value: 'influencer',
    },
    {
        label: 'Coordinadores',
        value: 'coordinator',
    },
    {
        label: 'Colaboradores',
        value: 'contributor',
    },
]

function getRoleLabel(role: string) {
    const labels: Record<string, string> = {
        influencer: 'Influencer',
        coordinator: 'Coordinador',
        contributor: 'Colaborador',
    }

    return labels[role] ?? role
}

function getProfileHref(member: TeamPerson) {
    if (member.role === 'influencer') {
        return `/team/influencer/${member.slug}`
    }

    return `/team/staff/${member.slug}`
}

function TeamPageSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 shadow-lg"
                >
                    <div className="h-56 w-full overflow-hidden rounded-xl bg-muted">
                        <Skeleton.Image
                            active
                            className="!h-full !w-full"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>

                    <div className="mt-5 space-y-3">
                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                width: '70%',
                                height: 24,
                            }}
                        />

                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                width: '45%',
                                height: 18,
                            }}
                        />

                        <Skeleton
                            active
                            title={false}
                            paragraph={{
                                rows: 3,
                                width: ['100%', '85%', '65%'],
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

function EmptyTeamState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                <UsersRound className="h-8 w-8" />
            </div>

            <h2 className="text-xl font-bold text-foreground">
                Próximamente conocerás a este equipo
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Estamos preparando la información de las personas que
                participarán en esta misión. Puedes explorar otro destino o
                categoría.
            </p>
        </div>
    )
}

export default function TeamPageClient() {
    const [missions, setMissions] = useState<MissionTabItem[]>([])
    const [members, setMembers] = useState<TeamPerson[]>([])

    const [selectedRole, setSelectedRole] =
        useState<TeamRole>('influencer')

    const [selectedMissionSlug, setSelectedMissionSlug] = useState('')

    const [loadingMissions, setLoadingMissions] = useState(true)
    const [loadingMembers, setLoadingMembers] = useState(false)

    const [missionsError, setMissionsError] = useState<string | null>(
        null
    )

    const [membersError, setMembersError] = useState<string | null>(
        null
    )

    const selectedMission = useMemo(
        () =>
            missions.find(
                (mission) => mission.slug === selectedMissionSlug
            ) ?? null,
        [missions, selectedMissionSlug]
    )

    useEffect(() => {
        let cancelled = false

        const loadMissions = async () => {
            setLoadingMissions(true)
            setMissionsError(null)

            try {
                const response = await missionService.getMissionTabs()

                if (cancelled) return

                setMissions(response)

                if (response.length > 0) {
                    setSelectedMissionSlug(response[0].slug)
                } else {
                    setSelectedMissionSlug('')
                    setMembers([])
                }
            } catch (error: unknown) {
                console.error('Error al obtener las misiones:', error)

                if (cancelled) return

                setMissions([])
                setMembers([])
                setSelectedMissionSlug('')
                setMissionsError(
                    'No se pudieron obtener las misiones disponibles.'
                )
            } finally {
                if (!cancelled) {
                    setLoadingMissions(false)
                }
            }
        }

        void loadMissions()

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (!selectedMissionSlug) {
            setMembers([])
            setLoadingMembers(false)
            return
        }

        let cancelled = false

        const loadMembers = async () => {
            setLoadingMembers(true)
            setMembersError(null)

            try {
                const response =
                    await teamService.getPeopleByMissionAndRole(
                        selectedMissionSlug,
                        selectedRole,
                        1,
                        24
                    )

                if (cancelled) return

                setMembers(response?.data ?? [])
            } catch (error: unknown) {
                console.error('Error al obtener el equipo:', error)

                if (cancelled) return

                setMembers([])
                setMembersError(
                    'No se pudo obtener el equipo de la misión.'
                )
            } finally {
                if (!cancelled) {
                    setLoadingMembers(false)
                }
            }
        }

        void loadMembers()

        return () => {
            cancelled = true
        }
    }, [selectedMissionSlug, selectedRole])

    const handleMissionChange = (missionSlug: string) => {
        setSelectedMissionSlug(missionSlug)
        setSelectedRole('influencer')
    }

    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden py-24">
                <div className="absolute bottom-0 right-0 -mb-48 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

                <div className="absolute left-0 top-24 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                            Personas que inspiran
                        </p>

                        <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                            Nuestro equipo
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                            Conoce a las personas que acompañan, coordinan y
                            hacen posible cada una de nuestras experiencias.
                        </p>
                    </div>

                    {loadingMissions ? (
                        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                            <Skeleton.Input
                                active
                                block
                                style={{ height: 48 }}
                            />

                            <Skeleton.Input
                                active
                                block
                                style={{ height: 48 }}
                            />
                        </div>
                    ) : missionsError ? (
                        <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-center text-sm text-red-500">
                            {missionsError}
                        </div>
                    ) : missions.length > 0 ? (
                        <div className="mb-12 grid gap-5 rounded-2xl border border-border/60 bg-card/40 p-5 shadow-lg sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="team-mission"
                                    className="mb-2 block text-sm font-semibold text-foreground"
                                >
                                    Misión
                                </label>

                                <select
                                    id="team-mission"
                                    value={selectedMissionSlug}
                                    onChange={(event) =>
                                        handleMissionChange(
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                                >
                                    {missions.map((mission) => (
                                        <option
                                            key={mission.slug}
                                            value={mission.slug}
                                        >
                                            {mission.name}
                                            {mission.country
                                                ? ` - ${mission.country}`
                                                : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="team-role"
                                    className="mb-2 block text-sm font-semibold text-foreground"
                                >
                                    Categoría
                                </label>

                                <select
                                    id="team-role"
                                    value={selectedRole}
                                    onChange={(event) =>
                                        setSelectedRole(
                                            event.target.value as TeamRole
                                        )
                                    }
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                                >
                                    {roleOptions.map((role) => (
                                        <option
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-14 text-center text-muted-foreground">
                            No hay misiones disponibles.
                        </div>
                    )}

                    {selectedMission && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground">
                                {selectedMission.name}
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {getRoleLabel(selectedRole)}
                                {selectedMission.country
                                    ? ` · ${selectedMission.country}`
                                    : ''}
                            </p>
                        </div>
                    )}

                    {!loadingMissions &&
                        !missionsError &&
                        missions.length > 0 &&
                        (loadingMembers ? (
                            <TeamPageSkeleton />
                        ) : membersError ? (
                            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-8 text-center text-sm text-red-500">
                                {membersError}
                            </div>
                        ) : members.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {members.map((member) => (
                                    <AnimatedCard key={member.slug}>
                                        <article className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 shadow-lg transition-all duration-500 hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl">
                                            <div className="relative h-56 overflow-hidden rounded-xl border border-border/50 bg-muted">
                                                {member.photo_url ? (
                                                    <img
                                                        src={
                                                            member.photo_url
                                                        }
                                                        alt={
                                                            member.fullname
                                                        }
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                        Sin fotografía
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

                                                <span className="absolute bottom-3 left-3 rounded-full border border-accent/30 bg-background/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                                                    {getRoleLabel(
                                                        member.role
                                                    )}
                                                </span>
                                            </div>

                                            <div className="mt-5">
                                                <h3 className="text-xl font-bold text-foreground">
                                                    {member.fullname}
                                                </h3>

                                                {member.specialty && (
                                                    <p className="mt-1 text-sm font-semibold text-accent">
                                                        {
                                                            member.specialty
                                                        }
                                                    </p>
                                                )}

                                                <div className="mt-5 space-y-4 border-t border-border/60 pt-4 text-sm">
                                                    {member.experience && (
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                                                Experiencia
                                                            </p>

                                                            <p className="mt-1 font-medium text-foreground">
                                                                {
                                                                    member.experience
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {member.languages.length >
                                                        0 && (
                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                                                Idiomas
                                                            </p>

                                                            <p className="mt-1 font-medium text-foreground">
                                                                {member.languages.join(
                                                                    ', '
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <Link
                                                    href={getProfileHref(
                                                        member
                                                    )}
                                                    className="mt-6 inline-flex text-sm font-semibold text-accent transition hover:opacity-80"
                                                >
                                                    Ver perfil →
                                                </Link>
                                            </div>
                                        </article>
                                    </AnimatedCard>
                                ))}
                            </div>
                        ) : (
                            <EmptyTeamState />
                        ))}
                </div>
            </section>
        </main>
    )
}
