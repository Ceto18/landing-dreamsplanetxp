import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

type MomentsPaginationProps = {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    onPage: (page: number) => void
}

export function MomentsPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPage,
}: MomentsPaginationProps) {
    if (totalPages <= 1) return null

    const from = (currentPage - 1) * itemsPerPage + 1
    const to = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <FadeUp>
            <div className="py-10">
                <p className="mb-5 text-center text-sm text-muted-foreground">
                    Mostrando {from} - {to} de {totalItems} momentos
                </p>

                <div className="flex flex-wrap justify-center items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                        const page = i + 1
                        const isActive = currentPage === page

                        return (
                            <button
                                key={page}
                                type="button"
                                onClick={() => onPage(page)}
                                className={`px-3 py-2 rounded-lg border transition ${
                                    isActive
                                        ? 'bg-accent text-black border-accent'
                                        : 'hover:bg-accent/10'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    })}

                    <button
                        type="button"
                        onClick={() => onPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Siguiente
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </FadeUp>
    )
}