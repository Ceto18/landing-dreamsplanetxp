import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/fade-up'

export function MomentsPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPage,
}: any) {
    if (totalPages <= 1) return null

    return (
        <FadeUp>
            <div className="flex flex-wrap justify-center items-center gap-3 py-10">

                <button
                    onClick={() => onPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg text-accent disabled:opacity-40"
                >
                    <ChevronLeft className="w-4 h-4 inline" />
                    Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onPage(i + 1)}
                        className={`px-3 py-2 rounded-lg border ${
                            currentPage === i + 1
                                ? 'bg-accent text-black'
                                : ''
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => onPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg text-accent disabled:opacity-40"
                >
                    Siguiente
                    <ChevronRight className="w-4 h-4 inline" />
                </button>

            </div>
        </FadeUp>
    )
}