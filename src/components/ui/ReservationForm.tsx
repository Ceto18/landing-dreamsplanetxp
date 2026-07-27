'use client'

import {
    useState,
    type FormEvent,
} from 'react'

import {
    ArrowRight,
    LoaderCircle,
} from 'lucide-react'

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

import { reservationService } from '@/services/reservationService'

interface ReservationFormProps {
    momentTitle?: string
    momentSlug?: string
}

export function ReservationForm({
    momentTitle,
    momentSlug,
}: ReservationFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [travelers, setTravelers] =
        useState('')
    const [message, setMessage] =
        useState('')

    const [submitting, setSubmitting] =
        useState(false)

    const [
        successMessage,
        setSuccessMessage,
    ] = useState('')

    const [
        errorMessage,
        setErrorMessage,
    ] = useState('')

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        setSuccessMessage('')
        setErrorMessage('')

        if (!momentSlug) {
            setErrorMessage(
                'No se pudo identificar la experiencia seleccionada.'
            )

            return
        }

        /*
         * TELÉFONO
         */
        if (!phone) {
            setErrorMessage(
                'Ingresa tu número de teléfono.'
            )

            return
        }

        if (!isPossiblePhoneNumber(phone)) {
            setErrorMessage(
                'El número de teléfono no tiene una longitud válida para el país seleccionado.'
            )

            return
        }

        if (!isValidPhoneNumber(phone)) {
            setErrorMessage(
                'Ingresa un número de teléfono válido.'
            )

            return
        }

        /*
         * PASAJEROS
         *
         * travelers se mantiene como string en el estado,
         * y aquí se convierte a number.
         */
        const passengers = Number(
            travelers
        )

        if (
            !Number.isInteger(passengers) ||
            passengers <= 0
        ) {
            setErrorMessage(
                'Ingresa una cantidad válida de viajeros.'
            )

            return
        }

        try {
            setSubmitting(true)

            const response =
                await reservationService.createReservation(
                    {
                        experience_slug:
                            momentSlug,

                        full_name:
                            name.trim(),

                        email:
                            email.trim(),

                        phone:
                            phone.trim(),

                        message:
                            message.trim(),

                        passengers,
                    }
                )

            setSuccessMessage(
                response.message ||
                'Reserva enviada correctamente.'
            )

            setName('')
            setEmail('')
            setPhone('')
            setTravelers('')
            setMessage('')
        } catch (error) {
            console.error(
                'Error al crear la reserva:',
                error
            )

            setErrorMessage(
                'No se pudo enviar la reserva. Inténtalo nuevamente.'
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-8 rounded-3xl border border-border/60 bg-card/50 p-8 shadow-2xl glass-effect">
            {/* Header */}
            <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <ArrowRight className="h-6 w-6 text-accent" />
                </div>

                <p className="text-xl font-bold text-foreground">
                    Reserva tu experiencia
                </p>
            </div>

            {/* Experiencia seleccionada */}
            {momentTitle && (
                <p className="mb-4 text-sm italic text-muted-foreground">
                    Experiencia seleccionada:{' '}
                    <span className="font-semibold text-accent">
                        {momentTitle}
                    </span>
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Nombre */}
                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                    value={name}
                    onChange={(event) =>
                        setName(
                            event.target.value
                        )
                    }
                    required
                    disabled={submitting}
                />

                {/* Correo */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                    required
                    disabled={submitting}
                />

                {/* Teléfono internacional */}
                <PhoneInput
                    international
                    defaultCountry="PE"
                    countryCallingCodeEditable={
                        false
                    }
                    value={phone}
                    onChange={(value) =>
                        setPhone(
                            value ?? ''
                        )
                    }
                    disabled={submitting}
                    placeholder="Ingresa tu teléfono"
                    className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-transparent
                        px-4
                        py-3
                        transition-all

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

                {/* Número de viajeros */}
                <input
                    type="number"
                    value={travelers}
                    onChange={(event) =>
                        setTravelers(
                            event.target.value
                        )
                    }
                    required
                    min={1}
                    step={1}
                    disabled={submitting}
                    placeholder="Número de viajeros"
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {/* Mensaje */}
                <textarea
                    placeholder="Mensaje o detalles de la reserva"
                    className="w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
                    value={message}
                    onChange={(event) =>
                        setMessage(
                            event.target.value
                        )
                    }
                    rows={5}
                    disabled={submitting}
                />

                {/* Botón */}
                <motion.button
                    type="submit"
                    disabled={submitting}
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
                    className="btn-gold inline-flex w-full items-center justify-center gap-2 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? (
                        <>
                            <LoaderCircle className="h-5 w-5 animate-spin" />

                            Enviando reserva...
                        </>
                    ) : (
                        <>
                            Enviar reserva

                            <ArrowRight className="h-5 w-5" />
                        </>
                    )}
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
    )
}