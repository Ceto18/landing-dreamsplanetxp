'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    ArrowRight,
    Camera,
    MapPin,
    Sparkles,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { destinations, getAllMoments } from '@/data/moments'
import { FadeUp } from '@/components/animations/fade-up'
import { ImageReveal } from '@/components/animations/image-reveal'
import { SectionHeader } from '@/components/animations/section-header'

const categories = ['Todos', ...destinations]

const ITEMS_PER_PAGE = 12

export function MomentsPageContent() {
    const [activeCategory, setActiveCategory] = useState('Todos')
    const [currentPage, setCurrentPage] = useState(1)

    const moments = getAllMoments()

    const filteredMoments =
        activeCategory === 'Todos'
            ? moments
            : moments.filter((moment) => moment.destination === activeCategory)

    const totalPages = Math.ceil(filteredMoments.length / ITEMS_PER_PAGE)

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    const paginatedMoments = filteredMoments.slice(startIndex, endIndex)

    const visibleStart = filteredMoments.length === 0 ? 0 : startIndex + 1
    const visibleEnd = Math.min(endIndex, filteredMoments.length)

    const handleChangeCategory = (category: string) => {
        setActiveCategory(category)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return

        setCurrentPage(page)

        const gallerySection = document.getElementById('moments-gallery')
        gallerySection?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-16 bg-background">
                <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors no-underline mb-10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio
                        </Link>
                    </FadeUp>

                    <SectionHeader
                        title="Todos los Momentos"
                        description="Una galería de experiencias reales, destinos memorables y recuerdos capturados durante nuestras misiones."
                        className="mb-10"
                    />

                    <FadeUp delay={0.2}>
                        <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/40 glass-effect p-5 sm:p-6 text-center shadow-xl">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-accent" />
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                Recuerdos que cuentan historias
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                Cada imagen representa una experiencia, una emoción y una conexión especial
                                con el destino.
                            </p>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Filters */}
            <section className="relative bg-secondary/30 py-8 border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => handleChangeCategory(category)}
                                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                                        activeCategory === category
                                            ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                            : 'border-accent/50 text-foreground hover:border-accent hover:bg-accent/10'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Gallery */}
            <section
                id="moments-gallery"
                className="relative py-16 bg-background overflow-hidden scroll-mt-24"
            >
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results info */}
                    {filteredMoments.length > 0 && (
                        <FadeUp>
                            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Mostrando{' '}
                                        <span className="text-accent font-semibold">
                                            {visibleStart}-{visibleEnd}
                                        </span>{' '}
                                        de{' '}
                                        <span className="text-accent font-semibold">
                                            {filteredMoments.length}
                                        </span>{' '}
                                        momentos
                                    </p>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Página{' '}
                                    <span className="text-foreground font-semibold">
                                        {currentPage}
                                    </span>{' '}
                                    de{' '}
                                    <span className="text-foreground font-semibold">
                                        {totalPages}
                                    </span>
                                </p>
                            </div>
                        </FadeUp>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {paginatedMoments.map((moment, idx) => (
                            <ImageReveal
                                key={moment.slug}
                                delay={idx * 0.035}
                            >
                                <Link
                                    href={`/moment/${moment.slug}`}
                                    className="group block overflow-hidden rounded-2xl border border-border/60 bg-card/40 glass-effect shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500 no-underline"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={moment.image}
                                            alt={moment.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                                            <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                                                {moment.destination}
                                            </p>

                                            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                                                {moment.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4 text-accent" />
                                                <span className="line-clamp-1">{moment.place}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {moment.description}
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                                            Ver momento
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </ImageReveal>
                        ))}
                    </div>

                    {filteredMoments.length === 0 && (
                        <FadeUp>
                            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center">
                                <p className="text-muted-foreground">
                                    No hay momentos disponibles para esta categoría.
                                </p>
                            </div>
                        </FadeUp>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <FadeUp delay={0.12}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Anterior
                                </button>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {Array.from({ length: totalPages }).map((_, idx) => {
                                        const page = idx + 1

                                        return (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => handlePageChange(page)}
                                                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-all ${
                                                    currentPage === page
                                                        ? 'border-accent bg-accent text-background shadow-lg shadow-accent/20'
                                                        : 'border-border/60 bg-card/40 text-muted-foreground hover:border-accent/50 hover:text-accent hover:bg-accent/10'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Siguiente
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </FadeUp>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-16 bg-secondary/30 border-t border-border/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp>
                        <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-10 shadow-2xl">
                            <div className="flex justify-center mb-5">
                                <div className="w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center">
                                    <Sparkles className="w-7 h-7 text-accent" />
                                </div>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                ¿Quieres vivir tu propio momento?
                            </h2>

                            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                                Explora nuestras misiones y encuentra el destino ideal para crear recuerdos
                                que se queden contigo.
                            </p>

                            <Link
                                href="/mission"
                                className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
                            >
                                Ver misiones
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </main>
    )
}