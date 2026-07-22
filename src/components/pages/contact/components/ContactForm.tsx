'use client'

import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react'
import {
    AnimatePresence,
    motion,
} from 'motion/react'

import { AnimatedCard } from '@/components/animations/animated-card'

import {
    missionService,
    type MissionExperienceCard,
    type MissionTabItem,
} from '@/services/missionService'

import { reservationService } from '@/services/reservationService'

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

    const [experiences, setExperiences] =
        useState<MissionExperienceCard[]>([])

    const [
        loadingExperiences,
        setLoadingExperiences,
    ] = useState(false)

    const [submitting, setSubmitting] =
        useState(false)

    const [successMessage, setSuccessMessage] =
        useState('')

    const [errorMessage, setErrorMessage] =
        useState('')

    useEffect(() => {
        let isMounted = true

        const loadExperiences = async () => {
            if (
                !formData.mision ||
                formData.mision === 'asesoramiento'
            ) {
                setExperiences([])
                setLoadingExperiences(false)

                return
            }

            try {
                setLoadingExperiences(true)
                setErrorMessage('')

                const response =
                    await missionService.getExperiencesByMissionSlug(
                        formData.mision,
                        1,
                        100
                    )

                if (!isMounted) {
                    return
                }

                setExperiences(response.data)
            } catch (error) {
                console.error(
                    'Error al cargar experiencias:',
                    error
                )

                if (!isMounted) {
                    return
                }

                setExperiences([])
                setErrorMessage(
                    'No se pudieron cargar las experiencias de esta misión.'
                )
            } finally {
                if (isMounted) {
                    setLoadingExperiences(false)
                }
            }
        }

        void loadExperiences()

        return () => {
            isMounted = false
        }
    }, [formData.mision])

    const handleChange = (
        event: ChangeEvent<FormElement>
    ) => {
        const { name, value } = event.target

        setSuccessMessage('')
        setErrorMessage('')

        setFormData((previous) => {
            if (name === 'mision') {
                return {
                    ...previous,
                    mision: value,
                    experiencia: '',
                }
            }

            return {
                ...previous,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        if (formData.mision === 'asesoramiento') {
            setErrorMessage(
                'Selecciona una misión y una experiencia para enviar la solicitud.'
            )

            return
        }

        if (!formData.experiencia) {
            setErrorMessage(
                'Selecciona una experiencia.'
            )

            return
        }

        const passengers = Number(
            formData.viajeros
        )

        if (
            !Number.isInteger(passengers) ||
            passengers <= 0
        ) {
            setErrorMessage(
                'Selecciona una cantidad válida de viajeros.'
            )

            return
        }

        try {
            setSubmitting(true)
            setSuccessMessage('')
            setErrorMessage('')

            const response =
                await reservationService.createReservation(
                    {
                        experience_slug:
                            formData.experiencia,
                        full_name:
                            formData.nombre.trim(),
                        email:
                            formData.email.trim(),
                        phone:
                            formData.telefono.trim(),
                        message:
                            formData.mensaje.trim(),
                        passengers,
                    }
                )

            setSuccessMessage(
                response.message ||
                    '¡Gracias! Tu solicitud fue enviada correctamente.'
            )

            setFormData(
                initialContactFormData
            )

            setExperiences([])
        } catch (error) {
            console.error(
                'Error al crear la reserva:',
                error
            )

            setErrorMessage(
                'No se pudo enviar la solicitud. Inténtalo nuevamente.'
            )
        } finally {
            setSubmitting(false)
        }
    }

    const hasSelectedMission =
        Boolean(formData.mision) &&
        formData.mision !== 'asesoramiento'

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
                            disabled={submitting}
                            placeholder="Tu nombre"
                            className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
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
                            disabled={submitting}
                            placeholder="tu@email.com"
                            className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
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
                                value={
                                    formData.telefono
                                }
                                onChange={handleChange}
                                required
                                disabled={submitting}
                                placeholder="+51 999 999 999"
                                className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
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
                                value={
                                    formData.viajeros
                                }
                                onChange={handleChange}
                                required
                                disabled={submitting}
                                className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <option value="">
                                    Selecciona
                                </option>

                                {travelerOptions.map(
                                    (option) => (
                                        <option
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                                value={
                                    formData.mision
                                }
                                onChange={handleChange}
                                required
                                disabled={submitting}
                                className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <option value="">
                                    Selecciona una misión
                                </option>

                                {missions.map(
                                    (mission) => (
                                        <option
                                            key={
                                                mission.slug
                                            }
                                            value={
                                                mission.slug
                                            }
                                        >
                                            {
                                                mission.name
                                            }
                                        </option>
                                    )
                                )}

                                <option value="asesoramiento">
                                    No sé, quiero asesoramiento
                                </option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="experiencia"
                                className="mb-2 block font-semibold text-foreground"
                            >
                                Experiencia de interés
                            </label>

                            <select
                                id="experiencia"
                                name="experiencia"
                                value={
                                    formData.experiencia
                                }
                                onChange={handleChange}
                                required={
                                    hasSelectedMission
                                }
                                disabled={
                                    !hasSelectedMission ||
                                    loadingExperiences ||
                                    submitting
                                }
                                className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">
                                    {loadingExperiences
                                        ? 'Cargando experiencias...'
                                        : !hasSelectedMission
                                          ? 'Selecciona una misión'
                                          : experiences.length ===
                                              0
                                            ? 'No hay experiencias disponibles'
                                            : 'Selecciona una experiencia'}
                                </option>

                                {experiences.map(
                                    (experience) => (
                                        <option
                                            key={
                                                experience.slug
                                            }
                                            value={
                                                experience.slug
                                            }
                                        >
                                            {
                                                experience.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
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
                            disabled={submitting}
                            placeholder="Cuéntanos sobre tu viaje soñado..."
                            className="w-full resize-none rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={
                            submitting
                                ? undefined
                                : {
                                      scale: 1.01,
                                  }
                        }
                        whileTap={
                            submitting
                                ? undefined
                                : {
                                      scale: 0.98,
                                  }
                        }
                        disabled={
                            submitting ||
                            loadingExperiences
                        }
                        className="btn-gold w-full py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitting
                            ? 'Enviando solicitud...'
                            : 'Enviar solicitud'}
                    </motion.button>

                    <AnimatePresence mode="wait">
                        {successMessage && (
                            <motion.p
                                key="success"
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
                                {successMessage}
                            </motion.p>
                        )}

                        {errorMessage && (
                            <motion.p
                                key="error"
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
                                className="text-center text-sm font-semibold text-red-500"
                            >
                                {errorMessage}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </AnimatedCard>
    )
}