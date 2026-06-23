'use client'

import { useEffect, useMemo, useState } from 'react'
import { Skeleton } from 'antd'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import {
    MissionsHero,
    MissionsFilters,
    MissionsGrid,
    MissionsCTA,
} from '@/components/pages/mission/content/index'

import { missionService } from '@/services/missionService'
import type {
    MissionCountryGroup,
    MissionItem,
} from '@/services/missionService'

type MissionGridItem = MissionItem & {
    country: string
}

function MissionsGridSkeleton() {
    return (
        <section className="relative py-16 overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg"
                        >
                            <Skeleton.Image
                                active
                                className="!w-full !h-56"
                            />

                            <div className="p-5 space-y-5">
                                <Skeleton
                                    active
                                    title={{ width: '70%' }}
                                    paragraph={{
                                        rows: 2,
                                        width: ['100%', '85%'],
                                    }}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    {Array.from({ length: 4 }).map(
                                        (_, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="rounded-xl border border-border/60 p-3"
                                            >
                                                <Skeleton
                                                    active
                                                    title={false}
                                                    paragraph={{
                                                        rows: 2,
                                                        width: ['70%', '90%'],
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>

                                <Skeleton
                                    active
                                    title={{ width: '30%' }}
                                    paragraph={{
                                        rows: 3,
                                        width: ['80%', '75%', '70%'],
                                    }}
                                />

                                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
                                    <Skeleton
                                        active
                                        title={false}
                                        paragraph={{
                                            rows: 2,
                                            width: ['70px', '110px'],
                                        }}
                                    />

                                    <Skeleton.Button
                                        active
                                        className="!w-28 !h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function MissionsPage() {
    const [activeCategory, setActiveCategory] = useState('Todos')
    const [categories, setCategories] = useState<string[]>(['Todos'])
    const [missionGroups, setMissionGroups] = useState<MissionCountryGroup[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                setLoading(true)

                const response = await missionService.getAllMissions()

                setCategories(
                    response.countries?.length ? response.countries : ['Todos']
                )

                setMissionGroups(response.data ?? [])
            } catch (error) {
                console.error('Error al obtener misiones:', error)

                setCategories(['Todos'])
                setMissionGroups([])
            } finally {
                setLoading(false)
            }
        }

        fetchMissions()
    }, [])

    const missions = useMemo<MissionGridItem[]>(() => {
        return missionGroups.flatMap((group) =>
            group.mission_experiences.map((mission) => ({
                ...mission,
                country: group.country,
            }))
        )
    }, [missionGroups])

    const filteredMissions = useMemo<MissionGridItem[]>(() => {
        if (activeCategory.toLowerCase() === 'todos') {
            return missions
        }

        return missions.filter(
            (mission) =>
                mission.country.toLowerCase() === activeCategory.toLowerCase()
        )
    }, [activeCategory, missions])

    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <MissionsHero />

                <MissionsFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />

                {loading ? (
                    <MissionsGridSkeleton />
                ) : (
                    <MissionsGrid missions={filteredMissions} />
                )}

                <MissionsCTA />
            </main>

            <Footer />
        </>
    )
}