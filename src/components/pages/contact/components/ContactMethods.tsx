import {
    Clock,
    Mail,
    MapPin,
    Share2,
} from 'lucide-react'

import { ContactMethodCard } from './ContactMethodCard'

export function ContactMethods() {
    return (
        <div className="space-y-4">
            <ContactMethodCard
                title="WhatsApp"
                value="+51 999 999 999"
                icon={Share2}
                delay={0.22}
                href="https://wa.me/51999999999"
                external
                highlightValue
            />

            <ContactMethodCard
                title="Email"
                value="info@dreamsplanetxp.com"
                icon={Mail}
                delay={0.3}
                href="mailto:info@dreamsplanetxp.com"
                highlightValue
            />

            <ContactMethodCard
                title="Ubicación"
                value="Atención desde Lima, Perú"
                icon={MapPin}
                delay={0.38}
            />

            <ContactMethodCard
                title="Tiempo de respuesta"
                value="Menos de 24 horas"
                icon={Clock}
                delay={0.46}
            />
        </div>
    )
}