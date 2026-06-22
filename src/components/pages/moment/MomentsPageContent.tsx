'use client'

import { useState } from 'react'
import { destinations, getAllMoments } from '@/data/moments'

import { MomentsHero } from './MomentsPageContent/MomentsHero'
import { MomentsFilters } from './MomentsPageContent/MomentsFilters'
import { MomentsGrid } from './MomentsPageContent/MomentsGrid'
import { MomentsPagination } from './MomentsPageContent/MomentsPagination'
import { MomentsCTA } from './MomentsPageContent/MomentsCTA'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const ITEMS_PER_PAGE = 12

export function MomentsPageContent() {
    const [activeCategory, setActiveCategory] = useState('Todos')
    const [currentPage, setCurrentPage] = useState(1)

    const moments = getAllMoments()

    const filteredMoments =
        activeCategory === 'Todos'
            ? moments
            : moments.filter((m) => m.destination === activeCategory)

    const totalPages = Math.ceil(filteredMoments.length / ITEMS_PER_PAGE)

    const paginatedMoments = filteredMoments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleCategory = (cat: string) => {
        setActiveCategory(cat)
        setCurrentPage(1)
    }

    const handlePage = (page: number) => {
        if (page < 1 || page > totalPages) return

        setCurrentPage(page)

        document.getElementById('moments-gallery')?.scrollIntoView({
            behavior: 'smooth',
        })
    }

    return (
        <>
            {/* HEADER REAL */}
            <Header />

            <main className="min-h-screen text-foreground">

                <MomentsHero />

                <MomentsFilters
                    active={activeCategory}
                    onChange={handleCategory}
                />

                <MomentsGrid moments={paginatedMoments} />

                <MomentsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredMoments.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPage={handlePage}
                />

                <MomentsCTA />

            </main>

            {/* FOOTER REAL */}
            <Footer />
        </>
    )
}