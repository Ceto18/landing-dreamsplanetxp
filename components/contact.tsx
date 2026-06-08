'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

const missions = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

export function Contact() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mision: '',
        viajeros: '',
        mensaje: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Formulario enviado:', formData)
        // Here you would typically send the form data to a server
        alert('¡Gracias por tu solicitud! Nos contactaremos pronto.')
        setFormData({
            nombre: '',
            correo: '',
            telefono: '',
            mision: '',
            viajeros: '',
            mensaje: '',
        })
    }

    return (
        <section id="contact" className="py-28 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">PLANIFICA TU AVENTURA</h2>
                    <p className="text-lg text-muted-foreground">
                        Completa el formulario y nuestro equipo se contactará contigo en 24 horas
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Glass Card Background */}
                    <div className="p-10 rounded-2xl border border-border bg-card/70 glass-effect space-y-8 shadow-xl">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-foreground">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre completo"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                                />
                            </div>

                            {/* Correo */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-foreground">Correo</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@email.com"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Teléfono */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-foreground">Teléfono</label>
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    required
                                    placeholder="+34 123 456 789"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                                />
                            </div>

                            {/* Misión */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-foreground">Misión de Interés</label>
                                <select
                                    name="mision"
                                    value={formData.mision}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                                >
                                    <option value="">Selecciona una misión</option>
                                    {missions.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Viajeros */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-foreground">Número de Viajeros</label>
                            <input
                                type="number"
                                name="viajeros"
                                value={formData.viajeros}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="Ej: 4"
                                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                            />
                        </div>

                        {/* Mensaje */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-foreground">Mensaje</label>
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Cuéntanos más sobre lo que buscas..."
                                rows={4}
                                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full btn-gold flex items-center justify-center gap-2 group mt-4"
                        >
                            Enviar Solicitud
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 rounded-xl border border-border bg-card/50 glass-effect shadow-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Correo</p>
                            <p className="text-accent font-semibold">info@dreamsplanetap.com</p>
                        </div>
                        <div className="p-6 rounded-xl border border-border bg-card/50 glass-effect shadow-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Teléfono</p>
                            <p className="text-accent font-semibold">+34 900 123 456</p>
                        </div>
                        <div className="p-6 rounded-xl border border-border bg-card/50 glass-effect shadow-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Ubicación</p>
                            <p className="text-accent font-semibold">Madrid, España</p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
