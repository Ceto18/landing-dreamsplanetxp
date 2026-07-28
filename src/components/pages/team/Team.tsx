'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from 'antd'

import { SectionHeader } from '@/components/animations/section-header'

import {
    homeService,
    type HomeVisibleMissionTab,
} from '@/services/homeService'

import {
    teamService,
    type TeamPerson,
    type TeamRole,
} from '@/services/teamService'

import { TeamDestinationTabs } from './components/TeamDestinationTabs'
import { TeamRoleTabs } from './components/TeamRoleTabs'
import { TeamGrid } from './components/TeamGrid'
import { TeamEmptyState } from './components/TeamEmptyState'

const roles = [
    'Influencers',
    'Coordinadores',
    'Colaboradores',
] as const

export type RoleTab = (typeof roles)[number]

const roleTabToApiRole: Record<RoleTab, TeamRole> = {
    Influencers: 'influencer',
    Coordinadores: 'coordinator',
    Colaboradores: 'contributor',
}

function TeamGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg"
                >
                    <div className="h-48 w-full overflow-hidden rounded-xl border border-border/50 bg-card/50">
                        <Skeleton.Image
                            active
                            className="!h-full !w-full"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                width: '75%',
                                height: 22,
                            }}
                        />

                        <Skeleton.Input
                            active
                            size="small"
                            style={{
                                width: '55%',
                                height: 16,
                            }}
                        />
                    </div>

                    <div className="space-y-3 border-t border-border/60 pt-4">
                        <div className="space-y-2">
                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '40%',
                                    height: 12,
                                }}
                            />

                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '65%',
                                    height: 16,
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '35%',
                                    height: 12,
                                }}
                            />

                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '70%',
                                    height: 16,
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '45%',
                                    height: 12,
                                }}
                            />

                            <Skeleton.Input
                                active
                                size="small"
                                style={{
                                    width: '80%',
                                    height: 16,
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function TeamTabsSkeleton() {
    return (
        <>
            <div className="mb-10 flex justify-center">
                <div className="flex max-w-5xl flex-wrap justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            active
                            shape="round"
                            style={{
                                width: 120,
                                height: 48,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-14 flex justify-center">
                <div className="flex flex-wrap justify-center gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            active
                            shape="round"
                            style={{
                                width: 130,
                                height: 40,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export function Team() {
    const [destinations, setDestinations] = useState<
        HomeVisibleMissionTab[]
    >([])

    const [activeMissionSlug, setActiveMissionSlug] =
        useState('')

    const [activeRole, setActiveRole] =
        useState<RoleTab>('Influencers')

    const [members, setMembers] = useState<TeamPerson[]>([])

    const [loadingMissions, setLoadingMissions] =
        useState(true)

    const [loadingTeam, setLoadingTeam] =
        useState(false)

    const [missionsError, setMissionsError] =
        useState<string | null>(null)

    const [teamError, setTeamError] =
        useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        const loadVisibleMissionTabs = async () => {
            setLoadingMissions(true)
            setMissionsError(null)

            try {
                const homeData =
                    await homeService.getHome()

                if (cancelled) {
                    return
                }

                const visibleTabs = Array.isArray(
                    homeData?.visible_missions_tabs
                )
                    ? homeData.visible_missions_tabs
                    : []

                setDestinations(visibleTabs)

                if (visibleTabs.length > 0) {
                    setActiveMissionSlug(
                        visibleTabs[0].slug
                    )
                } else {
                    setActiveMissionSlug('')
                    setMembers([])
                }
            } catch (error: unknown) {
                console.error(
                    'Error al obtener los tabs visibles:',
                    error
                )

                if (cancelled) {
                    return
                }

                setDestinations([])
                setActiveMissionSlug('')
                setMembers([])
                setMissionsError(
                    'No se pudieron obtener las misiones visibles.'
                )
            } finally {
                if (!cancelled) {
                    setLoadingMissions(false)
                }
            }
        }

        void loadVisibleMissionTabs()

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (!activeMissionSlug) {
            setMembers([])
            setLoadingTeam(false)
            return
        }

        let cancelled = false

        const loadTeam = async () => {
            setLoadingTeam(true)
            setTeamError(null)

            try {
                const response =
                    await teamService.getPeopleByMissionAndRole(
                        activeMissionSlug,
                        roleTabToApiRole[activeRole],
                        1,
                        12
                    )

                if (cancelled) {
                    return
                }

                setMembers(response?.data ?? [])
            } catch (error: unknown) {
                console.error(
                    'Error al obtener el equipo:',
                    error
                )

                if (cancelled) {
                    return
                }

                setMembers([])
                setTeamError(
                    'No se pudo obtener el equipo de la misión.'
                )
            } finally {
                if (!cancelled) {
                    setLoadingTeam(false)
                }
            }
        }

        void loadTeam()

        return () => {
            cancelled = true
        }
    }, [activeMissionSlug, activeRole])

    const handleDestinationChange = (
        missionSlug: string
    ) => {
        setActiveMissionSlug(missionSlug)
        setActiveRole('Influencers')
    }

    return (
        <section
            id="team"
            className="relative overflow-hidden py-24"
        >
            <div className="absolute bottom-0 right-0 -mb-48 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute left-0 top-24 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Equipo"
                    description="Conoce a los expertos que harán tu viaje inolvidable. Profesionales dedicados con pasión por las aventuras."
                />

                {loadingMissions ? (
                    <TeamTabsSkeleton />
                ) : missionsError ? (
                    <div className="mb-10 py-6 text-center text-sm text-red-500">
                        {missionsError}
                    </div>
                ) : destinations.length > 0 ? (
                    <>
                        <TeamDestinationTabs
                            destinations={destinations}
                            activeDestination={
                                activeMissionSlug
                            }
                            onDestinationChange={
                                handleDestinationChange
                            }
                        />

                        <TeamRoleTabs
                            roles={roles}
                            activeRole={activeRole}
                            onRoleChange={setActiveRole}
                        />
                    </>
                ) : (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        No hay misiones visibles disponibles.
                    </div>
                )}

                {!loadingMissions &&
                    !missionsError &&
                    destinations.length > 0 &&
                    (loadingTeam ? (
                        <TeamGridSkeleton />
                    ) : teamError ? (
                        <div className="py-12 text-center text-sm text-red-500">
                            {teamError}
                        </div>
                    ) : members.length > 0 ? (
                        <TeamGrid members={members} />
                    ) : (
                        <TeamEmptyState />
                    ))}
            </div>
        </section>
    )
}