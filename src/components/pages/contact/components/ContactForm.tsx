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

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import {
    isPossiblePhoneNumber,
    isValidPhoneNumber,
} from 'libphonenumber-js'

import { AnimatedCard } from '@/components/animations/animated-card'

import {
    missionService,
    type MissionExperienceCard,
    type MissionTabItem,
} from '@/services/missionService'

import { reservationService } from '@/services/reservationService'

import {
    initialContactFormData,
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

    const handlePhoneChange = (
        value?: string
    ) => {
        setSuccessMessage('')
        setErrorMessage('')

        setFormData((previous) => ({
            ...previous,
            telefono: value ?? '',
        }))
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        /*
         * TELÉFONO
         */
        if (!formData.telefono) {
            setErrorMessage(
                'Ingresa tu número de teléfono.'
            )

            return
        }

        if (
            !isPossiblePhoneNumber(
                formData.telefono
            )
        ) {
            setErrorMessage(
                'El número de teléfono no tiene una longitud válida para el país seleccionado.'
            )

            return
        }

        if (
            !isValidPhoneNumber(
                formData.telefono
            )
        ) {
            setErrorMessage(
                'Ingresa un número de teléfono válido.'
            )

            return
        }

        /*
         * MISIÓN
         */
        if (
            !formData.mision ||
            formData.mision === 'asesoramiento'
        ) {
            setErrorMessage(
                'Selecciona una misión y una experiencia para enviar la solicitud.'
            )

            return
        }

        /*
         * EXPERIENCIA
         */
        if (!formData.experiencia) {
            setErrorMessage(
                'Selecciona una experiencia.'
            )

            return
        }

        /*
         * VIAJEROS
         *
         * Se convierte temporalmente a número
         * solamente para validarlo.
         */
        const passengersNumber = Number(
            formData.viajeros
        )

        if (
            !Number.isInteger(passengersNumber) ||
            passengersNumber <= 0
        ) {
            setErrorMessage(
                'Ingresa una cantidad válida de viajeros.'
            )

            return
        }

        /*
         * El backend espera passengers como string:
         *
         * "passengers": "15"
         */
        const passengers = String(
            passengersNumber
        )

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
                    {/* Nombre */}
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

                    {/* Email */}
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
                        {/* Teléfono */}
                        <div>
                            <label
                                htmlFor="telefono"
                                className="mb-2 block font-semibold text-foreground"
                            >
                                Teléfono
                            </label>

                            <PhoneInput
                                id="telefono"
                                international
                                defaultCountry="ES"
                                countryCallingCodeEditable={
                                    false
                                }
                                value={
                                    formData.telefono
                                }
                                onChange={
                                    handlePhoneChange
                                }
                                disabled={
                                    submitting
                                }
                                placeholder="Ingresa tu teléfono"
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-border/70
                                    bg-transparent
                                    px-4
                                    py-3
                                    transition

                                    focus-within:border-accent
                                    focus-within:ring-1
                                    focus-within:ring-accent/30

                                    [&_.PhoneInputCountry]:mr-3

                                    [&_.PhoneInputCountrySelect]:cursor-pointer
                                    [&_.PhoneInputCountrySelect]:bg-background
                                    [&_.PhoneInputCountrySelect]:text-foreground

                                    [&_.PhoneInputInput]:border-none
                                    [&_.PhoneInputInput]:bg-transparent
                                    [&_.PhoneInputInput]:text-foreground
                                    [&_.PhoneInputInput]:outline-none

                                    [&_.PhoneInputInput::placeholder]:text-muted-foreground
                                "
                            />
                        </div>

                        {/* Número de viajeros */}
                        <div>
                            <label
                                htmlFor="viajeros"
                                className="mb-2 block font-semibold text-foreground"
                            >
                                Número de viajeros
                            </label>

                            <input
                                id="viajeros"
                                type="number"
                                name="viajeros"
                                value={formData.viajeros}
                                onChange={handleChange}
                                required
                                min={1}
                                step={1}
                                disabled={submitting}
                                placeholder="Ej. 2"
                                className="w-full rounded-lg border border-border/70 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Misión */}
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
                                disabled={submitting}
                                className="w-full cursor-pointer appearance-none rounded-lg border border-border/70 bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <option value="">
                                    Selecciona una misión
                                </option>

                                {missions.map(
                                    (mission) => (
                                        <option
                                            key={mission.slug}
                                            value={mission.slug}
                                        >
                                            {mission.name}
                                        </option>
                                    )
                                )}

                                <option value="asesoramiento">
                                    No sé, quiero asesoramiento
                                </option>
                            </select>
                        </div>

                        {/* Experiencia */}
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
                                value={formData.experiencia}
                                onChange={handleChange}
                                required={hasSelectedMission}
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
                                            : experiences.length === 0
                                                ? 'No hay experiencias disponibles'
                                                : 'Selecciona una experiencia'}
                                </option>

                                {experiences.map(
                                    (experience) => (
                                        <option
                                            key={experience.slug}
                                            value={experience.slug}
                                        >
                                            {experience.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Mensaje */}
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

                    {/* Botón */}
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

                    {/* Mensajes */}
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