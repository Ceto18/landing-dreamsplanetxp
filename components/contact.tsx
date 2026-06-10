'use client'

import { useState } from 'react'
import {
    Mail,
    Clock,
    Share2,
    Heart,
    Globe,
    MessageSquare,
    MapPin,
} from 'lucide-react'

const misionOptions = [
    'Marruecos',
    'Vietnam',
    'Tailandia',
    'Japón',
    'Nepal',
    'Misión Sorpresa',
    'No sé, quiero asesoramiento',
]

export function Contact() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mision: '',
        viajeros: '',
        mensaje: '',
    })

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setSubmitted(true)

        setTimeout(() => {
            setSubmitted(false)

            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mision: '',
                viajeros: '',
                mensaje: '',
            })
        }, 3000)
    }

    return (
        <section id="contacto" className="relative py-24 bg-secondary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mb-48" />
            <div className="absolute top-24 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 space-y-6 text-center">
                    <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
                        Contacto
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    </div>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        ¿Listo para tu próxima aventura? Conecta con nuestro equipo y empieza a planificar tu misión ideal.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left side - Contact info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Reserva tu <span className="text-accent">aventura</span>
                            </h3>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Escríbenos para resolver tus dudas, separar tu cupo o recibir asesoría personalizada.
                            </p>
                        </div>

                        {/* Contact methods */}
                        <div className="space-y-4">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/51999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all duration-300 no-underline"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                    <Share2 className="w-6 h-6 text-accent group-hover:text-background transition-colors" />
                                </div>

                                <div>
                                    <p className="text-foreground font-semibold">
                                        WhatsApp
                                    </p>

                                    <p className="text-accent text-sm">
                                        +51 999 999 999
                                    </p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:info@dreamsplanetxp.com"
                                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all duration-300 no-underline"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                    <Mail className="w-6 h-6 text-accent group-hover:text-background transition-colors" />
                                </div>

                                <div>
                                    <p className="text-foreground font-semibold">
                                        Email
                                    </p>

                                    <p className="text-accent text-sm break-all">
                                        info@dreamsplanetxp.com
                                    </p>
                                </div>
                            </a>

                            {/* Location */}
                            <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 glass-effect">
                                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>

                                <div>
                                    <p className="text-foreground font-semibold">
                                        Ubicación
                                    </p>

                                    <p className="text-muted-foreground text-sm">
                                        Atención desde Lima, Perú
                                    </p>
                                </div>
                            </div>

                            {/* Response time */}
                            <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 glass-effect">
                                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-accent" />
                                </div>

                                <div>
                                    <p className="text-foreground font-semibold">
                                        Tiempo de respuesta
                                    </p>

                                    <p className="text-muted-foreground text-sm">
                                        Menos de 24 horas
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                                Síguenos
                            </p>

                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Red social"
                                >
                                    <Share2 className="w-5 h-5" />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Red social"
                                >
                                    <Heart className="w-5 h-5" />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Web"
                                >
                                    <Globe className="w-5 h-5" />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300 flex items-center justify-center"
                                    aria-label="Mensaje"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="lg:col-span-2">
                        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 glass-effect shadow-2xl space-y-6">
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

                            <div className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold text-foreground">
                                    Envía tu solicitud
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-foreground font-semibold mb-2">
                                            Nombre completo
                                        </label>

                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-foreground font-semibold mb-2">
                                            Correo electrónico
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
                                            placeholder="tu@email.com"
                                        />
                                    </div>

                                    {/* Grid for 2 columns */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Teléfono */}
                                        <div>
                                            <label className="block text-foreground font-semibold mb-2">
                                                Teléfono
                                            </label>

                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
                                                placeholder="+51 999 999 999"
                                            />
                                        </div>

                                        {/* Número de viajeros */}
                                        <div>
                                            <label className="block text-foreground font-semibold mb-2">
                                                Número de viajeros
                                            </label>

                                            <select
                                                name="viajeros"
                                                value={formData.viajeros}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="1">1 viajero</option>
                                                <option value="2">2 viajeros</option>
                                                <option value="3-5">3-5 viajeros</option>
                                                <option value="6-10">6-10 viajeros</option>
                                                <option value="11+">11+ viajeros</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Misión */}
                                    <div>
                                        <label className="block text-foreground font-semibold mb-2">
                                            Misión de interés
                                        </label>

                                        <select
                                            name="mision"
                                            value={formData.mision}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Selecciona una misión</option>

                                            {misionOptions.map((mision) => (
                                                <option key={mision} value={mision}>
                                                    {mision}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Mensaje */}
                                    <div>
                                        <label className="block text-foreground font-semibold mb-2">
                                            Mensaje
                                        </label>

                                        <textarea
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-background/70 border border-border/70 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all resize-none"
                                            placeholder="Cuéntanos sobre tu viaje soñado..."
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        className="w-full btn-gold py-4 font-semibold text-lg hover:shadow-lg transition-all duration-300"
                                    >
                                        {submitted ? 'Solicitud enviada' : 'Enviar solicitud'}
                                    </button>

                                    {submitted && (
                                        <p className="text-accent text-center text-sm font-semibold">
                                            ¡Gracias! Nos pondremos en contacto pronto.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}