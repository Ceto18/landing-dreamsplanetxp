'use client'

import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react'
import {
    AnimatePresence,
    motion,
} from 'motion/react'

import { AnimatedCard } from '@/components/animations/animated-card'

import type { MissionTabItem } from '@/services/missionService'

import {
    initialContactFormData,
    travelerOptions,
    type ContactFormData,
} from '../data/contact.data'

type FormElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement

type Props = {
    missions: MissionTabItem[]
}

export function ContactForm({
    missions,
}: Props) {
    const [formData, setFormData] =
        useState<ContactFormData>(
            initialContactFormData
        )

    const [submitted, setSubmitted] =
        useState(false)

    const handleChange = (
        event: ChangeEvent<FormElement>
    ) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        setSubmitted(true)

        console.log(formData)

        setTimeout(() => {
            setSubmitted(false)
            setFormData(initialContactFormData)
        }, 3000)
    }

    return (
        <AnimatedCard
            delay={0.18}
            className="relative space-y-6 overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 shadow-2xl glass-effect sm:p-8"
        >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                    Envía tu solicitud
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="nombre"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Nombre completo
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                            className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="telefono"
                                className="mb-2 block font-semibold text-foreground"
                            >
                                Teléfono
                            </label>

                            <input
                                id="telefono"
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                placeholder="+51 999 999 999"
                                className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="viajeros"
                                className="mb-2 block font-semibold text-foreground"
                            >
                                Número de viajeros
                            </label>

                            <select
                                id="viajeros"
                                name="viajeros"
                                value={formData.viajeros}
                                onChange={handleChange}
                                required
                                className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                            >
                                <option value="">
                                    Selecciona
                                </option>

                                {travelerOptions.map(
                                    (option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="mision"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Misión de interés
                        </label>

                        <select
                            id="mision"
                            name="mision"
                            value={formData.mision}
                            onChange={handleChange}
                            required
                            className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                        >
                            <option value="">
                                Selecciona una misión
                            </option>

                            {missions.map((mission) => (
                                <option
                                    key={mission.slug}
                                    value={mission.slug}
                                >
                                    {mission.name}
                                </option>
                            ))}

                            <option value="asesoramiento">
                                No sé, quiero asesoramiento
                            </option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="mensaje"
                            className="mb-2 block font-semibold text-foreground"
                        >
                            Mensaje
                        </label>

                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Cuéntanos sobre tu viaje soñado..."
                            className="w-full resize-none rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{
                            scale: 1.01,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        disabled={submitted}
                        className="btn-gold w-full py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitted
                            ? 'Solicitud enviada'
                            : 'Enviar solicitud'}
                    </motion.button>

                    <AnimatePresence>
                        {submitted && (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                className="text-center text-sm font-semibold text-accent"
                            >
                                ¡Gracias! Nos pondremos en contacto pronto.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </AnimatedCard>
    )
}