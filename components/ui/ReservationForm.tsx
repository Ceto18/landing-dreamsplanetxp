'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface ReservationFormProps {
    momentTitle?: string
}

export function ReservationForm({ momentTitle }: ReservationFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, email, message, moment: momentTitle })
        alert('Reserva enviada con éxito!')
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 shadow-2xl space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-accent" />
                </div>
                <p className="text-xl font-bold text-foreground">Reserva tu experiencia</p>
            </div>

            {/* Optional moment title */}
            {momentTitle && (
                <p className="text-sm text-muted-foreground italic mb-4">
                    Experiencia seleccionada: <span className="font-semibold text-accent">{momentTitle}</span>
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 rounded-lg bg-background/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 rounded-lg bg-background/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Mensaje o detalles de la reserva"
                    className="w-full px-4 py-3 rounded-lg bg-background/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-all resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                />

                <button
                    type="submit"
                    className="btn-gold w-full inline-flex items-center justify-center gap-2 py-4 text-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                    Enviar reserva
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}