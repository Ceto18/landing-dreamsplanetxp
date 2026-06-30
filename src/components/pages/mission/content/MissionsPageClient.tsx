'use client'

import { useEffect, useState } from 'react'
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
    MissionExperienceCard,
    MissionTabItem,
} from '@/services/missionService'
import { MissionsPagination } from '@/components/pages/mission/content/MissionsPagination'

const EXPERIENCES_PER_PAGE = 9

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
                            <Skeleton.Image active className="!w-full !h-56" />

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

export default function MissionsPageClient() {
    const [tabs, setTabs] = useState<MissionTabItem[]>([])
    const [activeMissionSlug, setActiveMissionSlug] = useState('')
    const [experiences, setExperiences] = useState<MissionExperienceCard[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    const [loadingTabs, setLoadingTabs] = useState(true)
    const [loadingExperiences, setLoadingExperiences] = useState(false)

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                setLoadingTabs(true)

                const response = await missionService.getMissionTabs()

                setTabs(response)

                if (response.length > 0) {
                    setActiveMissionSlug(response[0].slug)
                    setCurrentPage(1)
                }
            } catch (error) {
                console.error('Error al obtener tabs de misiones:', error)

                setTabs([])
                setActiveMissionSlug('')
                setExperiences([])
                setCurrentPage(1)
                setTotalPages(1)
                setTotal(0)
            } finally {
                setLoadingTabs(false)
            }
        }

        fetchTabs()
    }, [])

    useEffect(() => {
        if (!activeMissionSlug) return

        const fetchExperiences = async () => {
            try {
                setLoadingExperiences(true)

                const response =
                    await missionService.getExperiencesByMissionSlug(
                        activeMissionSlug,
                        currentPage,
                        EXPERIENCES_PER_PAGE
                    )

                setExperiences(response?.data ?? [])
                setCurrentPage(response?.current_page ?? 1)
                setTotalPages(response?.last_page ?? 1)
                setTotal(response?.total ?? 0)
            } catch (error) {
                console.error('Error al obtener experiencias:', error)

                setExperiences([])
                setCurrentPage(1)
                setTotalPages(1)
                setTotal(0)
            } finally {
                setLoadingExperiences(false)
            }
        }

        fetchExperiences()
    }, [activeMissionSlug, currentPage])

    const categories = tabs.map((tab) => tab.name)

    const activeCategory =
        tabs.find((tab) => tab.slug === activeMissionSlug)?.name ?? ''

    const handleCategoryChange = (categoryName: string) => {
        const selectedTab = tabs.find((tab) => tab.name === categoryName)

        if (!selectedTab || selectedTab.slug === activeMissionSlug) return

        setActiveMissionSlug(selectedTab.slug)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)

        window.scrollTo({
            top: 520,
            behavior: 'smooth',
        })
    }

    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <MissionsHero />

                <MissionsFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={handleCategoryChange}
                />

                {loadingTabs || loadingExperiences ? (
                    <MissionsGridSkeleton />
                ) : (
                    <>
                        <MissionsGrid experiences={experiences} />

                        <MissionsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            total={total}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}

                <MissionsCTA />
            </main>

            <Footer />
        </>
    )
}