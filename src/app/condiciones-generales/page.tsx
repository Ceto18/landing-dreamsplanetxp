import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { condicionesGeneralesRaw } from '@/content/legal/condicionesGenerales'

export const metadata = {
    title: 'Condiciones Generales | DreamsPlanetXP',
    description:
        'Condiciones generales de contratación de DREAMS LOW COST SL - DREAMSPLANETXP',
}

function normalizeLegalText(text: string) {
    return text
        .replace(
            'Condiciones GeneralesCONDICIONES GENERALES DE CONTRATACIÓN',
            'CONDICIONES GENERALES DE CONTRATACIÓN'
        )
        .replace(
            /CONDICIONES GENERALES DE CONTRATACIÓN\s+Las presentes/,
            'CONDICIONES GENERALES DE CONTRATACIÓN\n\nLas presentes'
        )
        .replace(/INFORMACIÓN GENERAL\s+Titular:/, 'INFORMACIÓN GENERAL\n\nTitular:')
        .replace(/Ámbito general\s+Cualquier/, 'Ámbito general\n\nCualquier')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

function isMainTitle(text: string) {
    const clean = text.trim()

    return (
        clean === 'CONDICIONES GENERALES DE CONTRATACIÓN' ||
        clean === 'INFORMACIÓN GENERAL'
    )
}

function isUpperTitle(text: string) {
    const clean = text.trim()

    if (clean.length > 80) return false
    if (clean.includes(':')) return false
    if (clean.includes('://')) return false

    return clean === clean.toUpperCase() && clean.length > 5
}

function isNumberedTitle(text: string) {
    const clean = text.trim()

    if (clean.length > 120) return false

    return (
        /^\d+[\.-]\s/.test(clean) ||
        /^\d+\.\d+[\.-]\s/.test(clean) ||
        /^\d+\.\d+\.\d+[\.-]\s/.test(clean)
    )
}

function isLetterTitle(text: string) {
    const clean = text.trim()

    if (clean.length > 120) return false

    return /^[A-Z]\.\s/.test(clean)
}

function isInfoLine(text: string) {
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s()]+:\s/.test(text)
}

function LegalText({ text }: { text: string }) {
    const normalizedText = normalizeLegalText(text)

    const blocks = normalizedText
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)

    return (
        <div className="space-y-8">
            {blocks.map((block, index) => {
                const normalized = block.replace(/\n/g, ' ').trim()

                if (isMainTitle(normalized)) {
                    return (
                        <section
                            key={`${normalized}-${index}`}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                {normalized}
                            </h2>

                            <div className="h-px w-full bg-border" />
                        </section>
                    )
                }

                if (isUpperTitle(normalized)) {
                    return (
                        <h2
                            key={`${normalized}-${index}`}
                            className="pt-8 text-2xl md:text-3xl font-bold text-foreground tracking-tight"
                        >
                            {normalized}
                        </h2>
                    )
                }

                if (isNumberedTitle(normalized)) {
                    return (
                        <h3
                            key={`${normalized}-${index}`}
                            className="pt-8 text-xl md:text-2xl font-semibold text-foreground tracking-tight"
                        >
                            {normalized}
                        </h3>
                    )
                }

                if (isLetterTitle(normalized)) {
                    return (
                        <h4
                            key={`${normalized}-${index}`}
                            className="pt-4 text-lg md:text-xl font-semibold text-foreground"
                        >
                            {normalized}
                        </h4>
                    )
                }

                if (isInfoLine(normalized) && normalized.length < 180) {
                    const [label, ...rest] = normalized.split(':')

                    return (
                        <div
                            key={`${normalized}-${index}`}
                            className="rounded-2xl border border-border bg-background/50 p-4 md:p-5"
                        >
                            <p className="text-sm md:text-base leading-7 text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    {label}:
                                </span>{' '}
                                {rest.join(':').trim()}
                            </p>
                        </div>
                    )
                }

                return (
                    <p
                        key={`${normalized.slice(0, 40)}-${index}`}
                        className="text-sm md:text-base leading-8 text-muted-foreground"
                    >
                        {normalized}
                    </p>
                )
            })}
        </div>
    )
}

export default function CondicionesGeneralesPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground bg-background">
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mt-48" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl -mr-48" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-5">
                                Contratación
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                                Condiciones Generales
                            </h1>

                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
                                Consulta las condiciones aplicables a la
                                contratación de servicios, viajes combinados,
                                reservas, pagos, cancelaciones, documentación,
                                transporte y facturación de DREAMSPLANETXP.
                            </p>
                        </div>

                        <article className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-10 lg:p-12 shadow-sm">
                            <div className="mx-auto max-w-5xl">
                                <LegalText text={condicionesGeneralesRaw} />
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}