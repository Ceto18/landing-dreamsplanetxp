'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import { AnimatedCard } from '@/components/animations/animated-card'
import { missionService, type MissionExperienceCard, type MissionTabItem } from '@/services/missionService'
import { reservationService } from '@/services/reservationService'
import { initialContactFormData, type ContactFormData } from '../data/contact.data'

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type Props = {
    missions: MissionTabItem[]
}

export function ContactForm({ missions }: Props) {
    const [formData, setFormData] = useState<ContactFormData>(initialContactFormData)
    const [experiences, setExperiences] = useState<MissionExperienceCard[]>([])
    const [loadingExperiences, setLoadingExperiences] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let isMounted = true

        const loadExperiences = async () => {
            if (!formData.mision || formData.mision === 'asesoramiento') {
                setExperiences([])
                setLoadingExperiences(false)
                return
            }

            try {
                setLoadingExperiences(true)
                setErrorMessage('')

                const response = await missionService.getExperiencesByMissionSlug(formData.mision, 1, 100)

                if (!isMounted) return

                setExperiences(response.data)
            } catch (error) {
                console.error('Error al cargar experiencias:', error)

                if (!isMounted) return

                setExperiences([])
                setErrorMessage('No se pudieron cargar las experiencias de esta misión.')
            } finally {
                if (isMounted) setLoadingExperiences(false)
            }
        }

        void loadExperiences()

        return () => {
            isMounted = false
        }
    }, [formData.mision])

    const handleChange = (event: ChangeEvent<FormElement>) => {
        const { name, value } = event.target

        setSuccessMessage('')
        setErrorMessage('')

        setFormData((previous) => {
            if (name === 'mision') {
                return {
                    ...previous,
                    mision: value,
                    ruta: '',
                }
            }

            return {
                ...previous,
                [name]: value,
            }
        })
    }

    const handlePhoneChange = (value?: string) => {
        setSuccessMessage('')
        setErrorMessage('')

        setFormData((previous) => ({
            ...previous,
            telefono: value ?? '',
        }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!formData.nombre.trim()) {
            setErrorMessage('Ingresa tu nombre completo.')
            return
        }

        if (!formData.telefono) {
            setErrorMessage('Ingresa tu número de teléfono.')
            return
        }

        if (!isPossiblePhoneNumber(formData.telefono)) {
            setErrorMessage('El número de teléfono no tiene una longitud válida para el país seleccionado.')
            return
        }

        if (!isValidPhoneNumber(formData.telefono)) {
            setErrorMessage('Ingresa un número de teléfono válido.')
            return
        }

        if (!formData.mision || formData.mision === 'asesoramiento') {
            setErrorMessage('Selecciona una misión y una experiencia para enviar la solicitud.')
            return
        }

        if (!formData.experiencia) {
            setErrorMessage('Selecciona una experiencia.')
            return
        }

        try {
            setSubmitting(true)
            setSuccessMessage('')
            setErrorMessage('')

            const response = await reservationService.createReservation({
                experience_slug: formData.experiencia,
                full_name: formData.nombre.trim(),
                phone: formData.telefono.trim(),
                message: formData.mensaje.trim(),
                email: '',
                passengers: ''
            })

            setSuccessMessage(response.message || '¡Gracias! Tu solicitud fue enviada correctamente.')
            setFormData(initialContactFormData)
            setExperiences([])
        } catch (error) {
            console.error('Error al crear la reserva:', error)
            setErrorMessage('No se pudo enviar la solicitud. Inténtalo nuevamente.')
        } finally {
            setSubmitting(false)
        }
    }

    const hasSelectedMission = Boolean(formData.mision) && formData.mision !== 'asesoramiento'

    return (
        <AnimatedCard
            delay={0.18}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-2xl glass-effect"
        >
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative z-10">
                <div className="border-b border-border/50 px-6 py-6 sm:px-8 sm:py-7">
                    <span className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        Reserva tu experiencia
                    </span>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Envía tu solicitud
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Completa tus datos y selecciona la experiencia que deseas vivir.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground">Tus datos</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Necesitamos estos datos para poder gestionar tu solicitud.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="nombre" className="mb-2 block text-sm font-semibold text-foreground">
                                    Nombre completo
                                    <span className="ml-1 text-accent">*</span>
                                </label>

                                <input
                                    id="nombre"
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    autoComplete="name"
                                    placeholder="Ej. María García"
                                    className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefono" className="mb-2 block text-sm font-semibold text-foreground">
                                    Teléfono
                                    <span className="ml-1 text-accent">*</span>
                                </label>

                                <PhoneInput
                                    id="telefono"
                                    international
                                    defaultCountry="ES"
                                    countryCallingCodeEditable={false}
                                    value={formData.telefono}
                                    onChange={handlePhoneChange}
                                    disabled={submitting}
                                    placeholder="Ingresa tu teléfono"
                                    className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 transition focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30 [&_.PhoneInputCountry]:mr-3 [&_.PhoneInputCountrySelect]:cursor-pointer [&_.PhoneInputCountrySelect]:bg-background [&_.PhoneInputCountrySelect]:text-foreground [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:text-foreground [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput::placeholder]:text-muted-foreground"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div>
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground">Elige tu experiencia</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Selecciona una misión para conocer las experiencias disponibles.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="mision" className="mb-2 block text-sm font-semibold text-foreground">
                                    Misión de interés
                                    <span className="ml-1 text-accent">*</span>
                                </label>

                                <select
                                    id="mision"
                                    name="mision"
                                    value={formData.mision}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <option value="">Selecciona una misión</option>

                                    {missions.map((mission) => (
                                        <option key={mission.slug} value={mission.slug}>
                                            {mission.name}
                                        </option>
                                    ))}

                                    <option value="asesoramiento">
                                        No sé, quiero asesoramiento
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="experiencia" className="mb-2 block text-sm font-semibold text-foreground">
                                    Experiencia de interés
                                    <span className="ml-1 text-accent">*</span>
                                </label>

                                <select
                                    id="experiencia"
                                    name="experiencia"
                                    value={formData.experiencia}
                                    onChange={handleChange}
                                    required={hasSelectedMission}
                                    disabled={!hasSelectedMission || loadingExperiences || submitting}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        {loadingExperiences
                                            ? 'Cargando experiencias...'
                                            : !hasSelectedMission
                                                ? 'Selecciona una misión'
                                                : experiences.length === 0
                                                    ? 'No hay experiencias disponibles'
                                                    : 'Selecciona una experiencia'}
                                    </option>

                                    {experiences.map((experience) => (
                                        <option key={experience.slug} value={experience.slug}>
                                            {experience.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="mensaje" className="mb-2 block text-sm font-semibold text-foreground">
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
                        whileHover={submitting ? undefined : { scale: 1.01 }}
                        whileTap={submitting ? undefined : { scale: 0.98 }}
                        disabled={submitting || loadingExperiences}
                        className="btn-gold w-full py-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitting ? 'Enviando solicitud...' : 'Enviar solicitud'}
                    </motion.button>

                    <AnimatePresence mode="wait">
                        {successMessage && (
                            <motion.p
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center text-sm font-semibold text-accent"
                            >
                                {successMessage}
                            </motion.p>
                        )}

                        {errorMessage && (
                            <motion.p
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center text-sm font-semibold text-red-500"
                            >
                                {errorMessage}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <p className="text-center text-xs leading-relaxed text-muted-foreground">
                        Al enviar tu solicitud, nuestro equipo podrá ponerse en contacto contigo para continuar con la reserva.
                    </p>
                </form>
            </div>
        </AnimatedCard>
    )
}