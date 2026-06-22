import { SectionHeader } from '@/components/animations/section-header'
import { aboutStats, aboutValues } from '@/data/about'

import { AboutMainContent } from './components/AboutMainContent'
import { AboutStats } from './components/AboutStats'
import { AboutDivider } from './components/AboutDivider'
import { AboutValues } from './components/AboutValues'

export function About() {
    return (
        <section
            id="quienes-somos"
            className="relative py-24 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Quiénes Somos"
                    description="Somos creadores de experiencias de viaje premium, diseñadas para conectar con culturas, destinos y momentos que se quedan contigo."
                />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <AboutMainContent />

                    <AboutStats stats={aboutStats} />
                </div>

                <AboutDivider />

                <AboutValues values={aboutValues} />
            </div>
        </section>
    )
}