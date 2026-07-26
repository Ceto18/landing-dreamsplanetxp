import { SectionHeader } from '@/components/animations/section-header'

import {
    missionService,
    type MissionTabItem,
} from '@/services/missionService'

import { ContactIntro } from './components/ContactIntro'
import { ContactMethods } from './components/ContactMethods'
import { ContactSocialLinks } from './components/ContactSocialLinks'
import { ContactForm } from './components/ContactForm'

export async function Contact() {
    let missions: MissionTabItem[] = []

    try {
        missions =
            await missionService.getMissionTabs()
    } catch (error) {
        console.error(
            'Error al obtener las misiones:',
            error
        )
    }

    return (
        <section
            id="contacto"
            className="relative overflow-hidden bg-secondary/30 py-24"
        >
            <div className="absolute bottom-0 right-0 -mb-48 -mr-48 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute left-0 top-24 -ml-48 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Contacto"
                    description="¿Listo para tu próxima aventura? Conecta con nuestro equipo y empieza a planificar tu misión ideal."
                />

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="space-y-8">
                        <ContactIntro />

                        <ContactMethods />

                        <ContactSocialLinks />
                    </div>

                    <div className="lg:col-span-2">
                        <ContactForm
                            missions={missions}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}