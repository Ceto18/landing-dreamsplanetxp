// src/components/pages/mission/content/MissionsPagination.tsx

'use client'

type Props = {
    currentPage: number
    totalPages: number
    total: number
    onPageChange: (page: number) => void
}

function getVisiblePages(currentPage: number, totalPages: number) {
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    )
}

export function MissionsPagination({
    currentPage,
    totalPages,
    total,
    onPageChange,
}: Props) {
    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages(currentPage, totalPages)

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return

        onPageChange(page)
    }

    return (
        <section className="relative pb-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/30 p-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages} · {total}{' '}
                        experiencias
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="rounded-lg border border-border/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        {visiblePages[0] > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(1)}
                                    className="h-10 min-w-10 rounded-lg border border-border/60 px-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
                                >
                                    1
                                </button>

                                {visiblePages[0] > 2 && (
                                    <span className="px-1 text-sm text-muted-foreground">
                                        ...
                                    </span>
                                )}
                            </>
                        )}

                        {visiblePages.map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => handlePageChange(page)}
                                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${
                                    currentPage === page
                                        ? 'border-accent bg-accent text-background'
                                        : 'border-border/60 text-foreground hover:border-accent hover:text-accent'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {visiblePages[visiblePages.length - 1] <
                            totalPages && (
                            <>
                                {visiblePages[visiblePages.length - 1] <
                                    totalPages - 1 && (
                                    <span className="px-1 text-sm text-muted-foreground">
                                        ...
                                    </span>
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(totalPages)
                                    }
                                    className="h-10 min-w-10 rounded-lg border border-border/60 px-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="rounded-lg border border-border/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}