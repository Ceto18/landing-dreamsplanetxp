'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Skeleton } from 'antd'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { MomentsHero } from './MomentsHero'
import { MomentsFilters } from './MomentsFilters'
import { MomentsGrid } from './MomentsGrid'
import { MomentsPagination } from './MomentsPagination'
import { MomentsCTA } from './MomentsCTA'

import { missionService } from '@/services/missionService'
import { experienceService } from '@/services/experienceService'

import type {
    MissionMoment,
    MissionMomentsPagination,
} from '@/types/home'

import type { MissionTabItem } from '@/services/missionService'

function MomentsGridSkeleton() {
    return (
        <section id="moments-gallery" className="py-16 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border bg-card/40"
                        >
                            <Skeleton.Image active className="!w-full !h-80" />

                            <div className="p-5 space-y-4">
                                <Skeleton
                                    active
                                    title={{ width: '70%' }}
                                    paragraph={{
                                        rows: 3,
                                        width: ['100%', '90%', '75%'],
                                    }}
                                />

                                <Skeleton.Button
                                    active
                                    className="!w-32 !h-9"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function MomentsPageContent() {
    const params = useParams()

    const routeMissionSlug = useMemo(() => {
        const value = params?.missionSlug ?? params?.slug

        if (Array.isArray(value)) return value[0]

        return value as string | undefined
    }, [params])

    const [tabs, setTabs] = useState<MissionTabItem[]>([])
    const [activeMissionSlug, setActiveMissionSlug] = useState('')

    const [moments, setMoments] = useState<MissionMoment[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)

    const [loadingTabs, setLoadingTabs] = useState(true)
    const [loadingMoments, setLoadingMoments] = useState(false)

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                setLoadingTabs(true)

                const response = await missionService.getMissionTabs()

                setTabs(response)

                if (response.length === 0) {
                    setActiveMissionSlug('')
                    setMoments([])
                    setCurrentPage(1)
                    setTotalPages(1)
                    setTotalItems(0)
                    setItemsPerPage(1)
                    return
                }

                const existsRouteMission = response.some(
                    (tab) => tab.slug === routeMissionSlug
                )

                if (routeMissionSlug && existsRouteMission) {
                    setActiveMissionSlug(routeMissionSlug)
                } else {
                    setActiveMissionSlug(response[0].slug)
                }

                setCurrentPage(1)
            } catch (error) {
                console.error('Error cargando tabs de misiones:', error)

                setTabs([])
                setActiveMissionSlug('')
                setMoments([])
                setCurrentPage(1)
                setTotalPages(1)
                setTotalItems(0)
                setItemsPerPage(1)
            } finally {
                setLoadingTabs(false)
            }
        }

        fetchTabs()
    }, [routeMissionSlug])

    useEffect(() => {
        if (!activeMissionSlug) {
            setLoadingMoments(false)
            return
        }

        const fetchMoments = async () => {
            try {
                setLoadingMoments(true)

                const data: MissionMomentsPagination =
                    await experienceService.getMomentsByMissionSlug(
                        activeMissionSlug,
                        currentPage
                    )

                setMoments(data.data ?? [])
                setCurrentPage(data.current_page ?? 1)
                setTotalPages(data.last_page ?? 1)
                setTotalItems(data.total ?? 0)
                setItemsPerPage(Number(data.per_page ?? 1))
            } catch (error) {
                console.error('Error cargando momentos:', error)

                setMoments([])
                setCurrentPage(1)
                setTotalPages(1)
                setTotalItems(0)
                setItemsPerPage(1)
            } finally {
                setLoadingMoments(false)
            }
        }

        fetchMoments()
    }, [activeMissionSlug, currentPage])

    const categories = tabs.map((tab) => tab.name)

    const activeCategory =
        tabs.find((tab) => tab.slug === activeMissionSlug)?.name ?? ''

    const formattedMoments = moments.map((moment) => ({
        title: moment.title,
        slug: moment.slug,
        image: moment.first_image?.image_url || '/mission-morocco.jpg',
        destination: moment.country || activeCategory || 'Momento',
        place: moment.place,
        description: moment.description,
    }))

    const handleCategoryChange = (categoryName: string) => {
        const selectedTab = tabs.find((tab) => tab.name === categoryName)

        if (!selectedTab || selectedTab.slug === activeMissionSlug) return

        setActiveMissionSlug(selectedTab.slug)
        setCurrentPage(1)

        document.getElementById('moments-gallery')?.scrollIntoView({
            behavior: 'smooth',
        })
    }

    const handlePage = (page: number) => {
        if (page < 1 || page > totalPages) return

        setCurrentPage(page)

        document.getElementById('moments-gallery')?.scrollIntoView({
            behavior: 'smooth',
        })
    }

    const isLoading = loadingTabs || loadingMoments

    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground">
                <MomentsHero />

                <MomentsFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={handleCategoryChange}
                />

                {isLoading ? (
                    <MomentsGridSkeleton />
                ) : moments.length === 0 ? (
                    <section
                        id="moments-gallery"
                        className="py-20 text-center"
                    >
                        <p className="text-muted-foreground">
                            No hay momentos disponibles para esta misión.
                        </p>
                    </section>
                ) : (
                    <>
                        <MomentsGrid moments={formattedMoments} />

                        <MomentsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPage={handlePage}
                        />
                    </>
                )}

                <MomentsCTA />
            </main>

            <Footer />
        </>
    )
}