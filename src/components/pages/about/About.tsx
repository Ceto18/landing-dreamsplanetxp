import { SectionHeader } from '@/components/animations/section-header'
import { aboutValues } from '@/data/about'
import { companyService } from '@/services/companyService'

import { AboutMainContent } from './components/AboutMainContent'
import { AboutStats } from './components/AboutStats'
import { AboutDivider } from './components/AboutDivider'
import { AboutValues } from './components/AboutValues'

export async function About() {
    const company = await companyService.getCompanyHome()

    const paragraphs = company.info
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)

    return (
        <section
            id="about"
            className="relative overflow-hidden py-24"
        >
            {/* Background decoration */}
            <div className="absolute right-0 top-24 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-20 left-0 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <SectionHeader
                    title="Quiénes Somos"
                    description={company.subtitle}
                />

                {/* Main Content */}
                <div className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <AboutMainContent
                        paragraphs={paragraphs}
                    />

                    <AboutStats />
                </div>

                <AboutDivider />

                <AboutValues
                    values={aboutValues}
                />
            </div>
        </section>
    )
}